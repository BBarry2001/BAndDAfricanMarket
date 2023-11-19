import { createContext, useContext, useState } from 'react';
import LoadingComponent from './LoadingComponent';

/**
 * LoadingContext - Context for managing loading state throughout the app.
 *
 * This file defines `LoadingContext`, a custom React context for loading state management,
 * and exports `LoadingProvider`, a component that provides this context to its children.
 * Also, it exports `useLoading`, a custom hook for consuming this context.
 */

const LoadingContext = createContext();

/**
 * useLoading - Custom hook for consuming the loading context.
 * 
 * Returns the loading context object. Throws an error if used outside of `LoadingProvider`.
 */
export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};

/**
 * LoadingProvider - Provider component for `LoadingContext`.
 * 
 * Wraps its children in `LoadingContext.Provider` to provide loading state management.
 * Renders `LoadingComponent` when loading is true.
 *
 */
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  return (
    <LoadingContext.Provider value={{ loading, showLoading, hideLoading }}>
      {children}
      {loading && <LoadingComponent />}
    </LoadingContext.Provider>
  );
};
