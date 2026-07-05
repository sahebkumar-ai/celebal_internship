"""
prompts/prompt_template.py
--------------------------
Prompt template used by the RAG pipeline.
"""

from langchain_core.prompts import PromptTemplate

RAG_PROMPT_TEMPLATE = """
You are an intelligent AI assistant for Document Question Answering.

Use ONLY the information provided in the context below to answer the user's question.

Instructions:
- Answer only from the provided context.
- Do not make up facts or use outside knowledge.
- If the answer is not found in the context, reply exactly:
  "I couldn't find the answer in the uploaded documents."
- Keep your answer concise and professional.
- Use bullet points if appropriate.

========================
Context:
{context}
========================

Question:
{question}

Answer:
"""


def get_prompt() -> PromptTemplate:
    """
    Returns the PromptTemplate object.
    """

    return PromptTemplate(
        template=RAG_PROMPT_TEMPLATE,
        input_variables=["context", "question"],
    )


def build_prompt(
    context: str,
    question: str,
) -> str:
    """
    Creates the final prompt string.

    Args:
        context: Retrieved document context.
        question: User's question.

    Returns:
        Formatted prompt.
    """

    prompt = get_prompt()

    return prompt.format(
        context=context,
        question=question,
    )