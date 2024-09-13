const mongoose = require('mongoose');

const TaskSchema = mongoose.Schema(
	{
		project_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
		user_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		task_text: {
			type: String,
			required: true,
		},
		start_time: {
			type: Date,
			default: null,
		},
		end_time: {
			type: Date,
			default: null,
		},
		duration: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
);

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
