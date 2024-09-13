const mongoose = require('mongoose');

const ProjectSchema = mongoose.Schema(
	{
		user_id: {
			type: Number,
			required: true,
		},
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Task',
			},
		],
	},
	{ timestamps: true }
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
