![React](https://img.shields.io/badge/React-19-blue)

![FastAPI](https://img.shields.io/badge/FastAPI-0.116-green)

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2-red)

![CI](https://github.com/Musawer-Afzal/ai-knowledge-workspace/actions/workflows/ci.yml/badge.svg)

![License](https://img.shields.io/badge/License-MIT-yellow)

# AI Knowledge Workspace

A production-ready full-stack knowledge management platform built with **React**, **FastAPI**, and **PostgreSQL**. Users can securely register, authenticate using JWT, create personal workspaces, and manage documents through a modern web interface.

The project follows modern software engineering practices including RESTful API design, database migrations, automated testing, CI/CD, and cloud deployment. It serves as the foundation for an AI-powered Retrieval-Augmented Generation (RAG) system, where uploaded documents will later be indexed, embedded, and queried using Large Language Models.

---

## Live Demo

**Frontend:** https://ai-knowledge-workspace-eta.vercel.app

**Backend API:** https://ai-knowledge-workspace-bskn.onrender.com

---

## Features

- User Registration & JWT Authentication
- Secure Password Hashing (bcrypt)
- Personal Workspaces
- Protected REST API
- Owner-only Authorization
- PostgreSQL Persistence
- SQLAlchemy ORM
- Alembic Database Migrations
- File Upload Support
- Pagination
- Responsive React Frontend
- Automated Testing
- GitHub Actions CI/CD
- Production Deployment

---

## Project Overview

AI Knowledge Workspace is a production-ready full-stack application designed to help users organize and manage their knowledge in secure, personal workspaces.

Each authenticated user can create and manage multiple workspaces, with strict owner-only authorization ensuring complete data isolation. The backend exposes a RESTful API built with FastAPI, while PostgreSQL provides persistent storage through SQLAlchemy ORM and Alembic migrations.

This project emphasizes modern backend engineering practices including:

- Secure JWT authentication
- Password hashing with bcrypt
- Role-based resource protection
- Database migrations
- REST API design
- Automated testing
- Continuous Integration (GitHub Actions)
- Cloud deployment

The application is intentionally designed as the foundation for a Retrieval-Augmented Generation (RAG) platform. Future development will add document parsing, semantic search, vector embeddings, LLM-powered question answering, and AI agents without requiring architectural changes.

---

## Key Highlights

- Production-ready React + FastAPI architecture
- PostgreSQL database with SQLAlchemy ORM
- JWT authentication and owner-only authorization
- Alembic database migrations
- Automated backend and frontend testing
- GitHub Actions CI pipeline
- Deployed frontend, backend, and database
- Clean, scalable project structure following industry best practices

## Features

### Authentication & Security

- JWT-based authentication using OAuth2 password flow
- Secure password hashing with bcrypt
- Owner-only authorization for protected resources
- Protected API routes using FastAPI dependencies
- Environment-based secret management
- CORS configured for local and production environments

### Workspace Management

- Create, view, update, and delete workspaces
- Personal workspaces isolated by authenticated user
- Automatic ownership validation on every request
- Pagination support for listing workspaces
- RESTful API following HTTP best practices

### Database

- PostgreSQL relational database
- SQLAlchemy 2.0 ORM
- Alembic database migrations
- Indexed foreign keys for efficient queries
- One-to-many relationships between Users and Workspaces
- Persistent storage across application restarts

### Frontend

- React 19 + Vite
- React Router navigation
- Context API for authentication state
- React Hook Form + Zod validation
- Responsive user interface
- Optimistic UI updates
- Loading, empty, and error states

### Testing

- Pytest unit tests
- FastAPI integration tests
- Playwright end-to-end testing
- Dedicated testing database
- Authorization and validation test coverage

### DevOps

- GitHub Actions Continuous Integration
- Automatic frontend build validation
- Automatic backend test execution
- Production deployment on every successful release

### Deployment

- Frontend deployed on Vercel
- Backend deployed on Render
- PostgreSQL hosted on Neon
- Production environment variables
- Automated database migrations

## Tech Stack

| Category | Technologies |
|----------|--------------|
| Frontend | React 19, Vite, React Router, React Hook Form, Zod |
| Backend | FastAPI, Python 3.12, Uvicorn |
| Database | PostgreSQL 18, SQLAlchemy 2.0, Alembic |
| Authentication | JWT, OAuth2 Password Flow, Passlib (bcrypt) |
| Testing | Pytest, FastAPI TestClient, Playwright |
| DevOps | GitHub Actions |
| Deployment | Vercel, Render, Neon |
| Version Control | Git, GitHub |

## Architecture

The application follows a modern three-tier architecture, separating presentation, business logic, and data persistence.

```
                 ┌─────────────────────────────┐
                 │        React (Vite)         │
                 │  Authentication • UI • SPA  │
                 └──────────────┬──────────────┘
                                │
                         HTTPS / REST API
                                │
                 ┌──────────────▼──────────────┐
                 │        FastAPI Backend       │
                 │ JWT Auth • Validation • ORM │
                 └──────────────┬──────────────┘
                                │
                         SQLAlchemy ORM
                                │
                 ┌──────────────▼──────────────┐
                 │       PostgreSQL 18         │
                 │ Users • Workspaces • Docs   │
                 └─────────────────────────────┘
```

### Request Flow

1. The user authenticates using email and password.
2. FastAPI verifies the credentials and issues a JWT access token.
3. The frontend stores the token and includes it in the `Authorization` header for protected requests.
4. FastAPI validates the JWT and identifies the authenticated user.
5. Owner-only authorization ensures users can only access their own resources.
6. SQLAlchemy interacts with PostgreSQL to retrieve or modify data.
7. JSON responses are returned to the React frontend and rendered in the UI.

The project follows a clear separation of responsibilities:

- **React** handles presentation and user interaction.
- **FastAPI** manages authentication, authorization, validation, and business logic.
- **PostgreSQL** provides reliable persistent storage.
- **SQLAlchemy** maps Python objects to relational database tables.
- **Alembic** manages version-controlled database migrations.

## Project Structure

```text
ai-knowledge-workspace/
│
├── backend/
│   ├── app/
│   │   ├── api/              # API route handlers
│   │   ├── core/             # Settings & security
│   │   ├── database/         # Database configuration
│   │   ├── dependencies/     # Authentication dependencies
│   │   ├── models/           # SQLAlchemy ORM models
│   │   └── schemas/          # Pydantic request/response models
│   │
│   ├── alembic/              # Database migrations
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── api/              # API communication
│   │   ├── components/       # Reusable React components
│   │   ├── contexts/         # Global application state
│   │   ├── hooks/            # Custom React hooks
│   │   ├── layouts/          # Shared layouts
│   │   ├── pages/            # Route pages
│   │   └── routes/           # Protected routes
│   │
│   └── package.json
│
├── .github/
│   └── workflows/
│       └── ci.yml            # GitHub Actions pipeline
│
└── README.md
```

### Design Principles

- Modular backend architecture
- Clear separation between API, models, schemas, and database logic
- Feature-based frontend organization
- Environment-based configuration
- Automated testing and CI/CD
- Scalable foundation for future AI and RAG functionality

## 📡 API Overview

The backend exposes a RESTful API built with **FastAPI**, secured using **JWT authentication**, and backed by **PostgreSQL**.

### Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/register` | Create a new user account |
| POST | `/login` | Authenticate and receive JWT access token |
| GET | `/me` | Return the currently authenticated user |

---

### Workspace Endpoints

| Method | Endpoint | Description | Protected |
|---------|----------|-------------|-----------|
| GET | `/workspaces` | List authenticated user's workspaces | ✅ |
| POST | `/workspaces` | Create a new workspace | ✅ |
| GET | `/workspaces/{id}` | Get workspace details | ✅ |
| PUT | `/workspaces/{id}` | Update workspace | ✅ |
| DELETE | `/workspaces/{id}` | Delete workspace | ✅ |

---

### Document Endpoints

| Method | Endpoint | Description | Protected |
|---------|----------|-------------|-----------|
| POST | `/workspaces/{id}/documents` | Upload a document | ✅ |

---

### Health Check

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/health` | API status endpoint |

---

### Authentication Flow

1. User registers using **/register**
2. User logs in using **/login**
3. Backend validates credentials and returns a JWT access token
4. Frontend stores the token in localStorage
5. Protected requests include:

```
Authorization: Bearer <JWT_TOKEN>
```

6. FastAPI validates the token and injects the authenticated user into protected routes using dependency injection.

---

### API Documentation

FastAPI automatically generates interactive documentation.

Swagger UI:

```
http://localhost:8000/docs
```

OpenAPI Schema:

```
http://localhost:8000/openapi.json
```

## 🗄 Database Schema

The application uses **PostgreSQL** with **SQLAlchemy ORM** and **Alembic** for schema migrations.

### Entity Relationship Diagram

```text
+---------+
|  Users  |
+---------+
| id (PK) |
| email   |
| password_hash |
| created_at |
+---------+
      │
      │ 1
      │
      ▼
+---------------+
|  Workspaces   |
+---------------+
| id (PK)       |
| name          |
| description   |
| owner_id (FK) |
| created_at    |
+---------------+
      │
      │ 1
      │
      ▼
+---------------+
|  Documents    |
+---------------+
| id (PK)       |
| filename      |
| workspace_id  |
| size          |
| created_at    |
+---------------+
```

---

### Relationships

- **One User → Many Workspaces**
- **One Workspace → Many Documents**

Every workspace belongs to exactly one authenticated user.

Every uploaded document belongs to one workspace.

---

### Database Features

- PostgreSQL 18
- SQLAlchemy 2.0 ORM
- Alembic migrations
- UUID primary keys
- Foreign key constraints
- Indexed relationships
- Persistent storage
- Owner-based authorization
- Cascading deletes

---

### Migration Workflow

Generate a migration:

```bash
alembic revision --autogenerate -m "description"
```

Apply migrations:

```bash
alembic upgrade head
```

Rollback one migration:

```bash
alembic downgrade -1
```

---

### Data Ownership

Every workspace stores the owner's user ID.

Before returning, updating, or deleting a workspace, the backend verifies ownership.

```
Authenticated User
        │
        ▼
Workspace.owner_id == current_user.id
        │
      Allowed
```

Unauthorized users receive a **404 Not Found**, preventing resource enumeration.

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/Musawer-Afzal/ai-knowledge-workspace.git

cd ai-knowledge-workspace
```

---

### 2. Backend Setup

```bash
cd backend

python -m venv .venv
```

Activate the virtual environment.

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

Install dependencies.

```bash
pip install -r requirements.txt
```

Create a `.env` file.

```bash
cp .env.example .env
```

Run database migrations.

```bash
alembic upgrade head
```

Start the backend.

```bash
uvicorn app.main:app --reload
```

Backend runs at:

```
http://localhost:8000
```

---

### 3. Frontend Setup

Open another terminal.

```bash
cd frontend

npm install
```

Create the frontend environment file.

```bash
cp .env.example .env
```

Start Vite.

```bash
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

### 4. Login

Create an account from the Register page.
Sign in using your credentials.
Create your first workspace.
The application is now ready to use.

## 🔐 Environment Variables

### Backend (`backend/.env`)

```env
DATABASE_URL=postgresql://username:password@localhost:5432/workspace

JWT_SECRET=your-super-secret-key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=720
```

---

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:8000
```

---

### Notes

- Never commit `.env` files.
- Commit only `.env.example`.
- Generate a secure JWT secret for production.
- Use different environment variables for development and production.

## 🧪 Testing

The project includes backend unit tests, integration tests, frontend linting, and GitHub Actions CI.

### Backend Tests

Run all tests.

```bash
cd backend

pytest -q
```

Current coverage includes:

- Schema validation
- Authentication
- Authorization
- Workspace CRUD
- Protected routes
- Owner-only access
- Database integration

---

### Frontend

Lint the application.

```bash
cd frontend

npm run lint
```

Build for production.

```bash
npm run build
```

---

### Continuous Testing

Every Pull Request automatically runs:

- Backend tests
- Frontend linting
- Production build verification

No code is merged unless all checks pass.

## ⚙️ CI/CD

GitHub Actions automatically validates every push and Pull Request.

### Backend Pipeline

- Python setup
- Dependency installation
- PostgreSQL service
- Alembic migrations
- Pytest execution

---

### Frontend Pipeline

- Node.js setup
- npm install
- ESLint
- Production Vite build

---

### Deployment Flow

```
Developer
     │
     ▼
GitHub Repository
     │
     ▼
GitHub Actions CI
     │
     ├──────── Backend Tests
     │
     ├──────── Frontend Build
     │
     ▼
Merge to Main
     │
     ▼
Automatic Deployment
```

Every merged commit automatically deploys the latest production build.

## 🌍 Deployment

The application is deployed as a full-stack web application.

| Component | Platform |
|-----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | PostgreSQL (Neon) |
| Migrations | Alembic |

---

### Deployment Architecture

```
Browser
    │
    ▼
Vercel (React + Vite)
    │
    ▼
Render (FastAPI)
    │
    ▼
PostgreSQL
```

---

### Production Features

- HTTPS
- JWT Authentication
- Persistent PostgreSQL storage
- Automatic deployments
- GitHub Actions CI
- Alembic migrations
- CORS protection
- Environment variable management

The deployed application persists user accounts and workspaces across server restarts.

## 🚧 Roadmap

This project serves as the foundation for an AI-powered knowledge workspace.

### ✅ Week 1 (Completed)

- React + Vite frontend
- FastAPI backend
- PostgreSQL database
- SQLAlchemy ORM
- Alembic migrations
- JWT Authentication
- Protected routes
- Workspace CRUD
- Document upload
- GitHub Actions CI
- Production deployment

---

### 🔜 Week 2 — AI Features

#### Retrieval-Augmented Generation (RAG)

- PDF parsing
- Text chunking
- Metadata extraction
- Semantic search pipeline

---

#### Embeddings

- Sentence Transformers
- Batch embedding generation
- Embedding persistence

---

#### Vector Database

- pgvector integration
- Similarity search
- Cosine similarity retrieval
- Hybrid search

---

#### LLM Integration

- OpenAI / OpenRouter APIs
- Structured JSON outputs
- Prompt templates
- Conversation memory
- Streaming responses

---

#### Workspace Chat

- Chat with uploaded documents
- Context-aware responses
- Source citations
- Multi-document retrieval

---

#### Future Improvements

- Workspace sharing
- Role-based permissions
- Document versioning
- Search filters
- Markdown rendering
- Dark mode
- Docker Compose
- Kubernetes deployment
- Redis caching
- Background workers (Celery)
- Observability and monitoring

## 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project:

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes with clear commit messages.
4. Push your branch.
5. Open a Pull Request.

### Development Workflow

```bash
git checkout -b feature/your-feature-name
git add .
git commit -m "Add: your feature"
git push origin feature/your-feature-name
```

Please ensure that:

- All tests pass (`pytest`)
- Frontend builds successfully (`npm run build`)
- Code follows the existing project structure
- New features include appropriate documentation

## 📄 License

This project is licensed under the **MIT License**.

You are free to use, modify, and distribute this project in accordance with the license terms.

See the **LICENSE** file for details.

## 👨‍💻 Author

**Musawer Afzal**

AI & Full-Stack Engineer

I'm a self-taught AI engineer passionate about building production-ready AI systems using modern machine learning, backend engineering, and full-stack technologies. This project was built as part of my AI Full-Stack learning journey and demonstrates production-oriented software engineering practices.

### Connect with me

- GitHub: https://github.com/MusawerAfzal
- LinkedIn: https://www.linkedin.com/in/musawer-afzal/

---

If you found this project helpful, consider giving it a ⭐ on GitHub!