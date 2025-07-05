import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Login } from './components/Login';
import { VisitorLayout } from './components/VisitorLayout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

function AdminLogin() {
  const { login } = useAuth();

  const handleLogin = (success: boolean) => {
    if (success) {
      login();
    }
  };

  return <Login onLogin={handleLogin} />;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Visitor routes */}
      <Route path="/" element={<Navigate to="/blog" replace />} />
      <Route path="/blog" element={<VisitorLayout />} />
      
      {/* Admin routes */}
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      } />
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/blog" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;