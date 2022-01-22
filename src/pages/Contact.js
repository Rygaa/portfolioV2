import classes from '../assets/6-pages/Contact.module.scss'
import Title from '../components/Title';
import contactTitle from '../images/contact-title-logo.png'

const Contact = (props) => {
    return (
        <div className={classes['Contact']}>
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
                <textarea placeholder='wite your message'></textarea>
            </div>
            <button className={classes['send-button']}>Send Message</button>
        </div>
    )
}


export default Contact;