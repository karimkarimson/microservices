import { DynamoDBClient, PutItemCommand, ScanComman } from "@aws-sdk/client-dynamodb"; // ES Modules import
const client = new DynamoDBClient();

export const handler = async (event) => {
  const userdata = JSON.parse(event.body);
  const date = new Date;
  const input = {
  TableName: 'userdatabase',
    Item: {
      'username' : {"S": userdata.username},
      'email' : {"S": userdata.email},
      'info' : {"S": `this user was registered: ${date}`}
    }
  };
const command = new PutItemCommand(input);
  try {
    const response = await client.send(command);
    console.log("###############   request sent to dynamodb");
    console.log(response);
    return JSON.stringify(response);
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
