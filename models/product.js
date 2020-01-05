const fs = require('fs');
const path = require('path');

let products = [];
const dirpath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);

const getProductsFromFile = function(callback) {
    fs.readFile(dirpath, (error, data) => {
        let products = [];
        if(error) {
            return callback(products);
        }
        return callback(JSON.parse(data));
    });
}

class Product {
    
    constructor(title) {
        this.title = title;
    }

    save() {
        getProductsFromFile((products) => {
            products.push(this);
            fs.writeFile(dirpath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

}

module.exports = Product;
