import type { Core } from '@strapi/types';
import type { Context, Next } from 'koa';
export declare const localeMiddleware: ({ strapi }: {
    strapi: Core.Strapi;
}) => (ctx: Context, next: Next) => Promise<void>;
export default localeMiddleware;
