const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegisterSchema = new Schema({
    Name: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    Email: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    MotherName: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    BirthDate: {
        type: String,
        required :[true , "This Field Is Required"]
    },
    ID: {
        type: Number,
        required :[true , "This Field Is Required"]
    },
});

const Register = mongoose.model('Register', RegisterSchema);
module.exports = Register;
