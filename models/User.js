const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    profileURL: {
        type: String,
        default: 'http://community.waxidea.com/images/users/default-user.png'
    },
    coverURL: {
        type: String,
        default: 'https://cn.opendesktop.org/img/2/0/c/0/d07675640e78f0f8d2f07fd700e1c8920d8d.jpg'
    },
    level:{
        type: Number,
        default: 1
    },
    experience:{
        type: Number,
        default: 0
    },
    readtime:{
        type: Number,
        default: 0
    },
    checkin:{
        type: Number,
        default: 1
    },
    point:{
        type: Number,
        default: 0
    },
    roles: [
        {
            name: {
                type: String,
                require: true
            },
        }
    ],
    followers: [
        {
        _username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        username: {
            type: String
        },
        profileURL: {
            type: String
        }
    }],
    following: [{
        _username: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        username: {
            type: String
        },
        profileURL: {
            type: String
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = User = mongoose.model('users', UserSchema);