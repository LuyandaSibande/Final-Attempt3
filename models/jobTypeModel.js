const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const jobTypeSchema = new mongoose.Schema({
    jobTypeName: {
        type: String,
        required: [true, 'Job Category is required'],
        trim: true,
        maxlength: 70
    },

    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    },



},
{ timestamps: true });
 

module.exports = mongoose.model('JobType', jobTypeSchema);

