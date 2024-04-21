import axios from 'axios';
import type { ICurrency, IResponse } from './types';

const API_URL = 'https://open.er-api.com/v6/latest/';

const headers = {
	'Content-Type': 'application/json; charset=utf-8',
};

export const instance = axios.create({ baseURL: API_URL, headers });

async function response(endpoint: ICurrency) {
	try {
		console.log('Send request');
		const response = await instance.get<IResponse>(endpoint);
		return response.data;
	} catch (error) {
		throw new Error();
	}
}

export default response;
