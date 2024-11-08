import gradio as gr
from gradio_client import Client, handle_file
import tempfile
import os

def convert_pdf_to_podcast(pdf_file, url, question, tone, length, language, use_advanced_audio):
    """Convert PDF to podcast using Hugging Face API"""
    try:
        # Save uploaded file to temporary location
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp_file:
            tmp_file.write(pdf_file)
            temp_path = tmp_file.name

        # Initialize client and make prediction
        client = Client("gabrielchua/open-notebooklm")
        result = client.predict(
            files=[handle_file(temp_path)],
            url=url,
            question=question,
            tone=tone,
            length=length,
            language=language,
            use_advanced_audio=use_advanced_audio,
            api_name="/generate_podcast"
        )

        # Clean up temp file
        os.unlink(temp_path)
        
        return result[0], result[1]  # Returns (audio_path, transcript)
    
    except Exception as e:
        return None, f"Error: {str(e)}"

# Create Gradio interface
with gr.Blocks(title="PDF to Podcast Generator") as demo:
    gr.Markdown("# PDF to Podcast Generator")
    
    with gr.Row():
        with gr.Column():
            # Input components
            pdf_input = gr.File(
                label="Upload your PDF",
                file_types=[".pdf"],
                type="binary"
            )
            
            url_input = gr.Textbox(
                label="URL (optional)",
                placeholder="Enter URL here...",
                value=""
            )
            
            question_input = gr.Textbox(
                label="Question or Topic",
                placeholder="What would you like to focus on?",
                value=""
            )
            
            tone_input = gr.Radio(
                label="Select Tone",
                choices=["Fun", "Formal"],
                value="Fun"
            )
            
            length_input = gr.Radio(
                label="Select Length",
                choices=["Short (1-2 min)", "Medium (3-5 min)"],
                value="Medium (3-5 min)"
            )
            
            language_input = gr.Dropdown(
                label="Select Language",
                choices=[
                    "English", "Spanish", "French", "German",
                    "Chinese", "Japanese", "Korean", "Hindi",
                    "Portuguese", "Russian", "Italian", "Turkish", "Polish"
                ],
                value="English"
            )
            
            advanced_audio = gr.Checkbox(
                label="Use Advanced Audio Generation",
                value=True
            )
            
            convert_btn = gr.Button("Convert to Podcast")
        
        with gr.Column():
            # Output components
            audio_output = gr.Audio(label="Generated Podcast")
            transcript_output = gr.Markdown(label="Transcript")
            status_output = gr.Textbox(label="Status", interactive=False)

    # Handle conversion
    convert_btn.click(
        fn=convert_pdf_to_podcast,
        inputs=[
            pdf_input,
            url_input,
            question_input,
            tone_input,
            length_input,
            language_input,
            advanced_audio
        ],
        outputs=[audio_output, transcript_output]
    )

# Launch the app
if __name__ == "__main__":
    demo.launch(share=True)