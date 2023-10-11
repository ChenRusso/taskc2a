const fs = require('fs');
const pdf = require('pdf-parse');

async function readPDF(filePath) {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdf(dataBuffer);
    return data.text;
  } catch (error) {
    console.error('Error reading PDF:', error);
    throw error;
  }
}

async function comparePDFs(pdfFile1, pdfFile2) {
  try {
    const text1 = await readPDF(pdfFile1);
    const text2 = await readPDF(pdfFile2);

    return text1 === text2;
  } catch (error) {
    console.error('Error comparing PDFs:', error);
    throw error;
  }
}

const pdfFile1 = 'pdf/Hi.pdf';
const pdfFile2 = 'pdf/Hi.pdf';

comparePDFs(pdfFile1, pdfFile2)
  .then(areIdentical => {
    if (areIdentical) {
      console.log('The PDF files are identical.');
    } else {
      console.log('The PDF files are not identical.');
    }
  })
  .catch(error => console.error('An error occurred:', error));






