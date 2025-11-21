import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { getUserById, getUsers } from './db/query/users';
import { httpError } from './utils/http-error';
import { corsMiddleware, verifyDbReady } from './middleware';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(corsMiddleware);
app.use(verifyDbReady);

// Get all users
app.get('/users', async (req: Request, res: Response) => {
	res.json(await getUsers());
});

// Get user by ID
app.get('/users/:id', async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		res.json(await getUserById(Number(id)));
	} catch (error) {
		httpError(res, 500);
	}
});

// Start the server
app.listen(port, () => {
	console.info(`Example app listening on port ${port}`);
});
