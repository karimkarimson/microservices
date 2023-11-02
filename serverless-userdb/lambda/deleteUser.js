import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import
const client = new DynamoDBClient();


export const handler = async (event) => {
  const qsparam = event.queryStringParameters;
  console.log(qsparam);
  const input = {
    TableName: "userdatabase",
    Key: {
      "username": {"S": qsparam.username},
    }
  };
  const command = new DeleteItemCommand(input);
  try {
    const response = await client.send(command);
    console.log(response);
    return {body: JSON.stringify(response)};
  } catch(err) {
    return {body: JSON.stringify(err)};
  }
};