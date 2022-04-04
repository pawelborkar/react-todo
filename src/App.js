import { useState, useEffect } from "react";
import "./App.css";
import AddItem from "./components/AddItem";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SearchItem from "./components/SearchItem";
import Todo from "./components/Todo";
import apiRequest from './apiRequest'

const App = () => {
  const API_URL = "http://localhost:3004/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok)
          throw Error("Did not receive the expected data.");
        const listItems = await response.json();
        setItems(listItems);
        setFetchError(null);
      } catch (error) {
        setFetchError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchResults();
  }, []);

  const addItem = async (data) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const addNewItem = { id, checked: false, data };
    const listItems = [...items, addNewItem];
    setItems(listItems);

    const postItem = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(addNewItem),
    }
    const result = await apiRequest(API_URL, postItem)
    if (result) setFetchError(result)
  };

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setItems(listItems);

    const myFilter = listItems.filter((item) => item.id === id);

    const updateItem = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ checked: myFilter[0].checked })
    }

    const reqURL = `${API_URL}/${id}`

    const result = await apiRequest(reqURL, updateItem)

    if (result) setFetchError(result)


  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    const deleteItem = {
      method: 'DELETE'
    }
    const reqURL = `${API_URL}/${id}`
    const result = await apiRequest(reqURL, deleteItem)
    if (result) setFetchError(result)

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem("");
  };

  return (
    <div className="App">
      <Navbar />
      <AddItem
        newItem={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <SearchItem search={search} setSearch={setSearch} />
      <main>
        {isLoading && <p>Loading ...</p>}
        {fetchError && (
          <p style={{ color: "#f12" }}>{`${fetchError}`}</p>
        )}
        {!fetchError && !isLoading && (
          <Todo
            items={items.filter((item) =>
              item.data
                .toLowerCase()
                .includes(search.toLowerCase())
            )}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
          />
        )}
      </main>
      <Footer numberOfItems={items.length} />
    </div>
  );
};
export default App;
