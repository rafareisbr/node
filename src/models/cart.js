// class Cart {
//     static addProduct(productId, productPrice, callback) {
//         //fetch previous cart

//         return getCartFromFile(fileContent => {
//             // inicializa o carrinho
//             let cart = { products: [], totalPrice: 0 }

//             // if there is no errors trying read the file storage
//             if (fileContent) {
//                 // take the cart data
//                 cart = fileContent

//                 // check if the cart already contains the product
//                 const existingProductIndex = cart.products.findIndex(
//                     prod => prod.id === productId
//                 )
//                 const existingProduct = cart.products[existingProductIndex]

//                 // if already exists, just add one more unit(qtd + 1)
//                 let updatedProduct = {}
//                 if (existingProduct) {
//                     // here it creates a new object instead of change the variable to avoid reference errors
//                     updatedProduct = { ...existingProduct }
//                     updatedProduct.qtd = updatedProduct.qtd + 1
//                     cart.products = [...cart.products]
//                     cart.products[existingProductIndex] = updatedProduct
//                 } else {
//                     updatedProduct = { id: productId, qtd: 1 }
//                     cart.products = [...cart.products, updatedProduct]
//                 }
//                 // the + before productPrice makes it Integer
//                 cart.totalPrice =
//                     parseInt(cart.totalPrice) + parseInt(productPrice)
//                 saveCartToFile(cart, () => {
//                     callback('')
//                 })
//             }
//         })
//     }

//     static deleteProductById(productId, productPrice, callback) {
//         getCartFromFile(cart => {
//             const updatedCart = { ...cart }
//             const product = cart.products.find(
//                 product => product.id === productId
//             )
//             if (!product) return
//             updatedCart.products = cart.products.filter(
//                 product => product.id !== productId
//             )
//             updatedCart.totalPrice =
//                 parseInt(cart.totalPrice) - parseInt(productPrice) * product.qtd

//             saveCartToFile(updatedCart, () => {
//                 callback()
//             })
//         })
//     }

//     static getCart(callback) {
//         getCartFromFile(cart => {
//             callback(cart)
//         })
//     }
// }

// module.exports = Cart
