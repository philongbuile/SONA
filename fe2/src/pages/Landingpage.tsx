import styles from '../assets/css/Landingpage.module.css';
import Pill from '../components/Pill';
import { useNavigate } from 'react-router-dom';

const Landingpage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }
    return (
        <div className={styles.Landingpage}>
            <Pill/>
            <div className={styles.content}>
            <h3>Your health is your privacy</h3>
            <button className={styles.start_button} onClick={() => handleClick()}>Get Started</button>
            </div>
            </div>
    )
}

export default Landingpage;