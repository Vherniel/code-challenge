import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { createUser, getUserById, getUsers, updateUser } from './db/query/users';
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

// Create a new user
app.post('/users', express.json(), async (req: Request, res: Response) => {
	const { name, age, email } = req.body;

	[name, age, email].forEach((field) => {
		if (!field) {
			return res
				.status(400)
				.json({ error: `Missing required field/s: ${field}` });
		}
	});

	try {
		res.status(201).json(await createUser({ name, age, email }));
	} catch (error) {
		httpError(res, 500);
	}
});

// Update a user
app.put('/users/:id', express.json(), async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name, age, email } = req.body;
	try {
		const result = await updateUser({ id: Number(id), name, age, email });

		if (result.length == 0) {
			return res.status(404).json({ error: 'User not found' });
		}

		res.json(result);
	} catch (error) {
		httpError(res, 500);
	}
});

// Start the server
app.listen(port, () => {
	console.info(`Example app listening on port ${port}`);
});
