export const transformProject = (dbProject) => ({
	id: dbProject.id,
	userId: dbProject.user_id,
	title: dbProject.title,
	description: dbProject.description,
	createdAt: dbProject.created_at,
	updatedAt: dbProject.updated_at,
});
