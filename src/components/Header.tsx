import { PenTool, Eye, Edit } from 'lucide-react';

interface HeaderProps {
  mode: 'view' | 'author';
  onCreatePost: () => void;
  onModeChange: (mode: 'view' | 'author') => void;
}

export function Header({ mode, onCreatePost, onModeChange }: HeaderProps) {
  return (
    <header className="border-b" style={{ borderColor: 'var(--border)' }}>
      <div className="container">
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          padding: '1rem 0' 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <PenTool size={24} color="var(--primary)" />
            <h1 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '700', 
              color: 'var(--foreground)' 
            }}>
              ModernBlog
            </h1>
            <span style={{ 
              fontSize: '0.875rem', 
              color: 'var(--muted-foreground)',
              marginLeft: '0.5rem'
            }}>
              {mode === 'view' ? '(View Mode)' : '(Author Mode)'}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ 
              display: 'flex', 
              backgroundColor: 'var(--muted)', 
              borderRadius: '0.5rem',
              padding: '0.25rem'
            }}>
              <button
                className={`btn ${mode === 'view' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => onModeChange('view')}
                style={{ 
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.75rem',
                  minWidth: 'auto'
                }}
              >
                <Eye size={14} />
                View
              </button>
              <button
                className={`btn ${mode === 'author' ? 'btn-primary' : 'btn-ghost'}`}
                onClick={() => onModeChange('author')}
                style={{ 
                  fontSize: '0.875rem',
                  padding: '0.5rem 0.75rem',
                  minWidth: 'auto'
                }}
              >
                <Edit size={14} />
                Author
              </button>
            </div>
            
            {mode === 'author' && (
              <button className="btn btn-primary" onClick={onCreatePost}>
                <PenTool size={16} />
                New Post
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}