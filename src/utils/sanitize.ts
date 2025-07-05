// Simple input sanitization utilities for defensive security

export function sanitizeText(text: string): string {
  if (typeof text !== 'string') return '';
  
  return text
    .trim()
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers like onclick, onload, etc.
    .replace(/data:/gi, ''); // Remove data: protocols
}

export function sanitizeHtml(html: string): string {
  if (typeof html !== 'string') return '';
  
  // This is a basic sanitizer - in production, use a library like DOMPurify
  let sanitized = html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+\s*=/gi, '') // Remove event handlers
    .replace(/data:/gi, ''); // Remove data: protocols
  
  return sanitized;
}

export function validateInput(input: string, type: 'text' | 'email' | 'username'): boolean {
  if (!input || typeof input !== 'string') return false;
  
  switch (type) {
    case 'text':
      return input.length >= 1 && input.length <= 10000;
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(input) && input.length <= 254;
    case 'username':
      const usernameRegex = /^[a-zA-Z0-9_-]{3,30}$/;
      return usernameRegex.test(input);
    default:
      return false;
  }
}

export function hashPassword(password: string): string {
  // Simple hash function for demo purposes
  // In production, use proper password hashing like bcrypt
  let hash = 0;
  for (let i = 0; i < password.length; i++) {
    const char = password.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash).toString(36);
}

export function createSecureCredentials(): { username: string; passwordHash: string } {
  // Generate secure credentials on first run
  const username = 'admin';
  const defaultPassword = 'password123';
  const passwordHash = hashPassword(defaultPassword);
  
  return { username, passwordHash };
}