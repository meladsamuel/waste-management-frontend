/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const onDrop = useCallback(([acceptedFile]) => setFile(acceptedFile), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ['.bin', '.hex'],
    maxFiles: 1,
  });
  return (
    <div>
      <div {...getRootProps()}>
        <input style={{ height: 200 }} {...getInputProps()} />
        <p>
          {isDragActive
            ? 'Drop the file here...'
            : 'Drag the file here, or click to select the file'}
        </p>
      </div>
      <div>{file && file.name}</div>
    </div>
  );
};
export default FileUpload;
