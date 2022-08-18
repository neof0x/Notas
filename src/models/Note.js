const {Schema, model} = require('mongoose')

const NoteSchema = new Schema({
    title: {type: String, require: true},
    description: {type: String, require: true},
    date: {type: Date, default: Date.now}
});


module.exports = model('Note', NoteSchema);