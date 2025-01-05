const AWS = require('aws-sdk');

// Configure the AWS region
AWS.config.update({ region: 'us-east-2' }); // Ensure the correct region

// Create a DynamoDB DocumentClient
const dynamoDB = new AWS.DynamoDB.DocumentClient();

// Define the table name
const tableName = 'Questionstable'; // Replace with your table name

// Define the items to be inserted
const items = [
  {
    TopicName: 'Machine Learning', // Partition key
    QuestionID: '1', // Sort key
    Question: 'What is supervised learning?',
    Answer: 'Supervised learning uses labeled data.',
  },
  {
    TopicName: 'Machine Learning', // Partition key
    QuestionID: '2', // Sort key
    Question: 'What is unsupervised learning?',
    Answer: 'Unsupervised learning uses unlabeled data.',
  },
];

// Function to insert items into DynamoDB
function insertItems() {
  if (!items || items.length === 0) {
    console.error('No items to insert');
    return;
  }

  items.forEach((item) => {
    const params = {
      TableName: tableName,
      Item: item, // Each item to be inserted
    };

    dynamoDB.put(params, (err, data) => {
      if (err) {
        console.error(`Failed to insert item: ${item.QuestionId}`, err);
      } else {
        console.log(`Successfully inserted item: ${item.QuestionId}`);
      }
    });
  });
}

// Call the function to insert items
insertItems();
