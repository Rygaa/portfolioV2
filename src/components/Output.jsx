import { useEffect, useState } from "react";
import classes from "../assets/5-components/Output.module.scss"


const Output = (props) => {
    const [counter, setCounter] = useState(0)
    const [timer, setTimer] = useState(null)
    const [text, setText] = useState(props.done ? props.txt : '')

    useEffect(() => {
        if (!props.done) {
            if (counter != props.txt.length - 1) {
                clearInterval(timer);
                const interval = setInterval(() => {
                    const element = document.getElementById(props.parent)

                    if (!props.pause && isInViewport(element))
                        setCounter(counter => counter + 1)
                }, 50)
                setTimer(interval);
            }

        }

    }, [props.pause])

    useEffect(() => {
        if (!props.done) {
            if (props.txt == 'Front-end: React') {
                // console.log(counter)
            }
            if (counter == props.txt.length) {
                clearInterval(timer)
                setTimer(null)
                props.updateOutputPauseStatus(props);

            } else if (counter < props.txt.length) {
                setText(text + props.txt[counter]);
            } else if (counter == 0) {

            }
        }
 
    }, [counter])
    
    useEffect(() => {
    }, [])



    function isInViewport(element) {
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

    // function isInViewport(element) {
    //     const rect = element.getBoundingClientRect();
    //     return (
    //         rect.top >= 0 &&
    //         rect.left >= 0 &&
    //         rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    //         rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    //     );
    // }

    return (
        <div className = {classes['Output']} >
            <p style={props.style}>{(counter == 0) && !props.done ? '' : text}</p>
        </div>
    )
    
}

export default Output