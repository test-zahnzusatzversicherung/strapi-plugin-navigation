import { NavigationItemType } from '../../schemas';
import { Core } from '@strapi/types';
export interface DuplicateCheckItem {
    items?: DuplicateCheckItem[];
    id?: number;
    title: string;
    path?: string | null;
    type: NavigationItemType;
    removed?: boolean;
}
export declare const checkDuplicatePath: ({ checkData, parentItem, }: {
    parentItem?: DuplicateCheckItem;
    checkData: DuplicateCheckItem[];
}) => Promise<void>;
export declare const generateFieldsFromRelated: (context: {
    strapi: Core.Strapi;
}, related: any, locale: string, contentTypesNameFields: Record<string, string[]>, pathDefaultFields: Record<string, string[]>) => Promise<{
    title: undefined;
    path: undefined;
} | {
    title: string;
    path: string | undefined;
}>;
