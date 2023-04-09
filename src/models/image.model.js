const mongoose = require('mongoose');


const customerSchema = new mongoose.Schema({
    id: { type: String, required: true },
    image: { type: String, required: true },
});

module.exports = mongoose.model('customerImages', customerSchema);
