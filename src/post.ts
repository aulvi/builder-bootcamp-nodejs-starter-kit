import { APIGatewayEvent, APIGatewayEventRequestContext, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';

const ddb = new DynamoDB.DocumentClient();

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {APIGatewayEvent} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html
 * @param {APIGatewayEventRequestContext} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {APIGatewayProxyResult} object - API Gateway Lambda Proxy Output Format
 *
 */
export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
  let response: APIGatewayProxyResult;

  if (!event || !event.body) {
    console.log('No event body');
    return {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 400,
      body: 'No event body',
    };
  }

  try {
    console.log('Preparing to save data');
    const params = {
      TableName: 'data-table',
      Item: JSON.parse(event.body),
    };

    const results = await ddb.put(params).promise();

    if (!results) {
      console.log('No results found');
      response = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 400,
        body: 'No results found',
      };
    } else {
      response = {
        headers: { 'Access-Control-Allow-Origin': '*' },
        statusCode: 200,
        body: 'OK',
      };
    }
  } catch (err) {
    console.log(err);
    response = {
      headers: { 'Access-Control-Allow-Origin': '*' },
      statusCode: 500,
      body: err.message || 'Internal server error',
    };
  }

  console.log('Sending response');
  console.log(response);
  return response;
};
