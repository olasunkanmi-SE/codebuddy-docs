---
title: Kubernetes
description: Manage Kubernetes clusters, pods, deployments, and services via kubectl.
---

|              |                                                            |
| ------------ | ---------------------------------------------------------- |
| **Category** | Cloud                                                      |
| **CLI**      | [`kubectl`](https://kubernetes.io/docs/reference/kubectl/) |
| **Auth**     | None (uses kubeconfig)                                     |
| **Config**   | `KUBECONFIG` (optional)                                    |

## What it does

Wraps `kubectl` to give CodeBuddy access to your Kubernetes clusters. The agent can inspect workloads, view logs, apply manifests, scale deployments, and debug failing pods.

## Prerequisites

Install kubectl:

```bash
# macOS
brew install kubectl

# Linux
curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl

# Windows
winget install Kubernetes.kubectl
```

Verify cluster access:

```bash
kubectl config current-context
kubectl get nodes
```

The skill uses your active kubeconfig context. Set `KUBECONFIG` to use a specific config file.

## Capabilities

- **Pods** — list, describe, logs, exec, port-forward
- **Deployments** — list, scale, rollout status, restart
- **Services** — list, describe, endpoints
- **Manifests** — apply, delete, diff
- **Debugging** — events, describe, top (resource usage)
- **Namespaces** — switch, list, create

## Example prompts

- "Show all pods in the production namespace that aren't ready"
- "Get the logs from the auth-service pod for the last 30 minutes"
- "Scale the web-frontend deployment to 5 replicas"
- "What events happened in the default namespace in the last hour?"
