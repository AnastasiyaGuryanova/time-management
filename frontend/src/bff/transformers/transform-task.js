export const transformTask = (dbTask) => ({
	id: dbTask.id,
	projectId: dbTask.project_id,
	userId: dbTask.user_id,
	taskText: dbTask.task_text,
	startTime: dbTask.start_time,
	endTime: dbTask.end_time,
	duration: dbTask.duration,
	createdAt: dbTask.created_at,
	updatedAt: dbTask.updated_at,
});
