---
title: "Database Monitoring"
description: "Monitor the health and performance of your databases"
order: 4
---

# Database Monitoring

Nubilus provides comprehensive database monitoring with support for multiple database types. Monitor connectivity, performance metrics, and receive alerts when your databases become unreachable.

## Supported Databases

```mermaid
graph LR
    subgraph Supported["Supported Database Types"]
        PG[(PostgreSQL)]
        MY[(MySQL)]
        MA[(MariaDB)]
        MO[(MongoDB)]
        RD[(Redis)]
        MS[(MSSQL)]
    end

    style PG fill:#336791,color:#fff
    style MY fill:#00758f,color:#fff
    style MA fill:#003545,color:#fff
    style MO fill:#4db33d,color:#fff
    style RD fill:#dc382d,color:#fff
    style MS fill:#cc2927,color:#fff
```

| Database       | Type         | Connection Format                               |
| -------------- | ------------ | ----------------------------------------------- |
| **PostgreSQL** | `postgresql` | `postgresql://user:password@host:5432/database` |
| **MySQL**      | `mysql`      | `mysql://user:password@host:3306/database`      |
| **MariaDB**    | `mariadb`    | `mysql://user:password@host:3306/database`      |
| **MongoDB**    | `mongodb`    | `mongodb://user:password@host:27017/database`   |
| **Redis**      | `redis`      | `redis://:password@host:6379`                   |
| **MSSQL**      | `mssql`      | `mssql://user:password@host:1433/database`      |

---

## Overview

Nubilus performs actual database connectivity tests using native database drivers rather than simple TCP checks. This ensures accurate health monitoring and provides detailed performance metrics.

```mermaid
graph TB
    subgraph Nubilus["Nubilus Backend"]
        SCHEDULER["BullMQ Scheduler"]
        WORKER["Monitoring Worker"]

        subgraph Drivers["Native Drivers"]
            PG_DRV["pg"]
            MY_DRV["mysql2"]
            MO_DRV["mongodb"]
            RD_DRV["ioredis"]
            MS_DRV["mssql"]
        end

        DB[(TimescaleDB)]
    end

    subgraph Targets["Your Databases"]
        T1[(PostgreSQL)]
        T2[(MySQL)]
        T3[(MongoDB)]
        T4[(Redis)]
        T5[(MSSQL)]
    end

    SCHEDULER --> WORKER
    WORKER --> Drivers
    PG_DRV --> T1
    MY_DRV --> T2
    MO_DRV --> T3
    RD_DRV --> T4
    MS_DRV --> T5
    WORKER --> DB

    style SCHEDULER fill:#6366f1,color:#fff
    style WORKER fill:#22c55e,color:#fff
```

---

## Creating a Database Target

### Via Dashboard

1. Navigate to **Databases** in your organization dashboard
2. Click **"Add Database"**
3. Configure the connection:

#### PostgreSQL Example

```yaml
Name: Production PostgreSQL
Type: postgresql
Connection URL: postgresql://monitor:secret@db.example.com:5432/myapp
Check Interval: 60 seconds
Timeout: 10 seconds
```

#### MySQL Example

```yaml
Name: Analytics MySQL
Type: mysql
Connection URL: mysql://monitor:secret@mysql.example.com:3306/analytics
Check Interval: 60 seconds
Timeout: 10 seconds
```

#### MongoDB Example

```yaml
Name: Document Store
Type: mongodb
Connection URL: mongodb://monitor:secret@mongo.example.com:27017/documents
Check Interval: 60 seconds
Timeout: 10 seconds
```

#### Redis Example

```yaml
Name: Cache Redis
Type: redis
Connection URL: redis://:secretpassword@redis.example.com:6379
Check Interval: 30 seconds
Timeout: 5 seconds
```

#### MSSQL Example

```yaml
Name: Production MSSQL
Type: mssql
Connection URL: mssql://monitor:secret@sqlserver.example.com:1433/myapp
Check Interval: 60 seconds
Timeout: 10 seconds
```

> [!NOTE]
> When you create a database target, Nubilus immediately performs a health check so you can verify the connection. Subsequent checks follow the configured interval.

### Configuration Options

| Field              | Required | Default | Description                                               |
| ------------------ | -------- | ------- | --------------------------------------------------------- |
| **Name**           | Yes      | —       | A descriptive name for the database                       |
| **Type**           | Yes      | —       | Database type: postgresql, mysql, mongodb, redis, mariadb |
| **Connection URL** | Yes      | —       | Full connection string (encrypted at rest)                |
| **Check Interval** | No       | 60      | Seconds between health checks                             |
| **Timeout**        | No       | 10      | Seconds to wait for connection                            |

> [!IMPORTANT]
> **Security Best Practice:** Create a read-only database user specifically for monitoring. Avoid using admin credentials.

