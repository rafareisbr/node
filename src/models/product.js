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

module.exports = class Product {
  constructor(
    id = null,
    title = '',
    imageUrl = '',
    description = '',
    price = 0.0
  ) {
    this.id = id
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(
          product => product.id === this.id
        )
        const updatedProducts = [...products]
        updatedProducts[existingProductIndex] = this
        fs.writeFile(dirpath, JSON.stringify(updatedProducts), err => {
          console.log(err)
        })
      } else {
        this.id = Math.random().toString()
        products.push(this)
        fs.writeFile(dirpath, JSON.stringify(products), err => {
          console.log(err)
        })
      }
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const updatedProducts = products.filter(product => product.id !== id)
      fs.writeFile(dirpath, JSON.stringify(updatedProducts), err => {
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
