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
    try {
      const params = {
        TableName: 'data-table',
        Key: {
          data: event.pathParameters.data
        }
      }

      const results = await ddb.get(params).promise()

      if (!results || !results.Item) {
        response = {
          headers: {'Access-Control-Allow-Origin': '*'},
          statusCode: 400,
        }
      } else {
        response = {
          headers: {'Access-Control-Allow-Origin': '*'},
          statusCode: 200,
          body: JSON.stringify(results.Item),
        }
      }
    } catch (err) {
      console.log(err)
      response = {
        headers: {'Access-Control-Allow-Origin': '*'},
        statusCode: 500,
      }
    }

    return response
}
