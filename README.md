| |
| :-: |
| *WORK IN PROGRESS* |

# Miadok Chaladok

This repository hosts a Full-Stack Web Application built with React.js, Golang, and PostgreSQL. The goal of the project is to gain knowledge in React (using Typescript, architecture based on Feature-Sliced Design), Golang libraries (Gin, Gorm), Redis [in future], Postres database and Docker.

## Contents

- [Docker Compose Configuration](#docker-compose-configuration)
- [Getting Started](#getting-started)
- [My Gratitude](#my-gratitude)

## Docker Compose Configuration

The `docker-compose.yml` file defines three Docker services:

### 1. `db` (configuration defined in `db.Dockerfile`)

- Utilizes PostgreSQL Docker image.
- Exposes port 5432 for access between containers (especially for `api`) and 3306 from outside.

### 2. `api` (configuration defined in `api.Dockerfile`)

- Dockerizes the Golang backend application.
- Exposes port 8080 for accessing between containers (especially for `web`).
- Links to the `db` service for database connectivity.
- Builds application and hosts it inside Alpine Linux container for container size minimizing.

### 3. `web` (configuration defined in `web.Dockerfile`)

- Dockerizes the React.js frontend application.
- Mounts the application code and node_modules for development.
- Exposes port 80 for accessing the application.
- Links to the `api` service for server connectivity.
- Builds application and hosts it on Nginx server.

## Getting Started

To set up and run the Miadok Chaladok application:

1. Ensure Docker and Docker Compose are installed on your system.
2. Clone this repository to your local machine.
3. Navigate to the project directory.
    ```bash
    cd MiadokChaladok-Go
    ```
4. Build and start the application using Docker Compose.
    ```bash
    docker-compose up --build
    ```
5. Access the application in your web browser at `http://localhost:80` or just `http://localhost`.
6. To shut down the application and clean up Docker resources when you're done:

- Press `Ctrl+C` in the terminal where Docker Compose is running to stop the containers.
- To remove the stopped containers, networks, and volumes associated with this project, run:
    ```bash
    docker-compose down
    ```
- Additionally, you can remove any unused Docker resources (dangling images, containers, and networks) by running:
    ```bash
    docker system prune -a
    ```
- These commands will help you shut down the application and free up any unused Docker resources.

## My Gratitude

Idea of web application and design layouts made by **@butercupa**.