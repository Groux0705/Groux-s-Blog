import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  itemsPerPage: number;
  totalItems: number;
}

export function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems 
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      if (start > 1) {
        pages.push(1);
        if (start > 2) pages.push('...');
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      if (end < totalPages) {
        if (end < totalPages - 1) pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 0',
      borderTop: '1px solid var(--border)',
      marginTop: '2rem'
    }}>
      <div style={{
        fontSize: '0.875rem',
        color: 'var(--muted-foreground)'
      }}>
        Showing {startItem}-{endItem} of {totalItems} posts
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem 0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--background)',
            color: currentPage === 1 ? 'var(--muted-foreground)' : 'var(--foreground)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          <ChevronLeft size={16} />
          Previous
        </button>
        
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          {getPageNumbers().map((page, index) => (
            page === '...' ? (
              <span
                key={`ellipsis-${index}`}
                style={{
                  padding: '0.5rem 0.75rem',
                  color: 'var(--muted-foreground)',
                  fontSize: '0.875rem'
                }}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                style={{
                  padding: '0.5rem 0.75rem',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius)',
                  backgroundColor: currentPage === page ? 'var(--primary)' : 'var(--background)',
                  color: currentPage === page ? 'white' : 'var(--foreground)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  minWidth: '40px'
                }}
              >
                {page}
              </button>
            )
          ))}
        </div>
        
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            padding: '0.5rem 0.75rem',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius)',
            backgroundColor: 'var(--background)',
            color: currentPage === totalPages ? 'var(--muted-foreground)' : 'var(--foreground)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            fontSize: '0.875rem'
          }}
        >
          Next
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}