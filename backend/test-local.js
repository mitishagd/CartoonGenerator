const { handler } = require('./dist/index');

const testEvent = {
  body: JSON.stringify({ subject: 'a blue colored happy dog' }),
  httpMethod: 'POST',
  headers: {},
  multiValueHeaders: {},
  isBase64Encoded: false,
  path: '/generate',
  pathParameters: null,
  queryStringParameters: null,
  multiValueQueryStringParameters: null,
  stageVariables: null,
  requestContext: {},
  resource: '',
};

handler(testEvent)
  .then((result) => {
    console.log('Success!');
    console.log('Status:', result.statusCode);
    
    const data = JSON.parse(result.body);
    console.log('\n🎨 Image URL:');
    console.log(data.imageUrl);
  })
  .catch((error) => {
    console.error('Error:', error.message);
  });