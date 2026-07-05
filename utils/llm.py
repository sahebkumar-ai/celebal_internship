"""
utils/llm.py
------------
Initializes and manages the Google Gemini LLM.
"""

from langchain_google_genai import ChatGoogleGenerativeAI

from config import (
    GOOGLE_API_KEY,
    LLM_MODEL,
    TEMPERATURE,
    MAX_OUTPUT_TOKENS,
)


class LLMManager:
    """
    Handles Google Gemini initialization and response generation.
    """

    def __init__(self):
        self.llm = ChatGoogleGenerativeAI(
            model=LLM_MODEL,
            google_api_key=GOOGLE_API_KEY,
            temperature=TEMPERATURE,
            max_output_tokens=MAX_OUTPUT_TOKENS,
        )

    def get_llm(self):
        """
        Returns the initialized Gemini model.
        """
        return self.llm

    def generate_response(self, prompt: str) -> str:
        """
        Generate an answer from Gemini.

        Args:
            prompt (str): Formatted prompt.

        Returns:
            str: Generated answer.
        """

        response = self.llm.invoke(prompt)

        return response.content.strip()