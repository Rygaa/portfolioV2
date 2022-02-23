import React from "react";
import react from "react"
import BrainIMG from '../images/brain.png'

function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
        right: rect.right,
    };
}



const Skill = (props) => {
    const myRef = React.useRef();
    const [removed, setRemoved] = React.useState();
    const [loadFinish, setLoadFinish] = React.useState(false);
    const [skillVisible, setSkillVisible] = React.useState(window.innerWidth > 1500 ? true : false);

    React.useEffect(() => {
        setLoadFinish(true);
        myRef.current.children[0].style.top = props.position.top + (props.dimension.height / 2) + 'px';
        setInterval(() => {
            const myPosition = getOffset(myRef.current.children[0]);
            const myRight = myRef.current.children[0].style.right.split('p')[0];
            const myLeft = myRef.current.children[0].style.left.split('p')[0];
            if (window.innerWidth > 1500) {
                if (myPosition.left > props.position.left + 100)
                    myRef.current.children[0].style.right = (parseInt(myRight) + (10)) + 'px';
                else {
                    myRef.current.remove();
                    setRemoved(true);
                }
            } else {
                if (myPosition.left < props.position.left - 50)
                    myRef.current.children[0].style.left = (parseInt(myLeft) + (10)) + 'px';
                else {
                    myRef.current.remove();
                    setRemoved(true);
                }
            }
     
        }, 20)
        const myPosition = getOffset(myRef.current.children[0]);
        window.addEventListener('resize', () => {
            setSkillVisible(window.innerWidth > 1500 ? true : false);
        })
    }, [])

    React.useEffect(() => {
        if (removed) {
            props.updateBrainSize(.25);
        }
    }, [removed])


    const style = {
        visibility: `${loadFinish ? 'visible' : 'hidden'}`,
        position: 'absolute',

        fontSize: '3.5rem',
        color: 'rgba(39, 172.5, 234, 1)'
    }

    if (window.innerWidth > 1500) {
        style.right = '50px';
        style.display = 'block'
    } else {
        style.left = '50px'
        style.display = 'none'
    }

    return (
        <div ref={myRef}>
            <div style={style} class={props.image} />
        </div>
    )
}

export default Skill;