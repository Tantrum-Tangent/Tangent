export async function test() {

    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision').v1;

    // Creates a client
    const client = new vision.ImageAnnotatorClient({
        keyFileName: './serviceAccountKey.json'
    });

    // Bucket where the file resides
    const bucketName = 'tantrum-44f6b.appspot.com/receipts';
    // Path to PDF file within bucket
    const fileName = 'Invoice Sample.pdf';
    // The folder to store the results
    const outputPrefix = 'results'

    const gcsSourceUri = `gs://${bucketName}/${fileName}`;
    const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

    const inputConfig = {
    // Supported mime_types are: 'application/pdf' and 'image/tiff'
    mimeType: 'application/pdf',
    gcsSource: {
        uri: gcsSourceUri,
    },
    };
    const outputConfig = {
    gcsDestination: {
        uri: gcsDestinationUri,
    },
    };
    const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
    const request = {
    requests: [
        {
        inputConfig: inputConfig,
        features: features,
        outputConfig: outputConfig,
        },
    ],
    };

    const [operation] = await client.asyncBatchAnnotateFiles(request);
    const [filesResponse] = await operation.promise();
    const destinationUri =
    filesResponse.responses[0].outputConfig.gcsDestination.uri;
    console.log('Json saved to: ' + destinationUri);
}