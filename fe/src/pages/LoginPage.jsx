import './LoginPage.css';
import Navbar from '../components/Pill';
import Login from '../components/Login';


const LoginPage = () => {
    return (
        <div className="LoginPage">
            <Navbar/>
            <Login/>
        </div>
    )
}

export default LoginPage;