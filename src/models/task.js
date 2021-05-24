const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    items: [{
        item: [{
            type: String,
            required: true,
            trim: true
        }],
    }],
    categoryName: [{
        type: String,
        required: true,
        enum: ['pharmacy', 'food'],
    }],
    orderStages: {
        type: String,
        required: true,
        enum: ['Task created', 'Reached store', 'Items picked', 'Enroute', 'Delievered', 'Canceled'],
    },
    pickupLocation: {
        type: String,
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;