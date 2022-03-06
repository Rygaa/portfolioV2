
import { Swiper, SwiperSlide } from "swiper/react";
import React, { useEffect } from "react";
import "swiper/css";
import "swiper/css/pagination"
import "swiper/css/navigation"
// import Swiper core and required modules
import SwiperCore, {
    Pagination, Navigation
} from 'swiper';
import hanasu1IMG from '../images/hanasu1.png'
import medtuto1IMG from '../images/medtuto.png'
import maktaba1IMG from '../images/maktaba.png'
import projectIMG from '../images/projects-title-logo.png'
import classes from '../assets/6-pages/Projects.module.scss'
import Title from "../components/Title";
import '../assets/1-helpers/Swiper.css';
import Output from "../components/Output";
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

SwiperCore.use([Pagination, Navigation]);

const hanasu = {
    title: 'Hanasu',
    image: hanasu1IMG,
    website: 'https://hanasu.me/Login',
    github: 'https://medtuto.com/',
    usedTech: [
        'Front-end: React',
        'Designed: Figma',
        'Database: MongoDB',
        'NPMS:',
        '.React',
        '.Socket.io.',
        '.React-Redux',
        '.Axios',
        '.Sass',
    ]
}

const medtuto = {
    title: 'Medtuto',
    image: medtuto1IMG,
    website: 'https://medtuto.com/',
    github: 'https://medtuto.com/',
    usedTech: [
        'Front-end: React',
        'Designed: Figma',
        'Database: MongoDB',
        'NPMS:',
        '.React',
        '.React-Redux',
        '.Axios',
        '.Sass',
        '.Swiper',
        '.framer-motion',
        '.React-Toastify',
        '.React-Tabs',
        '.app-root-path',
        '.classnames',
    ]
}

const maktaba = {
    title: 'Maktaba',
    image: maktaba1IMG,
    website: '',
    github: 'https://medtuto.com/',
    usedTech: [
        'Front-end: React',
        'Designed: Figma',
        'Database: PostgreSQL',
        'NPMS:',
        '.React',
        '.React-Redux',
        '.Axios',
        '.Sass',
        '.Swiper',
        '.framer-motion',
        '.react-hot-toast',
        '.React-Tabs',
        '.app-root-path',
        '.classnames',
    ]
}

const arr = []
arr.push(hanasu)
arr.push(medtuto)
arr.push(maktaba)


const Projects = (props) => {
    const [currentOutput, setCurrentOutput] = React.useState(0)
    const [selectedProject, setSelectedProject] = React.useState(0);
    const consoleRef = React.useRef();
    const controls = useAnimation();
    const { ref, inView } = useInView();

    const updateOutputPauseStatus = (e) => {
        setCurrentOutput(currentOutput + 1)
    }

    const updateSelectedProject = (e) => {
        if (e.activeIndex == selectedProject ) {
            return;
        }
        console.log('called')
        setSelectedProject(e.activeIndex);
        // selectedProject == 2 ? setSelectedProject(0) : setSelectedProject(selectedProject => selectedProject + 1)
        setCurrentOutput(0)
    }

    React.useEffect(() => {
        console.log('selectedProject:', selectedProject)
    }, [selectedProject])

    const outputs = arr.map((project) => {
        return project.usedTech.map((text, index) => {
            return (<p>
                {text}
            </p>)
            // return (<Output
            //     parent={'projects'}
            //     key={Math.random()} txt={text}
            //     pause={index == currentOutput ? false : true}
            //     updateOutputPauseStatus={updateOutputPauseStatus}
            //     done={index < currentOutput}
            // />)
        })
    })

    const viewWebsite = () => {
        window.location.href = arr[selectedProject].website
       
    }

    const viewGithub = () => {
        window.location.href = arr[selectedProject].github

    }
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < 800
        );
    }
    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 5);
    }

    useEffect(() => {
        setTimeout(() => {
            consoleRef.current.children[1].scrollTop = consoleRef.current.children[1].scrollHeight;
        }, 40)

    }, [currentOutput])
    useEffect(() => {
        const element = document.getElementById('projects-parent');
        if (isInViewport(element)) {
            controls.start('visible')
        }
        window.addEventListener('scroll', () => {
            const element = document.getElementById('projects-parent');
            if (isInViewport(element)) {
                controls.start('visible')
            }
        })
        // deleted
        // if (!inView) {
        //     controls.start('hidden')
        // }
    }, [controls])

    useEffect(() => {
        console.log('RE-RENDER')
    }, [])

    const boxVarients = {
        hidden: { x: '-100vw' },
        visible: {
            x: '0vw',
            transition: {
                duration: 1.25,
                ease: easeOutCubic
            },
        },
    };

    return (
        <motion.section ref={ref} id="projects-parent" className={classes['Projects']}
            initial="hidden"
            animate={controls}
            variants={boxVarients}
        >
            
            <Title 
                className={classes['title']} 
                title={'Projects'}
                image = {projectIMG}
            />
            <Swiper
                spaceBetween={30} hashNavigation={{
                    "watchState": true
                }} pagination={{
                    "clickable": true,
                }} allowTouchMove="true" navigation={true} className={classes['Swiper']}
                onTransitionEnd={updateSelectedProject}>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={hanasu1IMG}></img><div></div></SwiperSlide>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={medtuto1IMG}></img><div></div></SwiperSlide>
                <SwiperSlide className={classes['Swiper-Slide']} data-hash="slide1"><img src={maktaba1IMG}></img><div></div></SwiperSlide>
            </Swiper>
            <div className={classes['Console']}
                id="projects"
                ref={consoleRef}
            >
                <div className={classes['line']}></div>
                <div className={classes['text-container']}>
                    {outputs[selectedProject]}
                </div>
                <div className={classes['buttons-container']}>
                    <a className={classes['view-github-button']} href={arr[selectedProject].website}>View Projects</a>
                    <a className={classes['view-website-button']} href={arr[selectedProject].github}>View Github</a>
                </div>

            </div>

        </motion.section>
    )
}




export default Projects;