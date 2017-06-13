'use strict';

import Router from 'koa-router';
import Lyrics from '../lib/lyrics';

const router = new Router();
const lyrics = new Lyrics();

router.get('/:name', async(ctx, next) => {

    let name = ctx.params.name;
    if (name) {
        ctx.body = lyrics.parseLyric(name);
    } else {
        ctx.throw(404);
    }

})

router.get('/app', async(ctx, next) => {
    ctx.body = {
        "status": "api app"
    }
})

export default router;