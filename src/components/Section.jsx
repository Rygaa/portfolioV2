import classes from '../assets/5-components/Section.module.scss'

const Section = (props) => {
    return (
        <div className={classes['Section']} style={props.style}>
            {props.children}
        </div>
    )
}


export default Section;