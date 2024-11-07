export interface DialogueSegment {
  speaker: 'Host' | 'Guest';
  text: string;
  type: 'intro' | 'question' | 'answer' | 'transition' | 'closing';
}

export interface PodcastScript {
  title: string;
  segments: DialogueSegment[];
  keyTakeaways: string[];
} 