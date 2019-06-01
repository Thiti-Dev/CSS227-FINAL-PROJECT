const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const PostSchema = new Schema({
    _username: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
        required: true        
    },
    text: {
        type: String,
        required: true
    },
    likes: [{
        _username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [
        {
            _username: {
                type: Schema.Types.ObjectId,
                ref: 'users'
            },
            text: {
                type: String,
                require: true
            },
            username: {
                type: String
            },
            profileURL: {
                type: String
            },       
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    posttype: {
        type: String,
    },
    topic: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('posts', PostSchema);