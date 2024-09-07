import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const ENV = process.env.NODE_ENV // ENV is 'STAGE' or 'DEPLOY'

const isLocal = ENV === 'STAGE';

const clientConfig = isLocal
	? {
		region: 'us-east-1',
		endpoint: 'http://localhost:8000',
		credentials: {
			accessKeyId: 'local',
			secretAccessKey: 'local',
			sessionToken: 'local',
		},
	}
	: { region: process.env.REGION };

// This client will be used for all direct interactions with DynamoDB.
const dynamoClient = new DynamoDBClient(clientConfig);

// Configuration options for marshalling (converting JavaScript objects to DynamoDB format)
const marshallOptions = {
	convertEmptyValues: false, // if true it will be NULL
	removeUndefineValues: false, // in this case the dynamodb will keep it
	convertClassInstanceToMap: false, // This preserves the original behavior and properties of the
																		//  JavaScript class instances when interacting with DynamoDB.
};

// Configuration options for unmarshalling (converting DynamoDB format to JavaScript objects):
const unmarshallOptions = {
	wrapNumbers: false, // set to false, so numbers are returned as regular JavaScript numbers.
};

// object containing both marshallOptions and unmarshallOptions,
// which will be used to configure the DynamoDBDocumentClient.
const translateConfig = { marshallOptions, unmarshallOptions };


// The docClient simplifies interactions with DynamoDB by automatically
// handling marshalling and unmarshalling, making it easier to work with
// JavaScript objects directly.
const docClient = DynamoDBDocumentClient.from(dynamoClient, translateConfig);
export default docClient;