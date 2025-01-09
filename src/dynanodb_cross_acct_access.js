const AWS = require('aws-sdk');

// Configure the AWS SDK with Account B's credentials
AWS.config.update({ region: 'us-east-2' }); // Replace with your region

// Create an STS client to assume the role
const sts = new AWS.STS();

// Assume the role in Account A
const assumeRoleParams = {
  RoleArn: 'arn:aws:iam::329599627007:role/Nischal', // Role ARN from Account A
  RoleSessionName: 'CrossAccountSession' // Session name
};

sts.assumeRole(assumeRoleParams, function(err, data) {
  if (err) {
    console.error("Error assuming role:", err);
  } else {
    // Temporary credentials from the assumed role
    const credentials = {
      accessKeyId: data.Credentials.AccessKeyId,
      secretAccessKey: data.Credentials.SecretAccessKey,
      sessionToken: data.Credentials.SessionToken
    };

    // Use the temporary credentials to access DynamoDB
    const dynamoDB = new AWS.DynamoDB.DocumentClient({
      region: 'us-east-2', // Replace with your region
      credentials: new AWS.Credentials(credentials)
    });

    // // Example: Query the DynamoDB table for a specific question
    // const queryParams = {
    //   TableName: 'Questionstable', // Replace with your table name
    //   KeyConditionExpression: 'TopicName = :topic and QuestionID = :qid',
    //   ExpressionAttributeValues: {
    //     ':topic': 'Machine Learning', // The topic to query
    //     ':qid': '1' // The QuestionID to query
    //   }
    // };

    // // Perform the query
    // dynamoDB.query(queryParams, function(err, data) {
    //   if (err) {
    //     console.error("Error querying DynamoDB:", err);
    //   } else {
    //     console.log("Query results:", data.Items);
    //   }
    // });


    const newItem = {
      TableName: 'Questionstable', // Replace with your table name
      Item: {
        TopicName: 'Machine Learning', // Partition key
        QuestionID: '3', // Sort key
        Question: 'What is reinforcement learning?',
        Answer: 'Reinforcement learning involves learning from interactions with an environment to maximize a cumulative reward.',
      }
    };

    // Insert the new item into the table
    dynamoDB.put(newItem, function(err, data) {
      if (err) {
        console.error("Error inserting item into DynamoDB:", err);
      } else {
        console.log("Item inserted successfully:", data);
      }
    });
  
  }



});
