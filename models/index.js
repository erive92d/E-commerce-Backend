// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'CASCADE'
})

Product.hasMany(ProductTag, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})

ProductTag.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE'
})
// Tag.belongsTo(Category, {
//   foreignKey: 'category_id'
// })
// Category.hasMany(Tag, {
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE'
// })

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag,{
  through: ProductTag
})

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
