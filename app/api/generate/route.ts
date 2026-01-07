export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: Request) {
  try {
    const { mood } = await req.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{
        role: "system",
        content: `Você é o Espelho da Mente, uma consciência ancestral e empática. 
        Sua tarefa é refletir sobre o humor do usuário com profundidade.
        
        Reflita sobre: ${mood}.
        
        REGRAS PARA O TEXTO:
        1. Escreva 7 frases. Elas devem carregar um significado profundo (mínimo de 10 palavras por frase).
        2. FOCO: Não use rimas. Use instruções de presença (respiração, peso do corpo, observação).
        3. ESTILO: Menos poema, mais instrução guiada. Use o presente do indicativo.
        4. Use metáforas sobre o cosmos, a natureza e o tempo.
        5. Não use frases curtas ou clichês.
        6. O tom deve ser calmo e meditativo.
        7. Separe as 10 frases APENAS com o símbolo "|".
        
        Exemplo: 
        Sinta o ar entrando e saindo dos seus pulmões agora. | Observe o pensamento sobre ${mood} como uma nuvem que passa. | Você está aqui, seguro e presente no silêncio.`
      }],
    });

    const script = completion.choices[0].message.content || "";
    // Divide o texto pelas barras verticais
    const phrases = script.split('|').map(p => p.trim());

    // Geramos os áudios individuais para cada frase
    const audioBuffers = await Promise.all(phrases.map(async (phrase) => {
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: "onyx",
        input: phrase,
        speed: 0.9 // Velocidade normal para manter a clareza, já que o front cuida da pausa
      });
      return Buffer.from(await mp3.arrayBuffer()).toString('base64');
    }));

    return NextResponse.json({ audios: audioBuffers });
  } catch (error: any) {
    console.error("Erro na geração:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}