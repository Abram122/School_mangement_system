const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    name: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    email: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    ID: {
        type: Number,
        required :[true , "This Field Is Required"]
    },
    motherName: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    birthDate: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    status: {
        type: String,
        default: 'In Progress'
    },
});

const Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;
