import classes from '../assets/5-components/Title.module.scss'

const Title = (props) => {
    return (
        <div className={classes['Title']}>
            <img style={{ fill: '#94d31b'}} src={props.image}></img>
            <div>
                <p>{props.title}</p>
                <div />
            </div>
        </div>
    )
}

export default Title;