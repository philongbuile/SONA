import './LandingPage.css';
import Pill from '../components/Pill';


const LandingPage = () => {
    return (
        <div className="LandingPage">
            <Pill/>
            <h3>Your health is your privacy</h3>
            <button className="start_button" onClick={() => {console.log("clicked")}}>Get Started</button>

        </div>
    )
}

export default LandingPage;