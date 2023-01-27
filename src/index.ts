import { Router } from 'worktop';
import * as CORS from 'worktop/cors';
import { start } from 'worktop/sw';
import * as Cache from 'worktop/cfw.cache';

import * as PlaceholderController from '~/controllers/placeholder'
import { reply } from 'worktop/response';

const API = new Router();
API.prepare = Cache.sync();

/**
 * Handles `OPTIONS` requests using the same settings.
 * NOTE: Call `CORS.preflight` per-route for individual settings.
 */
API.prepare = CORS.preflight({
	origin: '*', // allow any `Origin` to connect
	headers: ['Cache-Control', 'Content-Type'],
	methods: ['GET', 'HEAD', 'OPTIONS'],
});

API.add('GET', '/', () => reply(200, '/:height/:width'))
API.add('GET', '/:height/:width', PlaceholderController.index);

export default start(API.run);
