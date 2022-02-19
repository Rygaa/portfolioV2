import classes from '../assets/6-pages/Contact.module.scss'
import Title from '../components/Title';
import contactTitle from '../images/contact-title-logo.png'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { useEffect } from 'react';
const Contact = (props) => {

    const controls = useAnimation();
    const { ref, inView } = useInView();
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < 800
        );
    }

    useEffect(() => {
        const element = document.getElementById('contact');
        if (isInViewport(element)) {
            controls.start('visible')
        }
        window.addEventListener('scroll', () => {
            const element = document.getElementById('contact');
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
        <motion.div id='contact' className={classes['Contact']} ref={ref}
            initial="hidden"
            animate={controls}
            variants={boxVarients}>
            <Title title={'Contact'} image={contactTitle}></Title>
            <div className={classes['name']}>
                <p>Full Name</p>
                <input placeholder='Benfodda Mohamed Aissa'></input>
            </div>
            <div className={classes['email']}>
                <p>Email</p>
                <input placeholder='joe@protonmail.com'></input>
            </div>
            <div className={classes['message']}>
                <p>Message</p>
                <textarea placeholder='write your message'></textarea>
            </div>
            <button className={classes['send-button']}>Send Message</button>
        </motion.div>
    )
}


export default Contact;