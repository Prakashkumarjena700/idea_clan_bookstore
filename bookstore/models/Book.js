const { Schema, model } = require('mongoose');

const bookSchema = new Schema({
    name: String,
    description: String,
    createdAt: String,
    author:String,
    owner:String
});

module.exports = model('Book', bookSchema); 
