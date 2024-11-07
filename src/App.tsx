import { useState } from 'react';
import { FileText, Loader2 } from 'lucide-react';
import FileUpload from './components/FileUpload';
import { extractText } from './utils/documentProcessor';
import { PodcastTransformer } from './utils/podcastTransformer';
import { DialogueSegment } from './types';

function App() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [podcastScript, setPodcastScript] = useState<DialogueSegment[]>([]);

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setError('');
    setPodcastScript([]);
    setProgress(0);
    
    try {
      // Extract text from document
      const text = await extractText(file);
      setProgress(50);

      // Transform to podcast format
      const script = PodcastTransformer.transformText(text);
      setPodcastScript(script.segments);
      setProgress(100);

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
              Document to Podcast Script Converter
            </h1>
            <p className="text-lg text-gray-600">
              Transform your documents into engaging podcast conversations
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
              <div className="space-y-2">
                <div className="flex items-center justify-center space-x-3 text-blue-600 my-8">
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span className="font-medium">Processing your document... {progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {!isProcessing && podcastScript.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-6 h-6 mr-2" />
                  Podcast Script
                </h2>
                <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  {podcastScript.map((segment, index) => (
                    <div 
                      key={index} 
                      className={`mb-4 p-3 rounded ${
                        segment.speaker === 'Host' 
                          ? 'bg-blue-50' 
                          : 'bg-green-50'
                      }`}
                    >
                      <strong className="block text-sm text-gray-600 mb-1">
                        {segment.speaker}:
                      </strong>
                      <p className="text-gray-700">{segment.text}</p>
                    </div>
                  ))}
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