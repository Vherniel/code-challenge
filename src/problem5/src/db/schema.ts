import {
	InferInsertModel,
	InferSelectModel,
} from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
	id: int().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	age: int().notNull(),
	email: text().notNull().unique(),
});

export type UsersTableInsert = InferInsertModel<typeof usersTable>;
export type UsersTableUpdate = InferInsertModel<typeof usersTable> & {
	id: number;
};
export type UsersTableSelect = InferSelectModel<typeof usersTable>;
