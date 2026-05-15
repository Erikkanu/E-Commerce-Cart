# E-Commerce Cart

A full-stack e-commerce shopping cart application built with **Angular 21**, **.NET 9**, and **MS SQL Server** — fully containerised and launched with a single command.

---

## Tech Stack

| Layer     | Technology                              |
|-----------|-----------------------------------------|
| Frontend  | Angular 21 (served via nginx)           |
| Backend   | .NET 9 Web API (Minimal APIs, ADO.NET)  |
| Database  | MS SQL Server 2022                      |
| Container | Docker + Docker Compose                 |

---

## Prerequisites

You only need Docker installed on your machine:

- **Docker Desktop** `v4.73.0` or later
  → Download: https://www.docker.com/products/docker-desktop

> Docker handles everything else — Node.js, npm, the .NET SDK, SQL Server, and all dependencies are installed automatically inside the containers.

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Start the application

Open a terminal (PowerShell on Windows, or any shell on macOS/Linux) in the root of the project and run:

```bash
docker compose up --build
```

This single command will:

1. Pull all required Docker images (first run only — may take a few minutes)
2. Build the .NET 9 backend and Angular frontend
3. Start SQL Server and initialize the database schema and seed data
4. Start the backend API and frontend, waiting for each dependency to be healthy

> **First run note:** Docker needs to download the base images (SQL Server, .NET SDK, Node, nginx). This can take 3–5 minutes depending on your internet connection. Subsequent runs are much faster.

### 3. Open the app

Once you see the containers running and no errors in the terminal, open your browser and go to:

```
http://localhost:4200
```

The backend API is available at:

```
http://localhost:5124
```

---

## Stopping the Application

To stop all running containers, press `Ctrl + C` in the terminal where Docker Compose is running, or run:

```bash
docker compose down
```

To also remove the database volume (this will **delete all data**):

```bash
docker compose down -v
```
