import boto3
import uuid
import json

region = "ap-south-1"
bucket_name = f"static-site-{uuid.uuid4().hex[:6]}"

s3 = boto3.client('s3', region_name=region)

# 1. Create Bucket
s3.create_bucket(
    Bucket=bucket_name,
    CreateBucketConfiguration={'LocationConstraint': region}
)
print("✅ Bucket created:", bucket_name)

# 2. Upload index.html
s3.upload_file(
    'index.html',
    bucket_name,
    'index.html',
    ExtraArgs={'ContentType': 'text/html'}
)

print("✅ File uploaded")

# 3. Enable Public Access 
s3.put_public_access_block(
    Bucket=bucket_name,
    PublicAccessBlockConfiguration={
        'BlockPublicAcls': False,
        'IgnorePublicAcls': False,
        'BlockPublicPolicy': False,
        'RestrictPublicBuckets': False
    }
)

# 4. Bucket Policy 
policy_dict = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": [f"arn:aws:s3:::{bucket_name}/*"]
        }]}

s3.put_bucket_policy(
    Bucket=bucket_name,
    Policy=json.dumps(policy_dict)
)

print("✅ Public access enabled")

# 5. Enable Static Website Hosting
s3.put_bucket_website(
    Bucket=bucket_name,
    WebsiteConfiguration={
        'IndexDocument': {'Suffix': 'index.html'}
    }
)
print("✅ Website hosting enabled")

# 6. Website URL
website_url = f"http://{bucket_name}.s3-website-{region}.amazonaws.com"

print("🌐 Website URL:")
print(website_url)
