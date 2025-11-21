import 'dotenv/config';
import { and, eq, gte, like, lte, asc, desc } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/libsql';
import { usersTable } from '../schema';
import { UserQueryParams } from '@/src';

const db = drizzle<{ users: typeof usersTable }>({
	connection: { url: process.env.DB_FILE_NAME! },
	schema: { users: usersTable },
});

async function getUsers({
	name,
	minAge,
	maxAge,
	orderBy = 'id',
	asc: ascending,
	desc: descending,
	limit,
	offset,
}: UserQueryParams) {
	return await db.query.users.findMany({
		where: (users) => {
			const conditions = [];
			if (name) conditions.push(like(users.name, `%${name}%`));
			if (minAge != null) conditions.push(gte(users.age, minAge));
			if (maxAge != null) conditions.push(lte(users.age, maxAge));
			return conditions.length ? and(...conditions) : undefined;
		},
		orderBy: (users) => {
			const column = users[orderBy];
			return [
				ascending != null
					? asc(column)
					: descending != null
						? desc(column)
						: asc(column),
			];
		},
		limit: Number(limit),
		offset: Number(offset),
	});
}

async function getUserById(id: number) {
	return await db.query.users.findFirst({ where: eq(usersTable.id, id) });
}

export { getUsers, getUserById };
