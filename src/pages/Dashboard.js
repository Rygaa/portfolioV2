import classes from '../assets/6-pages/Dashboard.module.scss'
import instagram from '../images/instagram.png'
import github from '../images/github.png'
import discord from '../images/discord.png'
import cv from '../images/cv.png'
import hand from '../images/hand-waving.png'
import React from 'react'
const Dashboard = (props) => {

    const [scrolledDown, setScrolledDown] = React.useState(false);
    React.useEffect(() => {
        window.addEventListener('scroll', function (event) {
            window.scrollY > 75 ? setScrolledDown(true) : setScrolledDown(false);
        });
    }, [])


    return (
        <section className={classes['Dashboard']}>
            <div>
                <div>
                    <img src={hand}></img>
                    <div><p>Hello, I am</p><p>Rygaa</p></div>
                </div>
                <div>
                    <p>Welcome to</p>
                    <p>My portfolio</p>
                </div>
            </div>
            <div>
                <div className={classes['social-button']}>
                    <button></button>
                    <img src={instagram}></img>
                </div>

                <div className={classes['social-button']}>
                    <button></button>
                    <img src={github}></img>
                </div>

                <div className={classes['social-button']}>
                    <button></button>
                    <img src={discord}></img>
                </div>

                <div className={classes['social-button']}>
                    <button></button>
                    <img src={cv}></img>
                </div>
            </div>
            <button>View Projects</button>
            {!scrolledDown && <div className={classes['scroll-down-container']}>
                <p>Scroll down</p>
                <p>||</p>
            </div>}
        </section>
    )
}


export default Dashboard;