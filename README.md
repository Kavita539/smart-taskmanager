Smart Todo List Application
Intelligent Task Management Powered by AI
This project aims to revolutionize task management by integrating advanced AI capabilities into a standard Todo List application. Users can efficiently organize their tasks, receive smart suggestions for prioritization and deadlines, and leverage daily context (messages, emails, notes) to get context-aware recommendations, making task management more intuitive and productive.

Features
Task Creation & Management: Standard CRUD operations for tasks (create, read, update, delete).

Task Prioritization (AI-Powered): AI analyzes task details and context to suggest optimal priority levels.

Deadline Recommendations (AI-Powered): AI provides intelligent recommendations for task due dates based on content and external context.

Context-Aware Suggestions (AI-Powered):

Users can input daily context (e.g., meeting notes, email summaries, personal thoughts).

AI processes this context to offer relevant suggestions for new tasks, sub-tasks, or modifications to existing tasks.

Ability to specify the source type of the context (manual, email, document, etc.).

Task Categorization: Organize tasks into custom categories.

Status Tracking: Track task progress with various statuses (e.g., pending, in progress, completed).

Responsive User Interface: A clean, modern, and responsive design built with ReactJS and Tailwind CSS.

Tech Stack
This application is built using a robust and modern tech stack:

Backend:

Django REST Framework (Python): For building powerful and flexible REST APIs.

Python: The core programming language for the backend logic.

Database:

Supabase (PostgreSQL): A scalable and reliable PostgreSQL database solution, offering real-time capabilities and authentication.

Frontend:

ReactJS: A declarative, component-based JavaScript library for building user interfaces.

Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.

AI Integration:

OpenAI API: For general-purpose AI tasks (e.g., text generation, understanding).

Claude API: Another powerful language model for diverse AI functionalities.

Gemini API: Google's advanced multimodal AI model.

LM Studio (Recommended): For running local large language models, offering flexibility and privacy for development.

Storage:

Supabase Storage: For handling any file uploads associated with tasks or context.

Getting Started
Follow these instructions to set up and run the project locally.

Prerequisites
Before you begin, ensure you have the following installed:

Python 3.8+

Node.js (LTS recommended)

npm or yarn (Node.js package manager)

pip (Python package installer)

Supabase CLI (Optional, but recommended for local Supabase development)

1. Clone the Repository
git clone <your-repository-url>
cd smart-todo-list

2. Backend Setup (Django REST Framework)
Navigate into the backend directory (or wherever your Django project resides).

cd backend # Adjust this path if your backend is in a different directory

Create a Virtual Environment
It's highly recommended to use a virtual environment to manage dependencies.

python -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate

Install Dependencies
pip install -r requirements.txt

Configure Environment Variables
Create a .env file in your backend directory and add the following environment variables. Replace the placeholder values with your actual credentials.

# Django Settings
SECRET_KEY=your_django_secret_key_here
DEBUG=True # Set to False in production

# Supabase Database Configuration
DATABASE_URL="postgresql://postgres:[YOUR_SUPABASE_PASSWORD]@db.[YOUR_SUPABASE_REF].supabase.co:5432/postgres"

# Supabase API Keys (for direct API interaction if needed, though DRF might handle auth)
SUPABASE_URL=https://[YOUR_SUPABASE_REF].supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_public_key

# AI API Keys (Choose the ones you are using)
OPENAI_API_KEY=sk-your_openai_api_key_here
CLAUDE_API_KEY=sk-your_claude_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
# If using LM Studio, you might point to its local endpoint:
# LM_STUDIO_API_BASE_URL=http://localhost:1234/v1

Run Database Migrations
python manage.py migrate

Run the Backend Server
python manage.py runserver

The backend API will now be running, typically at http://localhost:8000.

3. Frontend Setup (ReactJS)
Open a new terminal and navigate into the frontend directory (or wherever your React project resides).

cd frontend # Adjust this path if your frontend is in a different directory

Install Dependencies
npm install # or yarn install

Configure Environment Variables
Create a .env file in your frontend directory (the root of your React app) and add the following:

REACT_APP_API_URL=http://localhost:8000/api

Run the Frontend Development Server
npm start # or yarn start

The frontend application will now be running, typically at http://localhost:3000.

4. Supabase Setup
Create a Supabase Project
Go to Supabase and sign up or log in.

Create a new project.

Once the project is created, navigate to Project Settings -> API to find your Project URL and anon (public) key. Use these to fill in your .env files.

Database Schema (Example)
You'll need to define your database tables in Supabase. Here's a basic example for tasks and contexts:

tasks table:

Column Name

Type

Constraints

Description

id

uuid

PRIMARY KEY, DEFAULT gen_random_uuid()

Unique task identifier

title

text

NOT NULL

The title of the task

description

text

NULLABLE

Detailed description of the task

due_date

date

NULLABLE

The suggested or set due date

priority

text

DEFAULT 'medium'

Task priority (high, medium, low)

category

text

NULLABLE

Task category

status

text

