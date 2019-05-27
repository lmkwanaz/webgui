const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    idno:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
 mongoose.model('employee', UserSchema);