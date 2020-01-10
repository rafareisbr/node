const fs = require('fs')
const path = require('path')

const dirpath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
)

module.exports = class Cart {
  static addProduct(productId, productPrice) {
    //fetch previous cart
    fs.readFile(dirpath, (err, fileContent) => {
      // inicializa o carrinho
      let cart = { products: [], totalPrice: 0 }

      // if there is no errors trying read the file storage
      if (!err) {
        // take the cart data
        cart = JSON.parse(fileContent)

        // check if the cart already contains the product
        const existingProductIndex = cart.products.findIndex(
          prod => prod.id === productId
        )
        const existingProduct = cart.products[existingProductIndex]

        // if already exists, just add one more unit(qtd + 1)
        let updatedProduct = {}
        if (existingProduct) {
          // here it creates a new object instead of change the variable to avoid reference errors
          updatedProduct = { ...existingProduct }
          updatedProduct.qtd = updatedProduct.qtd + 1
          cart.products = [...cart.products]
          cart.products[existingProductIndex] = updatedProduct
        } else {
          updatedProduct = { id: productId, qtd: 1 }
          cart.products = [...cart.products, updatedProduct]
        }
        // the + before productPrice makes it Integer
        cart.totalPrice = cart.totalPrice + +productPrice
        fs.writeFile(dirpath, JSON.stringify(cart), err => {
          console.log(err)
        })
      }
    })
  }
}
