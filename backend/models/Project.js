// project.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }, 
    priority: {
        type: String,
        required: false
    },
    assignee: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    status: {
        type: String,
        required: false
    },
    startDate: {
        type: Date,
        required: false
    },
    endDate: {
        type: Date,
        required: false
    },
    progress : {
        type: Number,
        required: false
    },
    blockingTasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task',
        required: false
    }]}, {timestamps: true}
)

const projectSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        adminId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }, 
        collaborators: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: false
        }],
        tasks: [taskSchema],
        startDate: {
            type: Date,
            required: true
        },
        endDate: {
            type: Date,
            required: false
        }
    }, {timestamps: true}
);

module.exports = {
    Project: mongoose.model('Project', projectSchema),
    Task: mongoose.model('Task', taskSchema)
}