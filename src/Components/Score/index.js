import './Score.css';

const Score = (props) => {
    return (
        <div className='infoItem'>
            <div className='infoTitle'>{props.description}:</div>
            <div className={`infoBody ${props.class}`}>--</div>
        </div>
    );
}

export default Score;