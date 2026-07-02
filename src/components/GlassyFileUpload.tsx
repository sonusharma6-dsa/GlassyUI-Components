import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, File, X, CheckCircle } from 'lucide-react';
import PageShell from './PageShell';
import { getGlassyClasses } from '../utils/glassy';

interface FileItem {
  name: string;
  size: string;
  type: string;
}

const GlassyFileUpload: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFiles = (fileList: FileList) => {
    const newFiles: FileItem[] = [];
    for (let i = 0; i < fileList.length; i += 1) {
      newFiles.push({
        name: fileList[i].name,
        size: formatBytes(fileList[i].size),
        type: fileList[i].type,
      });
    }
    setFiles(prev => [...prev, ...newFiles]);
    setUploaded(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const triggerUpload = () => {
    if (files.length === 0) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setUploaded(true);
      setFiles([]);
    }, 2000);
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex flex-col items-center w-full max-w-2xl mx-auto p-6 rounded-2xl relative'>
      {/* Drag & Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={onButtonClick}
        className={`${getGlassyClasses()} w-full p-8 border-2 border-dashed ${
          dragActive
            ? 'border-indigo-400 bg-white/10'
            : 'border-white/20 hover:bg-white/5'
        } rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 relative`}
      >
        <input
          ref={fileInputRef}
          type='file'
          multiple
          onChange={handleChange}
          className='hidden'
        />
        <Upload className='w-12 h-12 text-white/70 mb-4 animate-bounce' />
        <p className='text-white font-semibold text-lg mb-2'>
          Drag & drop your files here
        </p>
        <p className='text-white/50 text-sm'>or click to browse from device</p>
      </div>

      {/* Uploading Status */}
      {uploading && (
        <div className='w-full mt-4 flex items-center justify-center p-3 bg-white/5 rounded-lg border border-white/10'>
          <div className='w-5 h-5 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mr-3'></div>
          <span className='text-white/80 font-medium'>Uploading files...</span>
        </div>
      )}

      {/* Success Status */}
      {uploaded && (
        <div className='w-full mt-4 flex items-center justify-center p-3 bg-green-500/20 rounded-lg border border-green-500/30 text-green-300'>
          <CheckCircle className='w-5 h-5 mr-3' />
          <span className='font-medium'>All files uploaded successfully!</span>
        </div>
      )}

      {/* File List */}
      {files.length > 0 && (
        <div className='w-full mt-6 bg-white/5 rounded-xl border border-white/10 p-4'>
          <h3 className='text-white font-bold mb-3 flex items-center'>
            <File className='w-5 h-5 mr-2' /> Selected Files ({files.length})
          </h3>
          <div className='space-y-2 max-h-48 overflow-y-auto'>
            {files.map((file, idx) => (
              <div
                key={idx}
                className='flex items-center justify-between p-2 bg-white/5 rounded-lg border border-white/5 hover:bg-white/10 transition-colors'
              >
                <div className='flex items-center space-x-3 overflow-hidden'>
                  <File className='w-4 h-4 text-indigo-300 flex-shrink-0' />
                  <span className='text-white/90 text-sm truncate max-w-xs'>
                    {file.name}
                  </span>
                  <span className='text-white/40 text-xs flex-shrink-0'>
                    {file.size}
                  </span>
                </div>
                <button
                  onClick={e => {
                    e.stopPropagation();
                    removeFile(idx);
                  }}
                  className='p-1 hover:bg-white/10 rounded-full text-white/50 hover:text-white'
                >
                  <X className='w-4 h-4' />
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={e => {
              e.stopPropagation();
              triggerUpload();
            }}
            className='w-full mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors'
          >
            Upload to Server
          </button>
        </div>
      )}
    </div>
  );
};

const FileUploadDetailsPage: React.FC = () => {
  const navigate = useNavigate();

  const basicUsageCode = `import { GlassyFileUpload } from 'glassyui';

function Example() {
  return (
    <GlassyFileUpload
      onUpload={(files) => console.log('Uploading files:', files)}
    />
  );
}`;

  return (
    <PageShell>
      <button
        onClick={() => navigate('/components')}
        className={`mb-8 flex items-center ${getGlassyClasses(10)} px-4 py-2 hover:bg-white/40 transition-all duration-300 text-white`}
      >
        <ArrowLeft size={20} className='mr-2' />
        Back to Components
      </button>

      <h1 className='text-4xl font-bold mb-4 text-white'>File Upload</h1>
      <p className='text-lg mb-8 text-white/70'>
        A premium drag-and-drop file upload component featuring a frosted glass
        background aesthetic and dash boundary styling.
      </p>

      {/* Interactive Demo */}
      <div className={`${getGlassyClasses()} p-6 mb-8`}>
        <h2 className='text-2xl font-bold mb-6 text-white'>Interactive Demo</h2>
        <div className='flex justify-center p-8 bg-white/5 rounded-xl'>
          <GlassyFileUpload />
        </div>
      </div>

      {/* Basic Usage */}
      <div className={`${getGlassyClasses()} p-6 mb-8 relative`}>
        <h2 className='text-2xl font-bold mb-6 text-white'>Basic Usage</h2>
        <div className='relative'>
          <pre className='bg-white/5 text-white/90 p-6 rounded-lg overflow-x-auto whitespace-pre-wrap max-sm:text-[0.55rem]'>
            {basicUsageCode}
          </pre>
        </div>
      </div>
    </PageShell>
  );
};

export default FileUploadDetailsPage;
