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

    React.useEffect(() => {
        setLoadFinish(true);
        myRef.current.children[0].style.top = props.position.top + (props.dimension.height / 2) + 'px';
        setInterval(() => {
            const myPosition = getOffset(myRef.current.children[0]);
            const myRight = myRef.current.children[0].style.right.split('p')[0];
            // const speed = (myPosition.right - props.position.right) / (props.speed * 10)
            const speed = (myPosition.right - props.position.right) / 10
            if (myPosition.left > props.position.left + 100)
                myRef.current.children[0].style.right = (parseInt(myRight) + (10)) + 'px';
            else {
                myRef.current.remove();
                setRemoved(true);
            }
        }, 20)
        const myPosition = getOffset(myRef.current.children[0]);
    }, [])

    React.useEffect(() => {
        if (removed) {
            props.updateBrainSize(.25);
        }
    }, [removed])




    return (
        <div ref={myRef}>
            <div style={{ visibility: `${loadFinish ? 'visible' : 'hidden'}`, right: '50px', position: 'absolute', width: '100px', height: '100px', fontSize: '3.5rem', color: 'rgba(39, 172.5, 234, 1)' }} class={props.image} />
        </div>
    )
}

export default Skill;