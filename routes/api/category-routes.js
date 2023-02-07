const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const categoryData = await Category.findAll({
      include: [{all:true}]
    })
    res.status(200).json(categoryData)
  }
  catch(err){
    res.status(500).json(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
    res.status(200).json(catData)
  }
  catch (err) {
    res.status(500).json(err)
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCat = await Category.create(req.body)
    res.status(200).json(newCat)
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  console.log(req.body)
  try {
    const updateCat = await Category.update(req.body, {
      where: {
        id: req.params.id,
      }
    })
    if(!updateCat[0]) {
      res.status(404).json({ message: 'No category with this id!'})
      return
    }
    res.status(200).json(updateCat)

  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteCat = await Category.destroy({
      where: {
        id: req.params.id
      }
    })
    if(!deleteCat) {
      res.status(404).json({ message: "No category with that ID!"})
      return
    }
    res.status(200).json({ message: 'Data has been deleted'})
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
