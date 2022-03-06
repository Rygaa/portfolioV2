import classes from '../assets/6-pages/Contact.module.scss'
import Title from '../components/Title';
import contactTitle from '../images/contact-title-logo.png'
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import React, { useEffect } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Toasty from '../components/Toasty';


const Contact = (props) => {

    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [message, setMessage] = React.useState('')

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


    const sendMail = async () => {
        console.log('sent')
        const response = await axios.post('https://mail.aissaben.com/send-mail', {
            email,
            name,
            message
        })
        toast('Email sent successfully', { duration: 5000, icon: "✔️" })
        if (response.status == 200) {
            setName('')
            setEmail('')
            setMessage('')
        } else {
            toast('Error occured durring the proccess of sending an email', { duration: 5000, icon: "❌" })
        }

    }


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
                <input value={name} onChange={(e) => { setName(e.target.value) }} placeholder='Anwar Zain'></input>
            </div>
            <div className={classes['email']}>
                <p>Email</p>
                <input value={email} onChange={(e) => { setEmail(e.target.value) }} placeholder='anwar@gmail.com'></input>
            </div>
            <div className={classes['message']}>
                <p>Message</p>
                <textarea value={message} onChange={(e) => { setMessage(e.target.value) }}  placeholder='write your message'></textarea>
            </div>
            <button className={classes['send-button']} onClick={sendMail}>Send Message</button>

        </motion.div>
    )
}


export default Contact;