import { PenTool } from 'lucide-react';

interface HeaderProps {
  onCreatePost: () => void;
}

export function Header({ onCreatePost }: HeaderProps) {
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
          </div>
          <button className="btn btn-primary" onClick={onCreatePost}>
            <PenTool size={16} />
            New Post
          </button>
        </div>
      </div>
    </header>
  );
}