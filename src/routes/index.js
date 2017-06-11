'use strict';

//import fs from 'fs';
//import path from 'path';
import compose from 'koa-compose';
import Router from 'koa-router';

import api from './api';

const router = new Router();

router.get('/', async(ctx, next) => {

    // render view/index.ejs
    await ctx.render('./index')

})

router.use('/api', api.routes(), api.allowedMethods())

router.get('*', async(ctx, next) => {
    ctx.throw(404);
})

//export default router
export default function routes() {
    return compose(
        [
            router.routes(),
            router.allowedMethods()
        ]
    )
}