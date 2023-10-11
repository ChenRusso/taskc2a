describe('PDF Comparison', () => {
  it('should compare two PDFs', () => {
    // Path to the PDF files
    const pdfPath1 = 'cypress/fixtures/Hello.pdf';
    const pdfPath2 = 'cypress/fixtures/World.pdf';

    // Function to extract text from a PDF
    const extractTextFromPDF = (pdfPath) => {
      return cy.readFile(pdfPath, { encoding: 'binary' }).then((pdfData) => {
        const typedArray = new Uint8Array(pdfData);
        const pdf = require('pdf-parse');
        return pdf(typedArray);
      });
    };

    // Extract text from the first PDF
    extractTextFromPDF(pdfPath1).then((pdf1Data) => {
      // Extract text from the second PDF
      extractTextFromPDF(pdfPath2).then((pdf2Data) => {
        // Compare the extracted text
        const pdf1Text = pdf1Data.text;
        const pdf2Text = pdf2Data.text;
        expect(pdf1Text).to.equal(pdf2Text);
      });
    });
  });
});
