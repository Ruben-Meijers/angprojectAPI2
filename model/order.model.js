const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: String,
    Orderdate: String,
    supplier: String,        
    product: [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product'
    }],
    time: String,
     
}, {
    timestamps: true
});
const Order = mongoose.model('order', OrderSchema);

// const ordertest = new Order({
//     name: 'testorder',
//     description: 'gekke test om orderverbinding te testen',
//     date: 'vandaag'
// }).save();

module.exports = Order;