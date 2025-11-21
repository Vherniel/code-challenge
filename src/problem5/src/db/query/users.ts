import 'dotenv/config';
import { drizzle } from 'drizzle-orm/libsql';
import { usersTable } from '../schema';

const db = drizzle<{ users: typeof usersTable }>({
	connection: { url: process.env.DB_FILE_NAME! },
	schema: { users: usersTable },
});

async function getUsers() {
  return await db.query.users.findMany();
}

export { getUsers }
