/// <reference types="koa" />
declare const _default: {
    localeMiddleware: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => (ctx: import("koa").Context, next: import("koa").Next) => Promise<void>;
};
export default _default;
