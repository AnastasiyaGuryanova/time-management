export const transformUser = (dbUser) => ({
	id: dbUser.id,
	name: dbUser.name,
	email: dbUser.email,
	password: dbUser.password,
	roleId: dbUser.role_id,
	createdAt: dbUser.created_at,
	updatedAt: dbUser.updated_at,
});
