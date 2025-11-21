import 'dotenv/config';
import express, { type Request, type Response } from 'express';
import { getUsers } from './db/query/users';
import { corsMiddleware, verifyDbReady } from './middleware';

const app = express();
const port = Number(process.env.PORT) || 3000;

app.use(corsMiddleware);
app.use(verifyDbReady);

// Get all users
app.get('/users', async (req: Request, res: Response) => {
	res.json(await getUsers());
});

// Start the server
app.listen(port, () => {
	console.info(`Example app listening on port ${port}`);
});
