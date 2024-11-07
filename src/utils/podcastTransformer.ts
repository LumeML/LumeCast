import { DialogueSegment, PodcastScript } from '../types';

export class PodcastTransformer {
  private static generateTopicIntro(text: string): string {
    const firstParagraph = text.split(/\n\n|\r\n\r\n/)[0];
    const keywords = this.extractKeywords(firstParagraph);
    return `${keywords.join(', ')}`;
  }

  private static extractKeywords(text: string): string[] {
    // Remove common words and extract key terms
    const commonWords = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by']);
    return text
      .toLowerCase()
      .split(/\W+/)
      .filter(word => 
        word.length > 3 && 
        !commonWords.has(word) &&
        !word.match(/^\d+$/)
      )
      .slice(0, 5);
  }

  private static generateQuestion(paragraph: string): string {
    const keyPhrase = this.extractKeyPhrase(paragraph);
    const questions = [
      `Could you elaborate on ${keyPhrase}? What makes this particularly interesting?`,
      `I'm curious about ${keyPhrase}. How does this impact the broader context?`,
      `Let's dive deeper into ${keyPhrase}. What are the key aspects our listeners should know about?`,
      `Many of our listeners might be wondering about ${keyPhrase}. Could you break this down for us?`,
      `That's fascinating! Could you tell us more about how ${keyPhrase} fits into the bigger picture?`
    ];
    return questions[Math.floor(Math.random() * questions.length)];
  }

  private static extractKeyPhrase(text: string): string {
    const sentences = text.split(/[.!?]+/);
    const firstSentence = sentences[0];
    const words = firstSentence.split(' ').slice(0, 8).join(' ');
    return words;
  }

  private static transformToAnswer(text: string): string {
    const fillers = [
      "That's an excellent question. ",
      "I'm glad you asked about that. ",
      "This is actually a fascinating topic. ",
      "Let me break this down for our listeners. ",
      "This is something I'm particularly passionate about. "
    ];
    const filler = fillers[Math.floor(Math.random() * fillers.length)];
    return `${filler}${text}`;
  }

  private static generateTransition(): string {
    const transitions = [
      "That's a really insightful perspective. Let's explore another aspect of this topic.",
      "Those are some excellent points. Building on that, I'd like to shift our focus slightly.",
      "This conversation is bringing up some fascinating insights. Let's delve into another related area.",
      "You've given our listeners a lot to think about. Now, I'd love to get your thoughts on a related topic.",
      "That's such valuable information for our audience. Let's connect this to another important aspect."
    ];
    return transitions[Math.floor(Math.random() * transitions.length)];
  }

  static transformText(text: string): PodcastScript {
    const segments: DialogueSegment[] = [];
    
    // Add introduction
    segments.push({
      speaker: 'Host',
      text: `Welcome to today's episode! I'm Jane, and we're diving into a fascinating discussion about ${this.generateTopicIntro(text)}. We're joined by an expert who'll help us understand this topic in depth.`,
      type: 'intro'
    });

    // Process main content
    const paragraphs = text
      .split(/\n\n|\r\n\r\n/)
      .filter(p => p.trim().length > 50); // Filter out short paragraphs
    
    for (const paragraph of paragraphs) {
      // Add question
      segments.push({
        speaker: 'Host',
        text: this.generateQuestion(paragraph),
        type: 'question'
      });

      // Add answer
      segments.push({
        speaker: 'Guest',
        text: this.transformToAnswer(paragraph),
        type: 'answer'
      });

      // Add occasional transitions (30% chance)
      if (Math.random() < 0.3) {
        segments.push({
          speaker: 'Host',
          text: this.generateTransition(),
          type: 'transition'
        });
      }
    }

    // Add closing statement
    segments.push({
      speaker: 'Host',
      text: "That brings us to the end of our discussion. Thank you for sharing your insights with us today. And to our listeners, thanks for joining us!",
      type: 'closing'
    });

    return {
      title: `Exploring ${this.generateTopicIntro(text)}`,
      segments,
      keyTakeaways: []
    };
  }
}