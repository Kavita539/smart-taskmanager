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

# AI API Keys (Choose the ones you are using)
OPENAI_API_KEY=sk-your_openai_api_key_here

Run Database Migrations
python manage.py makemigrations
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

5. AI API Keys
Ensure you have obtained API keys for the AI models you plan to use (OpenAI, Claude, Gemini).

OpenAI: platform.openai.com

Place these keys in your backend's .env file as shown in the Backend Setup section.

Screenshots
![image](https://github.com/user-attachments/assets/4c604010-77e1-4ec8-88a7-76ac9cc7a98e)

Screenshot 1: Task List View - A general overview of tasks.
![image](https://github.com/user-attachments/assets/1e78df77-8b5b-40d8-bfd8-3c3ac9154d46)

![image](https://github.com/user-attachments/assets/92dcfd6f-b3f4-4272-841e-5c92c793bb6e)

Screenshot 2: Task Creation Form - Showing the form with AI suggestions.
![image](https://github.com/user-attachments/assets/d1bf9466-f998-4013-a764-155ac236f9cc)

Screenshot 3: Context Input Section - Demonstrating how users provide context.
![image](https://github.com/user-attachments/assets/5cdd6ac0-c744-4ca7-9155-41ec05ae0afb)

