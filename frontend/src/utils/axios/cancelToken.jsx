// cancelToken.js
import axios from 'axios';

// Cancel Token
// The cancel token is like a "stop button" that you can press to stop an API call while it's 
// happening. Imagine you're downloading a big file but halfway through, you realize you don't need 
// it anymore. You can use a cancel token to stop the download.

export const getCancelToken = () => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  return source;
};
