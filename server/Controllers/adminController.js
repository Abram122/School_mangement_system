const Admin = require('../Models/Admin');

exports.verifyAdmin = async (req, res) => {
    console.log('in')
    const { admin_name, admin_password} = req.body
    const admin = await Admin.findOne({ admin_name });
    if (!admin) {
        return res.json({message:"not found"})
    }
    console.log(req.body)
    console.log(admin)
    if (admin.admin_password == admin_password) {
        console.log('sss')
        return res.json(admin._id)
    }
}

exports.checkAdmin = async (req, res) => {
    const {id} = req.body
    const admin = await Admin.findById(id);
    if (!admin) {
        return res.json({message:"not found"})
    } else {
        return res.json({message:"valid admin"})
    }
    
}