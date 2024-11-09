function App() {
  const handleGetStarted = () => {
    // Updated URL to your deployed Gradio app
    window.location.href = 'https://huggingface.co/spaces/tmleyncodes/LumeCast';
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
          {/* Footer Section */}
          <footer className="mt-16 border-t border-gray-700 pt-8">
            <div className="grid md:grid-cols-3 gap-8 text-left">
              {/* About */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">LumeCast</h3>
                <p className="text-gray-400">
                  Transforming the way you consume written content through AI-powered podcast generation.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="https://github.com/yourusername/repository-name" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      GitHub Repository
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/yourusername/repository-name/issues" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      Report Issues
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contribute */}
              <div>
                <h3 className="text-xl font-semibold text-gray-200 mb-3">Contribute</h3>
                <p className="text-gray-400 mb-3">
                  Want to contribute? We welcome contributions of all kinds!
                </p>
                <a 
                  href="https://github.com/yourusername/repository-name/blob/main/CONTRIBUTING.md" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                  How to Contribute
                </a>
              </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
              <p>© 2024 LumeCast. All rights reserved.</p>
              <div className="mt-2 flex items-center justify-center space-x-4">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <i className="fab fa-github text-xl"></i> {/* Requires Font Awesome */}
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default App;
