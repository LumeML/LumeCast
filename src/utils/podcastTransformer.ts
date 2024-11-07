import { DialogueSegment, PodcastScript } from '../types';
import { TextProcessor } from './textProcessor';

export class PodcastTransformer {
  private static readonly SEGMENT_TYPES = {
    INTRO: 'intro' as const,
    TOPIC_INTRO: 'topic_intro' as const,
    QUESTION: 'question' as const,
    ANSWER: 'answer' as const,
    DISCUSSION: 'discussion' as const,
    TRANSITION: 'transition' as const,
    SUMMARY: 'summary' as const,
    CLOSING: 'closing' as const
  };

  private static generateIntro(topics: string[]): DialogueSegment {
    return {
      speaker: 'Host',
      text: `Welcome to today's episode! I'm Sarah, and we're exploring ${topics.join(', ')}. 
      Joining us today is Dr. Alex Thompson, an expert in these areas. 
      We'll be diving deep into these topics and understanding their real-world implications.`,
      type: this.SEGMENT_TYPES.INTRO
    };
  }

  private static generateQuestions(text: string): string[] {
    const baseQuestions = [
      `Could you explain ${text} in simple terms for our listeners?`,
      `What are the key implications of ${text}?`,
      `How does ${text} impact the broader context?`,
      `What's your perspective on ${text}?`,
      `Could you share some real-world examples of ${text}?`,
      `What are the common misconceptions about ${text}?`,
      `How has your experience with ${text} shaped your understanding?`,
      `What future developments do you anticipate regarding ${text}?`,
      `What challenges are commonly associated with ${text}?`,
      `How can our listeners apply this knowledge about ${text} in their lives?`
    ];

    return baseQuestions.sort(() => Math.random() - 0.5).slice(0, 2);
  }

  private static generateTransition(): string {
    const transitions = [
      "That's fascinating! Let's explore another aspect of this topic.",
      "Those insights are really valuable. Building on that, I'd like to discuss...",
      "This raises an interesting point about...",
      "That's a crucial perspective. It reminds me of another aspect we should discuss...",
      "Our listeners will find that interesting. Speaking of which..."
    ];
    return transitions[Math.floor(Math.random() * transitions.length)];
  }

  static transformText(text: string): PodcastScript {
    const cleanText = TextProcessor.cleanText(text);
    const mainTopics = TextProcessor.extractMainTopics(cleanText);
    const paragraphs = TextProcessor.splitIntoParagraphs(cleanText);
    const segments: DialogueSegment[] = [];

    // Add introduction
    segments.push(this.generateIntro(mainTopics));

    // Process each paragraph
    paragraphs.forEach((paragraph, index) => {
      const summary = TextProcessor.summarizeParagraph(paragraph);
      const questions = this.generateQuestions(mainTopics[index % mainTopics.length]);

      // Add first question
      segments.push({
        speaker: 'Host',
        text: questions[0],
        type: this.SEGMENT_TYPES.QUESTION
      });

      // Add answer
      segments.push({
        speaker: 'Guest',
        text: summary,
        type: this.SEGMENT_TYPES.ANSWER
      });

      // Add follow-up discussion
      if (questions[1]) {
        segments.push({
          speaker: 'Host',
          text: questions[1],
          type: this.SEGMENT_TYPES.DISCUSSION
        });

        // Add guest's extended response
        segments.push({
          speaker: 'Guest',
          text: `That's an excellent question. ${paragraph}`,
          type: this.SEGMENT_TYPES.DISCUSSION
        });
      }

      // Add transition (70% chance)
      if (Math.random() < 0.7 && index < paragraphs.length - 1) {
        segments.push({
          speaker: 'Host',
          text: this.generateTransition(),
          type: this.SEGMENT_TYPES.TRANSITION
        });
      }
    });

    // Add closing
    segments.push({
      speaker: 'Host',
      text: `This has been an incredibly insightful discussion about ${mainTopics.join(', ')}. 
      Thank you, Dr. Thompson, for sharing your expertise with us today. 
      To our listeners, thanks for joining us. Don't forget to subscribe for more in-depth conversations like this one!`,
      type: this.SEGMENT_TYPES.CLOSING
    });

    return {
      title: `Exploring ${mainTopics.join(', ')}: An Expert's Perspective`,
      segments,
      keyTakeaways: mainTopics
    };
  }
}