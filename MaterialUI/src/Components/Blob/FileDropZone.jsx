import React, { useState } from 'react';

const FileDropZone = ({ className, onFileUpload }) => {
  const [dragging, setDragging] = useState(false);

  const handleDragEnter = () => setDragging(true);
  const handleDragLeave = () => setDragging(false);

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    
    const file = event.dataTransfer.files[0];
    if (file && typeof onFileUpload === 'function') {
      onFileUpload(file);
    }
  };

  return (
    <div
      className={`${className} ${dragging ? 'dragging' : ''}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {dragging ? 'Отпустите файл' : 'Перетащите файл сюда'}
    </div>
  );
};

export default FileDropZone;
