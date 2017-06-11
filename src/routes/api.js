'use strict';

import Router from 'koa-router';
import {
    lyrics
} from '../lib/lyrics';

const router = new Router();

router.get('/', async(ctx, next) => {

    ctx.body = lyrics();

})

router.get('/app', async(ctx, next) => {
    ctx.body = {
        "status": "api app"
    }
})

export default router;