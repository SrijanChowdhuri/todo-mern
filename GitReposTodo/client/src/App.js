import {useEffect, useState} from 'react'
import axios from 'axios'
import './App.css';

function App() {

  const[itemText, setItemText] =  useState('')
  const[listItems, setListItems] = useState([])
  const[isUpdating, setIsUpdating] = useState('')
  const [updateItemText, setUpdateItemText] = useState('');

  const addItem = async (e) =>{
    e.preventDefault()
    try{
      const res = await axios.post('http://localhost:8080/api/item', {item: itemText} )
      setListItems(prev => [...prev, res.data])
      setItemText('')
    }
    catch(err){
      console.log(err)
    }
  }


  // Using useEffect Hook to get all the items in the list
  useEffect(() => {
    const getItemsList = async() =>{
      try{
        const res = await axios.get('http://localhost:8080/api/items')
        setListItems(res.data)
      }
      catch(err){
        console.log(err)
      }
    }
    getItemsList()
  }, [])


  //Delete item in a list
  const deleteItem =  async(id) =>{
    try{
      const res = await axios.delete(`http://localhost:8080/api/item/${id}`)
      const newListItems = listItems.filter(item=> item._id !== id);
      setListItems(newListItems);
    }catch(err){
      console.log(err)
    }
  }

  //Rendering the input field before updating the form
  const renderUpdateForm = () => (
    <form className="update-form" onSubmit={(e)=>{updateItem(e)}} >
      <input className="update-new-input" type="text" placeholder="New Item" onChange={e=>{setUpdateItemText(e.target.value)}} value={updateItemText} />
      <button className="update-new-btn" type="submit">Update</button>
    </form>
  )


  const updateItem = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.put(`http://localhost:8080/api/item/${isUpdating}`, {item: updateItemText})
      console.log(res.data)
      const updatedItemIndex = listItems.findIndex(item => item._id === isUpdating);
      const updatedItem = listItems[updatedItemIndex].item = updateItemText;
      setUpdateItemText('');
      setIsUpdating('');
    }catch(err){
      console.log(err);
    }
  }


  return (
    <div className="App">
      <h1> Todo List</h1>
      <form className ="form" onSubmit={e => addItem(e)}>
        <input type ="text" placeholder = "Enter the todo" onChange={e => {setItemText(e.target.value)}} value = {itemText}/>
        <button type = "submit">Add</button>
      </form>
      <div className = "todo-listItems">
        {
          listItems.map((item) =>(
            <div className = "todo-item">
              {
                isUpdating === item._id ? renderUpdateForm() : <>
                  <p className = "item-in-list">{item.item}</p>
                  <button className = "update-todo" onClick = {() => {setIsUpdating(item._id)}}>Update</button>
                  <button className = "delete-todo" onClick={() => {deleteItem(item._id)}}>Delete</button>
                </>
              }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
