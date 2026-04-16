import json
import uuid
import boto3
from datetime import datetime, timezone

dynamodb = boto3.resource('dynamodb', region_name='us-east-1')
table = dynamodb.Table('what-strategies-contacts')

def handler(event, context):
    # CORS preflight
    if event.get('httpMethod') == 'OPTIONS':
        return cors_response(200, {})

    try:
        body = json.loads(event.get('body') or '{}')
    except (json.JSONDecodeError, TypeError):
        return cors_response(400, {'error': 'Invalid request body'})

    name    = (body.get('name') or '').strip()
    email   = (body.get('email') or '').strip()
    org     = (body.get('org') or '').strip()
    message = (body.get('message') or '').strip()

    if not name or not email or not message:
        return cors_response(400, {'error': 'name, email, and message are required'})

    item = {
        'id':         str(uuid.uuid4()),
        'name':       name,
        'email':      email,
        'org':        org,
        'message':    message,
        'created_at': datetime.now(timezone.utc).isoformat(),
    }

    table.put_item(Item=item)

    return cors_response(200, {'message': 'Submission received'})


def cors_response(status_code, body):
    return {
        'statusCode': status_code,
        'headers': {
            'Access-Control-Allow-Origin':  '*',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
            'Content-Type':                 'application/json',
        },
        'body': json.dumps(body),
    }
