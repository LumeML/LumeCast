import { DialogueSegment, PodcastScript } from '../types';
import { PodcastTransformer } from '../utils/podcastTransformer';
import { TTSProcessor } from '../utils/ttsProcessor';

export function PodcastPlayer({ text }: { text: string }) {
  const tts = new TTSProcessor();
  const podcastScript: PodcastScript = PodcastTransformer.transformText(text);
  
  const playPodcast = async () => {
    for (const segment of podcastScript.segments) {
      await tts.speak(segment.text, {
        voice: segment.speaker === 'Host' ? 'female' : 'male',
        pitch: segment.speaker === 'Host' ? 1.1 : 0.9,
        rate: 1
      });
    }
  };

  return (
    <div className="podcast-player">
      <h2>{podcastScript.title}</h2>
      
      <div className="controls">
        <button onClick={playPodcast}>Play Episode</button>
        <button onClick={() => tts.stop()}>Stop</button>
      </div>
      
      <div className="transcript">
        {podcastScript.segments.map((segment: DialogueSegment, index: number) => (
          <div key={index} className={`segment ${segment.speaker.toLowerCase()}`}>
            <strong>{segment.speaker}:</strong>
            <p>{segment.text}</p>
          </div>
        ))}
      </div>
      
      <div className="key-takeaways">
        <h3>Key Takeaways</h3>
        <ul>
          {podcastScript.keyTakeaways.map((point: string, index: number) => (
            <li key={index}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
} 