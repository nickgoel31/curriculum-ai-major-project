import Anthropic from '@anthropic-ai/sdk';
import { ExperienceLevel, PreferredLanguage } from '@/types/database.types';

// Initialize the Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface CurriculumGenerationParams {
  targetRole: string;
  experienceLevel: string;
  currentSkills: string[];
  availableHoursPerWeek: number;
  totalWeeks: number;
  preferredLanguage: string;
}

export interface GeneratedCurriculum {
  title: string;
  description: string;
  targetRole: string;
  totalWeeks: number;
  estimatedHoursTotal: number;
  weeks: Array<{
    weekNumber: number;
    theme: string;
    objectives: string[];
    resources: Array<{
      title: string;
      type: 'VIDEO' | 'ARTICLE' | 'COURSE' | 'PROJECT' | 'TOOL';
      url: string;
      platform: string;
      durationMinutes?: number | null;
      isFree: boolean;
      description?: string | null;
    }>;
    tasks: Array<{
      title: string;
      description: string;
      taskType: 'PRACTICE' | 'PROJECT' | 'QUIZ' | 'READING';
    }>;
  }>;
}

const buildPrompt = (params: CurriculumGenerationParams) => {
  return `Create a complete ${params.totalWeeks}-week learning curriculum for a student with the following profile:
- Target Job Role: ${params.targetRole}
- Current Experience Level: ${params.experienceLevel}
- Skills they already know: ${params.currentSkills.length > 0 ? params.currentSkills.join(', ') : 'None'}
- Available study time: ${params.availableHoursPerWeek} hours per week
- Preferred language: ${params.preferredLanguage}

Generate a week-by-week plan. For each week include:
1. A focused theme/topic for that week (keep under 5 words)
2. Strictly 3 short learning objectives (keep each under 10 words)
3. Strictly 2-3 highly curated learning resources (mix of YouTube videos, free courses on NPTEL/Coursera/freeCodeCamp/GeeksForGeeks, articles, documentation)
4. Strictly 1-2 practical tasks or mini-projects

CRITICAL CONSTRAINTS FOR LENGTH & TOKEN LIMITS (AVOID TRUNCATION):
- Keep all resource descriptions and task descriptions extremely brief (strictly under 15 words each).
- Keep objectives and titles short and crisp.
- Do not repeat resources or write unnecessary explanations.

IMPORTANT RULES:
- Prioritize FREE resources (YouTube, freeCodeCamp, NPTEL, MDN, official docs)
- Resources must be REAL and verifiable (no made-up URLs — use known platforms like youtube.com, freecodecamp.org, coursera.org, geeksforgeeks.org, roadmap.sh, w3schools.com)
- Week 1 must be absolute basics even if they have some experience
- Final 2 weeks must include project work and interview prep
- Each week must build on the previous week progressively
- If preferredLanguage is Hindi/Hinglish, mention Hindi YouTube channels (like CodeWithHarry, Apna College) as primary resources

Respond ONLY with this exact JSON structure:
{
  "title": "string - catchy curriculum title (under 6 words)",
  "description": "string - brief 2-sentence description (under 20 words)",  
  "targetRole": "string",
  "totalWeeks": number,
  "estimatedHoursTotal": number,
  "weeks": [
    {
      "weekNumber": number,
      "theme": "string",
      "objectives": ["string", "string", "string"],
      "resources": [
        {
          "title": "string (under 8 words)",
          "type": "VIDEO|ARTICLE|COURSE|PROJECT|TOOL",
          "url": "string - real URL",
          "platform": "string - YouTube|freeCodeCamp|GeeksForGeeks|etc",
          "durationMinutes": number,
          "isFree": boolean,
          "description": "string (under 12 words)"
        }
      ],
      "tasks": [
        {
          "title": "string (under 8 words)",
          "description": "string (under 15 words)",
          "taskType": "PRACTICE|PROJECT|QUIZ|READING"
        }
      ]
    }
  ]
}`;
};

const SYSTEM_PROMPT = "You are CurriculumAI, an expert learning path designer specializing in Indian tech education. You create highly structured, practical, resource-rich learning curricula for undergraduate students targeting specific job roles. You prioritize free/affordable resources accessible in India. You always respond with valid JSON only, no markdown, no explanation.";

export async function generateCurriculum(params: CurriculumGenerationParams): Promise<GeneratedCurriculum> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is not configured');
  }

  const prompt = buildPrompt(params);

  try {
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5', // Updated to user-requested Claude model
      max_tokens: 8192,
      temperature: 0.2,
      system: SYSTEM_PROMPT,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    
    // Attempt to parse the JSON. In rare cases, Claude might wrap it in markdown block.
    const jsonString = responseText.replace(/^\`\`\`json\s*/i, '').replace(/\s*\`\`\`$/i, '').trim();
    
    const parsedData = JSON.parse(jsonString) as GeneratedCurriculum;
    
    return parsedData;
  } catch (error) {
    console.error('Error generating curriculum from Claude:', error);
    throw error;
  }
}
