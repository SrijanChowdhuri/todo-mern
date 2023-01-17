const router = require('express').Router()
// importing todo models
const todoItemsModel = require('../models/todoItems')

// Creating the first route
router.post('/api/item', async (req,res)=>{
    try{
        const newItem = new todoItemsModel({
            item: req.body.item
        })
        // Saving the item to the database
        const saveItem = await newItem.save()
        res.status(200).json(saveItem)
    }
    catch(err){
        res.json(err)
    }
})


router.get('/api/items', async(req, res)=>{
    try{
        const allTodoItems = await todoItemsModel.find({})
        res.status(200).json(allTodoItems)
    }
    catch(err){
        res.json(err)
    }
})

router.put('/api/item/:id', async (req, res)=>{
    try{
      //Finding the item by its id and updating it
      const updateItem = await todoItemsModel.findByIdAndUpdate(req.params.id, {$set: req.body});
      res.status(200).json("Item Updated");
    }catch(err){
      res.json(err);
    }
  })
  
  
  //Delete item from database
  router.delete('/api/item/:id', async (req, res)=>{
    try{
      //find the item by its id and delete it
      const deleteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Item Deleted');
    }catch(err){
      res.json(err);
    }
  })



// Exporting the router
module.exports = router