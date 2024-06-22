import React from 'react';

const PdfViewer = ({ pdfUrl }) => {
    return (
        <iframe
            src={pdfUrl}
            style={{ width: '100%', height: '100vh' }}
            title="PDF Viewer"
        />
    );
};

export default PdfViewer;
