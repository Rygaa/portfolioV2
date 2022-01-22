import classes from '../assets/6-pages/AboutMe.module.scss'
import Title from '../components/Title';
import aboutMeTitle from '../images/about-me-title-logo.png'
import Output from '../components/Output'

const AboutMe = (props) => {
    return (
        <div className={classes['AboutMe']}>
            <Title title={'About me'} image={aboutMeTitle}></Title>
            <p>Mohamed Aissa Benfodda</p>
            <p>Location: Montreal, QC, Canada</p>
            <div className={classes['line']}></div>
            <p>I am a full-stack web-developer. I was <br />
                introduced to the software development <br />
                in the game-dev industry. The desire of <br />
                learning pushed me to learn web-dev <br />
            </p>
            <div className={classes['Console']}>
  
            </div>
        </div>
    )
}



export default AboutMe;