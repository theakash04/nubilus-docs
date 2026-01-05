---
title: "Introduction"
description: "Welcome to Nubilus - an open-source infrastructure monitoring platform"
order: 0
---

# Introduction to Nubilus

Welcome to **Nubilus** — an open-source, self-hosted infrastructure monitoring platform designed to give you complete visibility into your servers, endpoints, and databases in real-time.

## What is Nubilus?

Nubilus is a comprehensive monitoring solution that empowers developers and DevOps teams to track the health and performance of their entire infrastructure from a single dashboard. Whether you're managing a handful of servers or orchestrating a complex microservices architecture, Nubilus provides the tools you need to stay informed and respond proactively to issues.

### The Name

_Nubilus_ (Latin for "cloudy" or "overcast") reflects the platform's ability to provide clarity and visibility even when your infrastructure landscape seems complex or obscured.

## Why Nubilus?

| Challenge                    | How Nubilus Helps                                       |
| ---------------------------- | ------------------------------------------------------- |
| **Scattered Monitoring**     | Unified dashboard for servers, endpoints, and databases |
| **Expensive SaaS Solutions** | 100% open-source and self-hosted — no vendor lock-in    |
| **Complex Setup**            | Simple one-line agent installation                      |
| **Limited Visibility**       | Real-time metrics with historical trends                |
| **Delayed Alerts**           | Threshold-based alerting with webhook notifications     |

## Architecture Overview

Nubilus follows a modern three-tier architecture:

```mermaid
graph TB
    subgraph Servers["Your Infrastructure"]
        S1["Server 1<br/>Agent"]
        S2["Server 2<br/>Agent"]
        SN["Server N<br/>Agent"]
    end

    subgraph Backend["Nubilus Backend"]
        API["REST API<br/>(Express + TypeScript)"]
        QUEUE["Job Queue<br/>(BullMQ)"]
        DB[(TimescaleDB)]
        CACHE[(Redis)]
    end

    subgraph Frontend["Dashboard"]
        UI["React App<br/>(Vite + TanStack)"]
    end

    S1 & S2 & SN -->|Metrics & Heartbeats| API
    API --> DB
    API --> QUEUE
    QUEUE --> CACHE
    UI -->|API Requests| API

    style Servers fill:#1e3a5f,color:#fff
    style Backend fill:#1e3a1f,color:#fff
    style Frontend fill:#3a1e5f,color:#fff
```

### Component Summary

| Component    | Purpose                        | Technology                   |
| ------------ | ------------------------------ | ---------------------------- |
| **Agent**    | Collects server metrics        | Rust, tokio, sysinfo         |
| **Backend**  | API, data processing, alerting | Node.js, Express, TypeScript |
| **Frontend** | Visualization dashboard        | React 19, Vite, TanStack     |
| **Database** | Time-series metrics storage    | TimescaleDB (PostgreSQL)     |
| **Queue**    | Background jobs & caching      | Redis + BullMQ               |

## Key Features

### Server Monitoring

Monitor your servers with the lightweight Rust agent:

- **CPU** — Usage percentage, core count, load averages (1m, 5m, 15m)
- **Memory** — Total, used, available with utilization percentage
- **Disk** — Space usage, read/write I/O bytes
- **Network** — Bytes transmitted and received
- **Heartbeat** — Real-time online/offline detection

<!-- coming-soon -->

### Endpoint Monitoring

Keep your services healthy:

- **HTTP/HTTPS Checks** — Automated health checks at configurable intervals
- **Response Times** — Track latency and identify slow endpoints
- **Uptime Tracking** — Historical availability percentages
- **Custom Validation** — Verify expected status codes

### Database Monitoring

Stay connected to your data:

- **Multi-Database Support** — PostgreSQL, MySQL, MongoDB, Redis, MariaDB
- **Connection Health** — Continuous connectivity monitoring
- **Configurable Intervals** — Adjust check frequency per database

### Alerting System

Never miss a critical issue:

```mermaid
graph LR
    subgraph Rules["Alert Rules"]
        R1["high_cpu"]
        R2["high_memory"]
        R3["disk_full"]
        R4["endpoint_down"]
        R5["database_down"]
    end

    subgraph Actions["Notifications"]
        W["Webhook<br/>(Slack, Discord)"]
        E["Email<br/>(Coming Soon)"]
    end

    R1 & R2 & R3 & R4 & R5 --> W
    R1 & R2 & R3 & R4 & R5 -.-> E

    style Rules fill:#7c3aed,color:#fff
    style Actions fill:#059669,color:#fff
```

<!-- /coming-soon -->

### Multi-Tenancy

Built for teams:

- **Organizations** — Logical grouping for teams and projects
- **API Keys** — Secure, revocable agent authentication
- **Team Invitations** — Invite members via email
- **Permission Management** — Control access within organizations

---

## Tech Stack

```mermaid
graph LR
    subgraph Agent["Agent (Rust)"]
        A1["tokio"]
        A2["sysinfo"]
        A3["reqwest"]
    end

    subgraph Backend["Backend (Node.js)"]
        B1["Express"]
        B2["TypeScript"]
        B3["BullMQ"]
        B4["postgres"]
    end

    subgraph Frontend["Frontend (React)"]
        F1["Vite"]
        F2["TanStack Router"]
        F3["TanStack Query"]
        F4["Recharts"]
        F5["Tailwind CSS"]
    end

    subgraph Infra["Infrastructure"]
        I1[(TimescaleDB)]
        I2[(Redis)]
        I3["Docker"]
    end

    style Agent fill:#dea584,color:#000
    style Backend fill:#68a063,color:#fff
    style Frontend fill:#61dafb,color:#000
    style Infra fill:#336791,color:#fff
```

---

## Use Cases

| Scenario               | Description                                            |
| ---------------------- | ------------------------------------------------------ |
| **Startup Monitoring** | Self-hosted alternative to expensive SaaS tools        |
| **Homelab**            | Monitor personal servers, NAS, and Raspberry Pis       |
| **DevOps Teams**       | Centralized infrastructure visibility for your team    |
| **Multi-Cloud**        | Unified monitoring across AWS, GCP, Azure, and on-prem |
| **Compliance**         | Keep monitoring data within your own infrastructure    |

---

## Security

Nubilus is designed with security in mind:

- **JWT Authentication** — Secure token-based auth with refresh tokens
- **Password Hashing** — bcrypt-based secure storage
- **API Key Auth** — Revocable keys for agent authentication
- **TLS Support** — Encrypted agent-to-backend communication
- **Cookie Security** — HTTP-only cookies with secure flags

## Contributing

We welcome contributions! Whether it's:

- Bug reports and fixes
- New features
- Documentation improvements
- Test coverage

Please feel free to open issues and submit pull requests on [GitHub](https://github.com/theakash04/Nubilus).

## License

Nubilus is released under the **MIT License**.