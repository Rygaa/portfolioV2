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
                    if (!props.pause)
                        setCounter(counter => counter + 1)
                }, 50)
                setTimer(interval);
            }

        }

    }, [props.pause])

    useEffect(() => {
        if (!props.done) {
            if (props.txt == 'Front-end: React') {
                console.log(counter)
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


    return (
        <div className = {classes['Output']}>
            <p>{(counter == 0) && !props.done ? '' : text}</p>
        </div>
    )
    
}

export default Output