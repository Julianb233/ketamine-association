'use client';

import { ReactNode, createContext, useContext } from 'react';

// Check if Clerk is properly configured
export const isClerkConfigured = () => {
  if (typeof window === 'undefined') {
    // Server-side check
    const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    return Boolean(key && !key.includes('xxxxx') && key.startsWith('pk_'));
  }
  // Client-side check
  const key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
  return Boolean(key && !key.includes('xxxxx') && key.startsWith('pk_'));
};

// Create a context to track Clerk availability
const ClerkAvailableContext = createContext(false);

export const useClerkAvailable = () => useContext(ClerkAvailableContext);

// Fallback user object when Clerk is not configured
export interface FallbackUser {
  isSignedIn: false;
  user: null;
  isLoaded: true;
}

export const fallbackUser: FallbackUser = {
  isSignedIn: false,
  user: null,
  isLoaded: true,
};

// Conditional wrapper components
export function ConditionalSignedIn({ children }: { children: ReactNode }) {
  if (!isClerkConfigured()) {
    return null;
  }
  // Dynamic import to avoid loading Clerk when not configured
  const { SignedIn } = require('@clerk/nextjs');
  return <SignedIn>{children}</SignedIn>;
}

export function ConditionalSignedOut({ children }: { children: ReactNode }) {
  if (!isClerkConfigured()) {
    return <>{children}</>;
  }
  const { SignedOut } = require('@clerk/nextjs');
  return <SignedOut>{children}</SignedOut>;
}

export function useConditionalUser() {
  if (!isClerkConfigured()) {
    return fallbackUser;
  }
  // Only call useUser if Clerk is configured
  const { useUser } = require('@clerk/nextjs');
  return useUser();
}
