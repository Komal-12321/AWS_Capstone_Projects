import boto3
import uuid

region = "ap-south-1"
bucket_name = f"4-assignment-bucket-{uuid.uuid4().hex[:5]}"

# Clients
s3 = boto3.client('s3', region_name=region)
ec2 = boto3.resource('ec2', region_name=region)

# 1. Create S3 Bucket
s3.create_bucket(
    Bucket=bucket_name,
    CreateBucketConfiguration={'LocationConstraint': region}
)

print("✅ Bucket created:", bucket_name)

# 2. Upload file to S3
s3.upload_file('index.html', bucket_name, 'index.html')

print("✅ File uploaded to S3")

# 3. Launch EC2 Instance
instances = ec2.create_instances(
    ImageId='ami-0f5ee92e2d63afc18',
    InstanceType='t3.micro',
    MinCount=1,
    MaxCount=1,

    TagSpecifications=[{
        'ResourceType': 'instance',
        'Tags': [{'Key': 'Name', 'Value': '4_assignment_instance'}]
    }]
)

instance = instances[0]
print("⏳ Launching EC2...")
instance.wait_until_running()
instance.reload()

print("🌐 EC2 Public IP:", instance.public_ip_address)

print("🎉 Done!")