DEFAULT 'pending'

Current status of the task

created_at

timestampz

DEFAULT now()

Timestamp of task creation

updated_at

timestampz

DEFAULT now()

Last update timestamp

contexts table:

Column Name

Type

Constraints

Description

id

uuid

PRIMARY KEY, DEFAULT gen_random_uuid()

Unique context identifier

content

text

NOT NULL

The text content of the context

source_type

text

NOT NULL

Type of context (manual, email, doc)

task_id

uuid

FOREIGN KEY (tasks.id), NULLABLE

Optional link to a specific task

created_at

timestampz

DEFAULT now()

Timestamp of context creation

You can create these tables using the Supabase Studio UI or by running SQL migrations.

5. AI API Keys
Ensure you have obtained API keys for the AI models you plan to use (OpenAI, Claude, Gemini).

OpenAI: platform.openai.com

Claude (Anthropic): console.anthropic.com

Gemini (Google AI Studio): ai.google.dev

Place these keys in your backend's .env file as shown in the Backend Setup section.

Screenshots
(Once the UI is developed, please add screenshots here to showcase the application's appearance and functionality.)

Screenshot 1: Task List View - A general overview of tasks.

Screenshot 2: Task Creation Form - Showing the form with AI suggestions.

Screenshot 3: Context Input Section - Demonstrating how users provide context.

API Documentation
The backend provides a RESTful API for managing tasks and interacting with AI services. All endpoints are prefixed with /api/.

Tasks Endpoints
GET /api/tasks/

Description: Retrieve a list of all tasks.

Response: 200 OK with an array of task objects.

POST /api/tasks/

Description: Create a new task.

Request Body:

{
    "title": "String (required)",
    "description": "String (optional)",
    "due_date": "YYYY-MM-DD (optional)",
    "priority": "String (e.g., 'high', 'medium', 'low', optional, default 'medium')",
    "category": "String (optional)",
    "status": "String (e.g., 'pending', 'in progress', 'completed', optional, default 'pending')"
}

Response: 201 Created with the newly created task object.

GET /api/tasks/{id}/

Description: Retrieve a single task by its ID.

Response: 200 OK with the task object.

PUT /api/tasks/{id}/

Description: Update an existing task by its ID.

Request Body: Same as POST /api/tasks/, but all fields are optional.

Response: 200 OK with the updated task object.

DELETE /api/tasks/{id}/

Description: Delete a task by its ID.

Response: 204 No Content.

AI Suggestions Endpoints
POST /api/ai/suggestions/

Description: Request AI-powered description suggestions and deadline recommendations based on provided context.

Request Body:

{
    "content": "String (required, the text context for AI analysis)",
    "source_type": "String (required, e.g., 'manual', 'email', 'document', 'auto')",
    "task_id": "UUID (optional, ID of the task this context relates to)",
    "context_id": "UUID (optional, ID of an existing context if updating/referencing)"
}

Response: 200 OK with an object containing suggestions.

{
    "descriptionSuggestions": [
        "String",
        "String"
    ],
    "deadlineRecommendations": [
        "String",
        "String"
    ]
}

Sample Usage & AI Suggestions
Here are some examples of how the AI suggestions might work:

Example 1: New Task Creation
User Input (Task Title): "Plan team offsite"
User Input (Description): ""

Expected AI Suggestions (after a short delay):

Description Suggestions:

"Define agenda and key activities."

"Determine budget and venue options."

"Send out invitations and collect RSVPs."

"Arrange transportation and catering."

Deadline Recommendations:

"2 weeks from now"

"End of next month"

Example 2: Providing Additional Context
User Input (Manual Context): "Just finished a meeting with Sarah. She mentioned the offsite needs to focus on Q3 strategy and team building, and must be finalized before the end of July."
Source Type: "manual"

Expected AI Suggestions (after submitting context):

Description Suggestions (updated/refined):

"Incorporate Q3 strategic planning sessions."

"Include dedicated team-building activities."

"Ensure venue supports interactive workshops."

"Draft a detailed agenda for review."

Deadline Recommendations (updated/refined):

"July 25th"

"Next Friday"

"Before end of July"

Example 3: Email Context
Simulated Email Content: "Subject: Project Alpha Update. Hi team, the Project Alpha deadline is now firm for August 15th. We need to complete the testing phase by August 1st. Please provide your progress updates by end of day tomorrow."
Source Type: "email"

Expected AI Suggestions (if linked to a "Project Alpha Testing" task):

Description Suggestions:

"Finalize all test cases and scenarios."

"Execute comprehensive regression testing."

"Document test results and bug reports."

"Coordinate with development for bug fixes."

Deadline Recommendations:

"August 1st"

"This week"

Contributing
Contributions are welcome! If you'd like to contribute, please follow these steps:

Fork the repository.

Create a new branch (git checkout -b feature/your-feature-name).

Make your changes.

Commit your changes (git commit -m 'feat: Add new feature').

Push to the branch (git push origin feature/your-feature-name).

Open a Pull Request.
