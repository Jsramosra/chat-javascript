const mongo = require('mongoose');
const {Schema} = mongo;

const chatSchema = new Schema({
    nick: String,
    msg: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongo.model('Chat', chatSchema);