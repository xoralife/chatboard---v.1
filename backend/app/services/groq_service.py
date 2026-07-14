from groq import AsyncGroq

from app.config import settings

client = AsyncGroq(api_key=settings.GROQ_API_KEY)


async def get_groq_response(messages: list[dict]) -> str:
    completion = await client.chat.completions.create(
        messages=messages,
        model="llama-3.1-8b-instant",
        temperature=0.7,
        max_tokens=1024,
    )
    return completion.choices[0].message.content
