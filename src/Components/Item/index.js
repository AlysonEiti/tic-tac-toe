import './Item.css';

const Item = (props) => {
    return (
        <div className='divItem'>
            <div data-item={props.item} className={`item ${props.class}`}></div> 
            <div className={`divBorder divBorder${props.item}`}></div>
        </div>
    );
}

export default Item;