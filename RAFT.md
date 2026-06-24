Raft Consensus Implementation

Overview

This project contains a simplified yet production-inspired implementation of the Raft Consensus Algorithm written in Node.js.

The goal of this implementation is to understand how distributed systems maintain consistency, elect leaders, replicate logs, recover from failures, and keep replicated state machines synchronized.

This implementation is designed as the distributed coordination layer for a Distributed Rate Limiter project.

---

What is Raft?

Raft is a distributed consensus algorithm used to ensure that multiple servers agree on the same sequence of operations even when some nodes fail.

Instead of every node making independent decisions, one node becomes the Leader while the remaining nodes become Followers.

All client write requests are handled by the Leader and replicated to Followers.

---

Project Structure

src/
└── distributed/
    ├── raftNode.js
    ├── raftCluster.js
    ├── raftLog.js
    ├── raftTimer.js
    ├── raftPersistence.js
    ├── raftSnapshot.js
    ├── appendEntriesRpc.js
    ├── stateMachine.js
    ├── ...

---

Components

RaftNode

Represents a single node in the cluster.

Responsibilities:

- Maintain node state
- Participate in elections
- Receive heartbeats
- Replicate logs
- Apply committed entries
- Persist state
- Recover after restart

---

RaftCluster

Represents the complete cluster.

Responsibilities:

- Start elections
- Count votes
- Manage leaders
- Simulate failures
- Replicate logs
- Simulate network partitions

---

RaftLog

Stores replicated log entries.

Each log entry contains:

- Term
- Command

Example:

Term 1

SET city Delhi

---

AppendEntries RPC

Used by the Leader to:

- Replicate logs
- Send heartbeats
- Verify log consistency

Followers validate:

- Leader term
- Previous log index
- Previous log term

before accepting new entries.

---

State Machine

Represents the actual application state.

Committed log entries are applied here.

Example:

SET city Delhi

↓

city = Delhi

---

Election Timer

Each follower starts a randomized timer.

If the timer expires without receiving heartbeats:

- Become Candidate
- Start election

Randomized timeout helps avoid split elections.

---

Persistence

Each node persists:

- Current term
- VotedFor
- Log entries

After restart the node restores its previous state.

---

Snapshot

Committed entries are periodically converted into snapshots.

Benefits:

- Smaller log
- Faster recovery
- Lower memory usage

---

Features Implemented

- Leader Election
- Randomized Election Timeout
- Request Vote
- Heartbeats
- AppendEntries RPC
- Log Replication
- Commit Index
- State Machine
- Persistent Storage
- Snapshotting
- Log Compaction
- Leader Failure
- Re-election
- Quorum Based Voting
- Network Partition Simulation
- Network Recovery
- Log Repair using nextIndex
- Cluster Demonstration

---

Tests

The project contains dedicated test files for individual Raft components.

Examples include:

- Leader Election
- Heartbeats
- Failover
- Log Replication
- Commit
- Persistence
- Snapshot
- Quorum
- Network Partition
- Log Repair

A complete demonstration is available in:

raftDemoTest.js

---

Raft Workflow

Cluster Starts
        │
        ▼
Leader Election
        │
        ▼
Heartbeats
        │
        ▼
Client Request
        │
        ▼
Log Replication
        │
        ▼
Commit
        │
        ▼
State Machine
        │
        ▼
Snapshot
        │
        ▼
Leader Failure
        │
        ▼
Re-election
        │
        ▼
Cluster Recovery

---

Future Improvements

Possible production enhancements include:

- Dynamic Cluster Membership
- Joint Consensus
- InstallSnapshot RPC
- Read Index
- Leadership Transfer
- Log Streaming
- Performance Optimizations

These features were intentionally omitted because the objective of this project is to build a robust foundation for a Distributed Rate Limiter rather than a full production Raft implementation.

---

Conclusion

This implementation demonstrates the fundamental concepts of distributed consensus including leader election, fault tolerance, replicated logs, persistence, snapshots, quorum-based decisions, and recovery after failures.

It serves as the coordination layer for the next phase of the project: a Distributed Rate Limiter with multiple rate limiting algorithms, distributed state management, and a real-time monitoring dashboard.