import fs from 'node:fs';
import { Request, Response, NextFunction } from 'express';

export const corsMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
	res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');

	if (req.method === 'OPTIONS') {
		return res.sendStatus(204);
	}

	next();
};

export const verifyDbReady = (
	_: Request,
	res: Response,
	next: NextFunction,
) => {
	try {
		const dbFile = process.env.DB_FILE_NAME!.split('file:').pop() ?? 'local.db';

		// Check if DB file exists
		if (!fs.existsSync(dbFile)) {
			return res.status(200).json({ message: 'Database file does not exist.' });
		}

		// Check file size
		const { size } = fs.statSync(dbFile);
		if (size === 0) {
			return res
				.status(200)
				.json({ message: 'Database file exists but is empty.' });
		}
	} catch (err) {
		res.status(500).json({ error: 'Failed to check database.' });
	}

	next();
};
