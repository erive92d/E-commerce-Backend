const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
      const allTags = await Tag.findAll({
        include: Product
      })

      res.status(200).json(allTags)
  } catch (err) {
      res.status(500).json(err)
  }
  // find all tags
  // be sure to include its associated Product data
});

router.get('/:id', async (req, res) => {

  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const getTag = await Tag.findByPk(req.params.id, {
      include: Product
    })

    res.status(200).json(getTag)
    
  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  try {
    const newTag = await Tag.create(req.body, {
      include: Product
    })

    res.status(200).json(newTag)

  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const getTag = await Tag.update({tag_name: req.body.tag_name}, {where: {id: req.params.id}})

    res.status(200).json(getTag)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  console.log(req.params.id)
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if(!deleteTag) {
      res.status(404).json({ message: "No Tag with that ID!"})
      return
    }

    res.status(200).json(deleteTag)
  } catch (err) {
    res.status(500).json(err)

  }
});

module.exports = router;
