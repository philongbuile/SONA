import Navbar from '../components/Navbar.jsx';
import Board from '../components/Board.jsx';

const Examination = () => {
    return (
        <div className="user_medical_exam">
            <Navbar />
            <div className="user_medical_exam_container container">
                <div className="user_medical_exam_personal">
                    <Board />
                </div>
            </div>
        </div>
    );
};

export default Examination;