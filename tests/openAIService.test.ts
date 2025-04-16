import { enrichNotesWithLLM } from '../src/services/openAIService';
import dotenv from 'dotenv';

dotenv.config();

describe('LLM Enrichment Function', () => {
  it('should return an enriched version of the input note', async () => {
    const inputNote = "customer said they want it done quickly";
    const enriched = await enrichNotesWithLLM(inputNote);

    console.log('🧠 Enriched Output:', enriched);
    expect(typeof enriched).toBe('string');
    expect(enriched.length).toBeGreaterThan(inputNote.length - 5); // basic check
  });
});
