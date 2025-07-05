import { useState, useEffect, useRef } from 'react';
import { X, Save, Bold, Italic, Underline, List, Link, Image } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import type { BlogPost, NewBlogPost } from '../types';

interface BlogFormProps {
  post?: BlogPost;
  onSave: (post: NewBlogPost) => void;
  onCancel: () => void;
}

export function BlogForm({ post, onSave, onCancel }: BlogFormProps) {
  const [formData, setFormData] = useState<NewBlogPost>({
    title: '',
    content: '',
    author: '',
    tags: [],
    published: false
  });
  const [tagInput, setTagInput] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        tags: post.tags,
        published: post.published
      });
      if (editorRef.current) {
        editorRef.current.innerHTML = post.content;
      }
    }
  }, [post]);

  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (!formData.author.trim()) {
      newErrors.author = 'Author is required';
    } else if (formData.author.length < 2) {
      newErrors.author = 'Author name must be at least 2 characters';
    } else if (formData.author.length > 100) {
      newErrors.author = 'Author name must be less than 100 characters';
    }
    
    const textContent = editorRef.current?.textContent || '';
    if (!textContent.trim()) {
      newErrors.content = 'Content is required';
    } else if (textContent.length < 10) {
      newErrors.content = 'Content must be at least 10 characters';
    } else if (textContent.length > 10000) {
      newErrors.content = 'Content must be less than 10,000 characters';
    }
    
    if (formData.tags.length > 10) {
      newErrors.tags = 'Maximum 10 tags allowed';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }
    
    try {
      const content = editorRef.current?.innerHTML || formData.content;
      
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate save delay
      
      onSave({
        ...formData,
        content
      });
    } catch (error) {
      console.error('Error saving post:', error);
      setErrors({ submit: 'Failed to save post. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatText = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setFormData(prev => ({
        ...prev,
        content: editorRef.current!.innerHTML
      }));
    }
  };

  const handleEditorInput = () => {
    if (editorRef.current) {
      setFormData(prev => ({
        ...prev,
        content: editorRef.current!.innerHTML
      }));
    }
  };

  const handleImageInsert = (imageHtml: string) => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = imageHtml;
        const imageNode = tempDiv.firstChild;
        if (imageNode) {
          range.insertNode(imageNode);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      } else {
        editorRef.current.innerHTML += imageHtml;
      }
      handleEditorInput();
    }
    setShowImageUpload(false);
  };

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    
    if (!trimmedTag) return;
    
    if (formData.tags.includes(trimmedTag)) {
      setErrors(prev => ({ ...prev, tags: 'Tag already exists' }));
      return;
    }
    
    if (formData.tags.length >= 10) {
      setErrors(prev => ({ ...prev, tags: 'Maximum 10 tags allowed' }));
      return;
    }
    
    if (trimmedTag.length > 30) {
      setErrors(prev => ({ ...prev, tags: 'Tag must be less than 30 characters' }));
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, trimmedTag]
    }));
    setTagInput('');
    setErrors(prev => ({ ...prev, tags: '' }));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      zIndex: 1000
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '800px',
        maxHeight: '90vh',
        overflow: 'auto'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1.5rem'
        }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
          <button
            onClick={onCancel}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--muted-foreground)'
            }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="input"
              placeholder="Enter post title..."
              style={{
                borderColor: errors.title ? '#ef4444' : undefined
              }}
              maxLength={200}
            />
            {errors.title && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.title}
              </p>
            )}
            <p style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: '0.75rem', 
              marginTop: '0.25rem' 
            }}>
              {formData.title.length}/200 characters
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Author
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => handleInputChange('author', e.target.value)}
              className="input"
              placeholder="Enter author name..."
              style={{
                borderColor: errors.author ? '#ef4444' : undefined
              }}
              maxLength={100}
            />
            {errors.author && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.author}
              </p>
            )}
            <p style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: '0.75rem', 
              marginTop: '0.25rem' 
            }}>
              {formData.author.length}/100 characters
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Tags
            </label>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                className="input"
                placeholder="Add a tag..."
                style={{ 
                  flex: 1,
                  borderColor: errors.tags ? '#ef4444' : undefined
                }}
                maxLength={30}
              />
              <button
                type="button"
                onClick={addTag}
                className="btn btn-secondary"
              >
                Add
              </button>
            </div>
            {formData.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {formData.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      backgroundColor: 'var(--accent)',
                      color: 'var(--accent-foreground)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius)',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: 'var(--muted-foreground)',
                        padding: 0,
                        lineHeight: 1
                      }}
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
            {errors.tags && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.tags}
              </p>
            )}
            <p style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: '0.75rem', 
              marginTop: '0.25rem' 
            }}>
              {formData.tags.length}/10 tags
            </p>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Content
            </label>
            
            {/* Rich Text Editor Toolbar */}
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              padding: '0.5rem',
              borderBottom: '1px solid var(--border)',
              backgroundColor: 'var(--muted)',
              borderTopLeftRadius: 'var(--radius)',
              borderTopRightRadius: 'var(--radius)'
            }}>
              <button
                type="button"
                onClick={() => formatText('bold')}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <Bold size={16} />
              </button>
              <button
                type="button"
                onClick={() => formatText('italic')}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <Italic size={16} />
              </button>
              <button
                type="button"
                onClick={() => formatText('underline')}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <Underline size={16} />
              </button>
              <button
                type="button"
                onClick={() => formatText('insertUnorderedList')}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <List size={16} />
              </button>
              <button
                type="button"
                onClick={() => {
                  const url = prompt('Enter URL:');
                  if (url) formatText('createLink', url);
                }}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <Link size={16} />
              </button>
              <button
                type="button"
                onClick={() => setShowImageUpload(!showImageUpload)}
                style={{
                  padding: '0.25rem 0.5rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: showImageUpload ? 'var(--accent)' : 'var(--background)',
                  cursor: 'pointer'
                }}
              >
                <Image size={16} />
              </button>
            </div>

            {/* Image Upload */}
            {showImageUpload && (
              <ImageUpload onImageInsert={handleImageInsert} />
            )}

            {/* Rich Text Editor */}
            <div
              ref={editorRef}
              contentEditable={true}
              onInput={handleEditorInput}
              style={{
                minHeight: '300px',
                padding: '1rem',
                border: `1px solid ${errors.content ? '#ef4444' : 'var(--border)'}`,
                borderTop: showImageUpload ? `1px solid ${errors.content ? '#ef4444' : 'var(--border)'}` : 'none',
                borderBottomLeftRadius: 'var(--radius)',
                borderBottomRightRadius: 'var(--radius)',
                backgroundColor: 'var(--background)',
                fontSize: '0.875rem',
                lineHeight: '1.5',
                outline: 'none'
              }}
              suppressContentEditableWarning={true}
              data-placeholder="Write your blog post content..."
            />
            {errors.content && (
              <p style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                {errors.content}
              </p>
            )}
            <p style={{ 
              color: 'var(--muted-foreground)', 
              fontSize: '0.75rem', 
              marginTop: '0.25rem' 
            }}>
              {(editorRef.current?.textContent || '').length}/10,000 characters
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              id="published"
              checked={formData.published}
              onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
            />
            <label htmlFor="published" style={{ fontWeight: '500' }}>
              Publish immediately
            </label>
          </div>

          {errors.submit && (
            <div style={{
              padding: '0.75rem',
              backgroundColor: '#fef2f2',
              borderLeft: '4px solid #ef4444',
              color: '#dc2626',
              fontSize: '0.875rem'
            }}>
              {errors.submit}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button 
              type="button" 
              onClick={onCancel} 
              className="btn btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.6 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              <Save size={16} />
              {isSubmitting ? 'Saving...' : (post ? 'Update' : 'Save')} Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}