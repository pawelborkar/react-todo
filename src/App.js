import { useState } from 'react';
import './App.css';
import AddItem from './components/AddItem';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import SearchItem from './components/SearchItem';
import Todo from './components/Todo';

const App = () => {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("ShoppingList")) || [])

  const [newItem, setNewItem] = useState('')
  const [search, setSearch] = useState('')

  const saveAndSetItems = (newItems) => {
    setItems(newItems)
    localStorage.setItem("ShoppingList", JSON.stringify(newItems))
  }

  const addItem = (data) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    // console.log(id)
    const addNewItem = { id, checked: false, data }
    const listItems = [...items, addNewItem]
    saveAndSetItems(listItems)

  }

  const handleCheck = (id) => {
    const listItems = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item)
    saveAndSetItems(listItems)
  }

  const handleDelete = (id) => {
    const listItems = items.filter(item => item.id !== id)
    saveAndSetItems(listItems)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newItem) return;
    addItem(newItem)
    setNewItem('')

  }

  return (
    <div className="App">
      <Navbar />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <Todo
        items={items.filter(item => ((item.data).toLowerCase()).includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        numberOfItems={items.length}
      />

    </div>
  );

}
export default App;
