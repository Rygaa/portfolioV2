import classes from '../assets/6-pages/Dashboard.module.scss'
import instagram from '../images/instagram.png'
import github from '../images/github.png'
import linkedin from '../images/linkedin.png'
import cv from '../images/cv.png'
import hand from '../images/hand-waving.png'
import React, { useEffect } from 'react';
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
const Dashboard = (props) => {


    const scrollToProjects = () => {
        const projects = document.getElementById('projects-parent');
        const element = projects.getBoundingClientRect().top + window.scrollY
        // window.scrollY = window.scrollY + projects.getBoundingClientRect().top
        window.scroll({
            top: element,
            behavior: "smooth"
        })
    }

    const controls = useAnimation();
    const { ref, inView } = useInView();
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < 800
        );
    }

    useEffect(() => {
        const element = document.getElementById('dashboard');
        if (isInViewport(element)) {
            controls.start('visible')
        }
        window.addEventListener('scroll', () => {
            const element = document.getElementById('dashboard');
            if (isInViewport(element)) {
                controls.start('visible')
            }
        })
        // deleted
        // if (!inView) {
        //     controls.start('hidden')
        // }
    }, [controls, inView])

    // const easeOutCubic = (x) => {
    //     return 1 - Math.pow(1 - x, 3);
    // }

    const easeOutCubic = (x) => {
        return 1 - Math.pow(1 - x, 2.5);
    }

    const boxVarients = {
        hidden: { x: `100vw` },
        visible: {
            x: '0vw',
            transition: {
                duration: 1.25,
                ease: easeOutCubic
            },
        },
    };


    return (
      <motion.section
        id="dashboard"
        className={classes["Dashboard"]}
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={boxVarients}
      >
        <div>
          <div>
            <img src={hand}></img>
            <div>
              <p>Hello, I am</p>
              <p>Aissa</p>
            </div>
          </div>
          <div>
            <p>Welcome to</p>
            <p>My portfolio</p>
          </div>
        </div>
        <div>
          <div className={classes["social-button"]}>
            <a href="https://www.instagram.com/rygaa_dev/" target="_blank"></a>
            <img src={instagram}></img>
          </div>

          <div className={classes["social-button"]}>
            <a
              href="https://github.com/Rygaa?tab=repositories"
              target="_blank"
            ></a>
            <img src={github}></img>
          </div>

          <div className={classes["social-button"]}>
            <a
              href="https://www.linkedin.com/in/aissa-b-3a151821a/"
              target="_blank"
            ></a>
            <img src={linkedin}></img>
          </div>

          <div className={classes["social-button"]}>
            <a href="https://docdro.id/gpmkAQR" target="_blank"></a>
            <img src={cv}></img>
          </div>
        </div>
        <button onClick={scrollToProjects}>View Projects</button>
      </motion.section>
    );
}


export default Dashboard;