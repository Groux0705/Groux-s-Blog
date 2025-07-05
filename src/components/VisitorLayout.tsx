import { useState, useEffect } from 'react';
import { Search, PenTool } from 'lucide-react';
import { BlogCard } from './BlogCard';
import { BlogView } from './BlogView';
import { Pagination } from './Pagination';
import type { BlogPost } from '../types';
import { loadPosts } from '../utils/storage';

export function VisitorLayout() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [viewingPost, setViewingPost] = useState<BlogPost | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  useEffect(() => {
    const loadedPosts = loadPosts();
    // Only show published posts for visitors
    const publishedPosts = loadedPosts.filter(post => post.published);
    setPosts(publishedPosts);
    setFilteredPosts(publishedPosts);
  }, []);

  useEffect(() => {
    let filtered = posts;

    if (searchQuery) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setFilteredPosts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [posts, searchQuery, selectedTag]);

  const handleViewPost = (post: BlogPost) => {
    setViewingPost(post);
  };

  const handleCloseView = () => {
    setViewingPost(undefined);
  };

  const allTags = Array.from(new Set(posts.flatMap(post => post.tags))).sort();

  // Pagination calculations
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)' }}>
      {/* Visitor Header */}
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
            <nav style={{ display: 'flex', gap: '1rem' }}>
              <a
                href="/admin"
                style={{
                  color: 'var(--muted-foreground)',
                  textDecoration: 'none',
                  fontSize: '0.875rem'
                }}
              >
                Admin
              </a>
            </nav>
          </div>
        </div>
      </header>
      
      <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div style={{ 
          display: 'flex', 
          gap: '1rem', 
          marginBottom: '2rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
            <Search 
              size={20} 
              style={{ 
                position: 'absolute', 
                left: '0.75rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                color: 'var(--muted-foreground)'
              }}
            />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input"
              style={{ paddingLeft: '2.5rem' }}
            />
          </div>
          
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="input"
            style={{ minWidth: '150px' }}
          >
            <option value="">All Tags</option>
            {allTags.map(tag => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {filteredPosts.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '4rem 2rem',
            color: 'var(--muted-foreground)'
          }}>
            <h3 style={{ marginBottom: '0.5rem', fontSize: '1.25rem' }}>
              {posts.length === 0 ? 'No posts yet' : 'No posts found'}
            </h3>
            <p>
              {posts.length === 0 
                ? 'Check back later for new content!' 
                : 'Try adjusting your search or filter criteria.'}
            </p>
          </div>
        ) : (
          <>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
              gap: '1.5rem' 
            }}>
              {currentPosts.map(post => (
                <BlogCard
                  key={post.id}
                  post={post}
                  mode="view"
                  onEdit={() => {}} // No edit functionality in visitor mode
                  onView={handleViewPost}
                />
              ))}
            </div>
            
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={filteredPosts.length}
            />
          </>
        )}
      </main>

      {viewingPost && (
        <BlogView
          post={viewingPost}
          mode="view"
          onClose={handleCloseView}
          onEdit={() => {}} // No edit functionality in visitor mode
        />
      )}
    </div>
  );
}