import openai
from openai import OpenAI, OpenAIError, RateLimitError
from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY not found in environment")

client = OpenAI(api_key=api_key)

def process_context_entries(entries):
    return "\n".join([entry.content for entry in entries])

def generate_task_suggestions(task, context):
    prompt = f"""You are an intelligent assistant. Given the task and context, suggest:
- Priority Score (0 to 1)
- Improved Description
- Smart Category
- Suggested Deadline

Task Title: {task['title']}
Description: {task.get('description', '')}
Context: {context}
"""
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

    except RateLimitError:
        return {"error": "Rate limit exceeded. Check your OpenAI quota or billing settings."}

    except OpenAIError as e:
        return {"error": f"OpenAI error: {str(e)}"}

    except Exception as e:
        return {"error": f"Unexpected error: {str(e)}"}
