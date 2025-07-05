import { X, Calendar, User, Tag, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '../types';

interface BlogViewProps {
  post: BlogPost;
  onClose: () => void;
  onEdit: (post: BlogPost) => void;
}

export function BlogView({ post, onClose, onEdit }: BlogViewProps) {
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
          alignItems: 'flex-start',
          marginBottom: '1.5rem'
        }}>
          <div style={{ flex: 1 }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              marginBottom: '1rem',
              lineHeight: '1.2'
            }}>
              {post.title}
            </h1>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              fontSize: '0.875rem',
              color: 'var(--muted-foreground)',
              marginBottom: '1rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <User size={16} />
                {post.author}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Calendar size={16} />
                {format(post.createdAt, 'MMMM d, yyyy')}
              </div>
              <span style={{
                backgroundColor: post.published ? '#10b981' : '#f59e0b',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: 'var(--radius)',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {post.published ? 'Published' : 'Draft'}
              </span>
            </div>
            {post.tags.length > 0 && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.5rem',
                marginBottom: '1.5rem'
              }}>
                <Tag size={16} color="var(--muted-foreground)" />
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: 'var(--accent)',
                        color: 'var(--accent-foreground)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: 'var(--radius)',
                        fontSize: '0.875rem',
                        fontWeight: '500'
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => onEdit(post)}
              className="btn btn-secondary"
            >
              <Edit2 size={16} />
              Edit
            </button>
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--muted-foreground)',
                padding: '0.5rem'
              }}
            >
              <X size={24} />
            </button>
          </div>
        </div>

        <div style={{
          lineHeight: '1.7',
          fontSize: '1rem',
          color: 'var(--foreground)'
        }}>
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} style={{ marginBottom: '1rem' }}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}