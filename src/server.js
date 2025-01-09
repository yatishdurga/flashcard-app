// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const AWS = require('aws-sdk');
const cors = require('cors');

// Initialize the app
const app = express();
const port = 3002;

// Middleware
app.use(cors()); // Add CORS middleware
app.use(bodyParser.json());

// Configure AWS SDK with Account B's region
AWS.config.update({ region: 'us-east-2' }); 

// Create an STS client to assume the role
const sts = new AWS.STS();

// Assume the role in Account A
const assumeRoleParams = {
  RoleArn: 'arn:aws:iam::329599627007:role/Nischal',
  RoleSessionName: 'CrossAccountSession'
};

// Function to get DynamoDB DocumentClient with assumed role
const getDynamoDBClient = async () => {
  try {
    const data = await sts.assumeRole(assumeRoleParams).promise();
    const credentials = new AWS.Credentials({
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    });

    return new AWS.DynamoDB.DocumentClient({
      region: 'us-east-2',
      credentials: credentials
    });
  } catch (err) {
    console.error('Error assuming role:', err);
    throw err;
  }
};

// Define the table name
const tableName = 'Questionstable';

// Add a health check endpoint
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Get all questions for a specific topic
app.get('/questions/:topicName', async (req, res) => {
  const { topicName } = req.params;
  
  if (!topicName) {
    return res.status(400).json({ error: 'Topic name is required' });
  }

  try {
    const dynamoDb = await getDynamoDBClient();

    const params = {
      TableName: tableName,
      KeyConditionExpression: 'TopicName = :topicName',
      ExpressionAttributeValues: {
        ':topicName': topicName,
      },
    };

    console.log('Querying DynamoDB with params:', params); // Add logging

    const data = await dynamoDb.query(params).promise();
    console.log('DynamoDB response:', data); // Add logging
    
    res.status(200).json(data.Items);
  } catch (err) {
    console.error('Error querying DynamoDB:', err); // Add error logging
    res.status(500).json({ 
      error: 'Failed to fetch questions',
      details: err.message 
    });
  }
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something broke!',
    details: err.message
  });
});

// Handle 404 errors
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});