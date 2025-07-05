import { useState, useRef } from 'react';
import { Image } from 'lucide-react';

interface ImageUploadProps {
  onImageInsert: (imageHtml: string) => void;
}

export function ImageUpload({ onImageInsert }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      alert('Image size must be less than 5MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        const imageHtml = `<img src="${result}" alt="${file.name}" style="max-width: 100%; height: auto; margin: 1rem 0;" />`;
        onImageInsert(imageHtml);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={(e) => handleFileSelect(e.target.files)}
        style={{ display: 'none' }}
      />
      
      <div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        style={{
          border: `2px dashed ${dragOver ? 'var(--primary)' : 'var(--border)'}`,
          borderRadius: 'var(--radius)',
          padding: '2rem',
          textAlign: 'center',
          cursor: 'pointer',
          backgroundColor: dragOver ? 'var(--accent)' : 'var(--muted)',
          transition: 'all 0.2s ease',
          margin: '0.5rem 0'
        }}
      >
        <Image size={32} color="var(--muted-foreground)" style={{ margin: '0 auto 0.5rem' }} />
        <p style={{ color: 'var(--muted-foreground)', margin: 0 }}>
          {dragOver ? 'Drop image here' : 'Click or drag image to upload'}
        </p>
        <p style={{ 
          color: 'var(--muted-foreground)', 
          fontSize: '0.75rem', 
          margin: '0.25rem 0 0 0' 
        }}>
          Max size: 5MB • PNG, JPG, GIF
        </p>
      </div>
    </div>
  );
}