/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useCallback, useRef } from 'react';
import {
  Container,
  TextField,
  FormControl,
  Paper,
  Typography,
  Chip,
  Button,
} from '@material-ui/core';
import { AttachFile } from '@material-ui/icons';
import { useDropzone } from 'react-dropzone';
import LinearProgressWithLabel from '../../component/linearProgress';
import { useSend } from '../../api';

const dropStyle = {
  height: 300,
  outline: 'none',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '1rem 0',
  padding: '1rem',
};

const UploadFileView = () => {
  const { send, progress } = useSend('software_versions');
  const version = useRef();
  const [file, setFile] = useState(null);
  const onDrop = useCallback(([acceptedFile]) => setFile(acceptedFile), []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: '.bin',
    maxFiles: 1,
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('version', version.current.value);
    formData.append('file', file);
    console.log(formData);
    send(formData);
  };
  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <FormControl fullWidth>
          <TextField label="Version Name" inputRef={version} />
        </FormControl>
        <Paper style={dropStyle} variant="outlined" {...getRootProps()}>
          <input {...getInputProps()} />
          <Typography color="textSecondary" align="center" variant="h5">
            {isDragActive
              ? 'Drop the file here...'
              : 'Drag the file here, or click to select the file'}
          </Typography>
        </Paper>
        {file && (
          <Chip
            label={file.name}
            variant="outlined"
            color="primary"
            onDelete={() => setFile(null)}
            icon={<AttachFile />}
          />
        )}
        {progress ? <LinearProgressWithLabel value={progress} /> : null}
        <Button type="submit" variant="contained" color="primary">
          Upload
        </Button>
      </form>
    </Container>
  );
};
export default UploadFileView;
