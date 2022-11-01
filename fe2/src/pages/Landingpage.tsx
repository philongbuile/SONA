import {lazy} from 'react';

import styles from '../assets/css/Landingpage.module.css';
import Pill from '../components/Pill';
import { useNavigate } from 'react-router-dom';
import IntroButton from '../api/IntroButton.json';
import {Styles} from './Styles/styles';

const ScrollToTop = lazy(() => import('../models/ScrollToTop'));
const Container = lazy(() => import('../components/Container/index'));
const ContentBlock = lazy(() => import('../components/contentBlock/index'));

const Landingpage = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }
    return (
        <Container>
            <Styles />
            <Pill/>
            <ScrollToTop/>
            <ContentBlock
                type="left"
                title={IntroButton.title}
                content={IntroButton.text}
                button={IntroButton.button}
                icon={"graphs.svg"}
                id="intro"
            />
        </Container>
    )
}

export default Landingpage;