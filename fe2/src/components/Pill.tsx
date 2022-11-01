import styles from '../assets/css/Pill.module.css';


const Pill = () => {
  return (
      <div className={styles.pill}> 
          <li><p>About us</p></li>
          <li><p>Guideline</p></li>
          <li><h1>Sona System</h1></li>
          <li><p>Log in</p></li>
          <li><p>Sign up</p></li>
      </div>
  );
}

export default Pill;