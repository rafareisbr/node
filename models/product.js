const fs = require('fs')
const path = require('path')
const process = require('process')

const dirpath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
)

const getProductsFromFile = function(callback) {
  fs.readFile(dirpath, (error, data) => {
    let products = []
    if (error) {
      return callback(products)
    }
    return callback(JSON.parse(data))
  })
}

class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    this.id = Math.random().toString()
    getProductsFromFile(products => {
      products.push(this)
      fs.writeFile(dirpath, JSON.stringify(products), err => {
        console.log(err)
      })
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback)
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(product => product.id === id)
      callback(product)
    })
  }
}

module.exports = Product
