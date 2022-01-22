
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';
import hanasu1IMG from '../images/hanasu1.png'
import projectIMG from '../images/projects-title-logo.png'
import classes from '../assets/6-pages/Projects.module.scss'
import Title from "../components/Title";
import '../assets/1-helpers/Swiper.css';
import Output from "../components/Output";
SwiperCore.use([Pagination, Navigation]);
const Projects = (props) => {
    const [currentOutput, setCurrentOutput] = React.useState(0)

    const updateOutputPauseStatus = (e) => {
        setCurrentOutput(currentOutput + 1)
    }

    const outputs = hanasu.usedTech.map((text, index) => {
        return (<Output 
            key={Math.random()} txt={text} 
            pause={index == currentOutput ? false : true} 
            updateOutputPauseStatus={updateOutputPauseStatus}
            done = {index < currentOutput}
        />)
    })




    return (
        <section className={classes['Projects']}>
            
            <Title 
                className={classes['title']} 
                title={'Projects'}
                image = {projectIMG}
            />
            <Swiper
                spaceBetween={30} hashNavigation={{
                    "watchState": true
                }} pagination={{
                    "clickable": true
                }} navigation={true} className={classes['Swiper']}>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={hanasu1IMG}></img></SwiperSlide>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={hanasu1IMG}></img></SwiperSlide>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={hanasu1IMG}></img></SwiperSlide>
            </Swiper>
            <div className={classes['Console']}>
                <div className={classes['line']}></div>
                <div className={classes['text-container']}>
                    {outputs}
                </div>
                <div className={classes['buttons-container']}>
                    <button className={classes['view-github-button']}>View Projects</button>
                    <button className={classes['view-website-button']}>View Github</button>
                </div>

            </div>

        </section>
    )
}



const hanasu = {
    title: 'Hanasu',
    image: hanasu1IMG,
    usedTech: [
        'Front-end: React',
        'Designed: Figma',
        'Database: MongoDB',
        'NPMS:',
        '.Socket.io.',
        '.React-Redux',
    ]
}



export default Projects;