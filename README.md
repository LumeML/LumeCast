# LumeCast
<div align="center">
  <!-- <img src="public/lumecast-logo.png" alt="LumeCast Logo" width="200"/> -->
  <h1>LumeCast</h1>
  <p>Transform Documents into Engaging Podcast Conversations</p>

  [![Deployment Status](https://img.shields.io/badge/deployment-live-brightgreen)](https://lumecast.vercel.app/)
  [![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
  [![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
  [![Gradio](https://img.shields.io/badge/Gradio-4.19.2-orange)](https://gradio.app/)
</div>

---

## 🎙️ About LumeCast

LumeCast is an innovative AI-powered platform that transforms documents into engaging podcast conversations. Built with cutting-edge technology, it converts PDF documents into natural-sounding dialogues, making content consumption more engaging and accessible.

### 🌟 Key Features

- **PDF to Podcast Conversion**: Transform any PDF document into a dynamic podcast conversation
- **Multi-Language Support**: Generate podcasts in multiple languages
- **Customizable Tone**: Choose between fun and formal conversation styles
- **Flexible Duration**: Options for short (1-2 min) and medium (3-5 min) podcasts
- **Advanced Audio Generation**: High-quality, natural-sounding voice synthesis

## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or higher)
- npm or yarn
- Python 3.9+ (for Gradio backend)

### Installation

1. Clone the repository
```bash
https://github.com/LumeML/LumeCast.git
cd LumeCast
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Start the development server
```bash
npm run dev
```

## 🛠️ Technology Stack

### Frontend
- React 18.x
- TypeScript
- Tailwind CSS
- Vite

### Backend
- Gradio
- Python
- Hugging Face Transformers
- Advanced Audio Processing Libraries

## 📖 Documentation

For detailed documentation, please visit our [API Documentation](api-documentation.MD).

### API Reference

The LumeCast API is built on Gradio and hosted on Hugging Face Spaces. Access the API and the deployment of the ML Model at:
```
https://huggingface.co/spaces/tmleyncodes/LumeCast
```

## 🔧 Configuration

### Environment Variables

```env
VITE_APP_TITLE=LumeCast
VITE_APP_DESCRIPTION=Transform Documents into Engaging Podcasts
VITE_GRADIO_URL=https://huggingface.co/spaces/tmleyncodes/LumeCast
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📈 Performance Metrics

- Average Processing Time: ~2 minutes per document
- Supported File Formats: PDF [Working on the other formats as well]
- Maximum File Size: 10MB
- Supported Languages: 13+ languages

## 🔐 Security

LumeCast takes security seriously. We implement:
- Secure file handling
- API authentication
- Data encryption
- Regular security audits

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Hugging Face](https://huggingface.co/) for hosting our model
- [Gradio](https://gradio.app/) for the backend framework
- All our contributors and supporters

---

<div align="center">
  <sub>Built by team of LumeML</sub>
</div>
