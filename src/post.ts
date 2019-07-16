import { DynamoDB } from 'aws-sdk'

const ddb = new DynamoDB.DocumentClient()

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 * Context doc: https://docs.aws.amazon.com/lambda/latest/dg/nodejs-prog-model-context.html 
 * @param {Object} context
 *
 * Return doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html
 * @returns {Object} object - API Gateway Lambda Proxy Output Format
 * 
 */
export const handler = async (event: any = {}): Promise<any> => {
  let response

  if (!event || !event.body) {
    response = { status: 400 }
  }

  try {
    const params = {
      TableName: 'data-table',
      Item: JSON.parse(event.body)
    }
    
    const results = await ddb.put(params).promise()

    if (!results) {
      response = { 'statusCode': 400 }
    } else {
      response = { 'statusCode': 200 }
    }
  } catch (err) {
    console.log(err)
    response = { 'statusCode': 500 }
  }

  return response
}
