import { Calendar, User, Tag, Edit2 } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '../types';

interface BlogCardProps {
  post: BlogPost;
  mode: 'view' | 'author';
  onEdit: (post: BlogPost) => void;
  onView: (post: BlogPost) => void;
}

export function BlogCard({ post, mode, onEdit, onView }: BlogCardProps) {
  return (
    <article className="card" style={{ cursor: 'pointer' }}>
      <div onClick={() => onView(post)}>
        <h2 style={{ 
          fontSize: '1.25rem', 
          fontWeight: '600', 
          marginBottom: '0.5rem',
          color: 'var(--foreground)'
        }}>
          {post.title}
        </h2>
        <p style={{ 
          color: 'var(--muted-foreground)', 
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          {post.excerpt}
        </p>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem', 
          fontSize: '0.875rem',
          color: 'var(--muted-foreground)',
          marginBottom: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <User size={14} />
            {post.author}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Calendar size={14} />
            {format(post.createdAt, 'MMM d, yyyy')}
          </div>
        </div>
        {post.tags.length > 0 && (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            <Tag size={14} color="var(--muted-foreground)" />
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: 'var(--accent-foreground)',
                    padding: '0.125rem 0.5rem',
                    borderRadius: 'var(--radius)',
                    fontSize: '0.75rem',
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
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)'
      }}>
        {mode === 'author' && (
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
        )}
        {mode === 'view' && <div />}
        {mode === 'author' && (
          <button 
            className="btn btn-secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(post);
            }}
          >
            <Edit2 size={14} />
            Edit
          </button>
        )}
      </div>
    </article>
  );
}