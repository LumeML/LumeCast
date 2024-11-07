interface TTSOptions {
  voice: 'male' | 'female';
  pitch?: number;
  rate?: number;
}

export class TTSProcessor {
  private synthesis: SpeechSynthesis;
  private voices: SpeechSynthesisVoice[];
  
  constructor() {
    this.synthesis = window.speechSynthesis;
    this.voices = [];
    
    // Load voices
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = this.synthesis.getVoices();
      };
    }
  }

  async speak(text: string, options: TTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Select voice based on gender
      const voiceList = this.voices.filter(voice => 
        options.voice === 'male' ? voice.name.toLowerCase().includes('male') : voice.name.toLowerCase().includes('female')
      );
      
      utterance.voice = voiceList[0] || null;
      utterance.pitch = options.pitch || 1;
      utterance.rate = options.rate || 1;
      
      utterance.onend = () => resolve();
      utterance.onerror = (error) => reject(error);
      
      this.synthesis.speak(utterance);
    });
  }

  stop() {
    this.synthesis.cancel();
  }
}

// Add the textToSpeech function export
export async function textToSpeech(text: string): Promise<string> {
  try {
    const tts = new TTSProcessor();
    
    // Split text into segments and clean up the speaker prefixes
    const segments = text.split('\n\n').map(segment => {
      // Remove the "Host:" or "Guest:" prefix but keep track of who's speaking
      const isHost = segment.startsWith('Host:');
      const isGuest = segment.startsWith('Guest:');
      const cleanText = segment.replace(/^(Host|Guest):/, '').trim();
      
      return {
        text: cleanText,
        isHost: isHost,
        isGuest: isGuest
      };
    });

    const audioContext = new AudioContext();
    const destination = audioContext.createMediaStreamDestination();
    const mediaRecorder = new MediaRecorder(destination.stream);
    const audioChunks: BlobPart[] = [];

    return new Promise((resolve, reject) => {
      let currentSegment = 0;

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        try {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          resolve(audioUrl);
        } catch (error) {
          reject(new Error('Failed to create audio URL'));
        }
      };

      const processNextSegment = async () => {
        try {
          if (currentSegment < segments.length) {
            const segment = segments[currentSegment];
            
            await tts.speak(segment.text, { 
              voice: segment.isHost ? 'female' : 'male',
              pitch: segment.isHost ? 1.1 : 0.9,
              rate: 1
            });
            
            currentSegment++;
            processNextSegment();
          } else {
            mediaRecorder.stop();
          }
        } catch (error) {
          reject(new Error('Failed to process audio segment'));
        }
      };

      try {
        mediaRecorder.start();
        processNextSegment();
      } catch (error) {
        reject(new Error('Failed to start audio recording'));
      }
    });

  } catch (error) {
    console.error('TTS processing failed:', error);
    throw new Error('Failed to convert text to speech');
  }
}