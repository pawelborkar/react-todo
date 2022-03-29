import ListItem from '../components/ListItem'


const ItemList = ({ items, handleCheck, handleDelete }) => {
    return (
        <ul>
            {items.map(item => (
                <ListItem
                    key={item.id}
                    item={item}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ))}
        </ul>
    )
}

export default ItemList