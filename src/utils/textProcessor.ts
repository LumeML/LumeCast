export class TextProcessor {
  static cleanText(text: string): string {
    return text
      .replace(/\s+/g, ' ')                // Remove extra whitespace
      .replace(/[^\w\s.,!?-]/g, '')        // Remove special characters
      .replace(/\b(?:https?|ftp):\/\/\S+/g, '') // Remove URLs
      .trim();
  }

  static splitIntoParagraphs(text: string): string[] {
    return text
      .split(/\n\n|\r\n\r\n/)
      .map(p => p.trim())
      .filter(p => p.length > 50);  // Remove very short paragraphs
  }

  static extractMainTopics(text: string): string[] {
    const commonWords = new Set([
      'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'i', 'it', 
      'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at', 'this', 'but',
      'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she', 'or', 'an', 'will',
      'my', 'one', 'all', 'would', 'there', 'their', 'what', 'so', 'up', 'out',
      'if', 'about', 'who', 'get', 'which', 'go', 'me'
    ]);

    // Split text into words and count frequencies
    const wordFrequency = new Map<string, number>();
    const words = text.toLowerCase().split(/\W+/);

    words.forEach(word => {
      if (word.length > 3 && !commonWords.has(word)) {
        wordFrequency.set(word, (wordFrequency.get(word) || 0) + 1);
      }
    });

    // Sort by frequency and get top topics
    return Array.from(wordFrequency.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word]) => word);
  }

  static summarizeParagraph(paragraph: string): string {
    const sentences = paragraph.split(/[.!?]+/).filter(s => s.trim().length > 0);
    if (sentences.length <= 2) return paragraph;
    
    // Get first and last sentences, plus a middle one if available
    const summary = [
      sentences[0],
      sentences[Math.floor(sentences.length / 2)],
      sentences[sentences.length - 1]
    ].join('. ');

    return summary + '.';
  }
} 