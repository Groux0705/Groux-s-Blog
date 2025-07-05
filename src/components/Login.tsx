import { useState } from 'react';
import { Lock, User, AlertCircle } from 'lucide-react';

interface LoginProps {
  onLogin: (success: boolean) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Fixed credentials
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'password123';

    setTimeout(() => {
      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        localStorage.setItem('isAuthenticated', 'true');
        onLogin(true);
      } else {
        setError('Invalid username or password');
        onLogin(false);
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--background)',
      padding: '1rem'
    }}>
      <div className="card" style={{
        width: '100%',
        maxWidth: '400px',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <Lock size={48} color="var(--primary)" />
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: '700',
            color: 'var(--foreground)',
            marginBottom: '0.5rem'
          }}>
            Admin Login
          </h1>
          <p style={{
            color: 'var(--muted-foreground)',
            fontSize: '0.875rem'
          }}>
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--foreground)'
            }}>
              Username
            </label>
            <div style={{ position: 'relative' }}>
              <User
                size={16}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter username"
                required
              />
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: 'var(--foreground)'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                size={16}
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--muted-foreground)'
                }}
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                style={{ paddingLeft: '2.5rem' }}
                placeholder="Enter password"
                required
              />
            </div>
          </div>

          {error && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#fef2f2',
              border: '1px solid #fecaca',
              borderRadius: 'var(--radius)',
              color: '#dc2626',
              fontSize: '0.875rem',
              marginBottom: '1rem'
            }}>
              <AlertCircle size={16} />
              {error}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{
              width: '100%',
              justifyContent: 'center'
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: 'var(--muted)',
          borderRadius: 'var(--radius)',
          fontSize: '0.875rem',
          color: 'var(--muted-foreground)'
        }}>
          <p style={{ margin: 0, fontWeight: '500' }}>Demo Credentials:</p>
          <p style={{ margin: '0.25rem 0' }}>Username: admin</p>
          <p style={{ margin: 0 }}>Password: password123</p>
        </div>
      </div>
    </div>
  );
}