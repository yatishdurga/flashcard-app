// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { STSClient, AssumeRoleCommand } = require('@aws-sdk/client-sts');
const { DynamoDBClient, QueryCommand } = require('@aws-sdk/client-dynamodb');

// Initialize the app
const app = express();
const port = 3002;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Define AWS SDK v3 clients
const stsClient = new STSClient({ region: 'us-east-2' });

// Function to get DynamoDB client with assumed role
const getDynamoDBClient = async () => {
  const assumeRoleParams = {
    RoleArn: 'arn:aws:iam::329599627007:role/Nischal', // Role ARN
    RoleSessionName: 'CrossAccountSession',
  };

  try {
    const data = await stsClient.send(new AssumeRoleCommand(assumeRoleParams));
    const credentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken,
    };

    return new DynamoDBClient({
      region: 'us-east-2',
      credentials,
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
  let { topicName } = req.params;

  console.log(`Received topic name: ${topicName}`); // Log the raw topic name

  if (!topicName) {
    return res.status(400).json({ error: 'Topic name is required' });
  }

  topicName = topicName.trim(); // Remove any leading/trailing whitespace or newlines

  console.log(`Trimmed topic name: ${topicName}`); // Log the trimmed topic name

  try {
    const dynamoDbClient = await getDynamoDBClient();
    const params = {
      TableName: tableName,
      KeyConditionExpression: 'TopicName = :topicName',
      ExpressionAttributeValues: {
        ':topicName': { S: topicName },
      },
    };

    console.log('Querying DynamoDB with params:', JSON.stringify(params, null, 2)); // Log query parameters

    const command = new QueryCommand(params);
    const data = await dynamoDbClient.send(command);

    console.log('DynamoDB query result:', JSON.stringify(data.Items, null, 2)); // Log the full query result

    if (!data.Items || data.Items.length === 0) {
      return res.status(404).json({ error: 'No questions found for the topic' });
    }

    res.status(200).json(data.Items);
  } catch (err) {
    console.error('Error querying DynamoDB:', err); // Log the error
    res.status(500).json({
      error: 'Failed to fetch questions',
      details: err.message,
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something broke!',
    details: err.message,
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
