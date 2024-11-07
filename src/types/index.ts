export interface DialogueSegment {
  speaker: 'Host' | 'Guest';
  text: string;
  type: 'intro' | 'topic_intro' | 'question' | 'answer' | 'discussion' | 'transition' | 'summary' | 'closing';
}

export interface PodcastScript {
  title: string;
  segments: DialogueSegment[];
  keyTakeaways: string[];
} 