import classes from '../assets/4-layout/Layout.module.scss'
import Section from '../components/Section';
import Dashboard from '../pages/Dashboard'
import Projects from '../pages/Projects'
import AboutMe from '../pages/AboutMe'
import Contact from '../pages/Contact'
import React from 'react';
import Toasty from '../components/Toasty';

const Layout = (props) => {
    const [scrolledDown, setScrolledDown] = React.useState(false);

    React.useEffect(() => {
        window.addEventListener('scroll', function (event) {
            if (window.scrollY > 75) setScrolledDown(true);
        });
    }, [])
    return (
        <div className={classes['Layout']}>
            <Section ><Dashboard></Dashboard></Section>
            <Section ><Projects></Projects></Section>
            <Section ><AboutMe></AboutMe></Section>
            <Section ><Contact></Contact></Section>

            <div className={classes['backgrounds']}>
                <div />
                <div />
                <div />
                <div />
            </div>

            <div className={classes['blob1']}></div>
            {!scrolledDown && <div className={classes['scroll-down-container']}>
                <p>Scroll down</p>
                <p>||</p>
            </div>}
            <Toasty />
        </div>
    )
}

// <div className={classes['img-background']}></div>



export default Layout;