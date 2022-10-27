import './LoginPage.css';
import Navbar from '../components/navbar';
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