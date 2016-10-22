/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/
var bcrypt = require('bcrypt');

module.exports = {
    attributes: {
        username:   {type : 'string', unique: true, required: true},        
        password:   {type : 'string', required: true},
        role:       {type : 'string', required: true, enum: ['ADMIN', 'USER']},
    },

    validationMessages: {
        username: {
            required : 'Username is required.',
            unique   : 'Username already exists.',
        },
        password: {
            required : 'Password is required.',
        },
        role: {
            required : 'Role is required.',
            in       : 'Invalid role value.',
        },
    },
    
    encryptPassword: function (password, cb) {
        bcrypt.hash(password, 12, function (err, hash) {
            cb(hash);
        });
    },
    
    beforeCreate: function(attrs, cb) {
        if (attrs.password) { 
            User.encryptPassword(attrs.password, function(encryptedPassword){
                attrs.password = encryptedPassword; 
                cb(null);
            });
        } else cb(null);
    }
};