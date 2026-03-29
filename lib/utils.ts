/**
 * Utility functions for consistent server/client rendering
 */

// Safe date formatter - uses fixed UTC timezone for consistency
// Prevents hydration mismatch from server/client time differences
export function formatDate(date: Date | string | number = new Date()): string {
  return new Date(date).toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    timeZone: 'UTC' // Fixed timezone prevents server/client mismatch
  });
}

// Client-only check
export function isClient(): boolean {
  return typeof window !== 'undefined';
}

// Safe document access
export function safeDocument<T extends keyof Document>(method: T): Document[T] | null {
  return isClient() ? document[method] : null;
}