---

## Collected Metrics

Nubilus collects detailed metrics from each database type using native database commands.

### PostgreSQL Metrics

| Metric                 | Source               | Description                           |
| ---------------------- | -------------------- | ------------------------------------- |
| **Connection Count**   | `pg_stat_activity`   | Total connections to the database     |
| **Active Connections** | `pg_stat_activity`   | Connections currently running queries |
| **Idle Connections**   | `pg_stat_activity`   | Connections waiting for queries       |
| **Cache Hit Ratio**    | `pg_stat_database`   | Percentage of reads served from cache |
| **Database Size**      | `pg_database_size()` | Total size in bytes                   |
| **Table Count**        | `information_schema` | Number of tables in public schema     |

### MySQL Metrics

| Metric                 | Source               | Description                      |
| ---------------------- | -------------------- | -------------------------------- |
| **Connection Count**   | `Threads_connected`  | Current thread connections       |
| **Slow Queries**       | `Slow_queries`       | Cumulative slow query count      |
| **Queries Per Second** | `Questions / Uptime` | Average query rate               |
| **Database Size**      | `information_schema` | Total data + index size          |
| **Table Count**        | `information_schema` | Number of tables in the database |

### MongoDB Metrics

| Metric                 | Source         | Description           |
| ---------------------- | -------------- | --------------------- |
| **Connection Count**   | `serverStatus` | Current connections   |
| **Active Connections** | `serverStatus` | Active operations     |
| **Queries Per Second** | `opcounters`   | Query operation rate  |
| **Database Size**      | `dbStats`      | Data size in bytes    |
| **Collection Count**   | `dbStats`      | Number of collections |

### Redis Metrics

| Metric                    | Source                      | Description                        |
| ------------------------- | --------------------------- | ---------------------------------- |
| **Connected Clients**     | `INFO clients`              | Current client connections         |
| **Memory Used**           | `used_memory`               | RAM consumed by Redis              |
| **Operations Per Second** | `instantaneous_ops_per_sec` | Current ops/sec rate               |
| **Cache Hit Ratio**       | `keyspace_hits/misses`      | Cache effectiveness percentage     |
| **Key Count**             | `db0:keys=N`                | Number of keys in default database |

### MSSQL Metrics

| Metric                 | Source                           | Description                      |
| ---------------------- | -------------------------------- | -------------------------------- |
| **Connection Count**   | `sys.dm_exec_sessions`           | Total user connections           |
| **Active Connections** | `sys.dm_exec_sessions`           | Connections with running queries |
| **Idle Connections**   | `sys.dm_exec_sessions`           | Connections in sleeping state    |
| **Cache Hit Ratio**    | `sys.dm_os_performance_counters` | Buffer cache effectiveness       |
| **Database Size**      | `sys.database_files`             | Total size in bytes              |
| **Table Count**        | `sys.tables`                     | Number of user tables            |

---

## How Monitoring Works

```mermaid
sequenceDiagram
    participant S as Scheduler
    participant W as Worker
    participant D as Your Database
    participant DB as TimescaleDB (Metrics)

    S->>W: Trigger database check
    W->>D: Connect using native driver

    alt Connection Successful
        D-->>W: Connected
        W->>D: SELECT 1 / PING / ping()
        D-->>W: Query successful
        W->>D: Collect metrics
        D-->>W: Metrics data
        W->>DB: Store: is_healthy=true, metrics...
    else Connection Failed
        D--xW: Connection refused/timeout
        W->>DB: Store: is_healthy=false, error_message
        W->>W: Trigger Alert
    end
```

### Health Check Process

1. **Connection** — Establish connection using native database driver
2. **Ping** — Execute simple query to verify connectivity
3. **Metrics** — Collect database-specific performance metrics
4. **Store** — Save results to TimescaleDB for historical tracking
5. **Alert** — Notify if database is unreachable

---

## Connection URL Security

> [!CAUTION]
> Connection URLs contain sensitive credentials. Nubilus encrypts all connection URLs at rest using AES-256 encryption. The encryption key is derived from your environment's `ENCRYPTION_KEY`.

### Security Features

- **Encryption at Rest** — Connection URLs are encrypted before storage
- **No URL Exposure** — API responses never include the raw connection URL
- **Secure Decryption** — URLs are only decrypted when performing checks

---

## Viewing Database Details

Navigate to any database to see:

### Overview Card

- **Status Badge** — Healthy (green) / Unhealthy (red) / Pending (yellow)
- **Database Type** — Icon indicating PostgreSQL, MySQL, etc.
- **Last Checked** — When the last health check occurred
- **Check Interval** — How often checks are performed

### Latest Metrics

View the most recent collected metrics including:

