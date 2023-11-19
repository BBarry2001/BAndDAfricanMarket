let failureCount = 0;
const FAILURE_THRESHOLD = 15;
let circuitOpen = false;
let firstFailureTime = null;
let nextRetryTime = 1000;  
const MAX_BACKOFF = 30000;  

/**
 * NOTE: This component is currently implemented with static data for visualization and layout purposes only.
 * It is intended to serve as a prototype to showcase the UI design and component structure.
 * In future development phases, this component will be enhanced with dynamic data integration and backend connectivity.
 * At present, it is not representative of the final functionality and is subject to significant modifications.
 */

export const isCircuitOpen = () => circuitOpen;

export const shouldAttemptRetry = () => !circuitOpen;

export const circuitBreaker = async (fn) => {
  const now = new Date();

  if (circuitOpen && now - firstFailureTime < nextRetryTime) {
    throw new Error('Circuit is open. No calls are allowed.');
  }

  if (circuitOpen) {
    // Reset state for next half-open check
    circuitOpen = false;
    failureCount = 0;
    nextRetryTime = 1000;
  }

  try {
    const result = await fn();
    // Successful call, reset failure count and backoff time
    failureCount = 0;
    nextRetryTime = 1000;
    return result;
  } catch (error) {
    failureCount++;
    if (failureCount >= FAILURE_THRESHOLD) {
      // Circuit breaker is now open
      circuitOpen = true;
      firstFailureTime = new Date();
      // Set up next retry time using exponential backoff, up to a maximum value
      nextRetryTime = Math.min(nextRetryTime * 2, MAX_BACKOFF);
    }
    throw error;
  }
};
