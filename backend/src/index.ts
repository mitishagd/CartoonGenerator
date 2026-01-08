import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import OpenAI from 'openai';

// Reads from environment variable OPENAI_API_KEY. This would be set in the AWS Lambda configuration.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('Lambda function invoked');
    console.log('Event:', JSON.stringify(event, null, 2));

    const body = JSON.parse(event.body || '{}');
    const { subject } = body;
    console.log('Parsed body:', body);
    console.log('Subject:', subject);

    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }

    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        console.log('Handling OPTIONS preflight request');
        return {
            statusCode: 200,
            headers,
            body: '',
        }
    }

    if (!subject) {
      console.log('No subject provided, returning 400');
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Subject is required' }),
      }
    }

    try {
        console.log('Calling OpenAI API with prompt:', `A cartoon style illustration of ${subject}`);
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `A cartoon style illustration of ${subject}`,
            n: 1,
            size: '1024x1024',
        });

        console.log('OpenAI response received');
        const imageUrl = response.data?.[0]?.url;
        console.log('Image URL:', imageUrl);

        if (!imageUrl) {
            console.log('No image URL in response');
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to retrieve image URL' }),
            };
        }

        console.log('Returning success response');
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ imageUrl }),
        };

    } catch (error) {
        console.error('Error generating image:', error);
        console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Failed to generate image',
                details: error instanceof Error ? error.message : 'Unknown error'
            }),
        }
    }
}