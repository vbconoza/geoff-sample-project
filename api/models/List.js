/**
* List.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    attributes: {
        firstName  : {type : 'string', required: true},        
        lastName   : {type : 'string', required: true},
        grade      : {type : 'string', required: true, enum: ['A','B','C','D','E']},
        comment    : {type : 'string', required: true}
    },

    validationMessages: {
        firstName: {
            required : 'First Name is required.',
        },
        lastName: {
            required : 'Last Name is required.',
        },
        grade: {
            required : 'Grade is required.',
            in       : 'Invalid Grade'
        },
        comment: {
            required : 'Comment is required.',
        },
    },
};