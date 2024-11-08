interface PodcastGenerationParams {
  file: File;
  url?: string;
  question: string;
  tone: 'Fun' | 'Formal';
  length: 'Short (1-2 min)' | 'Medium (3-5 min)';
  language: string;
  useAdvancedAudio: boolean;
}

interface PodcastResponse {
  audioUrl: string;
  transcript: string;
}

export class PodcastApiService {
  private static readonly API_URL = 'https://api-inference.huggingface.co/models/gabrielchua/open-notebooklm';
  private static readonly API_KEY = import.meta.env.VITE_HUGGING_FACE_API_KEY;

  static async generatePodcast(params: PodcastGenerationParams): Promise<PodcastResponse> {
    const formData = new FormData();
    formData.append('files', params.file);
    formData.append('url', params.url || '');
    formData.append('question', params.question);
    formData.append('tone', params.tone);
    formData.append('length', params.length);
    formData.append('language', params.language);
    formData.append('use_advanced_audio', params.useAdvancedAudio.toString());

    try {
      console.log('Sending request to Hugging Face API...');
      const response = await fetch(`${this.API_URL}/generate_podcast`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.API_KEY}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error('API Error:', errorData);
        throw new Error(`Failed to generate podcast: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      
      return {
        audioUrl: data[0],
        transcript: data[1],
      };
    } catch (error) {
      console.error('Error generating podcast:', error);
      throw error;
    }
  }
} 