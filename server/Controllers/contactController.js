const Admin = require('../Models/Admin');
const { sendContactEmail } = require('../models/emailModel');

exports.sendContact = async (req, res) => {
    const {name, email, message} = req.body 
    await sendContactEmail(name, email, message);
    res.json({message:"sent"})
}
