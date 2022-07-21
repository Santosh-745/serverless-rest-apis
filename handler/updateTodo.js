const AWS = require("aws-sdk");
const TODO_TABLE = process.env.TODO_TABLE;
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports.updateTodo = async (event) => {
  const data = JSON.parse(event.body);
  const timestamp = new Date().getTime();
  const params = {
    TableName: TODO_TABLE,
    Key: { id: event.pathParameters.id },
    ExpressionAttributeNames: {
      "#todo_text": "todo"
    },
    ExpressionAttributeValues: {
      ":todo": data.todo,
      ":checked": data.checked,
      ":updatedAt": timestamp
    },
    UpdateExpression:
      "SET #todo_text = :todo, checked = :checked, updatedAt = :updatedAt",
    ReturnValues: "ALL_NEW"
  }
  try {
    const data = await dynamoDb.update(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: data,
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