- Connection statistics
- Cache performance (where applicable)
- Database size
- Table/collection count

### Historical Trends

Query historical metrics with filtering:

```yaml
from: 2024-01-01T00:00:00Z
to: 2024-01-07T23:59:59Z
limit: 100
```

## Database Settings

Configure alerting behavior per database:

| Setting                  | Default | Description                                |
| ------------------------ | ------- | ------------------------------------------ |
| **Alerts Enabled**       | `true`  | Enable/disable alerts for this database    |
| **Alert on Down**        | `true`  | Send alert when database is unreachable    |
| **Consecutive Failures** | 1       | Number of failures before triggering alert |
| **Alert Cooldown**       | —       | Minutes between repeated alerts            |

## API Reference

### List Database Targets

```bash
GET /api/v1/:orgId/databases
```

**Response:**

```json
{
  "success": true,
  "message": "Database targets retrieved",
  "data": {
    "databases": [
      {
        "id": "uuid",
        "name": "Production PostgreSQL",
        "db_type": "postgresql",
        "check_interval": 60,
        "timeout": 10,
        "enabled": true,
        "is_healthy": true,
        "last_checked_at": "2024-01-15T10:30:00Z"
      }
    ]
  }
}
```

### Create Database Target

```bash
POST /api/v1/:orgId/databases
Content-Type: application/json

{
  "name": "My Database",
  "db_type": "postgresql",
  "connection_url": "postgresql://user:pass@host:5432/db",
  "check_interval": 60,
  "timeout": 10
}
```

### Update Database Target

```bash
PUT /api/v1/:orgId/databases/:dbId
Content-Type: application/json

{
  "name": "Updated Name",
  "check_interval": 120,
  "enabled": true
}
```

### Delete Database Target

```bash
DELETE /api/v1/:orgId/databases/:dbId
```

### Get Database Metrics

```bash
GET /api/v1/:orgId/databases/:dbId/metrics?from=2024-01-01&to=2024-01-07&limit=100
```

**Response:**

```json
{
  "success": true,
  "data": {
    "metrics": [
      {
        "time": "2024-01-15T10:30:00Z",
        "is_healthy": true,
        "connection_count": 25,
        "active_connections": 5,
        "idle_connections": 20,
        "cache_hit_ratio": 98.5,
        "db_size_bytes": 1073741824,
        "table_count": 45
      }
    ]
  }
}
```

## Best Practices

### Creating Monitoring Users

#### PostgreSQL

```sql
CREATE USER nubilus_monitor WITH PASSWORD 'secure_password';
GRANT CONNECT ON DATABASE mydb TO nubilus_monitor;
GRANT SELECT ON pg_stat_activity TO nubilus_monitor;
GRANT SELECT ON pg_stat_database TO nubilus_monitor;
```

#### MySQL

```sql
CREATE USER 'nubilus_monitor'@'%' IDENTIFIED BY 'secure_password';
GRANT PROCESS, REPLICATION CLIENT ON *.* TO 'nubilus_monitor'@'%';
GRANT SELECT ON information_schema.* TO 'nubilus_monitor'@'%';
```

#### MongoDB

```javascript
db.createUser({
  user: "nubilus_monitor",
  pwd: "secure_password",
  roles: [
    { role: "clusterMonitor", db: "admin" },
    { role: "read", db: "mydb" },
  ],
});
```

### Choosing Check Intervals

| Database Type        | Recommended Interval |
| -------------------- | -------------------- |
| Production databases | 30-60 seconds        |
| Caching (Redis)      | 30 seconds           |
| Analytics databases  | 60-120 seconds       |
| Development/staging  | 120-300 seconds      |

### Connection String Security

> [!WARNING]
> Never commit connection URLs to version control. Use environment variables or secrets management systems.

## Troubleshooting

### Database Shows as Unhealthy

1. **Verify connection URL** — Check host, port, credentials
2. **Test connectivity** — Ensure Nubilus can reach the database network
3. **Check firewall rules** — Allow connections from Nubilus server
4. **Verify credentials** — Ensure the monitoring user has proper permissions
5. **Review error message** — Check the detailed error in metrics

### Common Errors

| Error                   | Cause                                       | Solution                                      |
| ----------------------- | ------------------------------------------- | --------------------------------------------- |
| `Connection refused`    | Database not listening or firewall blocking | Check firewall and database bind address      |
| `Authentication failed` | Wrong credentials                           | Verify username and password                  |
| `Timeout`               | Network issues or slow database             | Increase timeout or check network             |
| `Permission denied`     | Insufficient privileges                     | Grant required permissions to monitoring user |

### Missing Metrics

Some metrics may be unavailable if:

1. The monitoring user lacks permissions for certain system tables
2. The database version doesn't support specific metrics
3. The database is under heavy load during the check
