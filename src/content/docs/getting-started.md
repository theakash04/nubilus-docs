---
title: "Getting started"
description: "Welcome to Nubilus - an open-source infrastructure monitoring platform"
order: 1
---

# Getting Started with Nubilus

This guide walks you through setting up your first monitors after installing Nubilus.

## Overview

By the end of this guide, you will have:

1. Created your first organization
2. Generated an API key
3. Installed an agent on a server
4. Set up endpoint monitoring
5. Configured alert rules
6. Connected a database for monitoring

## Step 1: Login & Create Organization

### Login to the Dashboard

Navigate to your Nubilus dashboard (default: `http://localhost:3003`) and sign in with your credentials.

> [!NOTE]
> You need to run `npm run db:seed` to seed the first user by writing it's credentials in .env
>
> - **Email:** `admin@example.com`
> - **Password:** `admin123`

### Create an Organization

Organizations are the top-level container for all your monitoring resources.

```mermaid
graph TD
    ORG[Organization]
    ORG --> SERVERS[Servers]
    ORG --> ENDPOINTS[Endpoints]
    ORG --> DATABASES[Databases]
    ORG --> ALERTS[Alert Rules]
    ORG --> KEYS[API Keys]
    ORG --> MEMBERS[Team Members]

    style ORG fill:#6366f1,color:#fff
    style SERVERS fill:#22c55e,color:#fff
    style ENDPOINTS fill:#3b82f6,color:#fff
    style DATABASES fill:#f59e0b,color:#000
    style ALERTS fill:#ef4444,color:#fff
    style KEYS fill:#8b5cf6,color:#fff
    style MEMBERS fill:#ec4899,color:#fff
```

1. Click **"Create Organization"** from the dashboard
2. Enter a name (e.g., "Production", "My Homelab", "Company Name")
3. Click **Create**

## Step 2: Generate an API Key

API keys authenticate your monitoring agents with the Nubilus backend.

### Create a New Key

1. Navigate to **Settings** → **API Keys**
2. Click **"Create API Key"**
3. Enter a descriptive name (e.g., "Production Servers", "Web Cluster")
4. Click **Create**

> [!CAUTION]
> **Copy your API key immediately!** The full key is only shown once. You'll see something like:
>
> ```
> nub_abc123def456ghi789jkl012mno345pqr678stu901vwx234
> ```

### API Key Security

```mermaid
flowchart LR
    KEY["API Key<br/>nub_xxxxx..."]
    AGENT1["Server 1 Agent"]
    AGENT2["Server 2 Agent"]
    AGENT3["Server N Agent"]
    API["Nubilus API"]

    KEY --> AGENT1
    KEY --> AGENT2
    KEY --> AGENT3
    AGENT1 -->|X-API-Key Header| API
    AGENT2 -->|X-API-Key Header| API
    AGENT3 -->|X-API-Key Header| API

    style KEY fill:#8b5cf6,color:#fff
    style API fill:#68a063,color:#fff
```

- One API key can be used by multiple agents
- Revoke keys immediately if compromised
- Use descriptive names for easy management

## Step 3: Install Your First Agent

### Quick Installation

SSH into the server you want to monitor and run:

#### Linux / macOS

```bash
# Download and install
curl -sSL https://github.com/theakash04/Nubilus/releases/latest/download/install.sh | sudo bash

# Configure with your API key
nubilus-agent configure --api-url "backend_url/api/v1" --api-key "nub_your_api_key_here"

# register your agent
nubilus-agent run

# Start the agent
sudo systemctl enable --now nubilus-agent
```

#### Windows (PowerShell as Administrator)

```powershell
# Download and install
irm https://github.com/theakash04/Nubilus/releases/latest/download/install.ps1 | iex

# Configure with your API key
nubilus-agent.exe configure --api-url "backend_url/api/v1" --api-key "nub_your_api_key_here"

# Register your agent
nubilus-agent.exe run

# Start the service
sc.exe start nubilus-agent
```

### Verify Connection

```bash
# Test the connection
nubilus-agent test
```

Expected output:

```bash
✓ Connected to Nubilus API
✓ API key is valid
✓ Server registered successfully
```

### View in Dashboard

Return to your dashboard — your server should appear in the **Servers** section within 15 seconds!

### Understanding Server Metrics

```mermaid
graph LR
    subgraph Agent["Agent Collects"]
        CPU[CPU Usage]
        MEM[Memory]
        DISK[Disk I/O]
        NET[Network]
    end

    subgraph Metrics["Metrics Stored"]
        CPU_M["cpu_usage: 45.5%<br/>cpu_count: 8<br/>load_avg: 1.2, 1.0, 0.8"]
        MEM_M["memory_usage: 65%<br/>total: 16GB<br/>available: 5.6GB"]
        DISK_M["disk_usage: 42%<br/>read_bytes: 1.2GB<br/>write_bytes: 987MB"]
        NET_M["network_in: 5GB<br/>network_out: 3GB"]
    end

    CPU --> CPU_M
    MEM --> MEM_M
    DISK --> DISK_M
    NET --> NET_M
```

## Step 4: Set Up Endpoint Monitoring

Monitor your APIs, websites, and services with HTTP health checks.

### Create an Endpoint

1. Navigate to **Endpoints** in your dashboard
2. Click **"Add Endpoint"**
3. Fill in the details:

