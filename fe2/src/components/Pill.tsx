import styles from '../assets/css/Pill.module.css';
import {Link} from 'react-router-dom';


const Pill = () => {
  return (
      <div className={styles.pill}> 
          <li><p>About us</p></li>
          <li><p>Guideline</p></li>
          <li><h1>Sona System</h1></li>
          <li>
            <Link to="/login">
              <p>Log in</p>
            </Link>
          </li>
          <li><p>Sign up</p></li>
      </div>
  );
}

export default Pill;