import React, { useState } from 'react';
import { FileText, Loader2, Volume2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import AudioPlayer from './components/AudioPlayer';
import { extractText } from './utils/documentProcessor';
import { textToSpeech } from './utils/ttsProcessor';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [extractedText, setExtractedText] = useState('');
  const [error, setError] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError('');
    setAudioUrl('');
    setExtractedText('');
    
    try {
      const text = await extractText(file);
      setExtractedText(text);

      const audioUrl = await textToSpeech(text.slice(0, 1000));
      setAudioUrl(audioUrl);
    } catch (error: any) {
      console.error('Error processing file:', error);
      setError(error.message || 'Failed to process document. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Document to Podcast Converter
            </h1>
            <p className="text-lg text-gray-600">
              Transform your documents into engaging audio content
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Upload Your Document
              </h2>
              <FileUpload onFileSelect={handleFileSelect} />
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-8">
                {error}
              </div>
            )}

            {isProcessing && (
              <div className="flex items-center justify-center space-x-3 text-blue-600 my-8">
                <Loader2 className="w-6 h-6 animate-spin" />
                <span className="font-medium">Processing your document...</span>
              </div>
            )}

            {audioUrl && !isProcessing && (
              <div className="space-y-8">
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Volume2 className="w-6 h-6 mr-2" />
                    Generated Audio
                  </h2>
                  <AudioPlayer
                    audioUrl={audioUrl}
                    isPlaying={isPlaying}
                    onPlayPause={() => setIsPlaying(!isPlaying)}
                    onRestart={() => setIsPlaying(false)}
                  />
                </div>

                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <FileText className="w-6 h-6 mr-2" />
                    Extracted Text
                  </h2>
                  <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
                    <p className="text-gray-700 whitespace-pre-wrap">{extractedText}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;