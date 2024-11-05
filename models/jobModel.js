const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;


const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: 70
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        // maxlength: 2000
    },

    salary: {
        type: Number,
        required: [true, 'Salary is required']
    },

    location: {
        type: String
        // required: [true, 'Location is required'],
        // trim: true
    },

    available: {
        type: Boolean,
        default: true
    },

    jobType: {
        type: ObjectId,
        ref: 'JobType',
        required: true
    },
    user: {
        type: ObjectId,
        ref: 'User',
        required: true
    }

    // email: {
    //     type: String,
    //     required: [true, 'E-mail is required'],
    //     match: [
    //         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    //         'Please add a valid email'
    //     ],
    //     trim: true
    // },
    // address: {
    //     type: String,
    //     required: [true, 'Address is required']
    // },
    // company: {
    //     type: String,
    //     required: [true, 'Company is required'],
    //     trim: true,
    //     maxlength: 100
    // },
    // industry: {
    //     type: String,
    //     required: [true, 'Industry is required'],
    //     trim: true,
    //     maxlength: 100
    // },
    // jobType: {
    //     type: String,
    //     required: [true, 'Job type is required'],
    //     enum: {
    //         values: [
    //             'Permanent',
    //             'Temporary',
    //             'Internship'
    //         ],
    //         message: 'Please select correct job type'
    //     }
    // },
    // minEducation: {
    //     type: String,
    //     required: [true, 'Minimum education is required'],
    //     enum: {
    //         values: [
    //             'High School',
    //             'Bachelors',
    //             'Masters'
    //         ],
    //         message: 'Please select correct education'
    //     }
    // },
    // positions: {
    //     type: Number,
    //     default: 1
    // },
    // experience: {
    //     type: String,
    //     required: [true, 'Experience is required'],
    //     trim: true,
    //     maxlength: 100
    // },
    
    // postingDate: {
    //     type: Date,
    //     default: Date.now
    // },
    // lastDate: {
    //     type: Date,
    //     required: [true, 'Last date is required']
    // },
    // applicantsApplied: {
    //     type: [Object],
    //     select: false
    // }
},
{ timestamps: true });
 

module.exports = mongoose.model('Job', jobSchema);

