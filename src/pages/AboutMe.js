import classes from '../assets/6-pages/AboutMe.module.scss'
import Title from '../components/Title';
import aboutMeTitle from '../images/about-me-title-logo.png'
import Output from '../components/Output'
import React, { useEffect } from "react";
import BrainIMG from '../images/brain.png'
import REACT_IMG from '../images/react.png'
import react from 'react';
import Skill from '../components/Skill';
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"

const skillsText =  [
    'Skills:',

    'C++',
    'Javascript',
    'NodeJS',

    'React',
    'React-native',
    'Electron',

    'Figma',
    'HTML',
    'CSS',

    'MongoDB',
    'PostgreSQL',
    'MUI',

    'SocketIO',
    'Express',
    'Java',

    'SCSS',
    'GraphQL',
]
const skilsIMG = [
    "",

    "devicon-cplusplus-plain",
    "devicon-javascript-plain",
    "devicon-nodejs-plain-wordmark",

    "devicon-react-original",
    "devicon-react-original",
    "devicon-electron-original",

    "devicon-figma-plain",
    "devicon-html5-plain",
    "devicon-css3-plain",

    "devicon-mongodb-plain",
    "devicon-postgresql-plain",
    "devicon-raspberrypi-line",

    "devicon-socketio-original",
    "devicon-express-original",
    "devicon-java-plain",

    "devicon-raspberrypi-line",
    "devicon-graphql-plain-wordmark",
]

const AboutMe = (props) => {
    const [currentOutput, setCurrentOutput] = React.useState(0)
    const [skills, setSkills] = React.useState([])
    const [brainVisible, setBrainVisible] = React.useState(window.innerWidth > 1500 ? true : false);

    const updateOutputPauseStatus = (e) => {
        triggerNewSkill();
        setCurrentOutput(currentOutput + 1)
    }

    const updateBrainSize = (value) => {
        brainImgRef.current.style.transform = `scale(${1 + currentOutput / 5}, ${1 + currentOutput / 5})`
    }
    const outputs = skillsText.map((skill, index) => {
        return (<Output
            parent="about-me"
            key={Math.random()} txt={skill}
            pause={index == currentOutput ? false : true}
            updateOutputPauseStatus={updateOutputPauseStatus}
            done={index < currentOutput}
            style={index == 0 ? {margin: 0, padding: 0} : { marginLeft: '2rem', fontSize: '1.05rem'}}
            inStartAddText={''}
        />)
    })

    useEffect(() => {
        setTimeout(() => {
            consoleRef.current.children[1].scrollTop = consoleRef.current.children[1].scrollHeight;
        }, 50) 

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
        // brainRef.current.style.left = x + 'px';
        // brainRef.current.style.top = y + 'px';
        brainRef.current.style.right = 0 + 'px';

        const position1 = getOffset(brainRef.current.children[0])
        console.log(position1)
        return position1;
    }
    const [brainPosition, setBrainPosition] = React.useState();
    const [brainDimension, setBrainDimension] = React.useState();
    // React.useEffect(() => {
    //     brainImgRef.current.style.transform = `scale(${brainSize}, ${brainSize})`
    // }, [brainSize])

    React.useEffect(() => {
        setBrainPosition(getBrainPosition())
        setBrainDimension(brainRef.current.children[0].getBoundingClientRect())
        window.addEventListener('resize', () => {
            getBrainPosition();
            setBrainVisible(window.innerWidth > 1500 ? true : false);
        })
    }, [])




    const triggerNewSkill = () => {
        const element = document.getElementById('about-me')
        const arr = [...skills];
        arr.push({
            position: brainPosition,
            dimension: brainDimension,
            updateBrainSize: updateBrainSize
        })
        setSkills(arr);
    }


    const skillsList = skills.map((element, index) => {
        // if (index > 1) {
        //     return null;
        // }
        return (
            <Skill image={skilsIMG[index]} speed={skillsText[index].length} position={element.position} dimension={element.dimension} updateBrainSize={element.updateBrainSize} />
        )
    })


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
            <p>Mohamed Aissa Benfodda</p>
            <p>Location: Montreal, QC, Canada</p>
            <div className={classes['line']}></div>
            <p>I am a full-stack web-developer. I was <br />
                introduced to the software development <br />
                in the game-dev industry. The desire of <br />
                learning pushed me to learn web-dev <br />
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
                {skillsList} 
                
            </div>

           
        </motion.div>
    )
}



export default AboutMe;