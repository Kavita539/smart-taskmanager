import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

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

    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
