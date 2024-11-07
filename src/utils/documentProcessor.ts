import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `${window.location.origin}/node_modules/pdfjs-dist/build/pdf.worker.min.mjs`;


export async function extractText(file: File): Promise<string> {
  const fileType = file.type;
  
  try {
    if (fileType === 'application/pdf') {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';
      
      // Process pages in parallel for faster extraction
      const pagePromises = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        pagePromises.push(
          pdf.getPage(i).then(async page => {
            const textContent = await page.getTextContent();
            return textContent.items
              .map((item: any) => item.str)
              .join(' ');
          })
        );
      }
      
      const pageTexts = await Promise.all(pagePromises);
      fullText = pageTexts.join('\n');
      
      return fullText;
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