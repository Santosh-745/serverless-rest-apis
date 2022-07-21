const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.getTodo = async (event) => {
  const params = {
    TableName: TODO_TABLE,
    Key: { id: event.pathParameters.id }
  }
  try {
    const data = await dynamoDb.get(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: data.Item,
        input: ""
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Error Occured',
        input: error
      })
    };
  }
}