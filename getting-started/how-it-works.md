# How It Works

This page explains the internal architecture and streaming mechanism of FSB, giving you a clear picture of what happens under the hood.

## Architecture

FSB acts as a bridge between Telegram's cloud file storage and standard HTTP clients. There are three main actors:

```
┌──────────┐         ┌──────────────┐         ┌──────────────┐
│  User /  │  HTTP   │              │  MTProto │   Telegram   │
│  Browser │◄───────►│  FSB Server  │◄────────►│     API      │
│          │         │   (Go)       │          │              │
└──────────┘         └──────┬───────┘          └──────┬───────┘
                            │                         │
                            │  Bot API                │
                            │                         │
                       ┌────▼─────────────────────────▼──┐
                       │       Log Channel (Private)      │
                       │  msg#1: photo  msg#2: video ...  │
                       └──────────────────────────────────┘
```

- **FSB Server** — A lightweight Go binary that runs an HTTP server and connects to Telegram via the MTProto protocol.
- **Log Channel** — A private Telegram channel where every file is indexed. Each file maps to a message ID in this channel.
- **Telegram API** — The upstream source for all file data. FSB downloads file blocks on demand and proxies them to HTTP clients.

## Core Concepts

### No Database Required

FSB is stateless by design. It does not use any external database. Instead, it relies on Telegram itself as the storage backend:

- When a user sends a file to the bot, FSB forwards it to the **Log Channel**.
- The **message ID** in the log channel becomes the unique file reference.
- The message ID is encoded into the streaming URL — no lookup table needed.

### Hash-based URLs

FSB generates URLs in this format:

```
https://your-host.com/<messageID>?hash=<hash>
```

The hash serves as a lightweight access token:

- Prevents unauthorized users from guessing valid URLs by incrementing message IDs.
- Length is configurable via the `HASH_LENGTH` variable (default: 6, range: 5–32).
- Longer hashes provide stronger protection against brute-force enumeration.

### Single Binary, Zero Dependencies

FSB compiles to a single Go binary with no runtime dependencies — no databases, no Redis, no external services. Just the binary and your environment variables.

## The Streaming Flow

Here is what happens step by step when a file is streamed through FSB:

### Step 1 — User Sends a File

A user sends (or forwards) any file to the FSB Telegram bot — video, audio, document, photo, or any other file type that Telegram supports.

### Step 2 — Bot Indexes the File

The bot automatically forwards the file to the configured **Log Channel**. This creates a message with a unique ID that serves as the permanent file reference.

### Step 3 — Bot Returns a Link

The bot replies to the user with a direct HTTP link containing the message ID and a generated hash:

```
https://your-host.com/12345?hash=a1b2c3
```

### Step 4 — Client Requests the Stream

When someone opens the link in a browser, video player, or download manager, an HTTP request hits the FSB server.

### Step 5 — Validation and Resolution

FSB validates the hash against the message ID. If valid, it resolves the message in the log channel to get the file reference and metadata (size, mime type, filename).

### Step 6 — Parallel Block Downloads

FSB requests the file from Telegram in blocks. This is where the performance tuning happens:

```
                    Telegram API
                    ┌──────────┐
            ┌──────►│ Block 1  │──────┐
            │       ├──────────┤      │
            ├──────►│ Block 2  │──────┤
FSB Server ─┤       ├──────────┤      ├──► Prefetch Buffer ──► HTTP Response
            ├──────►│ Block 3  │──────┤
            │       ├──────────┤      │
            └──────►│ Block 4  │──────┘
                    └──────────┘
              (STREAM_CONCURRENCY = 4)
```

- **`STREAM_CONCURRENCY`** controls how many blocks are downloaded in parallel (default: 4).
- **Block sizes** are dynamic based on file size: 64 KB, 256 KB, 512 KB, or 1 MB.
- Multiple blocks are fetched simultaneously to maximize throughput.

### Step 7 — Buffering

Downloaded blocks are held in a memory buffer before being sent to the client:

- **`STREAM_BUFFER_COUNT`** controls how many blocks are prefetched ahead (default: 8).
- This smooths out playback on unstable connections by keeping data ready.
- Memory usage per stream: approximately `STREAM_BUFFER_COUNT × block_size`.

### Step 8 — HTTP Streaming

Blocks are streamed to the HTTP client as they arrive. FSB supports:

- **Range requests** — Clients can seek to any position in the file (essential for video players).
- **Partial content (HTTP 206)** — Only the requested portion is downloaded from Telegram.
- **Proper headers** — Content-Type, Content-Length, Content-Disposition are set based on the original file metadata.

## Reliability

FSB includes built-in resilience for unreliable network conditions:

| Mechanism | Variable | Default | Purpose |
|---|---|---|---|
| Block timeout | `STREAM_TIMEOUT_SEC` | `30` | Max wait time for a single block download |
| Retry on failure | `STREAM_MAX_RETRIES` | `3` | Retry attempts before the stream fails |

If a block download fails, FSB retries it up to `STREAM_MAX_RETRIES` times before giving up and returning an error to the client.

## Multi-Bot Load Balancing

For higher traffic, FSB distributes stream requests across multiple bot tokens in a **round-robin** fashion:

```
                    ┌─── Bot Token 1 ───► Telegram API
                    │
Stream Request ────►├─── Bot Token 2 ───► Telegram API
  (round-robin)     │
                    └─── Bot Token 3 ───► Telegram API
```

- Each stream uses one bot for the duration of the request.
- Distributes API pressure to avoid Telegram's per-bot rate limits (`FLOOD_WAIT`).
- Supports up to **50 worker bots**.

See the [Multi-Bot Setup](/advanced/multi-bot) guide for configuration details.

## Security Model

FSB provides several layers of access control:

- **Hash validation** — Every streaming URL includes a hash that must match the message ID. Without the correct hash, the request is rejected.
- **User allowlist** — The `ALLOWED_USERS` variable restricts who can interact with the bot and generate links (comma-separated Telegram user IDs).
- **No data storage** — FSB never stores file content on disk. It acts as a pure streaming proxy — data flows directly from Telegram to the client.

## Summary

| Aspect | How FSB Handles It |
|---|---|
| File storage | Telegram cloud (via Log Channel) |
| File reference | Message ID in the log channel |
| URL security | Hash-based tokens |
| Download method | Parallel block downloads |
| Buffering | In-memory prefetch buffer |
| HTTP features | Range requests, partial content |
| Scaling | Multi-bot round-robin distribution |
| Dependencies | None — single Go binary |