```yaml
Name: Production API Health
URL: https://api.example.com/health
Method: GET
Check Interval: 60 seconds
Timeout: 10 seconds
Expected Status: 200
Tags: api, production, critical
```

4. Click **Create**

### Endpoint Monitoring Flow

```mermaid
sequenceDiagram
    participant Scheduler as Nubilus Scheduler
    participant Target as Your Endpoint
    participant DB as Database

    loop Every Check Interval
        Scheduler->>Target: HTTP GET /health
        alt Success
            Target-->>Scheduler: 200 OK (125ms)
            Scheduler->>DB: Store: is_up=true, response_time=125ms
        else Failure
            Target--xScheduler: Timeout / 5xx Error
            Scheduler->>DB: Store: is_up=false, error_message="..."
            Scheduler->>Scheduler: Trigger Alert Check
        end
    end
```

### Monitor Multiple Endpoints

| Endpoint     | URL                                | Check Interval |
| ------------ | ---------------------------------- | -------------- |
| API Health   | `https://api.example.com/health`   | 60s            |
| Website      | `https://www.example.com`          | 120s           |
| Auth Service | `https://auth.example.com/ping`    | 30s            |
| CDN Check    | `https://cdn.example.com/test.png` | 300s           |

## Step 5: Add Database Monitoring

Keep your databases healthy with connection monitoring.

### Supported Databases

```mermaid
graph LR
    subgraph Supported["Supported Databases"]
        PG[(PostgreSQL)]
        MY[(MySQL)]
        MO[(MongoDB)]
        RD[(Redis)]
        MA[(MariaDB)]
    end

    style PG fill:#336791,color:#fff
    style MY fill:#00758f,color:#fff
    style MO fill:#4db33d,color:#fff
    style RD fill:#dc382d,color:#fff
    style MA fill:#003545,color:#fff
```

### Add a Database Target

1. Navigate to **Databases** in your dashboard
2. Click **"Add Database"**
3. Configure the connection:

#### PostgreSQL Example

```yaml
Name: Production PostgreSQL
Type: postgres
Connection URL: postgresql://user:password@host:5432/database
Check Interval: 60 seconds
Timeout: 10 seconds
```

#### Redis Example

```yaml
Name: Cache Redis
Type: redis
Connection URL: redis://:password@host:6379
Check Interval: 30 seconds
Timeout: 5 seconds
```

#### MongoDB Example

```yaml
Name: Analytics MongoDB
Type: mongo
Connection URL: mongodb://user:password@host:27017/database
Check Interval: 60 seconds
Timeout: 10 seconds
```

> [!WARNING]
> **Security Best Practice:** Create a read-only database user for monitoring purposes. Avoid using admin credentials.

## Step 6: Configure Alert Rules

Set up alerts to be notified when things go wrong.

### Alert Types

```mermaid
graph TD
    subgraph Rules["Alert Rule Types"]
        ED["endpoint_down<br/>Endpoint unreachable"]
        HC["high_cpu<br/>CPU threshold exceeded"]
        HM["high_memory<br/>Memory threshold exceeded"]
        DF["disk_full<br/>Disk space critical"]
        HL["high_load<br/>Load average high"]
        DD["database_down<br/>Database unreachable"]
    end

    style ED fill:#ef4444,color:#fff
    style HC fill:#f97316,color:#fff
    style HM fill:#eab308,color:#000
    style DF fill:#8b5cf6,color:#fff
    style HL fill:#ec4899,color:#fff
    style DD fill:#06b6d4,color:#fff
```

### Create an Alert Rule

1. Navigate to **Alerts** → **Rules**
2. Click **"Create Alert Rule"**
3. Configure the rule:

#### Example: High CPU Alert

```yaml
Name: High CPU Warning
Description: Alert when CPU usage exceeds 80%
Rule Type: high_cpu
Target Type: server
Target: Select your server
Threshold Value: 80
Comparison: ">"
Duration: 300 seconds
Notify via Webhook: true
```

#### Example: Endpoint Down Alert

```yaml
Name: API Down Critical
Description: Alert when production API is unreachable
Rule Type: endpoint_down
Target Type: endpoint
Target: Production API Health
Notify via Webhook: true
```

### Alert Lifecycle

```mermaid
stateDiagram-v2
    [*] --> Open: Threshold Breached
    Open --> Acknowledged: User Acknowledges
    Open --> Resolved: Condition Clears
    Acknowledged --> Resolved: Condition Clears
    Acknowledged --> Resolved: User Resolves
    Resolved --> [*]

    Open: Open
    Acknowledged: Acknowledged
    Resolved: Resolved
```

## Checklist

You've completed the getting started guide! Here's what you've accomplished:

- [x] Created an organization
- [x] Generated an API key
- [x] Installed the agent on a server
- [x] Set up endpoint monitoring
- [x] Added database monitoring
- [x] Configured alert rules

## Next Steps

### Expand Your Monitoring

- **Add more servers** — Install the agent on additional machines

### Invite Your Team

1. Go to **Members**
2. Click **"Invite Member"**
3. Enter their name, email address and permissions
4. They'll receive an invitation to join your organization

**Happy Monitoring!**

Questions? [Open an issue](https://github.com/theakash04/Nubilus/issues) on GitHub.
