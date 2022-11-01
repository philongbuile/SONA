import styles from '../assets/css/Pill.module.css';


const Pill = () => {
  return (
      <div className={styles.pill}> 
          <li><p>About us</p></li>
          <li><p>Guideline</p></li>
          <li><p>Sona System</p></li>
          <li><p>Log in</p></li>
          <li><p>Sign up</p></li>
      </div>
  );
}

export default Pill;