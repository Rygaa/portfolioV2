import classes from '../assets/6-pages/AboutMe.module.scss'
import Title from '../components/Title';
import aboutMeTitle from '../images/about-me-title-logo.svg'
import Output from '../components/Output'
import React, { useEffect } from "react";
import BrainIMG from '../images/brain.png'
import REACT_IMG from '../images/react.png'
import react from 'react';
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skillsText =  [
    'Skills:',

    'Javascript',
    'Typescript',
    'NodeJS',
    'React',
    'Vue',

    'MongoDB',
    'PostgreSQL',
    'Nginx',
    'SocketIO',

    'Figma',
    'HTML',
    'CSS / SCSS',
    'MUI',

    'Java',
    'C++',
    'Express',
]


const AboutMe = (props) => {
    const [currentOutput, setCurrentOutput] = React.useState(0)
    const [brainVisible, setBrainVisible] = React.useState(window.innerWidth > 1500 ? true : false);

    const updateOutputPauseStatus = (e) => {
        setCurrentOutput(currentOutput + 1)
        updateBrainSize();
    }

    const updateBrainSize = (value) => {
        brainImgRef.current.style.transform = `scale(${1 + value / 5}, ${1 + value / 5})`
    }

    useEffect(() => {
        for (let i = 0; i < skillsText.length; i++) {
            setTimeout(() => {
                updateBrainSize(i)
            }, 500 * i)
        }


    }, [])


    const outputs = skillsText.map((skill, index) => {
        return (<p>
            {skill}
        </p>)
        // return (<Output
        //     parent="about-me"
        //     key={Math.random()} txt={skill}
        //     pause={index == currentOutput ? false : true}
        //     updateOutputPauseStatus={updateOutputPauseStatus}
        //     done={index < currentOutput}
        //     style={index == 0 ? {margin: 0, padding: 0} : { marginLeft: '2rem', fontSize: '1.05rem'}}
        //     inStartAddText={''}
        // />)
    })

    useEffect(() => {
        setTimeout(() => {
            // consoleRef.current.children[1].scrollTop = consoleRef.current.children[1].scrollHeight;
        }, 40) 

    }, [currentOutput])


    const consoleRef = React.useRef();
    const brainRef = React.useRef();
    const brainImgRef = React.useRef();
    function getOffset(el) {
        const rect = el.getBoundingClientRect();
        return {
            left: rect.left + window.scrollX,
            top: rect.top + window.scrollY,
            right: rect.right,
        };
    }
    const getBrainPosition = () => {
        const position = getOffset(consoleRef.current)
        const dimension = consoleRef.current.getBoundingClientRect()
        const brainDimension = brainRef.current.getBoundingClientRect();
        const x = (position.left + dimension.width) - (brainDimension.width / 2)
        const y = (position.top - brainDimension.height / 2)
        brainRef.current.style.right = 0 + 'px';
        brainRef.current.style.top = -25 + 'px';

        const position1 = getOffset(brainRef.current.children[0])
        console.log(position1)
        return position1;
    }



    React.useEffect(() => {
        getBrainPosition();
        window.addEventListener('resize', () => {
            setBrainVisible(window.innerWidth > 1500 ? true : false);
        })
    }, [])






    const controls = useAnimation();
    const { ref, inView } = useInView();

    function isInViewport(element) {
        var element = document.getElementById('about-me');
        var position = element?.getBoundingClientRect();

        // checking whether fully visible
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
            // console.log('Element is fully visible in screen');
            return true;
        }

        // checking for partial visibility
        if (position.top < window.innerHeight && position.bottom >= 0) {
            // console.log('Element is partially visible in screen');
            return true;
        }
        return false;
    }

    useEffect(() => {
        const element = document.getElementById('about-me');
        if (isInViewport(element)) {
            controls.start('visible')
        }
        window.addEventListener('scroll', () => {
            const element = document.getElementById('about-me');
            if (isInViewport(element)) {
                controls.start('visible')
            }
        })
        // deleted
        // if (!inView) {
        //     controls.start('hidden')
        // }
    }, [controls, inView])



    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 5);
    }
    const boxVarients = {
        hidden: { x: '100vw' },
        visible: {
            x: '0vw',
            transition: {
                duration: 1.25,
                ease: easeOutCubic
            },
        },
    };



    return (
        <motion.div ref={ref} className={classes['AboutMe']}
            initial="hidden"
            animate={controls}
            variants={boxVarients}
        >
            <Title title={'About me'} image={aboutMeTitle}></Title>
            <p>Aissa Benfodda</p>
            <p>Location: Montreal, QC, Canada</p>
            <div className={classes['line']}></div>
            <p className={classes['description']}>I am a full-stack web-developer. With more than
                <br />  2 years experience building full stack web applications 
                <br /> Using HTML/CSS/Javascript/React. And more than
                <br /> 3 years experience building backend using NodeJS
                <br />  along with REST-APIS and Socket.IO
            </p>
            <div ref={consoleRef} className={classes['Console']}
                id={'about-me'}

                >
                <div className={classes['line']} />
                <div className={classes['text-container']}>
                    {outputs}
                </div>
                <div ref={brainRef} className={classes['brain']}>
                    <img ref={brainImgRef} style={brainVisible ? {display: 'flex'} : {display: 'none'}} src={BrainIMG}  /> 
                </div>
            </div>

           
        </motion.div>
    )
}



export default AboutMe;
