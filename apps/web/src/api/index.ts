import { Api } from '@repo/exapi';

// TODO: load from env
const url = new URL('http://localhost:1337');

export const api = new Api(url.toString());
