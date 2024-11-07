import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;


export async function extractText(file: File): Promise<string> {
  const fileType = file.type;
  
  try {
    if (fileType === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageText = textContent.items
          .map((item: any) => item.str)
          .join(' ');
        fullText += pageText + '\n';
      }
      
      return fullText;
    } 
    
    else if (
      fileType === 'application/msword' || 
      fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      // For DOC/DOCX files, we'll need to implement a different solution
      // or use a server-side approach
      throw new Error('DOC/DOCX processing is not yet implemented for browser-only solution');
    } 
    
    else if (fileType === 'text/plain') {
      return await file.text();
    }
    
    throw new Error('Unsupported file type');
  } catch (error) {
    console.error('Error extracting text:', error);
    throw error;
  }
}