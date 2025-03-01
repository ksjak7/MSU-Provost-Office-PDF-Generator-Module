import React, { useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import html2pdf from 'html-to-pdf-js';
import "./App.css"

export default function App() {
  const [pdfEditorContent, setPdfEditorContent] = useState('');

  const toolbarOptions = [
    [{ 'size': [ 'small', false, 'large', 'huge' ]}],
    ['bold', 'italic', 'underline', 'strike'],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    [
      { 'list': 'ordered' },
      { 'list': 'bullet' },
      { 'list': 'check' }
    ],
    
    ['blockquote', 'code-block'],
    ['link', 'image', 'formula'],
    
    ['clean']
  ];

  const generatePDF = () => {
    const quillEditor = document.querySelector('.ql-editor');
    html2pdf(quillEditor)
  };

  const handleChange = (content) => {
    setPdfEditorContent(content);
  };

  return (
    <div className="App">
      <ReactQuill
        className='pdfeditor'
        modules={
          {
              toolbar: toolbarOptions,
          }
        }
        theme="snow"
        value={pdfEditorContent}
        onChange={handleChange}
      />

      <form id="pdfForm">
        <button
          type="button"
          className={`btn-submit ${pdfEditorContent === '' || pdfEditorContent === '<p><br></p>' ? "disabledButton" : "enabledButton"}`}
          disabled={pdfEditorContent === '' || pdfEditorContent === '<p><br></p>'}
          onClick={generatePDF}
        >
          Generate PDF
        </button>
      </form>
    </div>
  );
}