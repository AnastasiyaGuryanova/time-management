const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
	{
		taskText: {
			type: String,
			required: true,
		},
		startTime: {
			type: Date,
			default: null,
		},
		endTime: {
			type: Date,
			default: null,
		},
		duration: {
			type: Number,
			default: 0,
		},
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
