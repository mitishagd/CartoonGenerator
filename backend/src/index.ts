import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import OpenAI from 'openai';

// Reads from environment variable OPENAI_API_KEY. This would be set in the AWS Lambda configuration.
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    const body = JSON.parse(event.body || '{}');
    const { subject } = body;
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    }

    if (!subject) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Subject is required' }),
      }
    }


    // Handle preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: '',
        }
    }

    try {
        const response = await openai.images.generate({
            model: 'dall-e-3',
            prompt: `A cartoon style illustration of ${subject}`,
            n: 1,
            size: '1024x1024',
        });

        const imageUrl = response.data?.[0]?.url;

        if (!imageUrl) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'Failed to retrieve image URL' }),
            };
        }

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ imageUrl }),
        };

    } catch (error) {
        console.error('Error:', error);
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