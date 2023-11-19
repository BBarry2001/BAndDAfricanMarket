import { Button, Result } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import styles from './NotFound404.module.css';
import { useNavigate, Link } from 'react-router-dom';

/**
 * NotFoundPage Component
 * 
 * Displays a custom 404 Not Found page to the user.
 * This component is used when the application's routing does not match any known paths.
 * It provides a friendly message and a navigation button to redirect users back to the home page.
 *
 * Uses Ant Design's Result component to display the 404 error message.
 *
 */
const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.resultContainer}>
            <Result
                status="404"
                title={<span className={styles.bounceAnimation}>404</span>}
                subTitle={
                    <div className={styles.subTitle}>
                        <h2>B&D African Market</h2>
                        <p>Oops! Looks like you got lost in the aisles. Don't worry, we've all been there.</p>
                        <p>Sorry, but the page you visited does not exist. 
                           You may have mistyped the address, or the page has been moved to another URL.
                           But if you think this is an error, <Link to="/contact-us">contact support</Link>.</p>
                    </div>
                }
                extra={
                    <Button 
                        type="primary" 
                        key="console" 
                        onClick={() => navigate('/')}
                    >
                        <HomeOutlined /> Take me back to home page
                    </Button>
                }
            />
        </div>
    );
}

export default NotFoundPage;
