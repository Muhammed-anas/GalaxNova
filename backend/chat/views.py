from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from dotenv import load_dotenv
import os
import requests

load_dotenv()
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "tinyllama")

@api_view(['POST'])
@permission_classes([AllowAny])  # Make it accessible without authentication for now
def chat_view(request):
    try:
        user_message = request.data.get("message")

        if not user_message:
            return Response({"error": "Message is required."}, status=status.HTTP_400_BAD_REQUEST)

        response = requests.post(
            f"{OLLAMA_BASE_URL}/api/chat",
            json={
                "model": OLLAMA_MODEL,
                "messages": [
                    {"role": "system", "content": "You are GalaxNova, a friendly AI assistant."},
                    {"role": "user", "content": user_message},
                ],
                "stream": False
            },
            timeout=60
        )

        response.raise_for_status()
        ai_reply = response.json()["message"]["content"].strip()
        return Response({"reply": ai_reply})

    except requests.exceptions.RequestException as e:
        return Response({"error": f"Ollama connection error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
