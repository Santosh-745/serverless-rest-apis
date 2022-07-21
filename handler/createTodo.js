const AWS = require("aws-sdk");
const uuid = require("uuid");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.createTodo = async (event) => {
  const timestamp = new Date().getTime();
  let data = JSON.parse(event.body);
  const params = {
    TableName: TODO_TABLE,
    Item: {
      id: uuid.v1(),
      todo: data.todo,
      checked: false,
      createdAt: timestamp,
      updatedAt: timestamp
    }
  }
  try {
    const dataAdded = await dynamoDb.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Todo saved!',
        input: dataAdded.Item
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