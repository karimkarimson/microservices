import { DynamoDBClient, GetItemCommand, ScanCommand } from "@aws-sdk/client-dynamodb"; // ES Modules import
const client = new DynamoDBClient();

export const handler = async (event) => {
  const qsparam = event.queryStringParameters;
  if(!qsparam) {
    console.log("############    getting all database infos       #############");
    const scanparams = {
      TableName: "userdatabase",
      Select: "ALL_ATTRIBUTES",
    };
    const scancommand = new ScanCommand(scanparams);
    const scanresponse = await client.send(scancommand);
    return JSON.stringify(scanresponse);
  }
  
  const input = {
    TableName: "userdatabase",
    Key: { 
      'username' : {"S": qsparam.username }
    }
  };
  const command = new GetItemCommand(input);
  
  try {
    const response = await client.send(command);
    console.log(response);
    return {body: JSON.stringify(response)};
  } catch (err) {
    console.log(err);
    return err;
  }
};
