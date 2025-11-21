import { Response } from 'express';

const defaultMessages: Record<number, string> = {
	400: 'Bad Request',
	401: 'Unauthorized',
	403: 'Forbidden',
	404: 'Not Found',
	405: 'Method Not Allowed',
	409: 'Conflict',
	422: 'Unprocessable Entity',
	429: 'Too Many Requests',
	500: 'Internal Server Error',
	501: 'Not Implemented',
	503: 'Service Unavailable',
};

function httpError(res: Response, status: number, message?: string) {
	return res
		.status(status)
		.json({ error: message || defaultMessages[status] || 'Error' });
}

export { httpError };
