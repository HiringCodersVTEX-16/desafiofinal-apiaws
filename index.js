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
      //Delete lead by id
      case "DELETE /leads/{id}":
        await dynamo
          .delete({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        body = `Deleted lead ${event.pathParameters.id}`;
        break;
      //Get lead by id  
      case "GET /leads/{id}":
        body = await dynamo
          .get({
            TableName: "http-crud-tutorial-items",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
      //Get all leads  
      case "GET /leads":
        body = await dynamo.scan({ TableName: "http-crud-tutorial-items" }).promise();
        break;
      //Cria uma lead  
      case "POST /leads":
        let requestJSON = JSON.parse(event.body);
        await dynamo
          .put({
            TableName: "http-crud-tutorial-items",
            Item: {
              id: requestJSON.id,
              nome: requestJSON.nome,
              email: requestJSON.email,
              telefone: requestJSON.telefone,
              cliente: requestJSON.cliente
            }
          })
          .promise();
          body = `Post lead ${requestJSON.id}`;
        break;
      //Update lead by id  
      case "PUT /leads/{id}":
        let requestJSON1 = JSON.parse(event.body);
        await dynamo.update({
            TableName: 'http-crud-tutorial-items',
            Key: {
              id: event.pathParameters.id
            },

            UpdateExpression: "set cliente = :cliente",
            ExpressionAttributeValues: {
              ':cliente': requestJSON1.cliente
            }
          })
          .promise();
        body = `Updated lead ${event.pathParameters.id}`;
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
