import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { z, ZodError } from 'zod';

export const runtime = 'nodejs';

/* ------------------------- Lazy OpenAI initialiser ------------------------- */
// Instantiate the client *inside* handlers so build/import doesn’t crash if the
// key isn’t present during “collect page data”.
function getOpenAI() {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY missing');
  return new OpenAI({ apiKey: key });
}

/* -------------------- Dental practice context (UNCHANGED) ------------------ */
const SYSTEM_PROMPT = `You are Dr. Sarah, the AI assistant for St Mary's House Dental Care, a luxury coastal dental practice in Shoreham-by-Sea. You are warm, professional, knowledgeable, and empathetic.

PRACTICE INFORMATION:
- Location: Shoreham-by-Sea, West Sussex (coastal setting)
- Specialties: 3D Digital Dentistry, Porcelain Veneers, Dental Implants, Teeth Whitening, Emergency Care, Anxiety Dentistry
- Technology: 3D scanning, same-day crowns, digital impressions, The Wand pain-free injections
- Atmosphere: Luxury coastal practice with calming sea views
- Team: Experienced dentists and hygienists focused on patient comfort

PERSONALITY TRAITS:
- Warm and welcoming, like a caring friend
- Professional but approachable
- Empathetic to dental anxiety and concerns
- Knowledgeable about all treatments and procedures
- Enthusiastic about the practice's advanced technology
- Calming and reassuring for nervous patients

RESPONSE GUIDELINES:
- Always be helpful and informative
- Show empathy for dental concerns or anxiety
- Highlight the practice's luxury amenities and coastal setting
- Mention relevant treatments based on patient needs
- Encourage booking consultations for specific concerns
- Be reassuring about pain-free and comfortable treatments
- Keep responses conversational but professional
- Limit responses to 2-3 paragraphs maximum

EMERGENCY SITUATIONS:
- For dental emergencies, emphasize immediate care availability
- Provide emergency contact information
- Reassure about pain relief and urgent treatment

BOOKING ASSISTANCE:
- Encourage scheduling consultations
- Mention flexible appointment times
- Highlight the welcoming, anxiety-free environment

Remember: You represent a premium dental practice that prioritizes patient comfort, advanced technology, and beautiful coastal surroundings.`;

/* ----------------------------- Request typing ------------------------------ */
// Ensures messages are never `unknown` and supports tool messages if you add tools.
const roleEnum = z.enum(['system', 'user', 'assistant', 'tool']);
const messageSchema = z.object({
  role: roleEnum,
  content: z.string(),
  // OpenAI expects tool_call_id on tool messages; optional if not used
  tool_call_id: z.string().optional(),
});
const emotionSchema = z.object({
  dominant: z.string(),
  confidence: z.number(),
}).optional();
const requestSchema = z.object({
  messages: z.array(messageSchema),
  userEmotion: emotionSchema,
});
type ReqBody = z.infer<typeof requestSchema>;
type ChatMessage = z.infer<typeof messageSchema>;

/* --------------------------------- POST ----------------------------------- */
export async function POST(request: NextRequest) {
  try {
    const parsed: ReqBody = requestSchema.parse(await request.json());

    // Build system prompt with emotion (kept)
    let systemPrompt = SYSTEM_PROMPT;
    if (parsed.userEmotion) {
      systemPrompt += `

CURRENT USER EMOTION: ${parsed.userEmotion.dominant} (confidence: ${parsed.userEmotion.confidence}%)
Please adjust your response tone accordingly:
- If anxious/worried: Be extra reassuring and calming
- If happy/excited: Match their enthusiasm while staying professional
- If sad/frustrated: Show empathy and offer support
- If angry: Remain calm and understanding, focus on solutions`;
    }

    // Prepare messages (typed)
    const openaiMessages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: systemPrompt },
      ...parsed.messages.map((msg: ChatMessage) => {
        if (msg.role === 'tool') {
          return {
            role: 'tool' as const,
            content: msg.content,
            tool_call_id: msg.tool_call_id ?? 'inline-tool',
          };
        }
        return { role: msg.role, content: msg.content };
      }),
    ];

    const openai = getOpenAI();

    // Your model choice preserved
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: openaiMessages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;
    if (!assistantMessage) throw new Error('No response from OpenAI');

    const responseAnalysis = await analyzeResponse(assistantMessage);

    return NextResponse.json({
      message: assistantMessage,
      analysis: responseAnalysis,
      usage: completion.usage,
    });
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        {
          error: 'Validation failed',
          details: err.issues.map((i) => ({
            field: i.path.join('.'),
            message: i.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error('Chat API Error:', err);

    const fallbackMessage =
      "I apologize, but I’m experiencing some technical difficulties right now. Please feel free to call our practice directly at 01273 123456 for immediate assistance, or try again in a moment. Our team is always here to help with your dental needs!";

    return NextResponse.json(
      {
        message: fallbackMessage,
        analysis: {
          intent: 'error_fallback',
          confidence: 1.0,
          suggestedActions: ['call_practice', 'try_again'],
        },
        error:
          process.env.NODE_ENV === 'development'
            ? (err as Error).message
            : 'Service temporarily unavailable',
      },
      { status: 500 },
    );
  }
}

/* ------------------------- Response analysis (kept) ------------------------ */
async function analyzeResponse(message: string) {
  try {
    const analysisPrompt = `Analyze this dental assistant response and determine:
1. Primary intent (consultation, emergency, information, booking, etc.)
2. Confidence level (0-1)
3. Suggested actions for the user

Response: "${message}"

Return JSON format:
{
  "intent": "string",
  "confidence": number,
  "suggestedActions": ["action1", "action2"]
}

Possible intents: consultation, emergency, information, booking, treatment_info, anxiety_support, cost_inquiry
Possible actions: book_consultation, call_emergency, schedule_appointment, learn_more, contact_practice, view_treatments`;

    const openai = getOpenAI();
    const analysis = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: analysisPrompt }],
      max_tokens: 150,
      temperature: 0.3,
    });

    const result = analysis.choices[0]?.message?.content;
    if (result) {
      try {
        return JSON.parse(result);
      } catch {
        return {
          intent: 'information',
          confidence: 0.8,
          suggestedActions: ['contact_practice'],
        };
      }
    }
  } catch (error) {
    console.error('Response analysis error:', error);
  }

  return {
    intent: 'information',
    confidence: 0.8,
    suggestedActions: ['contact_practice'],
  };
}

/* ---------------------------------- GET ----------------------------------- */
export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    service: 'chat-api',
    timestamp: new Date().toISOString(),
  });
}
