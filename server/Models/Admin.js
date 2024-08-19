const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    admin_name: { type: String },
    admin_password: { type: String },
    role: {
        type: String,
        default: "admin"
    },
    refreshToken: {
        type: String,
        default: null
    },
});

const Admin = mongoose.model('Admin', AdminSchema);
module.exports = Admin;
