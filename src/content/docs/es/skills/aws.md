---
title: AWS
description: Manage AWS cloud infrastructure — EC2, S3, Lambda, CloudWatch, IAM, and more.
---

|              |                                                |
| ------------ | ---------------------------------------------- |
| **Category** | Cloud                                          |
| **CLI**      | [`aws`](https://aws.amazon.com/cli/)           |
| **Auth**     | API key (`aws configure`)                      |
| **Config**   | `AWS_DEFAULT_REGION`, `AWS_PROFILE` (optional) |

## What it does

Wraps the AWS CLI to give CodeBuddy access to your AWS infrastructure. The agent can manage EC2 instances, query CloudWatch, work with S3 buckets, deploy Lambda functions, and manage IAM — all through natural language.

## Prerequisites

Install the AWS CLI and configure credentials:

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip && sudo ./aws/install

# Windows
winget install Amazon.AWSCLI
```

Then configure:

```bash
aws configure
```

Or set environment variables:

```bash
export AWS_ACCESS_KEY_ID="your-key"
export AWS_SECRET_ACCESS_KEY="your-secret"
export AWS_DEFAULT_REGION="us-east-1"
```

## Capabilities

- **EC2** — list, start, stop, describe instances
- **S3** — list buckets, upload/download objects, manage lifecycle
- **Lambda** — deploy, invoke, view logs
- **CloudWatch** — query logs, metrics, set alarms
- **IAM** — manage roles, policies, users
- **ECS/EKS** — describe services, tasks, clusters
- **General** — any `aws` CLI command the agent deems appropriate

## Example prompts

- "Show all running EC2 instances in us-east-1"
- "Check CloudWatch logs for the auth-service Lambda for errors in the last hour"
- "Upload `dist/bundle.js` to the `my-app-assets` S3 bucket"
- "List all IAM roles with admin access"
