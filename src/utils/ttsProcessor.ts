const HUGGING_FACE_API_URL = 'https://api-inference.huggingface.co/models/facebook/fastspeech2-en-ljspeech';

export async function textToSpeech(text: string): Promise<string> {
  try {
    const response = await fetch(HUGGING_FACE_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
      throw new Error('TTS API request failed');
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Error generating audio:', error);
    throw error;
  }
}