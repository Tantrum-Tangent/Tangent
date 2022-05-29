import os, io
import re
import json
from google.cloud import vision
from google.cloud import storage
from google.protobuf import json_format

""" 
# pip install --upgrade google-cloud-storage
"""
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = './serviceAccountKey.json'
client = vision.ImageAnnotatorClient()

batch_size = 2
mime_type = 'application/pdf'
feature = vision.Feature(
    type_=vision.Feature.Type.DOCUMENT_TEXT_DETECTION)

gcs_source_uri = 'gs://tantrum-44f6b.appspot.com/receipts/Invoice Sample.pdf'

gcs_source = vision.GcsSource(uri=gcs_source_uri)
input_config = vision.InputConfig(gcs_source=gcs_source, mime_type=mime_type)

#Push to database = firestore
gcs_destination_uri = 'gs://tantrum-44f6b.appspot.com/receipts/pdf_result'
gcs_destination = vision.GcsDestination(uri=gcs_destination_uri)
output_config = vision.OutputConfig(gcs_destination=gcs_destination, batch_size=batch_size)

async_request = vision.AsyncAnnotateFileRequest(
    features=[feature], input_config=input_config, output_config=output_config)

operation = client.async_batch_annotate_files(requests=[async_request])
operation.result(timeout=180)

storage_client = storage.Client()
match = re.match(r'gs://([^/]+)/(.+)', gcs_destination_uri)
bucket_name = match.group(1)
prefix = match.group(2)
bucket = storage_client.get_bucket(bucket_name)

# List objects with the given prefix, filtering out folders.
blob_list = [blob for blob in list(bucket.list_blobs(
    prefix=prefix)) if not blob.name.endswith('/')]
print('Output files:')
for blob in blob_list:
    print(blob.name)

output = blob_list[0]
json_string = output.download_as_string()
response = json.loads(json_string)

# The actual response for the first page of the input file.
first_page_response = response['responses'][0]
annotation = first_page_response['fullTextAnnotation']

print('Full text:\n')
print(annotation['text'])