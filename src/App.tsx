import { useState } from 'react';

function App() {
  const handleGetStarted = () => {
    // Replace this URL with your deployed Gradio app URL
    window.location.href = 'https://gabrielchua-open-notebooklm.hf.space';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-16">
            <h1 className="text-5xl font-bold text-gray-100 mb-6">
              Transform Documents into Engaging Podcasts
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Convert your PDFs into natural-sounding podcast conversations using advanced AI technology
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300 transform hover:scale-105"
            >
              Get Started
            </button>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-4xl mb-4">📄</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                PDF Support
              </h3>
              <p className="text-gray-400">
                Upload any PDF document and convert it into a podcast
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-4xl mb-4">🎙️</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Natural Conversations
              </h3>
              <p className="text-gray-400">
                AI-powered dialogue generation for engaging content
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="text-blue-400 text-4xl mb-4">🌐</div>
              <h3 className="text-xl font-semibold text-gray-200 mb-2">
                Multiple Languages
              </h3>
              <p className="text-gray-400">
                Support for various languages and customizable tones
              </p>
            </div>
          </div>

          {/* How It Works Section */}
          <div className="text-left mb-16">
            <h2 className="text-3xl font-bold text-gray-100 mb-8 text-center">
              How It Works
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    Upload Your Document
                  </h3>
                  <p className="text-gray-400">
                    Simply upload your PDF file to our platform
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    Customize Settings
                  </h3>
                  <p className="text-gray-400">
                    Choose your preferred tone, length, and language
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-200 mb-2">
                    Generate Podcast
                  </h3>
                  <p className="text-gray-400">
                    Get your AI-generated podcast in minutes
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Ready to Convert Your Documents?
            </h2>
            <p className="text-gray-300 mb-6">
              Transform your content into engaging podcast conversations today
            </p>
            <button
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 transform hover:scale-105"
            >
              Get Started Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;