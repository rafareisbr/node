const Db = require('../data/database')

// const Cart = require('./cart')

class Product {
    static getAll() {
        return Db.execute('select * from products')
    }

    static findOne(id) {
        return Db.execute('select * from `products` where `id` = ?', [id])
    }

    static deleteOne(id) {
        return Db.execute('delete from `products` where `id` = ?', [id])
    }

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
        return Db.execute(
            'insert into `products` (title, imageUrl, description, price) values (?, ?, ?, ?)',
            [this.title, this.imageUrl, this.description, this.price]
        )
    }
}

module.exports = Product
