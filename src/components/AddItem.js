import { useRef } from 'react'
import { MdAddCircleOutline } from 'react-icons/md'

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
    const inputRef = useRef()
    return (
        <form
            className='addForm'
            onSubmit={e => handleSubmit(e)}
        >

            <label htmlFor="addItem">Add Item</label>
            <input
                ref={inputRef}
                autoFocus
                type='text'
                id='addItem'
                placeholder='Add a new item'
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                required
            />
            <button
                type='submit'
                aria-label='add new item'
                onClick={() => inputRef.current.focus()}

            >
                <MdAddCircleOutline />
            </button>
        </form>
    )
}

export default AddItem