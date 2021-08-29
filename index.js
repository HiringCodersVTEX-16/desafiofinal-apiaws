const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

AWS.config.update({ region: 'sa-east-1' });

exports.handler = async(event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      //Delete lead by email
      case "DELETE /leads/{email}":
        await dynamo
          .delete({
            TableName: "leads-hc",
            Key: {
              email: event.pathParameters.email
            }
          })
          .promise();
        body = `Deleted lead ${event.pathParameters.email}`;
        break;

        
      //Get lead by email  
      case "GET /leads/{email}":
        body = await dynamo
          .get({
            TableName: "leads-hc",
            Key: {
            email: event.pathParameters.email,
            }
          })
          .promise();
        break;
    
      //Get all leads  
      case "GET /leads":
        body = await dynamo.scan({ TableName: "leads-hc" }).promise();
        break;
        
      //Cria uma lead  
      case "POST /leads":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "leads-hc",
            Item: {
              email: requestJSON.email,
              id: requestJSON.id,
              nome: requestJSON.nome,
              telefone: requestJSON.telefone,
              cliente: requestJSON.cliente
            }
          })
          .promise();
          body = `Created lead ${requestJSON.id}`;
        break;
        
      //Update lead by email
      case "PUT /leads/{email}":
        let requestJSON1 = JSON.parse(event.body);
        await dynamo.update({
            TableName: 'leads-hc',
            Key: {
              email: event.pathParameters.email
            },
            UpdateExpression: "set cliente = :cliente",
            ExpressionAttributeValues: {
              ':cliente': requestJSON1.cliente
            }
          })
          .promise();
        body = `Updated lead ${event.pathParameters.email}`;
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  }
  catch (err) {
    statusCode = 400;
    body = err.message;
  }
  finally {
    body = JSON.stringify(body);
  }
  return {
    statusCode,
    body,
    headers
  };
};