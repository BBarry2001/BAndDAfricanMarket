import { useLoading } from './LoadingContext';
import './LoadingComponent.css'; 

/**
 * LoadingComponent - A functional component that renders a loading animation. Inspired by Youtube loading animation.
 * 
 * This component utilizes the `useLoading` custom hook from `LoadingContext` to determine
 * if a loading animation should be displayed. It checks the `loading` state value and,
 * if true, renders a div with a CSS-based loading animation. The component renders `null`
 * when there's nothing to load, making it invisible in the UI.
 *
 * Usage:
 * <LoadingComponent />
 */
const LoadingComponent = () => {
  const { loading } = useLoading();

  return loading ? (
    <div className="loading-bar-container">
      <div className="loading-bar"></div>
    </div>
  ) : null;
};

export default LoadingComponent;
