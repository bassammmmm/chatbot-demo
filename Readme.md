# Chatbot Demo

This project is a full-stack web application using **Django** for the backend (REST API) and **Next.js** (React) for the frontend. It is designed to run locally in a Docker-based environment, ensuring a consistent and easy development setup.

## Overview

- **Backend (Django)**: Provides the REST API, database models, and core application logic.
- **Frontend (Next.js)**: Delivers a dynamic, component-based client interface consuming the backend API.
- **Database (PostgreSQL)**: Stores persistent data for the backend.
- **Docker & Docker Compose**: Orchestrates services into isolated containers for easy setup and teardown.

## Project Structure

Below is a high-level overview of the project’s structure:
```
.
├─ backend/
├─ frontend/
├─ docker-compose.yml
└─ README.md
```

### Root Directory Files

- **docker-compose.yml**: Defines the Docker services (backend, frontend, database), their build process, and network configuration.
- **README.md**: This documentation file.

---

### Backend Directory

**Path**: `backend/`

The backend directory hosts the Django project, including its REST API and related server-side logic.

```
backend/
├─ api/
├─ config/
├─ static/
├─ docker_init.sh
├─ Dockerfile
├─ manage.py
└─ requirements.txt
```

- **api/**: Contains Django REST Framework views, serializers, URLs, and logic that expose the endpoints consumed by the frontend.
- **config/**: Holds global Django configuration files:
  - `settings.py`: Defines installed apps, middleware, database settings, etc.
  - `urls.py`: Manages URL routing for the backend.
- **docker_init.sh**: A shell script for initialization tasks when the Docker container starts (e.g., migrations, collecting static files).
- **Dockerfile**: Instructions for building the backend Docker image, installing dependencies, setting the working directory, and running the server.
- **manage.py**: Django's CLI for running commands like `migrate`, `createsuperuser`, and `runserver`.
- **requirements.txt**: Lists Python dependencies to be installed in the backend container.

---

### Frontend Directory

**Path**: `frontend/`

The frontend directory contains the Next.js project.

```
frontend/
├─ public/
├─ src/
│  ├─ app/
│  ├─ components/
│  │  ├─ Common/
│  │  ├─ Conversation/
│  │  └─ Main/
│  ├─ services/
│  │  └─ requests/
│  ├─ store/
│  │  └─ conversation/
│  ├─ types/
│  ├─ apiClient.ts
│  └─ … other config files
├─ Dockerfile
├─ package.json
├─ tsconfig.json
└─ … other frontend config files (e.g., tailwind.config.ts)
```

- **public/**: Static public assets directly served by Next.js (images, favicons, etc.).
- **src/**:
  - **app/**: Next.js routing and layout structure (Next.js 13+ app directory).
  - **components/**:
    - **Common/**: Generic UI components (e.g., buttons, loaders, dialogs).
    - **Conversation/**: Chat-related components (chat window, message displays, input fields).
    - **Main/**: Layout components (navigation bars, sidebars).
  - **services/**:
    - **requests/**: Modules for making API calls to the backend (e.g., `conversationApi.ts`, `messageApi.ts`).
  - **store/**:
    - **conversation/**: State management for conversation-related data.
  - **types/**: TypeScript interfaces and type definitions (`commonTypes.ts`, `conversationTypes.ts`, `messageTypes.ts`).
  - **apiClient.ts**: API configuration (base URL, interceptors, headers).
- **Dockerfile**: Instructions for building the frontend Docker image, installing Node.js dependencies, and running the Next.js app.

---

## Getting Started

### Requirements

- [Docker](https://www.docker.com) and [Docker Compose](https://docs.docker.com/compose/) installed.
- For Docker engine v27.3.1 and later, you can use `docker compose` (without the hyphen).
- For older Docker versions, use `docker-compose`.

### Running the Project

**Open terminal and clone the repo**
```
git clone https://github.com/bassammmmm/chatbot-demo.git
cd chatbot-demo
```


**For Docker engine v27.3.1 and later:**

```bash
docker compose up --build
```

**For older Docker versions:**
```bash
docker-compose up --build
```

**Notes**:
```markdown
- If you get permission denied, run the previous command again with sudo.
- If failed to load a docker image, make sure you are logged in, by running docker login.
```
**After starting up:**
```markdown
• Backend: Accessible at http://localhost:8000
• Frontend: Accessible at http://localhost:3000

• API Docs:
	• Swagger UI: http://localhost:8000/swagger
	• Redoc: http://localhost:8000/redoc
```
The frontend uses the NEXT_PUBLIC_API_URL environment variable (configured in docker-compose.yml) to point API calls to the backend.

**Stopping and Cleaning Up**
```markdown
	•	To stop the containers, press Ctrl + C in the terminal running docker compose up.
	•	To remove containers, networks, and volumes run:

		docker compose down

	•	To remove the database data as well (fresh start) run:
		
		docker compose down -v
```