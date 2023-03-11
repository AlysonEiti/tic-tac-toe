import './Item.css';

const Item = (props) => {
    return (
        <div data-item={props.item} className={`item ${props.class}`}></div>
    );
}

export default Item;