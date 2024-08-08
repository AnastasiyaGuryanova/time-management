export const transformProject = (dbProjects) => ({
	id: dbProjects.id,
	userId: dbProjects.user_id,
	title: dbProjects.title,
	description: dbProjects.description,
	createdAt: dbProjects.created_at,
	updatedAt: dbProjects.updated_at,
});
