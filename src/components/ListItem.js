import { MdDelete } from 'react-icons/md';

const ListItem = ({ item, handleCheck, handleDelete }) => {
    return (
        <li className='item' >
            <input
                className='input'
                type={'checkbox'}
                onChange={() => handleCheck(item.id)}
                checked={item.checked}
            />
            <label
                key={item.id}
                style={(item.checked) ? { textDecorationLine: 'line-through' } : null}
                onDoubleClick={() => handleCheck(item.id)}
            >
                {item.data}
            </label>
            <MdDelete
                role={'button'}
                tabIndex='0'
                onClick={() => handleDelete(item.id)}
            />
        </li>

    )
}

export default ListItem