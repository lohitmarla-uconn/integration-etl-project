import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // required
});

export async function enrichNotesWithLLM(notes: string): Promise<string> {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an assistant that improves business note clarity.',
        },
        {
          role: 'user',
          content: `Make this note clearer and more professional:\n"${notes}"`,
        },
      ],
    });

    return response.choices[0].message.content?.trim() || notes;
  } catch (err) {
    console.error('🧠 LLM enrichment failed:', (err as Error).message);
    return notes;
  }
}
