from openai import OpenAI, RateLimitError, OpenAIError
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY not found")

client = OpenAI(api_key=api_key)

try:
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": "Say hello"}]
    )
    print("✅ Success:")
    print(response.choices[0].message.content)

except RateLimitError as e:
    print("❌ Rate limit exceeded:", e)

except OpenAIError as e:
    print("❌ OpenAI error:", e)

except Exception as e:
    print("❌ Unexpected error:", e)
