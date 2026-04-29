import he, { uniqBy as uu, isNil as Ke, find as Kn, includes as lu, last as Wn, capitalize as fu, once as li, omit as vn, isEmpty as Ye, get as fn, toString as pu, pick as Ca, differenceBy as du, upperFirst as Xi, isObject as mr, isArray as jr, isString as Zi, zipWith as hu, first as gr, cloneDeep as mu, isNaN as gu } from "lodash";
import * as y from "zod";
import { z as Ra } from "zod";
import { union as yu, getOr as vu, curry as De, isObject as $e, isNil as X, clone as wu, isArray as We, pick as Ji, isEmpty as ze, cloneDeep as fi, omit as Eu, trim as wn, isString as Ue, pipe as bu, split as Hr, map as Su, flatten as xu, first as Fa, identity as _u, constant as Br, join as Au, eq as Tu, get as eo } from "lodash/fp";
import to from "crypto";
import En from "child_process";
import bn from "lodash/has";
import $a from "lodash/mapValues";
import no from "lodash/snakeCase";
import Cu from "lodash/camelCase";
import Ru from "lodash/mapKeys";
import zn from "os";
import Ee from "path";
import Xe from "fs";
import Ia from "assert";
import Fu from "events";
import $u from "buffer";
import Yn from "stream";
import ut from "util";
import Iu from "constants";
import "node:stream";
import Ou from "@sindresorhus/slugify";
import * as K from "zod/v4";
import Nu from "pluralize";
const pi = y.object({
  name: y.string({ required_error: "requiredError" }).nonempty("requiredError").refine((e) => !e.includes(" "), { message: "noSpaceError" }),
  label: y.string({ required_error: "requiredError" }).nonempty("requiredError"),
  description: y.string().optional(),
  placeholder: y.string().optional(),
  required: y.boolean().optional(),
  enabled: y.boolean().optional()
}), Pu = pi.extend({
  type: y.literal("select"),
  multi: y.boolean(),
  options: y.array(y.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
}), Lu = pi.extend({
  type: y.enum(["boolean", "string"]),
  multi: y.literal(!1).optional(),
  options: y.array(y.string()).max(0).optional()
}), ku = pi.extend({
  type: y.literal("media"),
  multi: y.literal(!1).optional(),
  options: y.array(y.string()).max(0).optional()
}), Oa = y.discriminatedUnion("type", [
  Lu,
  ku,
  Pu
]), Na = y.union([
  y.literal("audience"),
  Oa
]), Du = y.object({
  additionalFields: y.array(Na),
  allowedLevels: y.number(),
  contentTypes: y.array(y.string()),
  defaultContentType: y.string().optional(),
  contentTypesNameFields: y.record(y.string(), y.array(y.string())),
  contentTypesPopulate: y.record(y.string(), y.array(y.string())),
  gql: y.object({
    navigationItemRelated: y.array(y.string())
  }),
  pathDefaultFields: y.record(y.string(), y.any()),
  cascadeMenuAttached: y.boolean(),
  preferCustomContentTypes: y.boolean(),
  isCacheEnabled: y.boolean().optional()
}), Pa = y.object({
  id: y.number(),
  documentId: y.string(),
  name: y.string(),
  key: y.string()
}), Mu = y.enum(["INTERNAL", "EXTERNAL", "WRAPPER"]), di = y.object({
  id: y.number(),
  documentId: y.string(),
  title: y.string(),
  type: Mu,
  path: y.string().or(y.null()).optional(),
  slug: y.string().or(y.null()).optional(),
  externalPath: y.string().or(y.null()).optional(),
  uiRouterKey: y.string(),
  menuAttached: y.boolean(),
  order: y.number().int(),
  collapsed: y.boolean(),
  related: y.object({ documentId: y.string().optional(), __type: y.string() }).catchall(y.unknown()).nullish().optional(),
  additionalFields: y.record(y.string(), y.unknown()).or(y.null()).optional(),
  audience: y.array(Pa).or(y.null()).optional(),
  autoSync: y.boolean().or(y.null()).optional()
}), ju = di.omit({
  related: !0
}).pick({
  path: !0,
  type: !0,
  uiRouterKey: !0,
  title: !0,
  externalPath: !0
}).extend({ related: y.unknown().optional() }), Ht = di.extend({
  parent: y.lazy(() => Ht.or(y.null())).optional(),
  items: y.lazy(() => Ht.array()).optional(),
  master: y.lazy(() => tt(!1)).optional()
}), ro = y.array(Ht), tt = (e) => y.object({
  id: y.number(),
  documentId: y.string(),
  name: y.string(),
  slug: y.string(),
  locale: y.string(),
  visible: y.boolean(),
  items: e ? y.array(Ht) : Ht.array().optional()
}), Hu = tt(!1).omit({
  items: !0,
  id: !0,
  documentId: !0,
  slug: !0,
  locale: !0
}).extend({
  documentId: y.string().optional(),
  id: y.undefined().optional()
}), Bu = di.omit({ id: !0, documentId: !0 }).extend({
  id: y.number().optional(),
  documentId: y.string().optional(),
  items: y.lazy(() => La).or(y.null()).optional(),
  updated: y.boolean().optional(),
  removed: y.boolean().optional()
}), La = y.array(Bu), Uu = tt(!1).extend({
  items: La
}).partial().required({
  id: !0,
  documentId: !0
}), Gu = y.enum(["collectionType", "singleType"]), qu = y.object({
  singularName: y.string(),
  pluralName: y.string(),
  displayName: y.string(),
  description: y.string().optional(),
  name: y.string().optional()
}), ka = y.object({
  required: y.boolean().optional(),
  max: y.number().optional(),
  min: y.number().optional(),
  minLength: y.number().optional(),
  maxLength: y.number().optional(),
  private: y.boolean().optional(),
  configurable: y.boolean().optional(),
  default: y.any().optional()
}), Ku = y.enum([
  "string",
  "text",
  "richtext",
  "blocks",
  "email",
  "password",
  "date",
  "time",
  "datetime",
  "timestamp",
  "boolean",
  "integer",
  "biginteger",
  "float",
  "decimal",
  "json",
  "relation",
  "media"
]), Wu = ka.extend({
  type: Ku
}), zu = ka.extend({
  type: y.literal("enumeration"),
  enum: y.string().array()
}), Yu = y.object({
  type: y.literal("component"),
  component: y.string(),
  repeatable: y.boolean().optional()
}), Qu = y.object({
  type: y.literal("dynamiczone"),
  components: y.string().array()
}), Vu = y.object({
  type: y.literal("uid")
}), Xu = y.object({
  type: y.literal("media"),
  allowedTypes: y.enum(["images", "videos", "audios", "files"]).array(),
  required: y.boolean().optional()
}), Zu = y.enum([
  "oneToOne",
  "oneToMany",
  "manyToOne",
  "manyToMany",
  "morphToMany",
  "manyToMorph"
]), Ju = y.object({
  type: y.literal("relation"),
  relation: Zu,
  target: y.string(),
  mappedBy: y.string().optional(),
  inversedBy: y.string().optional()
}), el = y.record(
  y.string(),
  y.union([
    Wu,
    zu,
    Yu,
    Qu,
    Ju,
    Xu,
    Vu
  ])
), Ur = y.object({
  kind: Gu,
  collectionName: y.string(),
  info: qu,
  options: y.object({
    draftAndPublish: y.boolean().optional(),
    hidden: y.boolean().optional(),
    templateName: y.string().optional()
  }).optional(),
  attributes: el,
  actions: y.record(y.string(), y.any()).optional(),
  lifecycles: y.record(y.string(), y.any()).optional(),
  uid: y.string(),
  apiName: y.string().optional(),
  // TODO?: remove
  associations: y.object({
    model: y.string(),
    alias: y.string()
  }).array().optional(),
  modelName: y.string().optional(),
  plugin: y.string().optional(),
  pluginOptions: y.record(y.string(), y.any()).optional(),
  isSingle: y.boolean().optional()
});
Ur.pick({
  info: !0,
  kind: !0,
  attributes: !0,
  options: !0
});
const qt = (e, t) => (n) => {
  t(n(e()));
};
let Gr = Du;
const tl = qt(
  () => Gr,
  (e) => {
    Gr = e;
  }
);
let qr = Na;
const nl = qt(
  () => qr,
  (e) => {
    qr = e;
  }
);
let Kr = Oa;
const rl = qt(
  () => Kr,
  (e) => {
    Kr = e;
  }
);
let Wr = Hu;
const il = qt(
  () => Wr,
  (e) => {
    Wr = e;
  }
);
let zr = Uu;
const ol = qt(
  () => zr,
  (e) => {
    zr = e;
  }
), Ce = {
  get configSchema() {
    return Gr;
  },
  get navigationItemAdditionalField() {
    return qr;
  },
  get navigationItemCustomField() {
    return Kr;
  },
  get createNavigationSchema() {
    return Wr;
  },
  get updateNavigationSchema() {
    return zr;
  }
}, al = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i, sl = [
  "beforeCreate",
  "beforeCreateMany",
  "afterCreate",
  "afterCreateMany",
  "beforeUpdate",
  "beforeUpdateMany",
  "afterUpdate",
  "afterUpdateMany",
  "beforeDelete",
  "beforeDeleteMany",
  "afterDelete",
  "afterDeleteMany",
  "beforeCount",
  "afterCount",
  "beforeFindOne",
  "afterFindOne",
  "beforeFindMany",
  "afterFindMany"
], cl = "$", Da = ["api::", "plugin::"], Ma = [
  "admin::",
  "plugin::content-releases",
  "plugin::i18n.locale",
  "plugin::navigation",
  "plugin::review-workflows",
  "plugin::users-permissions",
  "plugin::upload.folder"
], ul = ["title", "subject", "name"], io = { SINGLE: "singleType" }, oo = [
  "title",
  "type",
  "path",
  "externalPath",
  "uiRouterKey",
  "menuAttached",
  "order",
  "collapsed",
  "related",
  "parent",
  "master",
  "audience",
  "additionalFields"
], ll = (e) => e.filter((t) => t !== "audience"), ja = (e) => {
  const t = ll(e);
  if (t.length !== uu(t, "name").length)
    throw new Error("All names of custom fields must be unique.");
  if (!Ke(
    Kn(
      t,
      (n) => typeof n == "object" && lu(oo, n.name)
    )
  ))
    throw new Error(
      `Name of custom field cannot be one of: ${oo.join(", ")}`
    );
}, Ha = (e, t) => {
  if (e == null)
    throw t ?? new Error("Non-empty value expected, empty given");
}, fl = (e = "") => {
  const t = (a) => a.split("-").map((o) => fu(o)).join(""), [n, r, i] = pl(e);
  return n === "api" ? t(i) : `${t(r)}${t(i)}`;
}, pl = (e = "") => e.split(al).filter((t) => t && t.length > 0), dl = (e, t) => (n) => [
  n,
  async (r) => {
    await ne(t, "common").runLifeCycleHook({
      contentTypeName: e,
      hookName: n,
      event: r
    });
  }
], Ba = (e, t) => Object.fromEntries(sl.map(dl(e, t))), ye = ({
  strapi: e
}) => {
  const t = e.plugin("navigation");
  return {
    masterModel: t.contentType("navigation"),
    itemModel: t.contentType("navigation-item"),
    relatedModel: t.contentType("navigations-items-related"),
    audienceModel: t.contentType("audience")
  };
};
function ne({ strapi: e }, t) {
  return e.plugin("navigation").service(t);
}
const en = (e) => e === "*" ? "*" : typeof e == "string" ? [e] : e === !1 ? [] : e === !0 ? "*" : e, hl = (e = "") => {
  const t = !!Da.find((r) => e.includes(r)), n = !Ma.find((r) => e.includes(r) || e === r);
  return !!e && t && n;
}, ml = (e = "") => Wn(e) === "s" ? e.substr(0, e.length - 1) : e, gl = li((e) => ({
  find(t, n) {
    const {
      audienceModel: { uid: r }
    } = ye(e);
    return e.strapi.query(r).findMany({ where: t, limit: n }).then(Pa.array().parse);
  }
})), Bt = (e, t) => ({
  findFirst(n, r, i = {}) {
    return e.strapi.documents(t).findFirst({ populate: en(n), status: r, ...i });
  },
  findById(n, r, i, a = {}) {
    return e.strapi.documents(t).findOne({ documentId: n, populate: en(r), status: i, ...a });
  },
  findManyById(n, r, i) {
    return e.strapi.documents(t).findMany({
      where: { documentId: { $in: n } },
      populate: en(r),
      status: i
    });
  },
  findMany(n, r, i, a) {
    return e.strapi.documents(t).findMany({ where: n, populate: en(r), status: i, locale: a });
  },
  count(n, r) {
    return e.strapi.documents(t).count({
      where: n,
      status: r
    });
  }
}), Pe = li((e) => ({
  async save({ item: t, locale: n }) {
    const { itemModel: r } = ye(e), { __type: i, documentId: a } = t?.related ?? {}, o = i ? Bt(e, i) : void 0, s = i && o ? a ? await o.findById(a, void 0, void 0, { locale: n }) : await o.findFirst(void 0, void 0, { locale: n }) : void 0;
    if (typeof t.documentId == "string") {
      const { documentId: c, ...f } = t;
      return e.strapi.documents(r.uid).update({
        documentId: t.documentId,
        data: {
          ...f,
          related: s ? { ...s, __type: i } : void 0
        },
        locale: n
      });
    } else
      return e.strapi.documents(r.uid).create({
        data: {
          ...t,
          related: s ? { ...s, __type: i } : void 0
        },
        locale: n
      });
  },
  find({ filters: t, locale: n, limit: r, order: i, populate: a }) {
    const { itemModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i }).then((s) => s.map(xn)).then(ro.parse).then((s) => s.map(Sn));
  },
  findV4({ filters: t, locale: n, limit: r, order: i, populate: a }) {
    const { itemModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i });
  },
  count(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.query(n.uid).count({ where: t });
  },
  remove(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.documents(n.uid).delete({
      documentId: t.documentId,
      populate: "*"
    });
  },
  removeForIds(t) {
    const { itemModel: n } = ye(e);
    return t.map(
      (r) => e.strapi.documents(n.uid).delete({ documentId: r, populate: "*" })
    );
  },
  findForMasterIds(t) {
    const { itemModel: n } = ye(e);
    return e.strapi.query(n.uid).findMany({
      where: {
        $or: t.map((r) => ({ master: r }))
      },
      limit: Number.MAX_SAFE_INTEGER
    }).then(ro.parse);
  }
})), yl = ["id", "publishedAt", "createdAt", "updatedAt", "locale"], Sn = ({
  related: e,
  items: t = [],
  ...n
}) => ({
  ...n,
  items: t.map(Sn),
  related: e ? vn(e, yl) : void 0
}), xn = ({ related: e, parent: t, ...n }) => ({
  ...n,
  parent: t && xn(t),
  related: e?.[0]
});
class At extends Error {
  constructor(t, n) {
    super(t), this.additionalInfo = n, this.type = "NavigationError";
  }
}
class yr extends At {
  constructor() {
    super(...arguments), this.type = "FillNavigationError";
  }
}
class vl extends At {
  constructor() {
    super(...arguments), this.type = "InvalidParamNavigationError";
  }
}
const ao = (e) => e === !0 ? !0 : Array.isArray(e) ? e.includes("items") : !1, Se = li((e) => ({
  find({ filters: t, locale: n, limit: r, orderBy: i, populate: a }) {
    const { masterModel: o } = ye(e);
    return e.strapi.documents(o.uid).findMany({ filters: t, locale: n, limit: r, populate: a, orderBy: i }).then(
      (s) => s.map(({ items: c, ...f }) => ({
        ...f,
        items: c?.map(xn)
      }))
    ).then(
      (s) => s.map(({ items: c, ...f }) => ({
        ...f,
        items: c?.map(Sn)
      }))
    ).then((s) => tt(ao(a)).array().parse(s));
  },
  findOne({ locale: t, filters: n, populate: r }) {
    const { masterModel: i } = ye(e);
    return e.strapi.documents(i.uid).findOne({ documentId: n.documentId, locale: t, populate: r }).then((a) => a && { ...a, items: a.items?.map(xn) }).then((a) => tt(ao(r)).parse(a)).then((a) => ({
      ...a,
      items: a.items?.map(Sn)
    }));
  },
  async save(t) {
    const { masterModel: n } = ye(e), { documentId: r, locale: i, ...a } = t;
    return r ? e.strapi.documents(n.uid).update({
      locale: i,
      documentId: r,
      data: vn(a, ["id", "documentId"]),
      populate: ["items"]
    }).then(tt(!1).parse) : e.strapi.documents(n.uid).create({
      locale: i,
      data: {
        ...a,
        populate: ["items"]
      }
    }).then(tt(!1).parse);
  },
  remove(t) {
    const { masterModel: n } = ye(e);
    if (!t.documentId)
      throw new At("Document id is required.");
    return e.strapi.documents(n.uid).delete({ documentId: t.documentId, locale: t.locale });
  }
})), wl = async (e) => {
  const t = await Se(e).find({
    locale: "*",
    limit: Number.MAX_SAFE_INTEGER
  }), n = await e.strapi.plugin("i18n").service("locales").getDefaultLocale();
  n && await Promise.all(
    t.map(async (r) => {
      t.find(
        ({ documentId: a, locale: o }) => a === r.documentId && o === n
      ) || await Se(e).remove({
        documentId: r.documentId,
        locale: r.locale
      });
    })
  );
}, Ua = async ({
  strapi: e,
  forceDefault: t = !1
}) => {
  const n = e.store({
    type: "plugin",
    name: "navigation"
  }), r = await e.plugin("navigation").config, i = t ? {} : {
    ...Yr.default,
    ...await n.get({
      key: "config"
    }) ?? Yr.default
  };
  let a = Ye(i) ? i : Ce.configSchema.parse(i);
  const o = El(a, r);
  return a = {
    additionalFields: o("additionalFields"),
    contentTypes: o("contentTypes"),
    contentTypesNameFields: o("contentTypesNameFields"),
    contentTypesPopulate: o("contentTypesPopulate"),
    defaultContentType: o("defaultContentType"),
    allowedLevels: o("allowedLevels"),
    gql: o("gql"),
    pathDefaultFields: o("pathDefaultFields"),
    cascadeMenuAttached: o("cascadeMenuAttached"),
    preferCustomContentTypes: o("preferCustomContentTypes"),
    isCacheEnabled: o("isCacheEnabled")
  }, bl(a, { strapi: e }), ja(a.additionalFields), await n.set({
    key: "config",
    value: a
  }), a;
}, El = (e, t) => (n) => {
  const r = e?.[n] ?? t(n);
  return Ha(r, new Error(`[Navigation] Config "${n}" is undefined`)), r;
}, bl = (e, { strapi: t }) => {
  const n = e.contentTypes.filter(
    (i) => !t.contentTypes[i]
  );
  if (n.length === 0)
    return;
  const r = n.map(fl);
  e.contentTypes = e.contentTypes.filter(
    (i) => !n.includes(i)
  ), e.contentTypesNameFields = Object.fromEntries(
    Object.entries(e.contentTypesNameFields).filter(
      ([i]) => !n.includes(i)
    )
  ), e.gql.navigationItemRelated = e.gql.navigationItemRelated.filter(
    (i) => !r.includes(i)
  );
}, Yr = {
  default: {
    additionalFields: [],
    allowedLevels: 2,
    contentTypes: [],
    defaultContentType: "",
    contentTypesNameFields: {},
    contentTypesPopulate: {},
    gql: {
      navigationItemRelated: []
    },
    pathDefaultFields: {},
    pruneObsoleteI18nNavigations: !1,
    cascadeMenuAttached: !0,
    preferCustomContentTypes: !1,
    isCacheEnabled: !1
  }
}, Sl = "Navigation", xl = "navigation", _l = async (e) => {
  const t = ne(e, "common"), { defaultLocale: n, restLocale: r = [] } = await t.readLocale(), i = Se(e), a = await i.find({
    limit: Number.MAX_SAFE_INTEGER,
    filters: {},
    locale: "*"
  });
  a.length === 0 && a.push(
    await i.save({
      name: Sl,
      visible: !0,
      locale: n,
      slug: xl
    })
  );
  const o = a.filter(({ locale: s }) => s === n);
  for (const s of o)
    for (const c of r)
      !a.find(
        ({ locale: u, documentId: l }) => l === s.documentId && c === u
      ) && await i.save({
        documentId: s.documentId,
        name: s.name,
        locale: c,
        visible: s.visible,
        slug: s.slug
      });
}, pe = {
  render: function(e) {
    return `plugin::navigation.${e}`;
  },
  navigation: {
    read: "read",
    update: "update",
    settings: "settings"
  }
}, Al = async ({ strapi: e }) => {
  const t = [
    {
      section: "plugins",
      displayName: "Read",
      uid: pe.navigation.read,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Update",
      uid: pe.navigation.update,
      pluginName: "navigation"
    },
    {
      section: "plugins",
      displayName: "Settings",
      uid: pe.navigation.settings,
      pluginName: "navigation"
    }
  ];
  await e.admin.services.permission.actionProvider.registerMany(t);
}, Tl = "I18NLocaleCode", Cl = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: r, stringArg: i, booleanArg: a } = t;
  return {
    args: {
      navigationIdOrSlug: n(i()),
      type: "NavigationRenderType",
      menuOnly: a(),
      path: i(),
      locale: t.arg({ type: Tl })
    },
    type: n(r("NavigationItem")),
    resolve(c, { navigationIdOrSlug: f, type: u, menuOnly: l, path: p, locale: d }) {
      const h = Ra.string().parse(f);
      return ne({ strapi: e }, "client").render({
        idOrSlug: h,
        type: u,
        rootPath: p,
        locale: d,
        menuOnly: l,
        wrapRelated: !0
      });
    }
  };
}, Rl = ({ strapi: e, nexus: t }) => {
  const { nonNull: n, list: r, stringArg: i, booleanArg: a } = t;
  return {
    type: n(r("NavigationItem")),
    args: {
      documentId: n(i()),
      childUiKey: n(i()),
      type: "NavigationRenderType",
      menuOnly: a()
    },
    resolve(o, s) {
      const { documentId: c, childUIKey: f, type: u, menuOnly: l } = s, p = Ra.string().parse(c);
      return ne({ strapi: e }, "client").renderChildren({
        idOrSlug: p,
        childUIKey: f,
        type: u,
        menuOnly: l,
        wrapRelated: !0
      });
    }
  };
}, Fl = (e) => {
  const t = {
    renderNavigationChild: Rl,
    renderNavigation: Cl
  };
  return e.nexus.extendType({
    type: "Query",
    definition(n) {
      for (const [r, i] of Object.entries(t)) {
        const a = i(e);
        n.field(r, a);
      }
    }
  });
}, $l = () => ({
  "Query.renderNavigationChild": { auth: !1 },
  "Query.renderNavigation": { auth: !1 }
}), Il = ({ nexus: e }) => e.objectType({
  name: "ContentTypes",
  definition(t) {
    t.nonNull.string("uid"), t.nonNull.string("name"), t.nonNull.boolean("isSingle"), t.nonNull.string("collectionName"), t.nonNull.string("contentTypeName"), t.nonNull.string("label"), t.nonNull.string("relatedField"), t.nonNull.string("labelSingular"), t.nonNull.string("endpoint"), t.nonNull.boolean("available"), t.nonNull.boolean("visible");
  }
}), Ol = ({ nexus: e, strapi: t }) => e.objectType({
  name: "ContentTypesNameFields",
  async definition(n) {
    n.nonNull.list.nonNull.string("default");
    const i = await ne({ strapi: t }, "common").getPluginStore(), o = Ce.configSchema.parse(await i.get({ key: "config" })).contentTypesNameFields;
    Object.keys(o || {}).forEach((s) => n.nonNull.list.string(s));
  }
}), Nl = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigation",
  definition(t) {
    t.nonNull.string("name"), t.nonNull.list.field("items", { type: "CreateNavigationItem" });
  }
}), Pl = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationItem",
  definition(t) {
    t.nonNull.string("title"), t.nonNull.field("type", { type: "NavigationItemType" }), t.string("path"), t.string("externalPath"), t.nonNull.string("uiRouterKey"), t.nonNull.boolean("menuAttached"), t.nonNull.int("order"), t.string("parent"), t.string("master"), t.list.field("items", { type: "CreateNavigationItem" }), t.list.string("audience"), t.field("related", { type: "CreateNavigationRelated" });
  }
}), Ll = ({ nexus: e }) => e.inputObjectType({
  name: "CreateNavigationRelated",
  definition(t) {
    t.nonNull.string("ref"), t.nonNull.string("field"), t.nonNull.string("refId");
  }
}), kl = ({ nexus: e }) => e.objectType({
  name: "Navigation",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible");
  }
}), Dl = ({ nexus: e }) => e.objectType({
  name: "NavigationConfig",
  definition(t) {
    t.int("allowedLevels"), t.nonNull.list.string("additionalFields"), t.field("contentTypesNameFields", { type: "ContentTypesNameFields" }), t.list.field("contentTypes", { type: "ContentTypes" });
  }
}), Ml = ({ nexus: e }) => e.objectType({
  name: "NavigationDetails",
  definition(t) {
    t.nonNull.string("id"), t.nonNull.string("documentId"), t.nonNull.string("name"), t.nonNull.string("slug"), t.nonNull.boolean("visible"), t.nonNull.list.field("items", { type: "NavigationItem" });
  }
}), jl = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItem",
  definition(n) {
    n.nonNull.int("id"), n.nonNull.string("documentId"), n.nonNull.string("title"), n.nonNull.field("type", { type: "NavigationItemType" }), n.string("path"), n.string("externalPath"), n.nonNull.string("uiRouterKey"), n.nonNull.boolean("menuAttached"), n.nonNull.int("order"), n.field("parent", { type: "NavigationItem" }), n.string("master"), n.list.field("items", { type: "NavigationItem" }), n.field("related", { type: "NavigationItemRelated" }), t.additionalFields.find((r) => r === "audience") && n.list.string("audience"), n.field("additionalFields", { type: "NavigationItemAdditionalFields" }), n.string("created_at"), n.string("updated_at"), n.string("created_by"), n.string("updated_by"), n.string("createdAt"), n.string("updatedAt"), n.string("createdBy"), n.string("updatedBy");
  }
}), Hl = ({ nexus: e, config: t }) => e.objectType({
  name: "NavigationItemAdditionalFields",
  definition(n) {
    t.additionalFields.forEach((r) => {
      if (r !== "audience" && r.enabled)
        switch (r.type) {
          case "media":
            n.field(r.name, { type: "UploadFile" });
            break;
          case "string":
            n.string(r.name);
            break;
          case "boolean":
            n.boolean(r.name);
            break;
          case "select":
            r.multi ? n.list.string(r.name) : n.string(r.name);
            break;
          default:
            throw new Error(
              `Type "${JSON.stringify(r.type)}" is unsupported by custom fields`
            );
        }
    });
  }
}), Bl = ({ strapi: e, nexus: t, config: n }) => {
  const r = n.gql?.navigationItemRelated, i = "NavigationItemRelated";
  return r?.length ? t.unionType({
    name: i,
    definition(a) {
      a.members(...r);
    },
    resolveType: (a) => e.contentTypes[a.__type]?.globalId
  }) : t.objectType({
    name: i,
    definition(a) {
      a.int("id"), a.string("documentId"), a.string("title"), a.string("name");
    }
  });
}, Ul = ({ nexus: e }) => e.enumType({
  name: "NavigationItemType",
  members: ["INTERNAL", "EXTERNAL", "WRAPPER"]
}), Gl = ({ nexus: e }) => e.enumType({
  name: "NavigationRenderType",
  members: ["FLAT", "TREE"]
}), ql = [
  Hl,
  Bl,
  jl,
  Gl,
  kl,
  Ml,
  Ol,
  Il,
  Dl,
  Ll,
  Pl,
  Nl,
  Ul
], Kl = (e) => ql.map((t) => t(e)), Wl = async ({ strapi: e }) => {
  const t = e.plugin("graphql").service("extension");
  t.shadowCRUD("plugin::navigation.audience").disable(), t.shadowCRUD("plugin::navigation.navigation").disable(), t.shadowCRUD("plugin::navigation.navigation-item").disable(), t.shadowCRUD("plugin::navigation.navigations-items-related").disable();
  const r = await ne({ strapi: e }, "common").getPluginStore(), i = Ce.configSchema.parse(await r.get({ key: "config" }));
  t.use(({ strapi: a, nexus: o }) => {
    const s = Kl({ strapi: a, nexus: o, config: i }), c = Fl({ strapi: a, nexus: o }), f = $l();
    return {
      types: [s, c],
      resolversConfig: f
    };
  });
}, zl = async ({ strapi: e }) => {
  !!e.plugin("graphql") && await Wl({ strapi: e });
}, Yl = async (e) => {
  await wl(e), await Ua(e), await _l(e), await Al(e), await zl(e), await strapi.service("plugin::navigation.migrate").migrateRelatedIdToDocumentId();
}, Ql = ({ strapi: e }) => {
}, Vl = ({ strapi: e }) => {
  const t = e.plugin("navigation").service("admin");
  return async (n, r) => {
    if (await r(), !(n.method === "POST" && n.path === "/i18n/locales")) return;
    const a = n.body?.code;
    if (!(!a || typeof a != "string"))
      try {
        await t.refreshNavigationLocale(a);
      } catch (o) {
        e.log.error(`Failed to refresh navigation for new locale ${a}`, o);
      }
  };
}, Ga = {
  localeMiddleware: Vl
}, Xl = ({ strapi: e }) => {
  e.server.use(Ga.localeMiddleware({ strapi: e }));
}, Zl = {
  collectionName: "audience",
  info: {
    singularName: "audience",
    pluralName: "audiences",
    displayName: "Audience",
    name: "audience"
  },
  options: {
    increments: !0,
    comment: "Audience"
  },
  attributes: {
    name: {
      type: "string",
      required: !0
    },
    key: {
      type: "uid",
      targetField: "name"
    }
  }
}, Jl = {
  schema: Zl
}, ef = Ba("navigation", {
  strapi
}), tf = {
  collectionName: "navigations",
  info: {
    singularName: "navigation",
    pluralName: "navigations",
    displayName: "Navigation",
    name: "navigation"
  },
  options: {
    comment: ""
  },
  pluginOptions: {
    "content-manager": {
      visible: !1
    },
    "content-type-builder": {
      visible: !1
    },
    i18n: {
      localized: !0
    }
  },
  attributes: {
    name: {
      type: "text",
      configurable: !1,
      required: !0
    },
    slug: {
      type: "uid",
      target: "name",
      configurable: !1,
      required: !0
    },
    visible: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    items: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.navigation-item",
      configurable: !1,
      mappedBy: "master"
    }
  }
}, nf = {
  schema: tf,
  lifecycles: ef
}, rf = Ba("navigation-item", {
  strapi
}), of = {
  collectionName: "navigations_items",
  info: {
    singularName: "navigation-item",
    pluralName: "navigation-items",
    displayName: "Navigation Item",
    name: "navigation-item"
  },
  options: {
    increments: !0,
    timestamps: !0,
    comment: "Navigation Item"
  },
  pluginOptions: {
    "content-manager": {
      visible: !1
    },
    "content-type-builder": {
      visible: !1
    },
    i18n: {
      localized: !1
    }
  },
  attributes: {
    title: {
      type: "text",
      configurable: !1,
      required: !0,
      pluginOptions: {
        i18n: {
          localized: !1
        }
      }
    },
    type: {
      type: "enumeration",
      enum: ["INTERNAL", "EXTERNAL", "WRAPPER"],
      default: "INTERNAL",
      configurable: !1
    },
    path: {
      type: "text",
      targetField: "title",
      configurable: !1
    },
    externalPath: {
      type: "text",
      configurable: !1
    },
    uiRouterKey: {
      type: "string",
      configurable: !1
    },
    menuAttached: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    order: {
      type: "integer",
      default: 0,
      configurable: !1
    },
    collapsed: {
      type: "boolean",
      default: !1,
      configurable: !1
    },
    autoSync: {
      type: "boolean",
      default: !0,
      configurable: !1
    },
    related: {
      type: "relation",
      relation: "morphToMany",
      required: !1,
      configurable: !1
    },
    parent: {
      type: "relation",
      relation: "oneToOne",
      target: "plugin::navigation.navigation-item",
      configurable: !1,
      default: null
    },
    master: {
      type: "relation",
      relation: "manyToOne",
      target: "plugin::navigation.navigation",
      configurable: !1,
      inversedBy: "items"
    },
    audience: {
      type: "relation",
      relation: "oneToMany",
      target: "plugin::navigation.audience"
    },
    additionalFields: {
      type: "json",
      require: !1,
      default: {}
    }
  }
}, af = {
  schema: of,
  lifecycles: rf
}, sf = {
  audience: Jl,
  navigation: nf,
  "navigation-item": af
}, qa = y.enum(["true", "false"]), tn = y.string(), cf = y.object({
  locale: y.string().optional(),
  orderBy: y.string().optional(),
  orderDirection: y.enum(["DESC", "ASC"]).optional()
}), Ka = y.enum(["FLAT", "TREE", "RFR"]), Wa = y.string().transform((e) => e === "published" ? "published" : "draft").pipe(y.enum(["draft", "published"])), uf = (e) => {
  if (typeof e == "string") {
    if (e === "true")
      return !0;
    if (e === "false")
      return !1;
  }
  return e;
}, za = y.lazy(
  () => y.preprocess(
    uf,
    y.union([y.boolean(), y.string(), y.string().array(), y.undefined(), y.record(za)])
  )
), lf = y.object({
  type: Ka.optional(),
  menu: qa.optional(),
  path: y.string().optional(),
  locale: y.string().optional(),
  populate: za.optional(),
  status: Wa.optional()
}), ff = y.object({
  type: Ka.optional(),
  menu: qa.optional(),
  locale: y.string().optional(),
  status: Wa.optional()
}), pf = y.object({
  source: y.string().min(1),
  target: y.string().min(1),
  documentId: y.string().min(1)
});
function df(e) {
  return {
    getAdminService() {
      return ne(e, "admin");
    },
    getCommonService() {
      return ne(e, "common");
    },
    async get() {
      return await this.getAdminService().get({});
    },
    async post(t) {
      const { auditLog: n } = t;
      try {
        return await this.getAdminService().post({
          payload: Ce.createNavigationSchema.parse(t.request.body),
          auditLog: n
        });
      } catch (r) {
        const i = r instanceof Error ? {
          name: r.name,
          message: r.message
        } : {};
        return t.internalServerError("Unable to create", { originalError: i });
      }
    },
    async put(t) {
      const {
        params: { documentId: n },
        auditLog: r
      } = t, i = y.record(y.string(), y.unknown()).parse(t.request.body);
      try {
        return await this.getAdminService().put({
          auditLog: r,
          payload: Ce.updateNavigationSchema.parse({
            ...i,
            documentId: n
          })
        });
      } catch (a) {
        const o = a instanceof Error ? {
          name: a.name,
          message: a.message
        } : {};
        return t.internalServerError("Unable to update", { originalError: o });
      }
    },
    async delete(t) {
      const {
        auditLog: n,
        params: { documentId: r }
      } = t;
      return await this.getAdminService().delete({
        documentId: tn.parse(r),
        auditLog: n
      }), {};
    },
    config() {
      return this.getAdminService().config({ viaSettingsPage: !1 });
    },
    async updateConfig(t) {
      return await this.getAdminService().updateConfig({
        config: Ce.configSchema.parse(t.request.body)
      }), {};
    },
    async restoreConfig() {
      return await this.getAdminService().restoreConfig(), {};
    },
    settingsConfig() {
      return this.getAdminService().config({ viaSettingsPage: !0 });
    },
    async settingsRestart() {
      return await this.getAdminService().restart(), {};
    },
    getById(t) {
      const {
        params: { documentId: n }
      } = t;
      return this.getAdminService().getById({ documentId: tn.parse(n) });
    },
    getContentTypeItems(t) {
      const {
        params: { model: n },
        query: r = {}
      } = t;
      return this.getAdminService().getContentTypeItems({
        query: y.record(y.string(), y.unknown()).parse(r),
        uid: y.string().parse(n)
      });
    },
    async fillFromOtherLocale(t) {
      const { params: n, auditLog: r } = t, { source: i, target: a, documentId: o } = pf.parse(n);
      return await this.getAdminService().fillFromOtherLocale({
        source: i,
        target: a,
        documentId: o,
        auditLog: r
      });
    },
    readNavigationItemFromLocale(t) {
      const {
        params: { source: n, target: r },
        query: { path: i }
      } = t;
      return this.getAdminService().readNavigationItemFromLocale({
        path: y.string().parse(i),
        source: tn.parse(n),
        target: tn.parse(r)
      });
    },
    getSlug(t) {
      const {
        query: { q: n }
      } = t;
      return this.getCommonService().getSlug({ query: y.string().parse(n) }).then((r) => ({ slug: r }));
    },
    settingsLocale() {
      return this.getCommonService().readLocale();
    }
  };
}
function hf(e) {
  return {
    getService() {
      return ne(e, "client");
    },
    async readAll(t) {
      try {
        const { query: n = {} } = t, { locale: r, orderBy: i, orderDirection: a } = cf.parse(n);
        return await this.getService().readAll({
          locale: r,
          orderBy: i,
          orderDirection: a
        });
      } catch (n) {
        if (n instanceof Error)
          return t.badRequest(n.message);
        throw n;
      }
    },
    async render(t) {
      const { params: n, query: r = {} } = t, {
        type: i,
        menu: a,
        path: o,
        locale: s,
        populate: c,
        status: f = "published"
      } = lf.parse(r), u = y.string().parse(n.idOrSlug);
      return await this.getService().render({
        idOrSlug: u,
        type: i,
        menuOnly: a === "true",
        rootPath: o,
        locale: s,
        populate: c,
        status: f
      });
    },
    async renderChild(t) {
      const { params: n, query: r = {} } = t, {
        type: i,
        menu: a,
        locale: o,
        status: s = "published"
      } = ff.parse(r), c = y.string().parse(n.idOrSlug), f = y.string().parse(n.childUIKey);
      return await this.getService().renderChildren({
        idOrSlug: c,
        childUIKey: f,
        type: i,
        menuOnly: a === "true",
        locale: o,
        status: s
      });
    }
  };
}
const mf = {
  admin: df,
  client: hf
}, gf = {}, yf = {
  type: "admin",
  routes: [
    {
      method: "GET",
      path: "/",
      handler: "admin.get",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "POST",
      path: "/",
      handler: "admin.post",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/config",
      handler: "admin.config",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/config",
      handler: "admin.updateConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/config",
      handler: "admin.restoreConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/slug",
      handler: "admin.getSlug",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/:documentId",
      handler: "admin.getById",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("read")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/:documentId",
      handler: "admin.put",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "DELETE",
      path: "/:documentId",
      handler: "admin.delete",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/content-type-items/:model",
      handler: "admin.getContentTypeItems",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/locale",
      handler: "admin.settingsLocale",
      config: {
        policies: ["admin::isAuthenticatedAdmin"]
      }
    },
    {
      method: "GET",
      path: "/settings/config",
      handler: "admin.settingsConfig",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/settings/restart",
      handler: "admin.settingsRestart",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("settings")]
            }
          }
        ]
      }
    },
    {
      method: "PUT",
      path: "/i18n/copy/:documentId/:source/:target",
      handler: "admin.fillFromOtherLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("update")]
            }
          }
        ]
      }
    },
    {
      method: "GET",
      path: "/i18n/item/read/:source/:target",
      handler: "admin.readNavigationItemFromLocale",
      config: {
        policies: [
          {
            name: "admin::hasPermissions",
            config: {
              actions: [pe.render("read")]
            }
          }
        ]
      }
    }
  ]
}, vf = {
  type: "content-api",
  routes: [
    {
      method: "GET",
      path: "/render/:idOrSlug",
      handler: "client.render",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/render/:idOrSlug/:childUIKey",
      handler: "client.renderChild",
      config: {
        policies: []
      }
    },
    {
      method: "GET",
      path: "/",
      handler: "client.readAll",
      config: {
        policies: []
      }
    }
  ]
}, wf = {
  admin: yf,
  "content-api": vf
};
function Ef(e, t) {
  return he.has(process.env, e) ? process.env[e] : t;
}
function $t(e) {
  return process.env[e] ?? "";
}
function bf(e, t) {
  return he.has(process.env, e) ? parseInt($t(e), 10) : t;
}
function Sf(e, t) {
  return he.has(process.env, e) ? parseFloat($t(e)) : t;
}
function xf(e, t) {
  return he.has(process.env, e) ? $t(e) === "true" : t;
}
function _f(e, t) {
  if (!he.has(process.env, e))
    return t;
  try {
    return JSON.parse($t(e));
  } catch (n) {
    throw n instanceof Error ? new Error(`Invalid json environment variable ${e}: ${n.message}`) : n;
  }
}
function Af(e, t) {
  if (!he.has(process.env, e))
    return t;
  let n = $t(e);
  return n.startsWith("[") && n.endsWith("]") && (n = n.substring(1, n.length - 1)), n.split(",").map((r) => he.trim(he.trim(r, " "), '"'));
}
function Tf(e, t) {
  return he.has(process.env, e) ? new Date($t(e)) : t;
}
function Cf(e, t, n) {
  if (!t)
    throw new Error("env.oneOf requires expectedValues");
  if (n && !t.includes(n))
    throw new Error("env.oneOf requires defaultValue to be included in expectedValues");
  const r = Ff(e, n);
  return r !== void 0 && t.includes(r) ? r : n;
}
const Rf = {
  int: bf,
  float: Sf,
  bool: xf,
  json: _f,
  array: Af,
  date: Tf,
  oneOf: Cf
}, Ff = Object.assign(Ef, Rf), $f = "id", If = "documentId", Of = {
  ID_ATTRIBUTE: $f,
  DOC_ID_ATTRIBUTE: If
}, Nf = (e) => yu(strapi?.config?.get("api.responses.privateAttributes", []) ?? [], vu([], "options.privateAttributes", e)), Pf = (e, t) => e?.attributes?.[t]?.private === !0 ? !0 : Nf(e).includes(t), Ya = (e) => e && ![
  "media",
  "component",
  "relation",
  "dynamiczone"
].includes(e.type), Lf = (e) => e?.type === "media", Qa = (e) => e?.type === "relation", kf = (e) => !!e && e.type === "dynamiczone", Va = (e) => !!e && Qa(e) && e.relation?.startsWith?.("morphTo"), nn = async (e) => {
  const t = await Promise.allSettled(e);
  for (let n = 0; n < t.length; n += 1) {
    const r = t[n];
    if (r.status === "rejected")
      throw r.reason;
  }
  return t.map((n) => n.value);
}, yt = async (e, t, n) => {
  const { path: r = {
    raw: null,
    attribute: null,
    rawWithIndices: null
  }, schema: i, getModel: a, allowedExtraRootKeys: o } = t;
  let s = t.parent;
  const c = async (g, w, S) => {
    const C = {
      schema: a(S.__type),
      path: w,
      getModel: a,
      parent: s,
      allowedExtraRootKeys: o
    };
    return yt(g, C, S);
  }, f = (g) => async (w, S, x) => yt(w, {
    schema: g,
    path: S,
    getModel: a,
    parent: s,
    allowedExtraRootKeys: o
  }, x), u = async (g, w, S) => {
    const T = {
      schema: a("plugin::upload.file"),
      path: w,
      getModel: a,
      parent: s,
      allowedExtraRootKeys: o
    };
    return yt(g, T, S);
  }, l = async (g, w, S, x) => yt(g, {
    schema: S,
    path: w,
    getModel: a,
    parent: s,
    allowedExtraRootKeys: o
  }, x), p = async (g, w, S) => {
    const C = {
      schema: a(S.__component),
      path: w,
      getModel: a,
      parent: s,
      allowedExtraRootKeys: o
    };
    return yt(g, C, S);
  };
  if (!$e(n) || X(i))
    return n;
  const d = wu(n), h = Df({
    data: d
  }), m = Object.keys(d);
  for (let g = 0; g < m.length; g += 1) {
    const w = m[g], S = i.attributes[w], x = {
      ...r
    };
    x.raw = X(r.raw) ? w : `${r.raw}.${w}`, x.rawWithIndices = X(r.rawWithIndices) ? w : `${r.rawWithIndices}.${w}`, X(S) || (x.attribute = X(r.attribute) ? w : `${r.attribute}.${w}`);
    const C = {
      data: d,
      schema: i,
      key: w,
      value: d[w],
      attribute: S,
      path: x,
      getModel: a,
      parent: s,
      allowedExtraRootKeys: o
    };
    await e(C, h);
    const T = d[w];
    if (!(X(T) || X(S))) {
      if (Qa(S)) {
        s = {
          schema: i,
          key: w,
          attribute: S,
          path: x
        };
        const k = S.relation.toLowerCase().startsWith("morph") ? c : f(a(S.target));
        We(T) ? d[w] = await nn(T.map((A, _) => {
          const O = {
            ...x,
            rawWithIndices: X(x.rawWithIndices) ? `${_}` : `${x.rawWithIndices}.${_}`
          };
          return k(e, O, A);
        })) : d[w] = await k(e, x, T);
        continue;
      }
      if (Lf(S)) {
        s = {
          schema: i,
          key: w,
          attribute: S,
          path: x
        }, We(T) ? d[w] = await nn(T.map((I, k) => {
          const A = {
            ...x,
            rawWithIndices: X(x.rawWithIndices) ? `${k}` : `${x.rawWithIndices}.${k}`
          };
          return u(e, A, I);
        })) : d[w] = await u(e, x, T);
        continue;
      }
      if (S.type === "component") {
        s = {
          schema: i,
          key: w,
          attribute: S,
          path: x
        };
        const I = a(S.component);
        We(T) ? d[w] = await nn(T.map((k, A) => {
          const _ = {
            ...x,
            rawWithIndices: X(x.rawWithIndices) ? `${A}` : `${x.rawWithIndices}.${A}`
          };
          return l(e, _, I, k);
        })) : d[w] = await l(e, x, I, T);
        continue;
      }
      if (S.type === "dynamiczone" && We(T)) {
        s = {
          schema: i,
          key: w,
          attribute: S,
          path: x
        }, d[w] = await nn(T.map((I, k) => {
          const A = {
            ...x,
            rawWithIndices: X(x.rawWithIndices) ? `${k}` : `${x.rawWithIndices}.${k}`
          };
          return p(e, A, I);
        }));
        continue;
      }
    }
  }
  return d;
}, Df = ({ data: e }) => ({
  remove(t) {
    delete e[t];
  },
  set(t, n) {
    e[t] = n;
  }
});
var Mf = De(yt), ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xa(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var jf = { exports: {} };
(function(e, t) {
  (function(n, r) {
    e.exports = r(En, to);
  })(ve, function(n, r) {
    return (function(i) {
      function a(s) {
        if (o[s]) return o[s].exports;
        var c = o[s] = { exports: {}, id: s, loaded: !1 };
        return i[s].call(c.exports, c, c.exports, a), c.loaded = !0, c.exports;
      }
      var o = {};
      return a.m = i, a.c = o, a.p = "", a(0);
    })([function(i, a, o) {
      i.exports = o(34);
    }, function(i, a, o) {
      var s = o(29)("wks"), c = o(33), f = o(2).Symbol, u = typeof f == "function", l = i.exports = function(p) {
        return s[p] || (s[p] = u && f[p] || (u ? f : c)("Symbol." + p));
      };
      l.store = s;
    }, function(i, a) {
      var o = i.exports = typeof window < "u" && window.Math == Math ? window : typeof self < "u" && self.Math == Math ? self : Function("return this")();
      typeof __g == "number" && (__g = o);
    }, function(i, a, o) {
      var s = o(9);
      i.exports = function(c) {
        if (!s(c)) throw TypeError(c + " is not an object!");
        return c;
      };
    }, function(i, a, o) {
      i.exports = !o(24)(function() {
        return Object.defineProperty({}, "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, a, o) {
      var s = o(12), c = o(17);
      i.exports = o(4) ? function(f, u, l) {
        return s.f(f, u, c(1, l));
      } : function(f, u, l) {
        return f[u] = l, f;
      };
    }, function(i, a) {
      var o = i.exports = { version: "2.4.0" };
      typeof __e == "number" && (__e = o);
    }, function(i, a, o) {
      var s = o(14);
      i.exports = function(c, f, u) {
        if (s(c), f === void 0) return c;
        switch (u) {
          case 1:
            return function(l) {
              return c.call(f, l);
            };
          case 2:
            return function(l, p) {
              return c.call(f, l, p);
            };
          case 3:
            return function(l, p, d) {
              return c.call(f, l, p, d);
            };
        }
        return function() {
          return c.apply(f, arguments);
        };
      };
    }, function(i, a) {
      var o = {}.hasOwnProperty;
      i.exports = function(s, c) {
        return o.call(s, c);
      };
    }, function(i, a) {
      i.exports = function(o) {
        return typeof o == "object" ? o !== null : typeof o == "function";
      };
    }, function(i, a) {
      i.exports = {};
    }, function(i, a) {
      var o = {}.toString;
      i.exports = function(s) {
        return o.call(s).slice(8, -1);
      };
    }, function(i, a, o) {
      var s = o(3), c = o(26), f = o(32), u = Object.defineProperty;
      a.f = o(4) ? Object.defineProperty : function(l, p, d) {
        if (s(l), p = f(p, !0), s(d), c) try {
          return u(l, p, d);
        } catch {
        }
        if ("get" in d || "set" in d) throw TypeError("Accessors not supported!");
        return "value" in d && (l[p] = d.value), l;
      };
    }, function(i, a, o) {
      var s = o(42), c = o(15);
      i.exports = function(f) {
        return s(c(f));
      };
    }, function(i, a) {
      i.exports = function(o) {
        if (typeof o != "function") throw TypeError(o + " is not a function!");
        return o;
      };
    }, function(i, a) {
      i.exports = function(o) {
        if (o == null) throw TypeError("Can't call method on  " + o);
        return o;
      };
    }, function(i, a, o) {
      var s = o(9), c = o(2).document, f = s(c) && s(c.createElement);
      i.exports = function(u) {
        return f ? c.createElement(u) : {};
      };
    }, function(i, a) {
      i.exports = function(o, s) {
        return { enumerable: !(1 & o), configurable: !(2 & o), writable: !(4 & o), value: s };
      };
    }, function(i, a, o) {
      var s = o(12).f, c = o(8), f = o(1)("toStringTag");
      i.exports = function(u, l, p) {
        u && !c(u = p ? u : u.prototype, f) && s(u, f, { configurable: !0, value: l });
      };
    }, function(i, a, o) {
      var s = o(29)("keys"), c = o(33);
      i.exports = function(f) {
        return s[f] || (s[f] = c(f));
      };
    }, function(i, a) {
      var o = Math.ceil, s = Math.floor;
      i.exports = function(c) {
        return isNaN(c = +c) ? 0 : (c > 0 ? s : o)(c);
      };
    }, function(i, a, o) {
      var s = o(11), c = o(1)("toStringTag"), f = s(/* @__PURE__ */ (function() {
        return arguments;
      })()) == "Arguments", u = function(l, p) {
        try {
          return l[p];
        } catch {
        }
      };
      i.exports = function(l) {
        var p, d, h;
        return l === void 0 ? "Undefined" : l === null ? "Null" : typeof (d = u(p = Object(l), c)) == "string" ? d : f ? s(p) : (h = s(p)) == "Object" && typeof p.callee == "function" ? "Arguments" : h;
      };
    }, function(i, a) {
      i.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, function(i, a, o) {
      var s = o(2), c = o(6), f = o(7), u = o(5), l = "prototype", p = function(d, h, m) {
        var g, w, S, x = d & p.F, C = d & p.G, T = d & p.S, I = d & p.P, k = d & p.B, A = d & p.W, _ = C ? c : c[h] || (c[h] = {}), O = _[l], v = C ? s : T ? s[h] : (s[h] || {})[l];
        C && (m = h);
        for (g in m) w = !x && v && v[g] !== void 0, w && g in _ || (S = w ? v[g] : m[g], _[g] = C && typeof v[g] != "function" ? m[g] : k && w ? f(S, s) : A && v[g] == S ? (function(M) {
          var j = function(G, E, b) {
            if (this instanceof M) {
              switch (arguments.length) {
                case 0:
                  return new M();
                case 1:
                  return new M(G);
                case 2:
                  return new M(G, E);
              }
              return new M(G, E, b);
            }
            return M.apply(this, arguments);
          };
          return j[l] = M[l], j;
        })(S) : I && typeof S == "function" ? f(Function.call, S) : S, I && ((_.virtual || (_.virtual = {}))[g] = S, d & p.R && O && !O[g] && u(O, g, S)));
      };
      p.F = 1, p.G = 2, p.S = 4, p.P = 8, p.B = 16, p.W = 32, p.U = 64, p.R = 128, i.exports = p;
    }, function(i, a) {
      i.exports = function(o) {
        try {
          return !!o();
        } catch {
          return !0;
        }
      };
    }, function(i, a, o) {
      i.exports = o(2).document && document.documentElement;
    }, function(i, a, o) {
      i.exports = !o(4) && !o(24)(function() {
        return Object.defineProperty(o(16)("div"), "a", { get: function() {
          return 7;
        } }).a != 7;
      });
    }, function(i, a, o) {
      var s = o(28), c = o(23), f = o(57), u = o(5), l = o(8), p = o(10), d = o(45), h = o(18), m = o(52), g = o(1)("iterator"), w = !([].keys && "next" in [].keys()), S = "@@iterator", x = "keys", C = "values", T = function() {
        return this;
      };
      i.exports = function(I, k, A, _, O, v, M) {
        d(A, k, _);
        var j, G, E, b = function(L) {
          if (!w && L in q) return q[L];
          switch (L) {
            case x:
              return function() {
                return new A(this, L);
              };
            case C:
              return function() {
                return new A(this, L);
              };
          }
          return function() {
            return new A(this, L);
          };
        }, F = k + " Iterator", D = O == C, H = !1, q = I.prototype, z = q[g] || q[S] || O && q[O], J = z || b(O), Ae = O ? D ? b("entries") : J : void 0, R = k == "Array" && q.entries || z;
        if (R && (E = m(R.call(new I())), E !== Object.prototype && (h(E, F, !0), s || l(E, g) || u(E, g, T))), D && z && z.name !== C && (H = !0, J = function() {
          return z.call(this);
        }), s && !M || !w && !H && q[g] || u(q, g, J), p[k] = J, p[F] = T, O) if (j = { values: D ? J : b(C), keys: v ? J : b(x), entries: Ae }, M) for (G in j) G in q || f(q, G, j[G]);
        else c(c.P + c.F * (w || H), k, j);
        return j;
      };
    }, function(i, a) {
      i.exports = !0;
    }, function(i, a, o) {
      var s = o(2), c = "__core-js_shared__", f = s[c] || (s[c] = {});
      i.exports = function(u) {
        return f[u] || (f[u] = {});
      };
    }, function(i, a, o) {
      var s, c, f, u = o(7), l = o(41), p = o(25), d = o(16), h = o(2), m = h.process, g = h.setImmediate, w = h.clearImmediate, S = h.MessageChannel, x = 0, C = {}, T = "onreadystatechange", I = function() {
        var A = +this;
        if (C.hasOwnProperty(A)) {
          var _ = C[A];
          delete C[A], _();
        }
      }, k = function(A) {
        I.call(A.data);
      };
      g && w || (g = function(A) {
        for (var _ = [], O = 1; arguments.length > O; ) _.push(arguments[O++]);
        return C[++x] = function() {
          l(typeof A == "function" ? A : Function(A), _);
        }, s(x), x;
      }, w = function(A) {
        delete C[A];
      }, o(11)(m) == "process" ? s = function(A) {
        m.nextTick(u(I, A, 1));
      } : S ? (c = new S(), f = c.port2, c.port1.onmessage = k, s = u(f.postMessage, f, 1)) : h.addEventListener && typeof postMessage == "function" && !h.importScripts ? (s = function(A) {
        h.postMessage(A + "", "*");
      }, h.addEventListener("message", k, !1)) : s = T in d("script") ? function(A) {
        p.appendChild(d("script"))[T] = function() {
          p.removeChild(this), I.call(A);
        };
      } : function(A) {
        setTimeout(u(I, A, 1), 0);
      }), i.exports = { set: g, clear: w };
    }, function(i, a, o) {
      var s = o(20), c = Math.min;
      i.exports = function(f) {
        return f > 0 ? c(s(f), 9007199254740991) : 0;
      };
    }, function(i, a, o) {
      var s = o(9);
      i.exports = function(c, f) {
        if (!s(c)) return c;
        var u, l;
        if (f && typeof (u = c.toString) == "function" && !s(l = u.call(c)) || typeof (u = c.valueOf) == "function" && !s(l = u.call(c)) || !f && typeof (u = c.toString) == "function" && !s(l = u.call(c))) return l;
        throw TypeError("Can't convert object to primitive value");
      };
    }, function(i, a) {
      var o = 0, s = Math.random();
      i.exports = function(c) {
        return "Symbol(".concat(c === void 0 ? "" : c, ")_", (++o + s).toString(36));
      };
    }, function(i, a, o) {
      function s(T) {
        return T && T.__esModule ? T : { default: T };
      }
      function c() {
        return process.platform !== "win32" ? "" : process.arch === "ia32" && process.env.hasOwnProperty("PROCESSOR_ARCHITEW6432") ? "mixed" : "native";
      }
      function f(T) {
        return (0, g.createHash)("sha256").update(T).digest("hex");
      }
      function u(T) {
        switch (S) {
          case "darwin":
            return T.split("IOPlatformUUID")[1].split(`
`)[0].replace(/\=|\s+|\"/gi, "").toLowerCase();
          case "win32":
            return T.toString().split("REG_SZ")[1].replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "linux":
            return T.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          case "freebsd":
            return T.toString().replace(/\r+|\n+|\s+/gi, "").toLowerCase();
          default:
            throw new Error("Unsupported platform: " + process.platform);
        }
      }
      function l(T) {
        var I = u((0, m.execSync)(C[S]).toString());
        return T ? I : f(I);
      }
      function p(T) {
        return new h.default(function(I, k) {
          return (0, m.exec)(C[S], {}, function(A, _, O) {
            if (A) return k(new Error("Error while obtaining machine id: " + A.stack));
            var v = u(_.toString());
            return I(T ? v : f(v));
          });
        });
      }
      Object.defineProperty(a, "__esModule", { value: !0 });
      var d = o(35), h = s(d);
      a.machineIdSync = l, a.machineId = p;
      var m = o(70), g = o(71), w = process, S = w.platform, x = { native: "%windir%\\System32", mixed: "%windir%\\sysnative\\cmd.exe /c %windir%\\System32" }, C = { darwin: "ioreg -rd1 -c IOPlatformExpertDevice", win32: x[c()] + "\\REG.exe QUERY HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Cryptography /v MachineGuid", linux: "( cat /var/lib/dbus/machine-id /etc/machine-id 2> /dev/null || hostname ) | head -n 1 || :", freebsd: "kenv -q smbios.system.uuid || sysctl -n kern.hostuuid" };
    }, function(i, a, o) {
      i.exports = { default: o(36), __esModule: !0 };
    }, function(i, a, o) {
      o(66), o(68), o(69), o(67), i.exports = o(6).Promise;
    }, function(i, a) {
      i.exports = function() {
      };
    }, function(i, a) {
      i.exports = function(o, s, c, f) {
        if (!(o instanceof s) || f !== void 0 && f in o) throw TypeError(c + ": incorrect invocation!");
        return o;
      };
    }, function(i, a, o) {
      var s = o(13), c = o(31), f = o(62);
      i.exports = function(u) {
        return function(l, p, d) {
          var h, m = s(l), g = c(m.length), w = f(d, g);
          if (u && p != p) {
            for (; g > w; ) if (h = m[w++], h != h) return !0;
          } else for (; g > w; w++) if ((u || w in m) && m[w] === p) return u || w || 0;
          return !u && -1;
        };
      };
    }, function(i, m, o) {
      var s = o(7), c = o(44), f = o(43), u = o(3), l = o(31), p = o(64), d = {}, h = {}, m = i.exports = function(g, w, S, x, C) {
        var T, I, k, A, _ = C ? function() {
          return g;
        } : p(g), O = s(S, x, w ? 2 : 1), v = 0;
        if (typeof _ != "function") throw TypeError(g + " is not iterable!");
        if (f(_)) {
          for (T = l(g.length); T > v; v++) if (A = w ? O(u(I = g[v])[0], I[1]) : O(g[v]), A === d || A === h) return A;
        } else for (k = _.call(g); !(I = k.next()).done; ) if (A = c(k, O, I.value, w), A === d || A === h) return A;
      };
      m.BREAK = d, m.RETURN = h;
    }, function(i, a) {
      i.exports = function(o, s, c) {
        var f = c === void 0;
        switch (s.length) {
          case 0:
            return f ? o() : o.call(c);
          case 1:
            return f ? o(s[0]) : o.call(c, s[0]);
          case 2:
            return f ? o(s[0], s[1]) : o.call(c, s[0], s[1]);
          case 3:
            return f ? o(s[0], s[1], s[2]) : o.call(c, s[0], s[1], s[2]);
          case 4:
            return f ? o(s[0], s[1], s[2], s[3]) : o.call(c, s[0], s[1], s[2], s[3]);
        }
        return o.apply(c, s);
      };
    }, function(i, a, o) {
      var s = o(11);
      i.exports = Object("z").propertyIsEnumerable(0) ? Object : function(c) {
        return s(c) == "String" ? c.split("") : Object(c);
      };
    }, function(i, a, o) {
      var s = o(10), c = o(1)("iterator"), f = Array.prototype;
      i.exports = function(u) {
        return u !== void 0 && (s.Array === u || f[c] === u);
      };
    }, function(i, a, o) {
      var s = o(3);
      i.exports = function(c, f, u, l) {
        try {
          return l ? f(s(u)[0], u[1]) : f(u);
        } catch (d) {
          var p = c.return;
          throw p !== void 0 && s(p.call(c)), d;
        }
      };
    }, function(i, a, o) {
      var s = o(49), c = o(17), f = o(18), u = {};
      o(5)(u, o(1)("iterator"), function() {
        return this;
      }), i.exports = function(l, p, d) {
        l.prototype = s(u, { next: c(1, d) }), f(l, p + " Iterator");
      };
    }, function(i, a, o) {
      var s = o(1)("iterator"), c = !1;
      try {
        var f = [7][s]();
        f.return = function() {
          c = !0;
        }, Array.from(f, function() {
          throw 2;
        });
      } catch {
      }
      i.exports = function(u, l) {
        if (!l && !c) return !1;
        var p = !1;
        try {
          var d = [7], h = d[s]();
          h.next = function() {
            return { done: p = !0 };
          }, d[s] = function() {
            return h;
          }, u(d);
        } catch {
        }
        return p;
      };
    }, function(i, a) {
      i.exports = function(o, s) {
        return { value: s, done: !!o };
      };
    }, function(i, a, o) {
      var s = o(2), c = o(30).set, f = s.MutationObserver || s.WebKitMutationObserver, u = s.process, l = s.Promise, p = o(11)(u) == "process";
      i.exports = function() {
        var d, h, m, g = function() {
          var C, T;
          for (p && (C = u.domain) && C.exit(); d; ) {
            T = d.fn, d = d.next;
            try {
              T();
            } catch (I) {
              throw d ? m() : h = void 0, I;
            }
          }
          h = void 0, C && C.enter();
        };
        if (p) m = function() {
          u.nextTick(g);
        };
        else if (f) {
          var w = !0, S = document.createTextNode("");
          new f(g).observe(S, { characterData: !0 }), m = function() {
            S.data = w = !w;
          };
        } else if (l && l.resolve) {
          var x = l.resolve();
          m = function() {
            x.then(g);
          };
        } else m = function() {
          c.call(s, g);
        };
        return function(C) {
          var T = { fn: C, next: void 0 };
          h && (h.next = T), d || (d = T, m()), h = T;
        };
      };
    }, function(i, a, o) {
      var s = o(3), c = o(50), f = o(22), u = o(19)("IE_PROTO"), l = function() {
      }, p = "prototype", d = function() {
        var h, m = o(16)("iframe"), g = f.length, w = ">";
        for (m.style.display = "none", o(25).appendChild(m), m.src = "javascript:", h = m.contentWindow.document, h.open(), h.write("<script>document.F=Object<\/script" + w), h.close(), d = h.F; g--; ) delete d[p][f[g]];
        return d();
      };
      i.exports = Object.create || function(h, m) {
        var g;
        return h !== null ? (l[p] = s(h), g = new l(), l[p] = null, g[u] = h) : g = d(), m === void 0 ? g : c(g, m);
      };
    }, function(i, a, o) {
      var s = o(12), c = o(3), f = o(54);
      i.exports = o(4) ? Object.defineProperties : function(u, l) {
        c(u);
        for (var p, d = f(l), h = d.length, m = 0; h > m; ) s.f(u, p = d[m++], l[p]);
        return u;
      };
    }, function(i, a, o) {
      var s = o(55), c = o(17), f = o(13), u = o(32), l = o(8), p = o(26), d = Object.getOwnPropertyDescriptor;
      a.f = o(4) ? d : function(h, m) {
        if (h = f(h), m = u(m, !0), p) try {
          return d(h, m);
        } catch {
        }
        if (l(h, m)) return c(!s.f.call(h, m), h[m]);
      };
    }, function(i, a, o) {
      var s = o(8), c = o(63), f = o(19)("IE_PROTO"), u = Object.prototype;
      i.exports = Object.getPrototypeOf || function(l) {
        return l = c(l), s(l, f) ? l[f] : typeof l.constructor == "function" && l instanceof l.constructor ? l.constructor.prototype : l instanceof Object ? u : null;
      };
    }, function(i, a, o) {
      var s = o(8), c = o(13), f = o(39)(!1), u = o(19)("IE_PROTO");
      i.exports = function(l, p) {
        var d, h = c(l), m = 0, g = [];
        for (d in h) d != u && s(h, d) && g.push(d);
        for (; p.length > m; ) s(h, d = p[m++]) && (~f(g, d) || g.push(d));
        return g;
      };
    }, function(i, a, o) {
      var s = o(53), c = o(22);
      i.exports = Object.keys || function(f) {
        return s(f, c);
      };
    }, function(i, a) {
      a.f = {}.propertyIsEnumerable;
    }, function(i, a, o) {
      var s = o(5);
      i.exports = function(c, f, u) {
        for (var l in f) u && c[l] ? c[l] = f[l] : s(c, l, f[l]);
        return c;
      };
    }, function(i, a, o) {
      i.exports = o(5);
    }, function(i, a, o) {
      var s = o(9), c = o(3), f = function(u, l) {
        if (c(u), !s(l) && l !== null) throw TypeError(l + ": can't set as prototype!");
      };
      i.exports = { set: Object.setPrototypeOf || ("__proto__" in {} ? (function(u, l, p) {
        try {
          p = o(7)(Function.call, o(51).f(Object.prototype, "__proto__").set, 2), p(u, []), l = !(u instanceof Array);
        } catch {
          l = !0;
        }
        return function(d, h) {
          return f(d, h), l ? d.__proto__ = h : p(d, h), d;
        };
      })({}, !1) : void 0), check: f };
    }, function(i, a, o) {
      var s = o(2), c = o(6), f = o(12), u = o(4), l = o(1)("species");
      i.exports = function(p) {
        var d = typeof c[p] == "function" ? c[p] : s[p];
        u && d && !d[l] && f.f(d, l, { configurable: !0, get: function() {
          return this;
        } });
      };
    }, function(i, a, o) {
      var s = o(3), c = o(14), f = o(1)("species");
      i.exports = function(u, l) {
        var p, d = s(u).constructor;
        return d === void 0 || (p = s(d)[f]) == null ? l : c(p);
      };
    }, function(i, a, o) {
      var s = o(20), c = o(15);
      i.exports = function(f) {
        return function(u, l) {
          var p, d, h = String(c(u)), m = s(l), g = h.length;
          return m < 0 || m >= g ? f ? "" : void 0 : (p = h.charCodeAt(m), p < 55296 || p > 56319 || m + 1 === g || (d = h.charCodeAt(m + 1)) < 56320 || d > 57343 ? f ? h.charAt(m) : p : f ? h.slice(m, m + 2) : (p - 55296 << 10) + (d - 56320) + 65536);
        };
      };
    }, function(i, a, o) {
      var s = o(20), c = Math.max, f = Math.min;
      i.exports = function(u, l) {
        return u = s(u), u < 0 ? c(u + l, 0) : f(u, l);
      };
    }, function(i, a, o) {
      var s = o(15);
      i.exports = function(c) {
        return Object(s(c));
      };
    }, function(i, a, o) {
      var s = o(21), c = o(1)("iterator"), f = o(10);
      i.exports = o(6).getIteratorMethod = function(u) {
        if (u != null) return u[c] || u["@@iterator"] || f[s(u)];
      };
    }, function(i, a, o) {
      var s = o(37), c = o(47), f = o(10), u = o(13);
      i.exports = o(27)(Array, "Array", function(l, p) {
        this._t = u(l), this._i = 0, this._k = p;
      }, function() {
        var l = this._t, p = this._k, d = this._i++;
        return !l || d >= l.length ? (this._t = void 0, c(1)) : p == "keys" ? c(0, d) : p == "values" ? c(0, l[d]) : c(0, [d, l[d]]);
      }, "values"), f.Arguments = f.Array, s("keys"), s("values"), s("entries");
    }, function(i, a) {
    }, function(i, a, o) {
      var s, c, f, u = o(28), l = o(2), p = o(7), d = o(21), h = o(23), m = o(9), g = (o(3), o(14)), w = o(38), S = o(40), x = (o(58).set, o(60)), C = o(30).set, T = o(48)(), I = "Promise", k = l.TypeError, _ = l.process, A = l[I], _ = l.process, O = d(_) == "process", v = function() {
      }, M = !!(function() {
        try {
          var R = A.resolve(1), L = (R.constructor = {})[o(1)("species")] = function(N) {
            N(v, v);
          };
          return (O || typeof PromiseRejectionEvent == "function") && R.then(v) instanceof L;
        } catch {
        }
      })(), j = function(R, L) {
        return R === L || R === A && L === f;
      }, G = function(R) {
        var L;
        return !(!m(R) || typeof (L = R.then) != "function") && L;
      }, E = function(R) {
        return j(A, R) ? new b(R) : new c(R);
      }, b = c = function(R) {
        var L, N;
        this.promise = new R(function(Y, se) {
          if (L !== void 0 || N !== void 0) throw k("Bad Promise constructor");
          L = Y, N = se;
        }), this.resolve = g(L), this.reject = g(N);
      }, F = function(R) {
        try {
          R();
        } catch (L) {
          return { error: L };
        }
      }, D = function(R, L) {
        if (!R._n) {
          R._n = !0;
          var N = R._c;
          T(function() {
            for (var Y = R._v, se = R._s == 1, P = 0, W = function($) {
              var U, Q, ie = se ? $.ok : $.fail, V = $.resolve, Oe = $.reject, je = $.domain;
              try {
                ie ? (se || (R._h == 2 && z(R), R._h = 1), ie === !0 ? U = Y : (je && je.enter(), U = ie(Y), je && je.exit()), U === $.promise ? Oe(k("Promise-chain cycle")) : (Q = G(U)) ? Q.call(U, V, Oe) : V(U)) : Oe(Y);
              } catch (cu) {
                Oe(cu);
              }
            }; N.length > P; ) W(N[P++]);
            R._c = [], R._n = !1, L && !R._h && H(R);
          });
        }
      }, H = function(R) {
        C.call(l, function() {
          var L, N, Y, se = R._v;
          if (q(R) && (L = F(function() {
            O ? _.emit("unhandledRejection", se, R) : (N = l.onunhandledrejection) ? N({ promise: R, reason: se }) : (Y = l.console) && Y.error && Y.error("Unhandled promise rejection", se);
          }), R._h = O || q(R) ? 2 : 1), R._a = void 0, L) throw L.error;
        });
      }, q = function(R) {
        if (R._h == 1) return !1;
        for (var L, N = R._a || R._c, Y = 0; N.length > Y; ) if (L = N[Y++], L.fail || !q(L.promise)) return !1;
        return !0;
      }, z = function(R) {
        C.call(l, function() {
          var L;
          O ? _.emit("rejectionHandled", R) : (L = l.onrejectionhandled) && L({ promise: R, reason: R._v });
        });
      }, J = function(R) {
        var L = this;
        L._d || (L._d = !0, L = L._w || L, L._v = R, L._s = 2, L._a || (L._a = L._c.slice()), D(L, !0));
      }, Ae = function(R) {
        var L, N = this;
        if (!N._d) {
          N._d = !0, N = N._w || N;
          try {
            if (N === R) throw k("Promise can't be resolved itself");
            (L = G(R)) ? T(function() {
              var Y = { _w: N, _d: !1 };
              try {
                L.call(R, p(Ae, Y, 1), p(J, Y, 1));
              } catch (se) {
                J.call(Y, se);
              }
            }) : (N._v = R, N._s = 1, D(N, !1));
          } catch (Y) {
            J.call({ _w: N, _d: !1 }, Y);
          }
        }
      };
      M || (A = function(R) {
        w(this, A, I, "_h"), g(R), s.call(this);
        try {
          R(p(Ae, this, 1), p(J, this, 1));
        } catch (L) {
          J.call(this, L);
        }
      }, s = function(R) {
        this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1;
      }, s.prototype = o(56)(A.prototype, { then: function(R, L) {
        var N = E(x(this, A));
        return N.ok = typeof R != "function" || R, N.fail = typeof L == "function" && L, N.domain = O ? _.domain : void 0, this._c.push(N), this._a && this._a.push(N), this._s && D(this, !1), N.promise;
      }, catch: function(R) {
        return this.then(void 0, R);
      } }), b = function() {
        var R = new s();
        this.promise = R, this.resolve = p(Ae, R, 1), this.reject = p(J, R, 1);
      }), h(h.G + h.W + h.F * !M, { Promise: A }), o(18)(A, I), o(59)(I), f = o(6)[I], h(h.S + h.F * !M, I, { reject: function(R) {
        var L = E(this), N = L.reject;
        return N(R), L.promise;
      } }), h(h.S + h.F * (u || !M), I, { resolve: function(R) {
        if (R instanceof A && j(R.constructor, this)) return R;
        var L = E(this), N = L.resolve;
        return N(R), L.promise;
      } }), h(h.S + h.F * !(M && o(46)(function(R) {
        A.all(R).catch(v);
      })), I, { all: function(R) {
        var L = this, N = E(L), Y = N.resolve, se = N.reject, P = F(function() {
          var W = [], $ = 0, U = 1;
          S(R, !1, function(Q) {
            var ie = $++, V = !1;
            W.push(void 0), U++, L.resolve(Q).then(function(Oe) {
              V || (V = !0, W[ie] = Oe, --U || Y(W));
            }, se);
          }), --U || Y(W);
        });
        return P && se(P.error), N.promise;
      }, race: function(R) {
        var L = this, N = E(L), Y = N.reject, se = F(function() {
          S(R, !1, function(P) {
            L.resolve(P).then(N.resolve, Y);
          });
        });
        return se && Y(se.error), N.promise;
      } });
    }, function(i, a, o) {
      var s = o(61)(!0);
      o(27)(String, "String", function(c) {
        this._t = String(c), this._i = 0;
      }, function() {
        var c, f = this._t, u = this._i;
        return u >= f.length ? { value: void 0, done: !0 } : (c = s(f, u), this._i += c.length, { value: c, done: !1 });
      });
    }, function(i, a, o) {
      o(65);
      for (var s = o(2), c = o(5), f = o(10), u = o(1)("toStringTag"), l = ["NodeList", "DOMTokenList", "MediaList", "StyleSheetList", "CSSRuleList"], p = 0; p < 5; p++) {
        var d = l[p], h = s[d], m = h && h.prototype;
        m && !m[u] && c(m, u, d), f[d] = f.Array;
      }
    }, function(i, a) {
      i.exports = En;
    }, function(i, a) {
      i.exports = to;
    }]);
  });
})(jf);
var Qr;
try {
  Qr = Map;
} catch {
}
var Vr;
try {
  Vr = Set;
} catch {
}
function Za(e, t, n) {
  if (!e || typeof e != "object" || typeof e == "function")
    return e;
  if (e.nodeType && "cloneNode" in e)
    return e.cloneNode(!0);
  if (e instanceof Date)
    return new Date(e.getTime());
  if (e instanceof RegExp)
    return new RegExp(e);
  if (Array.isArray(e))
    return e.map(Xr);
  if (Qr && e instanceof Qr)
    return new Map(Array.from(e.entries()));
  if (Vr && e instanceof Vr)
    return new Set(Array.from(e.values()));
  if (e instanceof Object) {
    t.push(e);
    var r = Object.create(e);
    n.push(r);
    for (var i in e) {
      var a = t.findIndex(function(o) {
        return o === e[i];
      });
      r[i] = a > -1 ? n[a] : Za(e[i], t, n);
    }
    return r;
  }
  return e;
}
function Xr(e) {
  return Za(e, [], []);
}
const Hf = Object.prototype.toString, Bf = Error.prototype.toString, Uf = RegExp.prototype.toString, Gf = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", qf = /^Symbol\((.*)\)(.*)$/;
function Kf(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : "" + e;
}
function so(e, t = !1) {
  if (e == null || e === !0 || e === !1) return "" + e;
  const n = typeof e;
  if (n === "number") return Kf(e);
  if (n === "string") return t ? `"${e}"` : e;
  if (n === "function") return "[Function " + (e.name || "anonymous") + "]";
  if (n === "symbol") return Gf.call(e).replace(qf, "Symbol($1)");
  const r = Hf.call(e).slice(8, -1);
  return r === "Date" ? isNaN(e.getTime()) ? "" + e : e.toISOString(e) : r === "Error" || e instanceof Error ? "[" + Bf.call(e) + "]" : r === "RegExp" ? Uf.call(e) : null;
}
function Tt(e, t) {
  let n = so(e, t);
  return n !== null ? n : JSON.stringify(e, function(r, i) {
    let a = so(this[r], t);
    return a !== null ? a : i;
  }, 2);
}
let Je = {
  default: "${path} is invalid",
  required: "${path} is a required field",
  oneOf: "${path} must be one of the following values: ${values}",
  notOneOf: "${path} must not be one of the following values: ${values}",
  notType: ({
    path: e,
    type: t,
    value: n,
    originalValue: r
  }) => {
    let i = r != null && r !== n, a = `${e} must be a \`${t}\` type, but the final value was: \`${Tt(n, !0)}\`` + (i ? ` (cast from the value \`${Tt(r, !0)}\`).` : ".");
    return n === null && (a += '\n If "null" is intended as an empty value be sure to mark the schema as `.nullable()`'), a;
  },
  defined: "${path} must be defined"
}, Fe = {
  length: "${path} must be exactly ${length} characters",
  min: "${path} must be at least ${min} characters",
  max: "${path} must be at most ${max} characters",
  matches: '${path} must match the following: "${regex}"',
  email: "${path} must be a valid email",
  url: "${path} must be a valid URL",
  uuid: "${path} must be a valid UUID",
  trim: "${path} must be a trimmed string",
  lowercase: "${path} must be a lowercase string",
  uppercase: "${path} must be a upper case string"
}, Wf = {
  min: "${path} must be greater than or equal to ${min}",
  max: "${path} must be less than or equal to ${max}",
  lessThan: "${path} must be less than ${less}",
  moreThan: "${path} must be greater than ${more}",
  positive: "${path} must be a positive number",
  negative: "${path} must be a negative number",
  integer: "${path} must be an integer"
}, Zr = {
  min: "${path} field must be later than ${min}",
  max: "${path} field must be at earlier than ${max}"
}, zf = {
  isValue: "${path} field must be ${value}"
}, Jr = {
  noUnknown: "${path} field has unspecified keys: ${unknown}"
}, pn = {
  min: "${path} field must have at least ${min} items",
  max: "${path} field must have less than or equal to ${max} items",
  length: "${path} must be have ${length} items"
};
const Yf = Object.assign(/* @__PURE__ */ Object.create(null), {
  mixed: Je,
  string: Fe,
  number: Wf,
  date: Zr,
  object: Jr,
  array: pn,
  boolean: zf
}), Qn = ((e) => e && e.__isYupSchema__);
class Qf {
  constructor(t, n) {
    if (this.refs = t, this.refs = t, typeof n == "function") {
      this.fn = n;
      return;
    }
    if (!bn(n, "is")) throw new TypeError("`is:` is required for `when()` conditions");
    if (!n.then && !n.otherwise) throw new TypeError("either `then:` or `otherwise:` is required for `when()` conditions");
    let {
      is: r,
      then: i,
      otherwise: a
    } = n, o = typeof r == "function" ? r : (...s) => s.every((c) => c === r);
    this.fn = function(...s) {
      let c = s.pop(), f = s.pop(), u = o(...s) ? i : a;
      if (u)
        return typeof u == "function" ? u(f) : f.concat(u.resolve(c));
    };
  }
  resolve(t, n) {
    let r = this.refs.map((a) => a.getValue(n?.value, n?.parent, n?.context)), i = this.fn.apply(t, r.concat(t, n));
    if (i === void 0 || i === t) return t;
    if (!Qn(i)) throw new TypeError("conditions must return a schema object");
    return i.resolve(n);
  }
}
function Ja(e) {
  return e == null ? [] : [].concat(e);
}
function ei() {
  return ei = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ei.apply(this, arguments);
}
let Vf = /\$\{\s*(\w+)\s*\}/g;
class de extends Error {
  static formatError(t, n) {
    const r = n.label || n.path || "this";
    return r !== n.path && (n = ei({}, n, {
      path: r
    })), typeof t == "string" ? t.replace(Vf, (i, a) => Tt(n[a])) : typeof t == "function" ? t(n) : t;
  }
  static isError(t) {
    return t && t.name === "ValidationError";
  }
  constructor(t, n, r, i) {
    super(), this.name = "ValidationError", this.value = n, this.path = r, this.type = i, this.errors = [], this.inner = [], Ja(t).forEach((a) => {
      de.isError(a) ? (this.errors.push(...a.errors), this.inner = this.inner.concat(a.inner.length ? a.inner : a)) : this.errors.push(a);
    }), this.message = this.errors.length > 1 ? `${this.errors.length} errors occurred` : this.errors[0], Error.captureStackTrace && Error.captureStackTrace(this, de);
  }
}
const Xf = (e) => {
  let t = !1;
  return (...n) => {
    t || (t = !0, e(...n));
  };
};
function _n(e, t) {
  let {
    endEarly: n,
    tests: r,
    args: i,
    value: a,
    errors: o,
    sort: s,
    path: c
  } = e, f = Xf(t), u = r.length;
  const l = [];
  if (o = o || [], !u) return o.length ? f(new de(o, a, c)) : f(null, a);
  for (let p = 0; p < r.length; p++) {
    const d = r[p];
    d(i, function(m) {
      if (m) {
        if (!de.isError(m))
          return f(m, a);
        if (n)
          return m.value = a, f(m, a);
        l.push(m);
      }
      if (--u <= 0) {
        if (l.length && (s && l.sort(s), o.length && l.push(...o), o = l), o.length) {
          f(new de(o, a, c), a);
          return;
        }
        f(null, a);
      }
    });
  }
}
function It(e) {
  this._maxSize = e, this.clear();
}
It.prototype.clear = function() {
  this._size = 0, this._values = /* @__PURE__ */ Object.create(null);
};
It.prototype.get = function(e) {
  return this._values[e];
};
It.prototype.set = function(e, t) {
  return this._size >= this._maxSize && this.clear(), e in this._values || this._size++, this._values[e] = t;
};
var Zf = /[^.^\]^[]+|(?=\[\]|\.\.)/g, Jf = /^\d+$/, ep = /^\d/, tp = /[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/g, np = /^\s*(['"]?)(.*?)(\1)\s*$/, hi = 512, co = new It(hi);
new It(hi);
var uo = new It(hi), Vn = {
  split: ti,
  getter: function(e, t) {
    var n = rp(e);
    return uo.get(e) || uo.set(e, function(i) {
      for (var a = 0, o = n.length; a < o; )
        if (i != null || !t) i = i[n[a++]];
        else return;
      return i;
    });
  },
  forEach: function(e, t, n) {
    ip(Array.isArray(e) ? e : ti(e), t, n);
  }
};
function rp(e) {
  return co.get(e) || co.set(
    e,
    ti(e).map(function(t) {
      return t.replace(np, "$2");
    })
  );
}
function ti(e) {
  return e.match(Zf) || [""];
}
function ip(e, t, n) {
  var r = e.length, i, a, o, s;
  for (a = 0; a < r; a++)
    i = e[a], i && (sp(i) && (i = '"' + i + '"'), s = es(i), o = !s && /^\d+$/.test(i), t.call(n, i, s, o, a, e));
}
function es(e) {
  return typeof e == "string" && e && ["'", '"'].indexOf(e.charAt(0)) !== -1;
}
function op(e) {
  return e.match(ep) && !e.match(Jf);
}
function ap(e) {
  return tp.test(e);
}
function sp(e) {
  return !es(e) && (op(e) || ap(e));
}
const rn = {
  context: "$",
  value: "."
};
class at {
  constructor(t, n = {}) {
    if (typeof t != "string") throw new TypeError("ref must be a string, got: " + t);
    if (this.key = t.trim(), t === "") throw new TypeError("ref must be a non-empty string");
    this.isContext = this.key[0] === rn.context, this.isValue = this.key[0] === rn.value, this.isSibling = !this.isContext && !this.isValue;
    let r = this.isContext ? rn.context : this.isValue ? rn.value : "";
    this.path = this.key.slice(r.length), this.getter = this.path && Vn.getter(this.path, !0), this.map = n.map;
  }
  getValue(t, n, r) {
    let i = this.isContext ? r : this.isValue ? t : n;
    return this.getter && (i = this.getter(i || {})), this.map && (i = this.map(i)), i;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {Object=} options.context
   * @param {Object=} options.parent
   */
  cast(t, n) {
    return this.getValue(t, n?.parent, n?.context);
  }
  resolve() {
    return this;
  }
  describe() {
    return {
      type: "ref",
      key: this.key
    };
  }
  toString() {
    return `Ref(${this.key})`;
  }
  static isRef(t) {
    return t && t.__isYupRef;
  }
}
at.prototype.__isYupRef = !0;
function An() {
  return An = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, An.apply(this, arguments);
}
function cp(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), i, a;
  for (a = 0; a < r.length; a++)
    i = r[a], !(t.indexOf(i) >= 0) && (n[i] = e[i]);
  return n;
}
function on(e) {
  function t(n, r) {
    let {
      value: i,
      path: a = "",
      label: o,
      options: s,
      originalValue: c,
      sync: f
    } = n, u = cp(n, ["value", "path", "label", "options", "originalValue", "sync"]);
    const {
      name: l,
      test: p,
      params: d,
      message: h
    } = e;
    let {
      parent: m,
      context: g
    } = s;
    function w(I) {
      return at.isRef(I) ? I.getValue(i, m, g) : I;
    }
    function S(I = {}) {
      const k = $a(An({
        value: i,
        originalValue: c,
        label: o,
        path: I.path || a
      }, d, I.params), w), A = new de(de.formatError(I.message || h, k), i, k.path, I.type || l);
      return A.params = k, A;
    }
    let x = An({
      path: a,
      parent: m,
      type: l,
      createError: S,
      resolve: w,
      options: s,
      originalValue: c
    }, u);
    if (!f) {
      try {
        Promise.resolve(p.call(x, i, x)).then((I) => {
          de.isError(I) ? r(I) : I ? r(null, I) : r(S());
        });
      } catch (I) {
        r(I);
      }
      return;
    }
    let C;
    try {
      var T;
      if (C = p.call(x, i, x), typeof ((T = C) == null ? void 0 : T.then) == "function")
        throw new Error(`Validation test of type: "${x.type}" returned a Promise during a synchronous validate. This test will finish after the validate call has returned`);
    } catch (I) {
      r(I);
      return;
    }
    de.isError(C) ? r(C) : C ? r(null, C) : r(S());
  }
  return t.OPTIONS = e, t;
}
let up = (e) => e.substr(0, e.length - 1).substr(1);
function lp(e, t, n, r = n) {
  let i, a, o;
  return t ? (Vn.forEach(t, (s, c, f) => {
    let u = c ? up(s) : s;
    if (e = e.resolve({
      context: r,
      parent: i,
      value: n
    }), e.innerType) {
      let l = f ? parseInt(u, 10) : 0;
      if (n && l >= n.length)
        throw new Error(`Yup.reach cannot resolve an array item at index: ${s}, in the path: ${t}. because there is no value at that index. `);
      i = n, n = n && n[l], e = e.innerType;
    }
    if (!f) {
      if (!e.fields || !e.fields[u]) throw new Error(`The schema does not contain the path: ${t}. (failed at: ${o} which is a type: "${e._type}")`);
      i = n, n = n && n[u], e = e.fields[u];
    }
    a = u, o = c ? "[" + s + "]" : "." + s;
  }), {
    schema: e,
    parent: i,
    parentPath: a
  }) : {
    parent: i,
    parentPath: t,
    schema: e
  };
}
class Tn {
  constructor() {
    this.list = /* @__PURE__ */ new Set(), this.refs = /* @__PURE__ */ new Map();
  }
  get size() {
    return this.list.size + this.refs.size;
  }
  describe() {
    const t = [];
    for (const n of this.list) t.push(n);
    for (const [, n] of this.refs) t.push(n.describe());
    return t;
  }
  toArray() {
    return Array.from(this.list).concat(Array.from(this.refs.values()));
  }
  add(t) {
    at.isRef(t) ? this.refs.set(t.key, t) : this.list.add(t);
  }
  delete(t) {
    at.isRef(t) ? this.refs.delete(t.key) : this.list.delete(t);
  }
  has(t, n) {
    if (this.list.has(t)) return !0;
    let r, i = this.refs.values();
    for (; r = i.next(), !r.done; ) if (n(r.value) === t) return !0;
    return !1;
  }
  clone() {
    const t = new Tn();
    return t.list = new Set(this.list), t.refs = new Map(this.refs), t;
  }
  merge(t, n) {
    const r = this.clone();
    return t.list.forEach((i) => r.add(i)), t.refs.forEach((i) => r.add(i)), n.list.forEach((i) => r.delete(i)), n.refs.forEach((i) => r.delete(i)), r;
  }
}
function Te() {
  return Te = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Te.apply(this, arguments);
}
class me {
  constructor(t) {
    this.deps = [], this.conditions = [], this._whitelist = new Tn(), this._blacklist = new Tn(), this.exclusiveTests = /* @__PURE__ */ Object.create(null), this.tests = [], this.transforms = [], this.withMutation(() => {
      this.typeError(Je.notType);
    }), this.type = t?.type || "mixed", this.spec = Te({
      strip: !1,
      strict: !1,
      abortEarly: !0,
      recursive: !0,
      nullable: !1,
      presence: "optional"
    }, t?.spec);
  }
  // TODO: remove
  get _type() {
    return this.type;
  }
  _typeCheck(t) {
    return !0;
  }
  clone(t) {
    if (this._mutate)
      return t && Object.assign(this.spec, t), this;
    const n = Object.create(Object.getPrototypeOf(this));
    return n.type = this.type, n._typeError = this._typeError, n._whitelistError = this._whitelistError, n._blacklistError = this._blacklistError, n._whitelist = this._whitelist.clone(), n._blacklist = this._blacklist.clone(), n.exclusiveTests = Te({}, this.exclusiveTests), n.deps = [...this.deps], n.conditions = [...this.conditions], n.tests = [...this.tests], n.transforms = [...this.transforms], n.spec = Xr(Te({}, this.spec, t)), n;
  }
  label(t) {
    var n = this.clone();
    return n.spec.label = t, n;
  }
  meta(...t) {
    if (t.length === 0) return this.spec.meta;
    let n = this.clone();
    return n.spec.meta = Object.assign(n.spec.meta || {}, t[0]), n;
  }
  // withContext<TContext extends AnyObject>(): BaseSchema<
  //   TCast,
  //   TContext,
  //   TOutput
  // > {
  //   return this as any;
  // }
  withMutation(t) {
    let n = this._mutate;
    this._mutate = !0;
    let r = t(this);
    return this._mutate = n, r;
  }
  concat(t) {
    if (!t || t === this) return this;
    if (t.type !== this.type && this.type !== "mixed") throw new TypeError(`You cannot \`concat()\` schema's of different types: ${this.type} and ${t.type}`);
    let n = this, r = t.clone();
    const i = Te({}, n.spec, r.spec);
    return r.spec = i, r._typeError || (r._typeError = n._typeError), r._whitelistError || (r._whitelistError = n._whitelistError), r._blacklistError || (r._blacklistError = n._blacklistError), r._whitelist = n._whitelist.merge(t._whitelist, t._blacklist), r._blacklist = n._blacklist.merge(t._blacklist, t._whitelist), r.tests = n.tests, r.exclusiveTests = n.exclusiveTests, r.withMutation((a) => {
      t.tests.forEach((o) => {
        a.test(o.OPTIONS);
      });
    }), r;
  }
  isType(t) {
    return this.spec.nullable && t === null ? !0 : this._typeCheck(t);
  }
  resolve(t) {
    let n = this;
    if (n.conditions.length) {
      let r = n.conditions;
      n = n.clone(), n.conditions = [], n = r.reduce((i, a) => a.resolve(i, t), n), n = n.resolve(t);
    }
    return n;
  }
  /**
   *
   * @param {*} value
   * @param {Object} options
   * @param {*=} options.parent
   * @param {*=} options.context
   */
  cast(t, n = {}) {
    let r = this.resolve(Te({
      value: t
    }, n)), i = r._cast(t, n);
    if (t !== void 0 && n.assert !== !1 && r.isType(i) !== !0) {
      let a = Tt(t), o = Tt(i);
      throw new TypeError(`The value of ${n.path || "field"} could not be cast to a value that satisfies the schema type: "${r._type}". 

attempted value: ${a} 
` + (o !== a ? `result of cast: ${o}` : ""));
    }
    return i;
  }
  _cast(t, n) {
    let r = t === void 0 ? t : this.transforms.reduce((i, a) => a.call(this, i, t, this), t);
    return r === void 0 && (r = this.getDefault()), r;
  }
  _validate(t, n = {}, r) {
    let {
      sync: i,
      path: a,
      from: o = [],
      originalValue: s = t,
      strict: c = this.spec.strict,
      abortEarly: f = this.spec.abortEarly
    } = n, u = t;
    c || (u = this._cast(u, Te({
      assert: !1
    }, n)));
    let l = {
      value: u,
      path: a,
      options: n,
      originalValue: s,
      schema: this,
      label: this.spec.label,
      sync: i,
      from: o
    }, p = [];
    this._typeError && p.push(this._typeError), this._whitelistError && p.push(this._whitelistError), this._blacklistError && p.push(this._blacklistError), _n({
      args: l,
      value: u,
      path: a,
      tests: p,
      endEarly: f
    }, (d) => {
      if (d) return void r(d, u);
      _n({
        tests: this.tests,
        args: l,
        path: a,
        sync: i,
        value: u,
        endEarly: f
      }, r);
    });
  }
  validate(t, n, r) {
    let i = this.resolve(Te({}, n, {
      value: t
    }));
    return typeof r == "function" ? i._validate(t, n, r) : new Promise((a, o) => i._validate(t, n, (s, c) => {
      s ? o(s) : a(c);
    }));
  }
  validateSync(t, n) {
    let r = this.resolve(Te({}, n, {
      value: t
    })), i;
    return r._validate(t, Te({}, n, {
      sync: !0
    }), (a, o) => {
      if (a) throw a;
      i = o;
    }), i;
  }
  isValid(t, n) {
    return this.validate(t, n).then(() => !0, (r) => {
      if (de.isError(r)) return !1;
      throw r;
    });
  }
  isValidSync(t, n) {
    try {
      return this.validateSync(t, n), !0;
    } catch (r) {
      if (de.isError(r)) return !1;
      throw r;
    }
  }
  _getDefault() {
    let t = this.spec.default;
    return t == null ? t : typeof t == "function" ? t.call(this) : Xr(t);
  }
  getDefault(t) {
    return this.resolve(t || {})._getDefault();
  }
  default(t) {
    return arguments.length === 0 ? this._getDefault() : this.clone({
      default: t
    });
  }
  strict(t = !0) {
    var n = this.clone();
    return n.spec.strict = t, n;
  }
  _isPresent(t) {
    return t != null;
  }
  defined(t = Je.defined) {
    return this.test({
      message: t,
      name: "defined",
      exclusive: !0,
      test(n) {
        return n !== void 0;
      }
    });
  }
  required(t = Je.required) {
    return this.clone({
      presence: "required"
    }).withMutation((n) => n.test({
      message: t,
      name: "required",
      exclusive: !0,
      test(r) {
        return this.schema._isPresent(r);
      }
    }));
  }
  notRequired() {
    var t = this.clone({
      presence: "optional"
    });
    return t.tests = t.tests.filter((n) => n.OPTIONS.name !== "required"), t;
  }
  nullable(t = !0) {
    var n = this.clone({
      nullable: t !== !1
    });
    return n;
  }
  transform(t) {
    var n = this.clone();
    return n.transforms.push(t), n;
  }
  /**
   * Adds a test function to the schema's queue of tests.
   * tests can be exclusive or non-exclusive.
   *
   * - exclusive tests, will replace any existing tests of the same name.
   * - non-exclusive: can be stacked
   *
   * If a non-exclusive test is added to a schema with an exclusive test of the same name
   * the exclusive test is removed and further tests of the same name will be stacked.
   *
   * If an exclusive test is added to a schema with non-exclusive tests of the same name
   * the previous tests are removed and further tests of the same name will replace each other.
   */
  test(...t) {
    let n;
    if (t.length === 1 ? typeof t[0] == "function" ? n = {
      test: t[0]
    } : n = t[0] : t.length === 2 ? n = {
      name: t[0],
      test: t[1]
    } : n = {
      name: t[0],
      message: t[1],
      test: t[2]
    }, n.message === void 0 && (n.message = Je.default), typeof n.test != "function") throw new TypeError("`test` is a required parameters");
    let r = this.clone(), i = on(n), a = n.exclusive || n.name && r.exclusiveTests[n.name] === !0;
    if (n.exclusive && !n.name)
      throw new TypeError("Exclusive tests must provide a unique `name` identifying the test");
    return n.name && (r.exclusiveTests[n.name] = !!n.exclusive), r.tests = r.tests.filter((o) => !(o.OPTIONS.name === n.name && (a || o.OPTIONS.test === i.OPTIONS.test))), r.tests.push(i), r;
  }
  when(t, n) {
    !Array.isArray(t) && typeof t != "string" && (n = t, t = ".");
    let r = this.clone(), i = Ja(t).map((a) => new at(a));
    return i.forEach((a) => {
      a.isSibling && r.deps.push(a.key);
    }), r.conditions.push(new Qf(i, n)), r;
  }
  typeError(t) {
    var n = this.clone();
    return n._typeError = on({
      message: t,
      name: "typeError",
      test(r) {
        return r !== void 0 && !this.schema.isType(r) ? this.createError({
          params: {
            type: this.schema._type
          }
        }) : !0;
      }
    }), n;
  }
  oneOf(t, n = Je.oneOf) {
    var r = this.clone();
    return t.forEach((i) => {
      r._whitelist.add(i), r._blacklist.delete(i);
    }), r._whitelistError = on({
      message: n,
      name: "oneOf",
      test(i) {
        if (i === void 0) return !0;
        let a = this.schema._whitelist;
        return a.has(i, this.resolve) ? !0 : this.createError({
          params: {
            values: a.toArray().join(", ")
          }
        });
      }
    }), r;
  }
  notOneOf(t, n = Je.notOneOf) {
    var r = this.clone();
    return t.forEach((i) => {
      r._blacklist.add(i), r._whitelist.delete(i);
    }), r._blacklistError = on({
      message: n,
      name: "notOneOf",
      test(i) {
        let a = this.schema._blacklist;
        return a.has(i, this.resolve) ? this.createError({
          params: {
            values: a.toArray().join(", ")
          }
        }) : !0;
      }
    }), r;
  }
  strip(t = !0) {
    let n = this.clone();
    return n.spec.strip = t, n;
  }
  describe() {
    const t = this.clone(), {
      label: n,
      meta: r
    } = t.spec;
    return {
      meta: r,
      label: n,
      type: t.type,
      oneOf: t._whitelist.describe(),
      notOneOf: t._blacklist.describe(),
      tests: t.tests.map((a) => ({
        name: a.OPTIONS.name,
        params: a.OPTIONS.params
      })).filter((a, o, s) => s.findIndex((c) => c.name === a.name) === o)
    };
  }
}
me.prototype.__isYupSchema__ = !0;
for (const e of ["validate", "validateSync"]) me.prototype[`${e}At`] = function(t, n, r = {}) {
  const {
    parent: i,
    parentPath: a,
    schema: o
  } = lp(this, t, n, r.context);
  return o[e](i && i[a], Te({}, r, {
    parent: i,
    path: t
  }));
};
for (const e of ["equals", "is"]) me.prototype[e] = me.prototype.oneOf;
for (const e of ["not", "nope"]) me.prototype[e] = me.prototype.notOneOf;
me.prototype.optional = me.prototype.notRequired;
const ts = me;
function Xn() {
  return new ts();
}
Xn.prototype = ts.prototype;
const ge = ((e) => e == null);
let fp = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i, pp = /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i, dp = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i, hp = (e) => ge(e) || e === e.trim(), mp = {}.toString();
function mi() {
  return new ns();
}
class ns extends me {
  constructor() {
    super({
      type: "string"
    }), this.withMutation(() => {
      this.transform(function(t) {
        if (this.isType(t) || Array.isArray(t)) return t;
        const n = t != null && t.toString ? t.toString() : t;
        return n === mp ? t : n;
      });
    });
  }
  _typeCheck(t) {
    return t instanceof String && (t = t.valueOf()), typeof t == "string";
  }
  _isPresent(t) {
    return super._isPresent(t) && !!t.length;
  }
  length(t, n = Fe.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(r) {
        return ge(r) || r.length === this.resolve(t);
      }
    });
  }
  min(t, n = Fe.min) {
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(r) {
        return ge(r) || r.length >= this.resolve(t);
      }
    });
  }
  max(t, n = Fe.max) {
    return this.test({
      name: "max",
      exclusive: !0,
      message: n,
      params: {
        max: t
      },
      test(r) {
        return ge(r) || r.length <= this.resolve(t);
      }
    });
  }
  matches(t, n) {
    let r = !1, i, a;
    return n && (typeof n == "object" ? {
      excludeEmptyString: r = !1,
      message: i,
      name: a
    } = n : i = n), this.test({
      name: a || "matches",
      message: i || Fe.matches,
      params: {
        regex: t
      },
      test: (o) => ge(o) || o === "" && r || o.search(t) !== -1
    });
  }
  email(t = Fe.email) {
    return this.matches(fp, {
      name: "email",
      message: t,
      excludeEmptyString: !0
    });
  }
  url(t = Fe.url) {
    return this.matches(pp, {
      name: "url",
      message: t,
      excludeEmptyString: !0
    });
  }
  uuid(t = Fe.uuid) {
    return this.matches(dp, {
      name: "uuid",
      message: t,
      excludeEmptyString: !1
    });
  }
  //-- transforms --
  ensure() {
    return this.default("").transform((t) => t === null ? "" : t);
  }
  trim(t = Fe.trim) {
    return this.transform((n) => n != null ? n.trim() : n).test({
      message: t,
      name: "trim",
      test: hp
    });
  }
  lowercase(t = Fe.lowercase) {
    return this.transform((n) => ge(n) ? n : n.toLowerCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => ge(n) || n === n.toLowerCase()
    });
  }
  uppercase(t = Fe.uppercase) {
    return this.transform((n) => ge(n) ? n : n.toUpperCase()).test({
      message: t,
      name: "string_case",
      exclusive: !0,
      test: (n) => ge(n) || n === n.toUpperCase()
    });
  }
}
mi.prototype = ns.prototype;
var gp = /^(\d{4}|[+\-]\d{6})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:[ T]?(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
function yp(e) {
  var t = [1, 4, 5, 6, 7, 10, 11], n = 0, r, i;
  if (i = gp.exec(e)) {
    for (var a = 0, o; o = t[a]; ++a) i[o] = +i[o] || 0;
    i[2] = (+i[2] || 1) - 1, i[3] = +i[3] || 1, i[7] = i[7] ? String(i[7]).substr(0, 3) : 0, (i[8] === void 0 || i[8] === "") && (i[9] === void 0 || i[9] === "") ? r = +new Date(i[1], i[2], i[3], i[4], i[5], i[6], i[7]) : (i[8] !== "Z" && i[9] !== void 0 && (n = i[10] * 60 + i[11], i[9] === "+" && (n = 0 - n)), r = Date.UTC(i[1], i[2], i[3], i[4], i[5] + n, i[6], i[7]));
  } else r = Date.parse ? Date.parse(e) : NaN;
  return r;
}
let rs = /* @__PURE__ */ new Date(""), vp = (e) => Object.prototype.toString.call(e) === "[object Date]";
class wp extends me {
  constructor() {
    super({
      type: "date"
    }), this.withMutation(() => {
      this.transform(function(t) {
        return this.isType(t) ? t : (t = yp(t), isNaN(t) ? rs : new Date(t));
      });
    });
  }
  _typeCheck(t) {
    return vp(t) && !isNaN(t.getTime());
  }
  prepareParam(t, n) {
    let r;
    if (at.isRef(t))
      r = t;
    else {
      let i = this.cast(t);
      if (!this._typeCheck(i)) throw new TypeError(`\`${n}\` must be a Date or a value that can be \`cast()\` to a Date`);
      r = i;
    }
    return r;
  }
  min(t, n = Zr.min) {
    let r = this.prepareParam(t, "min");
    return this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      test(i) {
        return ge(i) || i >= this.resolve(r);
      }
    });
  }
  max(t, n = Zr.max) {
    var r = this.prepareParam(t, "max");
    return this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(i) {
        return ge(i) || i <= this.resolve(r);
      }
    });
  }
}
wp.INVALID_DATE = rs;
var gi = { exports: {} };
gi.exports = function(e) {
  return is(Ep(e), e);
};
gi.exports.array = is;
function is(e, t) {
  var n = e.length, r = new Array(n), i = {}, a = n, o = bp(t), s = Sp(e);
  for (t.forEach(function(f) {
    if (!s.has(f[0]) || !s.has(f[1]))
      throw new Error("Unknown node. There is an unknown node in the supplied edges.");
  }); a--; )
    i[a] || c(e[a], a, /* @__PURE__ */ new Set());
  return r;
  function c(f, u, l) {
    if (l.has(f)) {
      var p;
      try {
        p = ", node was:" + JSON.stringify(f);
      } catch {
        p = "";
      }
      throw new Error("Cyclic dependency" + p);
    }
    if (!s.has(f))
      throw new Error("Found unknown node. Make sure to provided all involved nodes. Unknown node: " + JSON.stringify(f));
    if (!i[u]) {
      i[u] = !0;
      var d = o.get(f) || /* @__PURE__ */ new Set();
      if (d = Array.from(d), u = d.length) {
        l.add(f);
        do {
          var h = d[--u];
          c(h, s.get(h), l);
        } while (u);
        l.delete(f);
      }
      r[--n] = f;
    }
  }
}
function Ep(e) {
  for (var t = /* @__PURE__ */ new Set(), n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    t.add(i[0]), t.add(i[1]);
  }
  return Array.from(t);
}
function bp(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, r = e.length; n < r; n++) {
    var i = e[n];
    t.has(i[0]) || t.set(i[0], /* @__PURE__ */ new Set()), t.has(i[1]) || t.set(i[1], /* @__PURE__ */ new Set()), t.get(i[0]).add(i[1]);
  }
  return t;
}
function Sp(e) {
  for (var t = /* @__PURE__ */ new Map(), n = 0, r = e.length; n < r; n++)
    t.set(e[n], n);
  return t;
}
var xp = gi.exports;
const _p = /* @__PURE__ */ Xa(xp);
function Ap(e, t = []) {
  let n = [], r = [];
  function i(a, o) {
    var s = Vn.split(a)[0];
    ~r.indexOf(s) || r.push(s), ~t.indexOf(`${o}-${s}`) || n.push([o, s]);
  }
  for (const a in e) if (bn(e, a)) {
    let o = e[a];
    ~r.indexOf(a) || r.push(a), at.isRef(o) && o.isSibling ? i(o.path, a) : Qn(o) && "deps" in o && o.deps.forEach((s) => i(s, a));
  }
  return _p.array(r, n).reverse();
}
function lo(e, t) {
  let n = 1 / 0;
  return e.some((r, i) => {
    var a;
    if (((a = t.path) == null ? void 0 : a.indexOf(r)) !== -1)
      return n = i, !0;
  }), n;
}
function os(e) {
  return (t, n) => lo(e, t) - lo(e, n);
}
function Et() {
  return Et = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Et.apply(this, arguments);
}
let fo = (e) => Object.prototype.toString.call(e) === "[object Object]";
function Tp(e, t) {
  let n = Object.keys(e.fields);
  return Object.keys(t).filter((r) => n.indexOf(r) === -1);
}
const Cp = os([]);
class as extends me {
  constructor(t) {
    super({
      type: "object"
    }), this.fields = /* @__PURE__ */ Object.create(null), this._sortErrors = Cp, this._nodes = [], this._excludedEdges = [], this.withMutation(() => {
      this.transform(function(r) {
        if (typeof r == "string")
          try {
            r = JSON.parse(r);
          } catch {
            r = null;
          }
        return this.isType(r) ? r : null;
      }), t && this.shape(t);
    });
  }
  _typeCheck(t) {
    return fo(t) || typeof t == "function";
  }
  _cast(t, n = {}) {
    var r;
    let i = super._cast(t, n);
    if (i === void 0) return this.getDefault();
    if (!this._typeCheck(i)) return i;
    let a = this.fields, o = (r = n.stripUnknown) != null ? r : this.spec.noUnknown, s = this._nodes.concat(Object.keys(i).filter((l) => this._nodes.indexOf(l) === -1)), c = {}, f = Et({}, n, {
      parent: c,
      __validating: n.__validating || !1
    }), u = !1;
    for (const l of s) {
      let p = a[l], d = bn(i, l);
      if (p) {
        let h, m = i[l];
        f.path = (n.path ? `${n.path}.` : "") + l, p = p.resolve({
          value: m,
          context: n.context,
          parent: c
        });
        let g = "spec" in p ? p.spec : void 0, w = g?.strict;
        if (g?.strip) {
          u = u || l in i;
          continue;
        }
        h = !n.__validating || !w ? (
          // TODO: use _cast, this is double resolving
          p.cast(i[l], f)
        ) : i[l], h !== void 0 && (c[l] = h);
      } else d && !o && (c[l] = i[l]);
      c[l] !== i[l] && (u = !0);
    }
    return u ? c : i;
  }
  _validate(t, n = {}, r) {
    let i = [], {
      sync: a,
      from: o = [],
      originalValue: s = t,
      abortEarly: c = this.spec.abortEarly,
      recursive: f = this.spec.recursive
    } = n;
    o = [{
      schema: this,
      value: s
    }, ...o], n.__validating = !0, n.originalValue = s, n.from = o, super._validate(t, n, (u, l) => {
      if (u) {
        if (!de.isError(u) || c)
          return void r(u, l);
        i.push(u);
      }
      if (!f || !fo(l)) {
        r(i[0] || null, l);
        return;
      }
      s = s || l;
      let p = this._nodes.map((d) => (h, m) => {
        let g = d.indexOf(".") === -1 ? (n.path ? `${n.path}.` : "") + d : `${n.path || ""}["${d}"]`, w = this.fields[d];
        if (w && "validate" in w) {
          w.validate(l[d], Et({}, n, {
            // @ts-ignore
            path: g,
            from: o,
            // inner fields are always strict:
            // 1. this isn't strict so the casting will also have cast inner values
            // 2. this is strict in which case the nested values weren't cast either
            strict: !0,
            parent: l,
            originalValue: s[d]
          }), m);
          return;
        }
        m(null);
      });
      _n({
        tests: p,
        value: l,
        errors: i,
        endEarly: c,
        sort: this._sortErrors,
        path: n.path
      }, r);
    });
  }
  clone(t) {
    const n = super.clone(t);
    return n.fields = Et({}, this.fields), n._nodes = this._nodes, n._excludedEdges = this._excludedEdges, n._sortErrors = this._sortErrors, n;
  }
  concat(t) {
    let n = super.concat(t), r = n.fields;
    for (let [i, a] of Object.entries(this.fields)) {
      const o = r[i];
      o === void 0 ? r[i] = a : o instanceof me && a instanceof me && (r[i] = a.concat(o));
    }
    return n.withMutation(() => n.shape(r));
  }
  getDefaultFromShape() {
    let t = {};
    return this._nodes.forEach((n) => {
      const r = this.fields[n];
      t[n] = "default" in r ? r.getDefault() : void 0;
    }), t;
  }
  _getDefault() {
    if ("default" in this.spec)
      return super._getDefault();
    if (this._nodes.length)
      return this.getDefaultFromShape();
  }
  shape(t, n = []) {
    let r = this.clone(), i = Object.assign(r.fields, t);
    if (r.fields = i, r._sortErrors = os(Object.keys(i)), n.length) {
      Array.isArray(n[0]) || (n = [n]);
      let a = n.map(([o, s]) => `${o}-${s}`);
      r._excludedEdges = r._excludedEdges.concat(a);
    }
    return r._nodes = Ap(i, r._excludedEdges), r;
  }
  pick(t) {
    const n = {};
    for (const r of t)
      this.fields[r] && (n[r] = this.fields[r]);
    return this.clone().withMutation((r) => (r.fields = {}, r.shape(n)));
  }
  omit(t) {
    const n = this.clone(), r = n.fields;
    n.fields = {};
    for (const i of t)
      delete r[i];
    return n.withMutation(() => n.shape(r));
  }
  from(t, n, r) {
    let i = Vn.getter(t, !0);
    return this.transform((a) => {
      if (a == null) return a;
      let o = a;
      return bn(a, t) && (o = Et({}, a), r || delete o[t], o[n] = i(a)), o;
    });
  }
  noUnknown(t = !0, n = Jr.noUnknown) {
    typeof t == "string" && (n = t, t = !0);
    let r = this.test({
      name: "noUnknown",
      exclusive: !0,
      message: n,
      test(i) {
        if (i == null) return !0;
        const a = Tp(this.schema, i);
        return !t || a.length === 0 || this.createError({
          params: {
            unknown: a.join(", ")
          }
        });
      }
    });
    return r.spec.noUnknown = t, r;
  }
  unknown(t = !0, n = Jr.noUnknown) {
    return this.noUnknown(!t, n);
  }
  transformKeys(t) {
    return this.transform((n) => n && Ru(n, (r, i) => t(i)));
  }
  camelCase() {
    return this.transformKeys(Cu);
  }
  snakeCase() {
    return this.transformKeys(no);
  }
  constantCase() {
    return this.transformKeys((t) => no(t).toUpperCase());
  }
  describe() {
    let t = super.describe();
    return t.fields = $a(this.fields, (n) => n.describe()), t;
  }
}
function ss(e) {
  return new as(e);
}
ss.prototype = as.prototype;
function Cn() {
  return Cn = Object.assign || function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Cn.apply(this, arguments);
}
function cs(e) {
  return new us(e);
}
class us extends me {
  constructor(t) {
    super({
      type: "array"
    }), this.innerType = t, this.withMutation(() => {
      this.transform(function(n) {
        if (typeof n == "string") try {
          n = JSON.parse(n);
        } catch {
          n = null;
        }
        return this.isType(n) ? n : null;
      });
    });
  }
  _typeCheck(t) {
    return Array.isArray(t);
  }
  get _subType() {
    return this.innerType;
  }
  _cast(t, n) {
    const r = super._cast(t, n);
    if (!this._typeCheck(r) || !this.innerType) return r;
    let i = !1;
    const a = r.map((o, s) => {
      const c = this.innerType.cast(o, Cn({}, n, {
        path: `${n.path || ""}[${s}]`
      }));
      return c !== o && (i = !0), c;
    });
    return i ? a : r;
  }
  _validate(t, n = {}, r) {
    var i, a;
    let o = [];
    n.sync;
    let s = n.path, c = this.innerType, f = (i = n.abortEarly) != null ? i : this.spec.abortEarly, u = (a = n.recursive) != null ? a : this.spec.recursive, l = n.originalValue != null ? n.originalValue : t;
    super._validate(t, n, (p, d) => {
      if (p) {
        if (!de.isError(p) || f)
          return void r(p, d);
        o.push(p);
      }
      if (!u || !c || !this._typeCheck(d)) {
        r(o[0] || null, d);
        return;
      }
      l = l || d;
      let h = new Array(d.length);
      for (let m = 0; m < d.length; m++) {
        let g = d[m], w = `${n.path || ""}[${m}]`, S = Cn({}, n, {
          path: w,
          strict: !0,
          parent: d,
          index: m,
          originalValue: l[m]
        });
        h[m] = (x, C) => c.validate(g, S, C);
      }
      _n({
        path: s,
        value: d,
        errors: o,
        endEarly: f,
        tests: h
      }, r);
    });
  }
  clone(t) {
    const n = super.clone(t);
    return n.innerType = this.innerType, n;
  }
  concat(t) {
    let n = super.concat(t);
    return n.innerType = this.innerType, t.innerType && (n.innerType = n.innerType ? (
      // @ts-expect-error Lazy doesn't have concat()
      n.innerType.concat(t.innerType)
    ) : t.innerType), n;
  }
  of(t) {
    let n = this.clone();
    if (!Qn(t)) throw new TypeError("`array.of()` sub-schema must be a valid yup schema not: " + Tt(t));
    return n.innerType = t, n;
  }
  length(t, n = pn.length) {
    return this.test({
      message: n,
      name: "length",
      exclusive: !0,
      params: {
        length: t
      },
      test(r) {
        return ge(r) || r.length === this.resolve(t);
      }
    });
  }
  min(t, n) {
    return n = n || pn.min, this.test({
      message: n,
      name: "min",
      exclusive: !0,
      params: {
        min: t
      },
      // FIXME(ts): Array<typeof T>
      test(r) {
        return ge(r) || r.length >= this.resolve(t);
      }
    });
  }
  max(t, n) {
    return n = n || pn.max, this.test({
      message: n,
      name: "max",
      exclusive: !0,
      params: {
        max: t
      },
      test(r) {
        return ge(r) || r.length <= this.resolve(t);
      }
    });
  }
  ensure() {
    return this.default(() => []).transform((t, n) => this._typeCheck(t) ? t : n == null ? [] : [].concat(n));
  }
  compact(t) {
    let n = t ? (r, i, a) => !t(r, i, a) : (r) => !!r;
    return this.transform((r) => r != null ? r.filter(n) : r);
  }
  describe() {
    let t = super.describe();
    return this.innerType && (t.innerType = this.innerType.describe()), t;
  }
  nullable(t = !0) {
    return super.nullable(t);
  }
  defined() {
    return super.defined();
  }
  required(t) {
    return super.required(t);
  }
}
cs.prototype = us.prototype;
function Rp(e) {
  Object.keys(e).forEach((t) => {
    Object.keys(e[t]).forEach((n) => {
      Yf[t][n] = e[t][n];
    });
  });
}
function lt(e, t, n) {
  if (!e || !Qn(e.prototype)) throw new TypeError("You must provide a yup schema constructor function");
  if (typeof t != "string") throw new TypeError("A Method name must be provided");
  if (typeof n != "function") throw new TypeError("Method function must be provided");
  e.prototype[t] = n;
}
var Fp = { exports: {} };
/*!
 * depd
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
var $p = Ip;
function Ip(e) {
  if (!e)
    throw new TypeError("argument namespace is required");
  function t(n) {
  }
  return t._file = void 0, t._ignored = !0, t._namespace = e, t._traced = !1, t._warned = /* @__PURE__ */ Object.create(null), t.function = Op, t.property = Np, t;
}
function Op(e, t) {
  if (typeof e != "function")
    throw new TypeError("argument fn must be a function");
  return e;
}
function Np(e, t, n) {
  if (!e || typeof e != "object" && typeof e != "function")
    throw new TypeError("argument obj must be object");
  var r = Object.getOwnPropertyDescriptor(e, t);
  if (!r)
    throw new TypeError("must call property on owner object");
  if (!r.configurable)
    throw new TypeError("property must be configurable");
}
var Pp = Object.setPrototypeOf || ({ __proto__: [] } instanceof Array ? Lp : kp);
function Lp(e, t) {
  return e.__proto__ = t, e;
}
function kp(e, t) {
  for (var n in t)
    Object.prototype.hasOwnProperty.call(e, n) || (e[n] = t[n]);
  return e;
}
const Dp = {
  100: "Continue",
  101: "Switching Protocols",
  102: "Processing",
  103: "Early Hints",
  200: "OK",
  201: "Created",
  202: "Accepted",
  203: "Non-Authoritative Information",
  204: "No Content",
  205: "Reset Content",
  206: "Partial Content",
  207: "Multi-Status",
  208: "Already Reported",
  226: "IM Used",
  300: "Multiple Choices",
  301: "Moved Permanently",
  302: "Found",
  303: "See Other",
  304: "Not Modified",
  305: "Use Proxy",
  307: "Temporary Redirect",
  308: "Permanent Redirect",
  400: "Bad Request",
  401: "Unauthorized",
  402: "Payment Required",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  406: "Not Acceptable",
  407: "Proxy Authentication Required",
  408: "Request Timeout",
  409: "Conflict",
  410: "Gone",
  411: "Length Required",
  412: "Precondition Failed",
  413: "Payload Too Large",
  414: "URI Too Long",
  415: "Unsupported Media Type",
  416: "Range Not Satisfiable",
  417: "Expectation Failed",
  418: "I'm a Teapot",
  421: "Misdirected Request",
  422: "Unprocessable Entity",
  423: "Locked",
  424: "Failed Dependency",
  425: "Too Early",
  426: "Upgrade Required",
  428: "Precondition Required",
  429: "Too Many Requests",
  431: "Request Header Fields Too Large",
  451: "Unavailable For Legal Reasons",
  500: "Internal Server Error",
  501: "Not Implemented",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
  505: "HTTP Version Not Supported",
  506: "Variant Also Negotiates",
  507: "Insufficient Storage",
  508: "Loop Detected",
  509: "Bandwidth Limit Exceeded",
  510: "Not Extended",
  511: "Network Authentication Required"
};
/*!
 * statuses
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var yi = Dp, Mp = Ie;
Ie.message = yi;
Ie.code = jp(yi);
Ie.codes = Hp(yi);
Ie.redirect = {
  300: !0,
  301: !0,
  302: !0,
  303: !0,
  305: !0,
  307: !0,
  308: !0
};
Ie.empty = {
  204: !0,
  205: !0,
  304: !0
};
Ie.retry = {
  502: !0,
  503: !0,
  504: !0
};
function jp(e) {
  var t = {};
  return Object.keys(e).forEach(function(r) {
    var i = e[r], a = Number(r);
    t[i.toLowerCase()] = a;
  }), t;
}
function Hp(e) {
  return Object.keys(e).map(function(n) {
    return Number(n);
  });
}
function Bp(e) {
  var t = e.toLowerCase();
  if (!Object.prototype.hasOwnProperty.call(Ie.code, t))
    throw new Error('invalid status message: "' + e + '"');
  return Ie.code[t];
}
function po(e) {
  if (!Object.prototype.hasOwnProperty.call(Ie.message, e))
    throw new Error("invalid status code: " + e);
  return Ie.message[e];
}
function Ie(e) {
  if (typeof e == "number")
    return po(e);
  if (typeof e != "string")
    throw new TypeError("code must be a number or string");
  var t = parseInt(e, 10);
  return isNaN(t) ? Bp(e) : po(t);
}
var ni = { exports: {} };
typeof Object.create == "function" ? ni.exports = function(t, n) {
  n && (t.super_ = n, t.prototype = Object.create(n.prototype, {
    constructor: {
      value: t,
      enumerable: !1,
      writable: !0,
      configurable: !0
    }
  }));
} : ni.exports = function(t, n) {
  if (n) {
    t.super_ = n;
    var r = function() {
    };
    r.prototype = n.prototype, t.prototype = new r(), t.prototype.constructor = t;
  }
};
var Up = ni.exports;
/*!
 * toidentifier
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
var Gp = qp;
function qp(e) {
  return e.split(" ").map(function(t) {
    return t.slice(0, 1).toUpperCase() + t.slice(1);
  }).join("").replace(/[^ _0-9a-z]/gi, "");
}
/*!
 * http-errors
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2016 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  $p("http-errors");
  var t = Pp, n = Mp, r = Up, i = Gp;
  e.exports = o, e.exports.HttpError = s(), e.exports.isHttpError = f(e.exports.HttpError), p(e.exports, n.codes, e.exports.HttpError);
  function a(h) {
    return +(String(h).charAt(0) + "00");
  }
  function o() {
    for (var h, m, g = 500, w = {}, S = 0; S < arguments.length; S++) {
      var x = arguments[S], C = typeof x;
      if (C === "object" && x instanceof Error)
        h = x, g = h.status || h.statusCode || g;
      else if (C === "number" && S === 0)
        g = x;
      else if (C === "string")
        m = x;
      else if (C === "object")
        w = x;
      else
        throw new TypeError("argument #" + (S + 1) + " unsupported type " + C);
    }
    (typeof g != "number" || !n.message[g] && (g < 400 || g >= 600)) && (g = 500);
    var T = o[g] || o[a(g)];
    h || (h = T ? new T(m) : new Error(m || n.message[g]), Error.captureStackTrace(h, o)), (!T || !(h instanceof T) || h.status !== g) && (h.expose = g < 500, h.status = h.statusCode = g);
    for (var I in w)
      I !== "status" && I !== "statusCode" && (h[I] = w[I]);
    return h;
  }
  function s() {
    function h() {
      throw new TypeError("cannot construct abstract class");
    }
    return r(h, Error), h;
  }
  function c(h, m, g) {
    var w = d(m);
    function S(x) {
      var C = x ?? n.message[g], T = new Error(C);
      return Error.captureStackTrace(T, S), t(T, S.prototype), Object.defineProperty(T, "message", {
        enumerable: !0,
        configurable: !0,
        value: C,
        writable: !0
      }), Object.defineProperty(T, "name", {
        enumerable: !1,
        configurable: !0,
        value: w,
        writable: !0
      }), T;
    }
    return r(S, h), l(S, w), S.prototype.status = g, S.prototype.statusCode = g, S.prototype.expose = !0, S;
  }
  function f(h) {
    return function(g) {
      return !g || typeof g != "object" ? !1 : g instanceof h ? !0 : g instanceof Error && typeof g.expose == "boolean" && typeof g.statusCode == "number" && g.status === g.statusCode;
    };
  }
  function u(h, m, g) {
    var w = d(m);
    function S(x) {
      var C = x ?? n.message[g], T = new Error(C);
      return Error.captureStackTrace(T, S), t(T, S.prototype), Object.defineProperty(T, "message", {
        enumerable: !0,
        configurable: !0,
        value: C,
        writable: !0
      }), Object.defineProperty(T, "name", {
        enumerable: !1,
        configurable: !0,
        value: w,
        writable: !0
      }), T;
    }
    return r(S, h), l(S, w), S.prototype.status = g, S.prototype.statusCode = g, S.prototype.expose = !1, S;
  }
  function l(h, m) {
    var g = Object.getOwnPropertyDescriptor(h, "name");
    g && g.configurable && (g.value = m, Object.defineProperty(h, "name", g));
  }
  function p(h, m, g) {
    m.forEach(function(S) {
      var x, C = i(n.message[S]);
      switch (a(S)) {
        case 400:
          x = c(g, C, S);
          break;
        case 500:
          x = u(g, C, S);
          break;
      }
      x && (h[S] = x, h[C] = x);
    });
  }
  function d(h) {
    return h.substr(-5) !== "Error" ? h + "Error" : h;
  }
})(Fp);
class Kp extends Error {
  constructor(t = "An application error occurred", n = {}) {
    super(), this.name = "ApplicationError", this.message = t, this.details = n;
  }
}
class kt extends Kp {
  constructor(t = "Entity not found", n) {
    super(t, n), this.name = "NotFoundError", this.message = t;
  }
}
const Wp = [
  "$and",
  "$or"
], zp = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$eqi",
  "$ne",
  "$nei",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$null",
  "$notNull",
  "$between",
  "$startsWith",
  "$endsWith",
  "$startsWithi",
  "$endsWithi",
  "$contains",
  "$notContains",
  "$containsi",
  "$notContainsi",
  // Experimental, only for internal use
  "$jsonSupersetOf"
], Yp = [
  "$not",
  "$in",
  "$notIn",
  "$eq",
  "$ne",
  "$gt",
  "$gte",
  "$lt",
  "$lte",
  "$between"
], Qp = [
  "$in",
  "$notIn",
  "$between"
], Rn = {
  where: zp,
  cast: Yp,
  group: Wp,
  array: Qp
}, Vp = Object.fromEntries(Object.entries(Rn).map(([e, t]) => [
  e,
  t.map((n) => n.toLowerCase())
])), Xp = (e, t) => e in t, Zp = (e, t, n = !1) => n ? Vp[e]?.includes(t.toLowerCase()) ?? !1 : Xp(e, Rn) ? Rn[e]?.includes(t) ?? !1 : !1, Jp = (e, t = !1) => Object.keys(Rn).some((n) => Zp(n, e, t));
var ed = (e, t = 1, n) => {
  if (n = {
    indent: " ",
    includeEmptyLines: !1,
    ...n
  }, typeof e != "string")
    throw new TypeError(
      `Expected \`input\` to be a \`string\`, got \`${typeof e}\``
    );
  if (typeof t != "number")
    throw new TypeError(
      `Expected \`count\` to be a \`number\`, got \`${typeof t}\``
    );
  if (typeof n.indent != "string")
    throw new TypeError(
      `Expected \`options.indent\` to be a \`string\`, got \`${typeof n.indent}\``
    );
  if (t === 0)
    return e;
  const r = n.includeEmptyLines ? /^/gm : /^(?!\s*$)/gm;
  return e.replace(r, n.indent.repeat(t));
};
const ho = zn, mo = /\s+at.*(?:\(|\s)(.*)\)?/, td = /^(?:(?:(?:node|(?:internal\/[\w/]*|.*node_modules\/(?:babel-polyfill|pirates)\/.*)?\w+)\.js:\d+:\d+)|native)/, nd = typeof ho.homedir > "u" ? "" : ho.homedir();
var rd = (e, t) => (t = Object.assign({ pretty: !1 }, t), e.replace(/\\/g, "/").split(`
`).filter((n) => {
  const r = n.match(mo);
  if (r === null || !r[1])
    return !0;
  const i = r[1];
  return i.includes(".app/Contents/Resources/electron.asar") || i.includes(".app/Contents/Resources/default_app.asar") ? !1 : !td.test(i);
}).filter((n) => n.trim() !== "").map((n) => t.pretty ? n.replace(mo, (r, i) => r.replace(i, i.replace(nd, "~"))) : n).join(`
`));
const id = ed, od = rd, ad = (e) => e.replace(/\s+at .*aggregate-error\/index.js:\d+:\d+\)?/g, "");
let sd = class extends Error {
  constructor(t) {
    if (!Array.isArray(t))
      throw new TypeError(`Expected input to be an Array, got ${typeof t}`);
    t = [...t].map((r) => r instanceof Error ? r : r !== null && typeof r == "object" ? Object.assign(new Error(r.message), r) : new Error(r));
    let n = t.map((r) => typeof r.stack == "string" ? ad(od(r.stack)) : String(r)).join(`
`);
    n = `
` + id(n, 4), super(n), this.name = "AggregateError", Object.defineProperty(this, "_errors", { value: t });
  }
  *[Symbol.iterator]() {
    for (const t of this._errors)
      yield t;
  }
};
var cd = sd;
const ud = cd;
var ld = async (e, t, {
  concurrency: n = 1 / 0,
  stopOnError: r = !0
} = {}) => new Promise((i, a) => {
  if (typeof t != "function")
    throw new TypeError("Mapper function is required");
  if (!((Number.isSafeInteger(n) || n === 1 / 0) && n >= 1))
    throw new TypeError(`Expected \`concurrency\` to be an integer from 1 and up or \`Infinity\`, got \`${n}\` (${typeof n})`);
  const o = [], s = [], c = e[Symbol.iterator]();
  let f = !1, u = !1, l = 0, p = 0;
  const d = () => {
    if (f)
      return;
    const h = c.next(), m = p;
    if (p++, h.done) {
      u = !0, l === 0 && (!r && s.length !== 0 ? a(new ud(s)) : i(o));
      return;
    }
    l++, (async () => {
      try {
        const g = await h.value;
        o[m] = await t(g, m), l--, d();
      } catch (g) {
        r ? (f = !0, a(g)) : (s.push(g), l--, d());
      }
    })();
  };
  for (let h = 0; h < n && (d(), !u); h++)
    ;
});
const fd = /* @__PURE__ */ Xa(ld);
function Zn(...e) {
  const [t, ...n] = e;
  return async (...r) => {
    let i = await t.apply(t, r);
    for (let a = 0; a < n.length; a += 1)
      i = await n[a](i);
    return i;
  };
}
De(fd);
const Jn = ({ key: e, attribute: t }, { remove: n }) => {
  t?.type === "password" && n(e);
}, Kt = ({ schema: e, key: t, attribute: n }, { remove: r }) => {
  if (!n)
    return;
  (n.private === !0 || Pf(e, t)) && r(t);
}, ls = ({ key: e, attribute: t }, { remove: n }) => {
  Va(t) && n(e);
}, fs = ({ key: e, attribute: t }, { remove: n }) => {
  kf(t) && n(e);
}, pd = ({ schema: e, key: t, value: n }, { set: r }) => {
  if (t === "" && n === "*") {
    const { attributes: i } = e, a = Object.entries(i).filter(([, o]) => [
      "relation",
      "component",
      "media",
      "dynamiczone"
    ].includes(o.type)).reduce((o, [s]) => ({
      ...o,
      [s]: !0
    }), {});
    r("", a);
  }
}, dd = {
  raw: null,
  attribute: null
};
var er = (() => {
  const e = {
    parsers: [],
    interceptors: [],
    ignore: [],
    handlers: {
      attributes: [],
      common: []
    }
  }, t = async (n, r, i) => {
    const { path: a = dd, parent: o, schema: s, getModel: c } = r ?? {};
    for (const { predicate: d, handler: h } of e.interceptors)
      if (d(i))
        return h(n, r, i, {
          recurse: t
        });
    const f = e.parsers.find((d) => d.predicate(i))?.parser, u = f?.(i);
    if (!u)
      return i;
    let l = u.transform(i);
    const p = u.keys(l);
    for (const d of p) {
      const h = s?.attributes?.[d], m = {
        ...a
      };
      m.raw = X(a.raw) ? d : `${a.raw}.${d}`, X(h) || (m.attribute = X(a.attribute) ? d : `${a.attribute}.${d}`);
      const g = {
        key: d,
        value: u.get(d, l),
        attribute: h,
        schema: s,
        path: m,
        data: l,
        getModel: c,
        parent: o
      }, w = {
        remove(k) {
          l = u.remove(k, l);
        },
        set(k, A) {
          l = u.set(k, A, l);
        },
        recurse: t
      };
      await n(g, Ji([
        "remove",
        "set"
      ], w));
      const S = u.get(d, l), x = () => ({
        key: d,
        value: S,
        attribute: h,
        schema: s,
        path: m,
        data: l,
        visitor: n,
        getModel: c,
        parent: o
      }), C = x();
      if (e.ignore.some((k) => k(C)))
        continue;
      const I = [
        ...e.handlers.common,
        ...e.handlers.attributes
      ];
      for await (const k of I) {
        const A = x();
        await k.predicate(A) && await k.handler(A, Ji([
          "recurse",
          "set"
        ], w));
      }
    }
    return l;
  };
  return {
    traverse: t,
    intercept(n, r) {
      return e.interceptors.push({
        predicate: n,
        handler: r
      }), this;
    },
    parse(n, r) {
      return e.parsers.push({
        predicate: n,
        parser: r
      }), this;
    },
    ignore(n) {
      return e.ignore.push(n), this;
    },
    on(n, r) {
      return e.handlers.common.push({
        predicate: n,
        handler: r
      }), this;
    },
    onAttribute(n, r) {
      return e.handlers.attributes.push({
        predicate: n,
        handler: r
      }), this;
    },
    onRelation(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "relation", n);
    },
    onMedia(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "media", n);
    },
    onComponent(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "component", n);
    },
    onDynamicZone(n) {
      return this.onAttribute(({ attribute: r }) => r?.type === "dynamiczone", n);
    }
  };
});
const hd = (e) => $e(e), md = er().intercept(
  // Intercept filters arrays and apply the traversal to each one individually
  We,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i, a) => {
    const o = t.path ? {
      ...t.path,
      raw: `${t.path.raw}[${a}]`
    } : t.path;
    return r(e, {
      ...t,
      path: o
    }, i);
  })).then((i) => i.filter((a) => !($e(a) && ze(a))))
).intercept(
  // Ignore non object filters and return the value as-is
  (e) => !$e(e),
  (e, t, n) => n
).parse(hd, () => ({
  transform: fi,
  remove(e, t) {
    return Eu(e, t);
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).ignore(({ value: e }) => X(e)).on(({ attribute: e }) => X(e), async ({ key: e, visitor: t, path: n, value: r, schema: i, getModel: a, attribute: o }, { set: s, recurse: c }) => {
  s(e, await c(t, {
    schema: i,
    path: n,
    getModel: a,
    parent: {
      key: e,
      path: n,
      schema: i,
      attribute: o
    }
  }, r));
}).onRelation(async ({ key: e, attribute: t, visitor: n, path: r, value: i, schema: a, getModel: o }, { set: s, recurse: c }) => {
  if (t.relation.toLowerCase().startsWith("morph"))
    return;
  const u = {
    key: e,
    path: r,
    schema: a,
    attribute: t
  }, l = t.target, p = o(l), d = await c(n, {
    schema: p,
    path: r,
    getModel: o,
    parent: u
  }, i);
  s(e, d);
}).onComponent(async ({ key: e, attribute: t, visitor: n, path: r, schema: i, value: a, getModel: o }, { set: s, recurse: c }) => {
  const f = {
    key: e,
    path: r,
    schema: i,
    attribute: t
  }, u = o(t.component), l = await c(n, {
    schema: u,
    path: r,
    getModel: o,
    parent: f
  }, a);
  s(e, l);
}).onMedia(async ({ key: e, visitor: t, path: n, schema: r, attribute: i, value: a, getModel: o }, { set: s, recurse: c }) => {
  const f = {
    key: e,
    path: n,
    schema: r,
    attribute: i
  }, l = o("plugin::upload.file"), p = await c(t, {
    schema: l,
    path: n,
    getModel: o,
    parent: f
  }, a);
  s(e, p);
});
var ft = De(md.traverse);
const gd = {
  asc: "asc",
  desc: "desc"
}, yd = Object.values(gd), vd = (e) => yd.includes(e.toLowerCase()), wd = (e) => Array.isArray(e) && e.every(Ue), Ed = (e) => Array.isArray(e) && e.every($e), bd = (e) => Ue(e) && e.split(",").length > 1, Sd = (e) => $e(e), xd = er().intercept(
  // String with chained sorts (foo,bar,foobar) => split, map(recurse), then recompose
  bd,
  async (e, t, n, { recurse: r }) => Promise.all(n.split(",").map(wn).map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)).join(","))
).intercept(
  // Array of strings ['foo', 'foo,bar'] => map(recurse), then filter out empty items
  wd,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)))
).intercept(
  // Array of objects [{ foo: 'asc' }, { bar: 'desc', baz: 'asc' }] => map(recurse), then filter out empty items
  Ed,
  async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i))).then((i) => i.filter((a) => !ze(a)))
).parse(Ue, () => {
  const e = bu(Hr("."), Su(Hr(":")), xu), t = (n) => {
    if (n.length !== 0)
      return n.reduce((r, i) => ze(i) ? r : r === "" ? i : vd(i) ? `${r}:${i}` : `${r}.${i}`, "");
  };
  return {
    transform: wn,
    remove(n, r) {
      const [i] = e(r);
      return i === n ? void 0 : r;
    },
    set(n, r, i) {
      const [a] = e(i);
      return a !== n ? i : X(r) ? a : `${a}.${r}`;
    },
    keys(n) {
      const r = Fa(e(n));
      return r ? [
        r
      ] : [];
    },
    get(n, r) {
      const [i, ...a] = e(r);
      return n === i ? t(a) : void 0;
    }
  };
}).parse(Sd, () => ({
  transform: fi,
  remove(e, t) {
    const { [e]: n, ...r } = t;
    return r;
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).onRelation(async ({ key: e, value: t, attribute: n, visitor: r, path: i, getModel: a, schema: o }, { set: s, recurse: c }) => {
  if (n.relation.toLowerCase().startsWith("morph"))
    return;
  const u = {
    key: e,
    path: i,
    schema: o,
    attribute: n
  }, l = n.target, p = a(l), d = await c(r, {
    schema: p,
    path: i,
    getModel: a,
    parent: u
  }, t);
  s(e, d);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: r, visitor: i, value: a, getModel: o }, { recurse: s, set: c }) => {
  const f = {
    key: e,
    path: t,
    schema: n,
    attribute: r
  }, l = o("plugin::upload.file"), p = await s(i, {
    schema: l,
    path: t,
    getModel: o,
    parent: f
  }, a);
  c(e, p);
}).onComponent(async ({ key: e, value: t, visitor: n, path: r, schema: i, attribute: a, getModel: o }, { recurse: s, set: c }) => {
  const f = {
    key: e,
    path: r,
    schema: i,
    attribute: a
  }, u = o(a.component), l = await s(n, {
    schema: u,
    path: r,
    getModel: o,
    parent: f
  }, t);
  c(e, l);
});
var pt = De(xd.traverse);
const go = (e) => ({ key: t, attribute: n }) => !n && e === t, ps = (e) => e === "*", _d = (e) => Ue(e) && !ps(e), Ad = (e) => We(e) && e.every(Ue), yo = (e) => $e(e), Td = er().intercept(_d, async (e, t, n, { recurse: r }) => {
  const i = Rd([
    n
  ]), a = await r(e, t, i), [o] = Cd(a);
  return o;
}).intercept(Ad, async (e, t, n, { recurse: r }) => (await Promise.all(n.map((a) => r(e, t, a)))).filter((a) => !X(a))).parse(ps, () => ({
  /**
  * Since value is '*', we don't need to transform it
  */
  transform: _u,
  /**
  * '*' isn't a key/value structure, so regardless
  *  of the given key, it returns the data ('*')
  */
  get: (e, t) => t,
  /**
  * '*' isn't a key/value structure, so regardless
  * of the given `key`, use `value` as the new `data`
  */
  set: (e, t) => t,
  /**
  * '*' isn't a key/value structure, but we need to simulate at least one to enable
  * the data traversal. We're using '' since it represents a falsy string value
  */
  keys: Br([
    ""
  ]),
  /**
  * Removing '*' means setting it to undefined, regardless of the given key
  */
  remove: Br(void 0)
})).parse(Ue, () => {
  const e = Hr("."), t = Au(".");
  return {
    transform: wn,
    remove(n, r) {
      const [i] = e(r);
      return i === n ? void 0 : r;
    },
    set(n, r, i) {
      const [a] = e(i);
      return a !== n ? i : X(r) || ze(r) ? a : `${a}.${r}`;
    },
    keys(n) {
      const r = Fa(e(n));
      return r ? [
        r
      ] : [];
    },
    get(n, r) {
      const [i, ...a] = e(r);
      return n === i ? t(a) : void 0;
    }
  };
}).parse(yo, () => ({
  transform: fi,
  remove(e, t) {
    const { [e]: n, ...r } = t;
    return r;
  },
  set(e, t, n) {
    return {
      ...n,
      [e]: t
    };
  },
  keys(e) {
    return Object.keys(e);
  },
  get(e, t) {
    return t[e];
  }
})).ignore(({ key: e, attribute: t }) => [
  "sort",
  "filters",
  "fields"
].includes(e) && !t).on(
  // Handle recursion on populate."populate"
  go("populate"),
  async ({ key: e, visitor: t, path: n, value: r, schema: i, getModel: a, attribute: o }, { set: s, recurse: c }) => {
    const u = await c(t, {
      schema: i,
      path: n,
      getModel: a,
      parent: {
        key: e,
        path: n,
        schema: i,
        attribute: o
      }
    }, r);
    s(e, u);
  }
).on(go("on"), async ({ key: e, visitor: t, path: n, value: r, getModel: i, parent: a }, { set: o, recurse: s }) => {
  const c = {};
  if (yo(r)) {
    for (const [f, u] of Object.entries(r)) {
      const l = i(f), p = {
        ...n,
        raw: `${n.raw}[${f}]`
      };
      c[f] = await s(t, {
        schema: l,
        path: p,
        getModel: i,
        parent: a
      }, u);
    }
    o(e, c);
  }
}).onRelation(async ({ key: e, value: t, attribute: n, visitor: r, path: i, schema: a, getModel: o }, { set: s, recurse: c }) => {
  if (X(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: a,
    attribute: n
  };
  if (Va(n)) {
    if (!$e(t) || !("on" in t && $e(t?.on)))
      return;
    const d = await c(r, {
      schema: a,
      path: i,
      getModel: o,
      parent: f
    }, {
      on: t?.on
    });
    s(e, d);
    return;
  }
  const u = n.target, l = o(u), p = await c(r, {
    schema: l,
    path: i,
    getModel: o,
    parent: f
  }, t);
  s(e, p);
}).onMedia(async ({ key: e, path: t, schema: n, attribute: r, visitor: i, value: a, getModel: o }, { recurse: s, set: c }) => {
  if (X(a))
    return;
  const f = {
    key: e,
    path: t,
    schema: n,
    attribute: r
  }, l = o("plugin::upload.file"), p = await s(i, {
    schema: l,
    path: t,
    getModel: o,
    parent: f
  }, a);
  c(e, p);
}).onComponent(async ({ key: e, value: t, schema: n, visitor: r, path: i, attribute: a, getModel: o }, { recurse: s, set: c }) => {
  if (X(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: n,
    attribute: a
  }, u = o(a.component), l = await s(r, {
    schema: u,
    path: i,
    getModel: o,
    parent: f
  }, t);
  c(e, l);
}).onDynamicZone(async ({ key: e, value: t, schema: n, visitor: r, path: i, attribute: a, getModel: o }, { set: s, recurse: c }) => {
  if (X(t) || !$e(t))
    return;
  const f = {
    key: e,
    path: i,
    schema: n,
    attribute: a
  };
  if ("on" in t && t.on) {
    const u = await c(r, {
      schema: n,
      path: i,
      getModel: o,
      parent: f
    }, {
      on: t.on
    });
    s(e, u);
  }
});
var vr = De(Td.traverse);
const Cd = (e) => {
  const t = [];
  function n(r, i) {
    for (const [a, o] of Object.entries(r)) {
      const s = i ? `${i}.${a}` : a;
      o === !0 ? t.push(s) : n(o.populate, s);
    }
  }
  return n(e, ""), t;
}, Rd = (e) => {
  const t = {};
  function n(r, i) {
    const [a, ...o] = i;
    o.length === 0 ? r[a] = !0 : ((!r[a] || typeof r[a] == "boolean") && (r[a] = {
      populate: {}
    }), n(r[a].populate, o));
  }
  return e.forEach((r) => n(t, r.split("."))), t;
}, Fd = (e) => We(e) && e.every(Ue), $d = er().intercept(Fd, async (e, t, n, { recurse: r }) => Promise.all(n.map((i) => r(e, t, i)))).intercept((e) => Ue(e) && e.includes(","), (e, t, n, { recurse: r }) => Promise.all(n.split(",").map((i) => r(e, t, i)))).intercept((e) => Tu("*", e), Br("*")).parse(Ue, () => ({
  transform: wn,
  remove(e, t) {
    return t === e ? void 0 : t;
  },
  set(e, t, n) {
    return n;
  },
  keys(e) {
    return [
      e
    ];
  },
  get(e, t) {
    return e === t ? t : void 0;
  }
}));
var wr = De($d.traverse);
const { ID_ATTRIBUTE: Fn, DOC_ID_ATTRIBUTE: $n } = Of, Id = async (e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeOutput");
  return Mf((...n) => {
    Jn(...n), Kt(...n);
  }, e, t);
}, Od = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFilters");
  return Zn(
    // Remove keys that are not attributes or valid operators
    ft(({ key: n, attribute: r }, { remove: i }) => {
      const a = !!r;
      [
        Fn,
        $n
      ].includes(n) || !a && !Jp(n) && i(n);
    }, e),
    // Remove dynamic zones from filters
    ft(fs, e),
    // Remove morpTo relations from filters
    ft(ls, e),
    // Remove passwords from filters
    ft(Jn, e),
    // Remove private from filters
    ft(Kt, e),
    // Remove empty objects
    ft(({ key: n, value: r }, { remove: i }) => {
      $e(r) && ze(r) && i(n);
    }, e)
  )(t);
}), Nd = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeSort");
  return Zn(
    // Remove non attribute keys
    pt(({ key: n, attribute: r }, { remove: i }) => {
      [
        Fn,
        $n
      ].includes(n) || r || i(n);
    }, e),
    // Remove dynamic zones from sort
    pt(fs, e),
    // Remove morpTo relations from sort
    pt(ls, e),
    // Remove private from sort
    pt(Kt, e),
    // Remove passwords from filters
    pt(Jn, e),
    // Remove keys for empty non-scalar values
    pt(({ key: n, attribute: r, value: i }, { remove: a }) => {
      [
        Fn,
        $n
      ].includes(n) || !Ya(r) && ze(i) && a(n);
    }, e)
  )(t);
}), Pd = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizeFields");
  return Zn(
    // Only keep scalar attributes
    wr(({ key: n, attribute: r }, { remove: i }) => {
      [
        Fn,
        $n
      ].includes(n) || (X(r) || !Ya(r)) && i(n);
    }, e),
    // Remove private fields
    wr(Kt, e),
    // Remove password fields
    wr(Jn, e),
    // Remove nil values from fields array
    (n) => We(n) ? n.filter((r) => !X(r)) : n
  )(t);
}), Ld = De((e, t) => {
  if (!e.schema)
    throw new Error("Missing schema in defaultSanitizePopulate");
  return Zn(
    vr(pd, e),
    vr(async ({ key: n, value: r, schema: i, attribute: a, getModel: o, path: s }, { set: c }) => {
      if (a)
        return;
      const f = {
        key: n,
        path: s,
        schema: i,
        attribute: a
      };
      n === "sort" && c(n, await Nd({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "filters" && c(n, await Od({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "fields" && c(n, await Pd({
        schema: i,
        getModel: o,
        parent: f
      }, r)), n === "populate" && c(n, await Ld({
        schema: i,
        getModel: o,
        parent: f
      }, r));
    }, e),
    // Remove private fields
    vr(Kt, e)
  )(t);
});
var Wt = { exports: {} }, Ot = { exports: {} }, Er, vo;
function kd() {
  if (vo) return Er;
  vo = 1, Er = r, r.sync = i;
  var e = Xe;
  function t(a, o) {
    var s = o.pathExt !== void 0 ? o.pathExt : process.env.PATHEXT;
    if (!s || (s = s.split(";"), s.indexOf("") !== -1))
      return !0;
    for (var c = 0; c < s.length; c++) {
      var f = s[c].toLowerCase();
      if (f && a.substr(-f.length).toLowerCase() === f)
        return !0;
    }
    return !1;
  }
  function n(a, o, s) {
    return !a.isSymbolicLink() && !a.isFile() ? !1 : t(o, s);
  }
  function r(a, o, s) {
    e.stat(a, function(c, f) {
      s(c, c ? !1 : n(f, a, o));
    });
  }
  function i(a, o) {
    return n(e.statSync(a), a, o);
  }
  return Er;
}
var br, wo;
function Dd() {
  if (wo) return br;
  wo = 1, br = t, t.sync = n;
  var e = Xe;
  function t(a, o, s) {
    e.stat(a, function(c, f) {
      s(c, c ? !1 : r(f, o));
    });
  }
  function n(a, o) {
    return r(e.statSync(a), o);
  }
  function r(a, o) {
    return a.isFile() && i(a, o);
  }
  function i(a, o) {
    var s = a.mode, c = a.uid, f = a.gid, u = o.uid !== void 0 ? o.uid : process.getuid && process.getuid(), l = o.gid !== void 0 ? o.gid : process.getgid && process.getgid(), p = parseInt("100", 8), d = parseInt("010", 8), h = parseInt("001", 8), m = p | d, g = s & h || s & d && f === l || s & p && c === u || s & m && u === 0;
    return g;
  }
  return br;
}
var In;
process.platform === "win32" || ve.TESTING_WINDOWS ? In = kd() : In = Dd();
var Md = vi;
vi.sync = jd;
function vi(e, t, n) {
  if (typeof t == "function" && (n = t, t = {}), !n) {
    if (typeof Promise != "function")
      throw new TypeError("callback not provided");
    return new Promise(function(r, i) {
      vi(e, t || {}, function(a, o) {
        a ? i(a) : r(o);
      });
    });
  }
  In(e, t || {}, function(r, i) {
    r && (r.code === "EACCES" || t && t.ignoreErrors) && (r = null, i = !1), n(r, i);
  });
}
function jd(e, t) {
  try {
    return In.sync(e, t || {});
  } catch (n) {
    if (t && t.ignoreErrors || n.code === "EACCES")
      return !1;
    throw n;
  }
}
const vt = process.platform === "win32" || process.env.OSTYPE === "cygwin" || process.env.OSTYPE === "msys", ds = Ee, Hd = vt ? ";" : ":", hs = Md, ms = (e) => Object.assign(new Error(`not found: ${e}`), { code: "ENOENT" }), gs = (e, t) => {
  const n = t.colon || Hd, r = e.match(/\//) || vt && e.match(/\\/) ? [""] : [
    // windows always checks the cwd first
    ...vt ? [process.cwd()] : [],
    ...(t.path || process.env.PATH || /* istanbul ignore next: very unusual */
    "").split(n)
  ], i = vt ? t.pathExt || process.env.PATHEXT || ".EXE;.CMD;.BAT;.COM" : "", a = vt ? i.split(n) : [""];
  return vt && e.indexOf(".") !== -1 && a[0] !== "" && a.unshift(""), {
    pathEnv: r,
    pathExt: a,
    pathExtExe: i
  };
}, ys = (e, t, n) => {
  typeof t == "function" && (n = t, t = {}), t || (t = {});
  const { pathEnv: r, pathExt: i, pathExtExe: a } = gs(e, t), o = [], s = (f) => new Promise((u, l) => {
    if (f === r.length)
      return t.all && o.length ? u(o) : l(ms(e));
    const p = r[f], d = /^".*"$/.test(p) ? p.slice(1, -1) : p, h = ds.join(d, e), m = !d && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + h : h;
    u(c(m, f, 0));
  }), c = (f, u, l) => new Promise((p, d) => {
    if (l === i.length)
      return p(s(u + 1));
    const h = i[l];
    hs(f + h, { pathExt: a }, (m, g) => {
      if (!m && g)
        if (t.all)
          o.push(f + h);
        else
          return p(f + h);
      return p(c(f, u, l + 1));
    });
  });
  return n ? s(0).then((f) => n(null, f), n) : s(0);
}, Bd = (e, t) => {
  t = t || {};
  const { pathEnv: n, pathExt: r, pathExtExe: i } = gs(e, t), a = [];
  for (let o = 0; o < n.length; o++) {
    const s = n[o], c = /^".*"$/.test(s) ? s.slice(1, -1) : s, f = ds.join(c, e), u = !c && /^\.[\\\/]/.test(e) ? e.slice(0, 2) + f : f;
    for (let l = 0; l < r.length; l++) {
      const p = u + r[l];
      try {
        if (hs.sync(p, { pathExt: i }))
          if (t.all)
            a.push(p);
          else
            return p;
      } catch {
      }
    }
  }
  if (t.all && a.length)
    return a;
  if (t.nothrow)
    return null;
  throw ms(e);
};
var Ud = ys;
ys.sync = Bd;
var wi = { exports: {} };
const vs = (e = {}) => {
  const t = e.env || process.env;
  return (e.platform || process.platform) !== "win32" ? "PATH" : Object.keys(t).reverse().find((r) => r.toUpperCase() === "PATH") || "Path";
};
wi.exports = vs;
wi.exports.default = vs;
var ws = wi.exports;
const Eo = Ee, Gd = Ud, qd = ws;
function bo(e, t) {
  const n = e.options.env || process.env, r = process.cwd(), i = e.options.cwd != null, a = i && process.chdir !== void 0 && !process.chdir.disabled;
  if (a)
    try {
      process.chdir(e.options.cwd);
    } catch {
    }
  let o;
  try {
    o = Gd.sync(e.command, {
      path: n[qd({ env: n })],
      pathExt: t ? Eo.delimiter : void 0
    });
  } catch {
  } finally {
    a && process.chdir(r);
  }
  return o && (o = Eo.resolve(i ? e.options.cwd : "", o)), o;
}
function Kd(e) {
  return bo(e) || bo(e, !0);
}
var Wd = Kd, Ei = {};
const ri = /([()\][%!^"`<>&|;, *?])/g;
function zd(e) {
  return e = e.replace(ri, "^$1"), e;
}
function Yd(e, t) {
  return e = `${e}`, e = e.replace(/(?=(\\+?)?)\1"/g, '$1$1\\"'), e = e.replace(/(?=(\\+?)?)\1$/, "$1$1"), e = `"${e}"`, e = e.replace(ri, "^$1"), t && (e = e.replace(ri, "^$1")), e;
}
Ei.command = zd;
Ei.argument = Yd;
var Qd = /^#!(.*)/;
const Vd = Qd;
var Xd = (e = "") => {
  const t = e.match(Vd);
  if (!t)
    return null;
  const [n, r] = t[0].replace(/#! ?/, "").split(" "), i = n.split("/").pop();
  return i === "env" ? r : r ? `${i} ${r}` : i;
};
const Sr = Xe, Zd = Xd;
function Jd(e) {
  const n = Buffer.alloc(150);
  let r;
  try {
    r = Sr.openSync(e, "r"), Sr.readSync(r, n, 0, 150, 0), Sr.closeSync(r);
  } catch {
  }
  return Zd(n.toString());
}
var eh = Jd;
const th = Ee, So = Wd, xo = Ei, nh = eh, rh = process.platform === "win32", ih = /\.(?:com|exe)$/i, oh = /node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;
function ah(e) {
  e.file = So(e);
  const t = e.file && nh(e.file);
  return t ? (e.args.unshift(e.file), e.command = t, So(e)) : e.file;
}
function sh(e) {
  if (!rh)
    return e;
  const t = ah(e), n = !ih.test(t);
  if (e.options.forceShell || n) {
    const r = oh.test(t);
    e.command = th.normalize(e.command), e.command = xo.command(e.command), e.args = e.args.map((a) => xo.argument(a, r));
    const i = [e.command].concat(e.args).join(" ");
    e.args = ["/d", "/s", "/c", `"${i}"`], e.command = process.env.comspec || "cmd.exe", e.options.windowsVerbatimArguments = !0;
  }
  return e;
}
function ch(e, t, n) {
  t && !Array.isArray(t) && (n = t, t = null), t = t ? t.slice(0) : [], n = Object.assign({}, n);
  const r = {
    command: e,
    args: t,
    options: n,
    file: void 0,
    original: {
      command: e,
      args: t
    }
  };
  return n.shell ? r : sh(r);
}
var uh = ch;
const bi = process.platform === "win32";
function Si(e, t) {
  return Object.assign(new Error(`${t} ${e.command} ENOENT`), {
    code: "ENOENT",
    errno: "ENOENT",
    syscall: `${t} ${e.command}`,
    path: e.command,
    spawnargs: e.args
  });
}
function lh(e, t) {
  if (!bi)
    return;
  const n = e.emit;
  e.emit = function(r, i) {
    if (r === "exit") {
      const a = Es(i, t);
      if (a)
        return n.call(e, "error", a);
    }
    return n.apply(e, arguments);
  };
}
function Es(e, t) {
  return bi && e === 1 && !t.file ? Si(t.original, "spawn") : null;
}
function fh(e, t) {
  return bi && e === 1 && !t.file ? Si(t.original, "spawnSync") : null;
}
var ph = {
  hookChildProcess: lh,
  verifyENOENT: Es,
  verifyENOENTSync: fh,
  notFoundError: Si
};
const bs = En, xi = uh, _i = ph;
function Ss(e, t, n) {
  const r = xi(e, t, n), i = bs.spawn(r.command, r.args, r.options);
  return _i.hookChildProcess(i, r), i;
}
function dh(e, t, n) {
  const r = xi(e, t, n), i = bs.spawnSync(r.command, r.args, r.options);
  return i.error = i.error || _i.verifyENOENTSync(i.status, r), i;
}
Ot.exports = Ss;
Ot.exports.spawn = Ss;
Ot.exports.sync = dh;
Ot.exports._parse = xi;
Ot.exports._enoent = _i;
var hh = Ot.exports, mh = (e) => {
  const t = typeof e == "string" ? `
` : 10, n = typeof e == "string" ? "\r" : 13;
  return e[e.length - 1] === t && (e = e.slice(0, e.length - 1)), e[e.length - 1] === n && (e = e.slice(0, e.length - 1)), e;
}, Ai = { exports: {} };
Ai.exports;
(function(e) {
  const t = Ee, n = ws, r = (i) => {
    i = {
      cwd: process.cwd(),
      path: process.env[n()],
      execPath: process.execPath,
      ...i
    };
    let a, o = t.resolve(i.cwd);
    const s = [];
    for (; a !== o; )
      s.push(t.join(o, "node_modules/.bin")), a = o, o = t.resolve(o, "..");
    const c = t.resolve(i.cwd, i.execPath, "..");
    return s.push(c), s.concat(i.path).join(t.delimiter);
  };
  e.exports = r, e.exports.default = r, e.exports.env = (i) => {
    i = {
      env: process.env,
      ...i
    };
    const a = { ...i.env }, o = n({ env: a });
    return i.path = a[o], a[o] = e.exports(i), a;
  };
})(Ai);
var gh = Ai.exports, tr = { exports: {} }, Ti = { exports: {} };
const xs = (e, t) => {
  for (const n of Reflect.ownKeys(t))
    Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(t, n));
  return e;
};
Ti.exports = xs;
Ti.exports.default = xs;
var yh = Ti.exports;
const vh = yh, On = /* @__PURE__ */ new WeakMap(), _s = (e, t = {}) => {
  if (typeof e != "function")
    throw new TypeError("Expected a function");
  let n, r = 0;
  const i = e.displayName || e.name || "<anonymous>", a = function(...o) {
    if (On.set(a, ++r), r === 1)
      n = e.apply(this, o), e = null;
    else if (t.throw === !0)
      throw new Error(`Function \`${i}\` can only be called once`);
    return n;
  };
  return vh(a, e), On.set(a, r), a;
};
tr.exports = _s;
tr.exports.default = _s;
tr.exports.callCount = (e) => {
  if (!On.has(e))
    throw new Error(`The given function \`${e.name}\` is not wrapped by the \`onetime\` package`);
  return On.get(e);
};
var wh = tr.exports, Ct = {}, nr = {}, rr = {};
Object.defineProperty(rr, "__esModule", { value: !0 });
rr.SIGNALS = void 0;
const Eh = [
  {
    name: "SIGHUP",
    number: 1,
    action: "terminate",
    description: "Terminal closed",
    standard: "posix"
  },
  {
    name: "SIGINT",
    number: 2,
    action: "terminate",
    description: "User interruption with CTRL-C",
    standard: "ansi"
  },
  {
    name: "SIGQUIT",
    number: 3,
    action: "core",
    description: "User interruption with CTRL-\\",
    standard: "posix"
  },
  {
    name: "SIGILL",
    number: 4,
    action: "core",
    description: "Invalid machine instruction",
    standard: "ansi"
  },
  {
    name: "SIGTRAP",
    number: 5,
    action: "core",
    description: "Debugger breakpoint",
    standard: "posix"
  },
  {
    name: "SIGABRT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "ansi"
  },
  {
    name: "SIGIOT",
    number: 6,
    action: "core",
    description: "Aborted",
    standard: "bsd"
  },
  {
    name: "SIGBUS",
    number: 7,
    action: "core",
    description: "Bus error due to misaligned, non-existing address or paging error",
    standard: "bsd"
  },
  {
    name: "SIGEMT",
    number: 7,
    action: "terminate",
    description: "Command should be emulated but is not implemented",
    standard: "other"
  },
  {
    name: "SIGFPE",
    number: 8,
    action: "core",
    description: "Floating point arithmetic error",
    standard: "ansi"
  },
  {
    name: "SIGKILL",
    number: 9,
    action: "terminate",
    description: "Forced termination",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGUSR1",
    number: 10,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGSEGV",
    number: 11,
    action: "core",
    description: "Segmentation fault",
    standard: "ansi"
  },
  {
    name: "SIGUSR2",
    number: 12,
    action: "terminate",
    description: "Application-specific signal",
    standard: "posix"
  },
  {
    name: "SIGPIPE",
    number: 13,
    action: "terminate",
    description: "Broken pipe or socket",
    standard: "posix"
  },
  {
    name: "SIGALRM",
    number: 14,
    action: "terminate",
    description: "Timeout or timer",
    standard: "posix"
  },
  {
    name: "SIGTERM",
    number: 15,
    action: "terminate",
    description: "Termination",
    standard: "ansi"
  },
  {
    name: "SIGSTKFLT",
    number: 16,
    action: "terminate",
    description: "Stack is empty or overflowed",
    standard: "other"
  },
  {
    name: "SIGCHLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "posix"
  },
  {
    name: "SIGCLD",
    number: 17,
    action: "ignore",
    description: "Child process terminated, paused or unpaused",
    standard: "other"
  },
  {
    name: "SIGCONT",
    number: 18,
    action: "unpause",
    description: "Unpaused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGSTOP",
    number: 19,
    action: "pause",
    description: "Paused",
    standard: "posix",
    forced: !0
  },
  {
    name: "SIGTSTP",
    number: 20,
    action: "pause",
    description: 'Paused using CTRL-Z or "suspend"',
    standard: "posix"
  },
  {
    name: "SIGTTIN",
    number: 21,
    action: "pause",
    description: "Background process cannot read terminal input",
    standard: "posix"
  },
  {
    name: "SIGBREAK",
    number: 21,
    action: "terminate",
    description: "User interruption with CTRL-BREAK",
    standard: "other"
  },
  {
    name: "SIGTTOU",
    number: 22,
    action: "pause",
    description: "Background process cannot write to terminal output",
    standard: "posix"
  },
  {
    name: "SIGURG",
    number: 23,
    action: "ignore",
    description: "Socket received out-of-band data",
    standard: "bsd"
  },
  {
    name: "SIGXCPU",
    number: 24,
    action: "core",
    description: "Process timed out",
    standard: "bsd"
  },
  {
    name: "SIGXFSZ",
    number: 25,
    action: "core",
    description: "File too big",
    standard: "bsd"
  },
  {
    name: "SIGVTALRM",
    number: 26,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGPROF",
    number: 27,
    action: "terminate",
    description: "Timeout or timer",
    standard: "bsd"
  },
  {
    name: "SIGWINCH",
    number: 28,
    action: "ignore",
    description: "Terminal window size changed",
    standard: "bsd"
  },
  {
    name: "SIGIO",
    number: 29,
    action: "terminate",
    description: "I/O is available",
    standard: "other"
  },
  {
    name: "SIGPOLL",
    number: 29,
    action: "terminate",
    description: "Watched event",
    standard: "other"
  },
  {
    name: "SIGINFO",
    number: 29,
    action: "ignore",
    description: "Request for process information",
    standard: "other"
  },
  {
    name: "SIGPWR",
    number: 30,
    action: "terminate",
    description: "Device running out of power",
    standard: "systemv"
  },
  {
    name: "SIGSYS",
    number: 31,
    action: "core",
    description: "Invalid system call",
    standard: "other"
  },
  {
    name: "SIGUNUSED",
    number: 31,
    action: "terminate",
    description: "Invalid system call",
    standard: "other"
  }
];
rr.SIGNALS = Eh;
var st = {};
Object.defineProperty(st, "__esModule", { value: !0 });
st.SIGRTMAX = st.getRealtimeSignals = void 0;
const bh = function() {
  const e = Ts - As + 1;
  return Array.from({ length: e }, Sh);
};
st.getRealtimeSignals = bh;
const Sh = function(e, t) {
  return {
    name: `SIGRT${t + 1}`,
    number: As + t,
    action: "terminate",
    description: "Application-specific signal (realtime)",
    standard: "posix"
  };
}, As = 34, Ts = 64;
st.SIGRTMAX = Ts;
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.getSignals = void 0;
var xh = zn, _h = rr, Ah = st;
const Th = function() {
  const e = (0, Ah.getRealtimeSignals)();
  return [..._h.SIGNALS, ...e].map(Ch);
};
nr.getSignals = Th;
const Ch = function({
  name: e,
  number: t,
  description: n,
  action: r,
  forced: i = !1,
  standard: a
}) {
  const {
    signals: { [e]: o }
  } = xh.constants, s = o !== void 0;
  return { name: e, number: s ? o : t, description: n, supported: s, action: r, forced: i, standard: a };
};
Object.defineProperty(Ct, "__esModule", { value: !0 });
Ct.signalsByNumber = Ct.signalsByName = void 0;
var Rh = zn, Cs = nr, Fh = st;
const $h = function() {
  return (0, Cs.getSignals)().reduce(Ih, {});
}, Ih = function(e, { name: t, number: n, description: r, supported: i, action: a, forced: o, standard: s }) {
  return {
    ...e,
    [t]: { name: t, number: n, description: r, supported: i, action: a, forced: o, standard: s }
  };
}, Oh = $h();
Ct.signalsByName = Oh;
const Nh = function() {
  const e = (0, Cs.getSignals)(), t = Fh.SIGRTMAX + 1, n = Array.from({ length: t }, (r, i) => Ph(i, e));
  return Object.assign({}, ...n);
}, Ph = function(e, t) {
  const n = Lh(e, t);
  if (n === void 0)
    return {};
  const { name: r, description: i, supported: a, action: o, forced: s, standard: c } = n;
  return {
    [e]: {
      name: r,
      number: e,
      description: i,
      supported: a,
      action: o,
      forced: s,
      standard: c
    }
  };
}, Lh = function(e, t) {
  const n = t.find(({ name: r }) => Rh.constants.signals[r] === e);
  return n !== void 0 ? n : t.find((r) => r.number === e);
}, kh = Nh();
Ct.signalsByNumber = kh;
const { signalsByName: Dh } = Ct, Mh = ({ timedOut: e, timeout: t, errorCode: n, signal: r, signalDescription: i, exitCode: a, isCanceled: o }) => e ? `timed out after ${t} milliseconds` : o ? "was canceled" : n !== void 0 ? `failed with ${n}` : r !== void 0 ? `was killed with ${r} (${i})` : a !== void 0 ? `failed with exit code ${a}` : "failed", jh = ({
  stdout: e,
  stderr: t,
  all: n,
  error: r,
  signal: i,
  exitCode: a,
  command: o,
  escapedCommand: s,
  timedOut: c,
  isCanceled: f,
  killed: u,
  parsed: { options: { timeout: l } }
}) => {
  a = a === null ? void 0 : a, i = i === null ? void 0 : i;
  const p = i === void 0 ? void 0 : Dh[i].description, d = r && r.code, m = `Command ${Mh({ timedOut: c, timeout: l, errorCode: d, signal: i, signalDescription: p, exitCode: a, isCanceled: f })}: ${o}`, g = Object.prototype.toString.call(r) === "[object Error]", w = g ? `${m}
${r.message}` : m, S = [w, t, e].filter(Boolean).join(`
`);
  return g ? (r.originalMessage = r.message, r.message = S) : r = new Error(S), r.shortMessage = w, r.command = o, r.escapedCommand = s, r.exitCode = a, r.signal = i, r.signalDescription = p, r.stdout = e, r.stderr = t, n !== void 0 && (r.all = n), "bufferedData" in r && delete r.bufferedData, r.failed = !0, r.timedOut = !!c, r.isCanceled = f, r.killed = u && !c, r;
};
var Hh = jh, Ci = { exports: {} };
const dn = ["stdin", "stdout", "stderr"], Bh = (e) => dn.some((t) => e[t] !== void 0), Rs = (e) => {
  if (!e)
    return;
  const { stdio: t } = e;
  if (t === void 0)
    return dn.map((r) => e[r]);
  if (Bh(e))
    throw new Error(`It's not possible to provide \`stdio\` in combination with one of ${dn.map((r) => `\`${r}\``).join(", ")}`);
  if (typeof t == "string")
    return t;
  if (!Array.isArray(t))
    throw new TypeError(`Expected \`stdio\` to be of type \`string\` or \`Array\`, got \`${typeof t}\``);
  const n = Math.max(t.length, dn.length);
  return Array.from({ length: n }, (r, i) => t[i]);
};
Ci.exports = Rs;
Ci.exports.node = (e) => {
  const t = Rs(e);
  return t === "ipc" ? "ipc" : t === void 0 || typeof t == "string" ? [t, t, t, "ipc"] : t.includes("ipc") ? t : [...t, "ipc"];
};
var Uh = Ci.exports, wt = { exports: {} }, xr = { exports: {} }, _o;
function Gh() {
  return _o || (_o = 1, (function(e) {
    e.exports = [
      "SIGABRT",
      "SIGALRM",
      "SIGHUP",
      "SIGINT",
      "SIGTERM"
    ], process.platform !== "win32" && e.exports.push(
      "SIGVTALRM",
      "SIGXCPU",
      "SIGXFSZ",
      "SIGUSR2",
      "SIGTRAP",
      "SIGSYS",
      "SIGQUIT",
      "SIGIOT"
      // should detect profiler and enable/disable accordingly.
      // see #21
      // 'SIGPROF'
    ), process.platform === "linux" && e.exports.push(
      "SIGIO",
      "SIGPOLL",
      "SIGPWR",
      "SIGSTKFLT",
      "SIGUNUSED"
    );
  })(xr)), xr.exports;
}
var ee = ve.process;
const Ze = function(e) {
  return e && typeof e == "object" && typeof e.removeListener == "function" && typeof e.emit == "function" && typeof e.reallyExit == "function" && typeof e.listeners == "function" && typeof e.kill == "function" && typeof e.pid == "number" && typeof e.on == "function";
};
if (!Ze(ee))
  wt.exports = function() {
    return function() {
    };
  };
else {
  var qh = Ia, Pt = Gh(), Kh = /^win/i.test(ee.platform), an = Fu;
  typeof an != "function" && (an = an.EventEmitter);
  var ue;
  ee.__signal_exit_emitter__ ? ue = ee.__signal_exit_emitter__ : (ue = ee.__signal_exit_emitter__ = new an(), ue.count = 0, ue.emitted = {}), ue.infinite || (ue.setMaxListeners(1 / 0), ue.infinite = !0), wt.exports = function(e, t) {
    if (!Ze(ve.process))
      return function() {
      };
    qh.equal(typeof e, "function", "a callback must be provided for exit handler"), Lt === !1 && Ao();
    var n = "exit";
    t && t.alwaysLast && (n = "afterexit");
    var r = function() {
      ue.removeListener(n, e), ue.listeners("exit").length === 0 && ue.listeners("afterexit").length === 0 && _r();
    };
    return ue.on(n, e), r;
  };
  var _r = function() {
    !Lt || !Ze(ve.process) || (Lt = !1, Pt.forEach(function(t) {
      try {
        ee.removeListener(t, Ar[t]);
      } catch {
      }
    }), ee.emit = Tr, ee.reallyExit = To, ue.count -= 1);
  };
  wt.exports.unload = _r;
  var dt = function(t, n, r) {
    ue.emitted[t] || (ue.emitted[t] = !0, ue.emit(t, n, r));
  }, Ar = {};
  Pt.forEach(function(e) {
    Ar[e] = function() {
      if (Ze(ve.process)) {
        var n = ee.listeners(e);
        n.length === ue.count && (_r(), dt("exit", null, e), dt("afterexit", null, e), Kh && e === "SIGHUP" && (e = "SIGINT"), ee.kill(ee.pid, e));
      }
    };
  }), wt.exports.signals = function() {
    return Pt;
  };
  var Lt = !1, Ao = function() {
    Lt || !Ze(ve.process) || (Lt = !0, ue.count += 1, Pt = Pt.filter(function(t) {
      try {
        return ee.on(t, Ar[t]), !0;
      } catch {
        return !1;
      }
    }), ee.emit = zh, ee.reallyExit = Wh);
  };
  wt.exports.load = Ao;
  var To = ee.reallyExit, Wh = function(t) {
    Ze(ve.process) && (ee.exitCode = t || /* istanbul ignore next */
    0, dt("exit", ee.exitCode, null), dt("afterexit", ee.exitCode, null), To.call(ee, ee.exitCode));
  }, Tr = ee.emit, zh = function(t, n) {
    if (t === "exit" && Ze(ve.process)) {
      n !== void 0 && (ee.exitCode = n);
      var r = Tr.apply(this, arguments);
      return dt("exit", ee.exitCode, null), dt("afterexit", ee.exitCode, null), r;
    } else
      return Tr.apply(this, arguments);
  };
}
var Yh = wt.exports;
const Qh = zn, Vh = Yh, Xh = 1e3 * 5, Zh = (e, t = "SIGTERM", n = {}) => {
  const r = e(t);
  return Jh(e, t, n, r), r;
}, Jh = (e, t, n, r) => {
  if (!em(t, n, r))
    return;
  const i = nm(n), a = setTimeout(() => {
    e("SIGKILL");
  }, i);
  a.unref && a.unref();
}, em = (e, { forceKillAfterTimeout: t }, n) => tm(e) && t !== !1 && n, tm = (e) => e === Qh.constants.signals.SIGTERM || typeof e == "string" && e.toUpperCase() === "SIGTERM", nm = ({ forceKillAfterTimeout: e = !0 }) => {
  if (e === !0)
    return Xh;
  if (!Number.isFinite(e) || e < 0)
    throw new TypeError(`Expected the \`forceKillAfterTimeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
  return e;
}, rm = (e, t) => {
  e.kill() && (t.isCanceled = !0);
}, im = (e, t, n) => {
  e.kill(t), n(Object.assign(new Error("Timed out"), { timedOut: !0, signal: t }));
}, om = (e, { timeout: t, killSignal: n = "SIGTERM" }, r) => {
  if (t === 0 || t === void 0)
    return r;
  let i;
  const a = new Promise((s, c) => {
    i = setTimeout(() => {
      im(e, n, c);
    }, t);
  }), o = r.finally(() => {
    clearTimeout(i);
  });
  return Promise.race([a, o]);
}, am = ({ timeout: e }) => {
  if (e !== void 0 && (!Number.isFinite(e) || e < 0))
    throw new TypeError(`Expected the \`timeout\` option to be a non-negative integer, got \`${e}\` (${typeof e})`);
}, sm = async (e, { cleanup: t, detached: n }, r) => {
  if (!t || n)
    return r;
  const i = Vh(() => {
    e.kill();
  });
  return r.finally(() => {
    i();
  });
};
var cm = {
  spawnedKill: Zh,
  spawnedCancel: rm,
  setupTimeout: om,
  validateTimeout: am,
  setExitHandler: sm
};
const Le = (e) => e !== null && typeof e == "object" && typeof e.pipe == "function";
Le.writable = (e) => Le(e) && e.writable !== !1 && typeof e._write == "function" && typeof e._writableState == "object";
Le.readable = (e) => Le(e) && e.readable !== !1 && typeof e._read == "function" && typeof e._readableState == "object";
Le.duplex = (e) => Le.writable(e) && Le.readable(e);
Le.transform = (e) => Le.duplex(e) && typeof e._transform == "function";
var um = Le, zt = { exports: {} };
const { PassThrough: lm } = Yn;
var fm = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const a = new lm({ objectMode: i });
  n && a.setEncoding(n);
  let o = 0;
  const s = [];
  return a.on("data", (c) => {
    s.push(c), i ? o = s.length : o += c.length;
  }), a.getBufferedValue = () => t ? s : r ? Buffer.concat(s, o) : s.join(""), a.getBufferedLength = () => o, a;
};
const { constants: pm } = $u, dm = Yn, { promisify: hm } = ut, mm = fm, gm = hm(dm.pipeline);
class Fs extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function Ri(e, t) {
  if (!e)
    throw new Error("Expected a stream");
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: n } = t, r = mm(t);
  return await new Promise((i, a) => {
    const o = (s) => {
      s && r.getBufferedLength() <= pm.MAX_LENGTH && (s.bufferedData = r.getBufferedValue()), a(s);
    };
    (async () => {
      try {
        await gm(e, r), i();
      } catch (s) {
        o(s);
      }
    })(), r.on("data", () => {
      r.getBufferedLength() > n && o(new Fs());
    });
  }), r.getBufferedValue();
}
zt.exports = Ri;
zt.exports.buffer = (e, t) => Ri(e, { ...t, encoding: "buffer" });
zt.exports.array = (e, t) => Ri(e, { ...t, array: !0 });
zt.exports.MaxBufferError = Fs;
var ym = zt.exports;
const { PassThrough: vm } = Yn;
var wm = function() {
  var e = [], t = new vm({ objectMode: !0 });
  return t.setMaxListeners(0), t.add = n, t.isEmpty = r, t.on("unpipe", i), Array.prototype.slice.call(arguments).forEach(n), t;
  function n(a) {
    return Array.isArray(a) ? (a.forEach(n), this) : (e.push(a), a.once("end", i.bind(null, a)), a.once("error", t.emit.bind(t, "error")), a.pipe(t, { end: !1 }), this);
  }
  function r() {
    return e.length == 0;
  }
  function i(a) {
    e = e.filter(function(o) {
      return o !== a;
    }), !e.length && t.readable && t.end();
  }
};
const $s = um, Co = ym, Em = wm, bm = (e, t) => {
  t === void 0 || e.stdin === void 0 || ($s(t) ? t.pipe(e.stdin) : e.stdin.end(t));
}, Sm = (e, { all: t }) => {
  if (!t || !e.stdout && !e.stderr)
    return;
  const n = Em();
  return e.stdout && n.add(e.stdout), e.stderr && n.add(e.stderr), n;
}, Cr = async (e, t) => {
  if (e) {
    e.destroy();
    try {
      return await t;
    } catch (n) {
      return n.bufferedData;
    }
  }
}, Rr = (e, { encoding: t, buffer: n, maxBuffer: r }) => {
  if (!(!e || !n))
    return t ? Co(e, { encoding: t, maxBuffer: r }) : Co.buffer(e, { maxBuffer: r });
}, xm = async ({ stdout: e, stderr: t, all: n }, { encoding: r, buffer: i, maxBuffer: a }, o) => {
  const s = Rr(e, { encoding: r, buffer: i, maxBuffer: a }), c = Rr(t, { encoding: r, buffer: i, maxBuffer: a }), f = Rr(n, { encoding: r, buffer: i, maxBuffer: a * 2 });
  try {
    return await Promise.all([o, s, c, f]);
  } catch (u) {
    return Promise.all([
      { error: u, signal: u.signal, timedOut: u.timedOut },
      Cr(e, s),
      Cr(t, c),
      Cr(n, f)
    ]);
  }
}, _m = ({ input: e }) => {
  if ($s(e))
    throw new TypeError("The `input` option cannot be a stream in sync mode");
};
var Am = {
  handleInput: bm,
  makeAllStream: Sm,
  getSpawnedResult: xm,
  validateInputSync: _m
};
const Tm = (async () => {
})().constructor.prototype, Cm = ["then", "catch", "finally"].map((e) => [
  e,
  Reflect.getOwnPropertyDescriptor(Tm, e)
]), Rm = (e, t) => {
  for (const [n, r] of Cm) {
    const i = typeof t == "function" ? (...a) => Reflect.apply(r.value, t(), a) : r.value.bind(t);
    Reflect.defineProperty(e, n, { ...r, value: i });
  }
  return e;
}, Fm = (e) => new Promise((t, n) => {
  e.on("exit", (r, i) => {
    t({ exitCode: r, signal: i });
  }), e.on("error", (r) => {
    n(r);
  }), e.stdin && e.stdin.on("error", (r) => {
    n(r);
  });
});
var $m = {
  mergePromise: Rm,
  getSpawnedPromise: Fm
};
const Is = (e, t = []) => Array.isArray(t) ? [e, ...t] : [e], Im = /^[\w.-]+$/, Om = /"/g, Nm = (e) => typeof e != "string" || Im.test(e) ? e : `"${e.replace(Om, '\\"')}"`, Pm = (e, t) => Is(e, t).join(" "), Lm = (e, t) => Is(e, t).map((n) => Nm(n)).join(" "), km = / +/g, Dm = (e) => {
  const t = [];
  for (const n of e.trim().split(km)) {
    const r = t[t.length - 1];
    r && r.endsWith("\\") ? t[t.length - 1] = `${r.slice(0, -1)} ${n}` : t.push(n);
  }
  return t;
};
var Mm = {
  joinCommand: Pm,
  getEscapedCommand: Lm,
  parseCommand: Dm
};
const jm = Ee, ii = En, Hm = hh, Bm = mh, Um = gh, Gm = wh, Nn = Hh, Os = Uh, { spawnedKill: qm, spawnedCancel: Km, setupTimeout: Wm, validateTimeout: zm, setExitHandler: Ym } = cm, { handleInput: Qm, getSpawnedResult: Vm, makeAllStream: Xm, validateInputSync: Zm } = Am, { mergePromise: Ro, getSpawnedPromise: Jm } = $m, { joinCommand: Ns, parseCommand: Ps, getEscapedCommand: Ls } = Mm, eg = 1e3 * 1e3 * 100, tg = ({ env: e, extendEnv: t, preferLocal: n, localDir: r, execPath: i }) => {
  const a = t ? { ...process.env, ...e } : e;
  return n ? Um.env({ env: a, cwd: r, execPath: i }) : a;
}, ks = (e, t, n = {}) => {
  const r = Hm._parse(e, t, n);
  return e = r.command, t = r.args, n = r.options, n = {
    maxBuffer: eg,
    buffer: !0,
    stripFinalNewline: !0,
    extendEnv: !0,
    preferLocal: !1,
    localDir: n.cwd || process.cwd(),
    execPath: process.execPath,
    encoding: "utf8",
    reject: !0,
    cleanup: !0,
    all: !1,
    windowsHide: !0,
    ...n
  }, n.env = tg(n), n.stdio = Os(n), process.platform === "win32" && jm.basename(e, ".exe") === "cmd" && t.unshift("/q"), { file: e, args: t, options: n, parsed: r };
}, Mt = (e, t, n) => typeof t != "string" && !Buffer.isBuffer(t) ? n === void 0 ? void 0 : "" : e.stripFinalNewline ? Bm(t) : t, ir = (e, t, n) => {
  const r = ks(e, t, n), i = Ns(e, t), a = Ls(e, t);
  zm(r.options);
  let o;
  try {
    o = ii.spawn(r.file, r.args, r.options);
  } catch (d) {
    const h = new ii.ChildProcess(), m = Promise.reject(Nn({
      error: d,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    }));
    return Ro(h, m);
  }
  const s = Jm(o), c = Wm(o, r.options, s), f = Ym(o, r.options, c), u = { isCanceled: !1 };
  o.kill = qm.bind(null, o.kill.bind(o)), o.cancel = Km.bind(null, o, u);
  const p = Gm(async () => {
    const [{ error: d, exitCode: h, signal: m, timedOut: g }, w, S, x] = await Vm(o, r.options, f), C = Mt(r.options, w), T = Mt(r.options, S), I = Mt(r.options, x);
    if (d || h !== 0 || m !== null) {
      const k = Nn({
        error: d,
        exitCode: h,
        signal: m,
        stdout: C,
        stderr: T,
        all: I,
        command: i,
        escapedCommand: a,
        parsed: r,
        timedOut: g,
        isCanceled: u.isCanceled,
        killed: o.killed
      });
      if (!r.options.reject)
        return k;
      throw k;
    }
    return {
      command: i,
      escapedCommand: a,
      exitCode: 0,
      stdout: C,
      stderr: T,
      all: I,
      failed: !1,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    };
  });
  return Qm(o, r.options.input), o.all = Xm(o, r.options), Ro(o, p);
};
Wt.exports = ir;
Wt.exports.sync = (e, t, n) => {
  const r = ks(e, t, n), i = Ns(e, t), a = Ls(e, t);
  Zm(r.options);
  let o;
  try {
    o = ii.spawnSync(r.file, r.args, r.options);
  } catch (f) {
    throw Nn({
      error: f,
      stdout: "",
      stderr: "",
      all: "",
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: !1,
      isCanceled: !1,
      killed: !1
    });
  }
  const s = Mt(r.options, o.stdout, o.error), c = Mt(r.options, o.stderr, o.error);
  if (o.error || o.status !== 0 || o.signal !== null) {
    const f = Nn({
      stdout: s,
      stderr: c,
      error: o.error,
      signal: o.signal,
      exitCode: o.status,
      command: i,
      escapedCommand: a,
      parsed: r,
      timedOut: o.error && o.error.code === "ETIMEDOUT",
      isCanceled: !1,
      killed: o.signal !== null
    });
    if (!r.options.reject)
      return f;
    throw f;
  }
  return {
    command: i,
    escapedCommand: a,
    exitCode: 0,
    stdout: s,
    stderr: c,
    failed: !1,
    timedOut: !1,
    isCanceled: !1,
    killed: !1
  };
};
Wt.exports.command = (e, t) => {
  const [n, ...r] = Ps(e);
  return ir(n, r, t);
};
Wt.exports.commandSync = (e, t) => {
  const [n, ...r] = Ps(e);
  return ir.sync(n, r, t);
};
Wt.exports.node = (e, t, n = {}) => {
  t && !Array.isArray(t) && typeof t == "object" && (n = t, t = []);
  const r = Os.node(n), i = process.execArgv.filter((s) => !s.startsWith("--inspect")), {
    nodePath: a = process.execPath,
    nodeOptions: o = i
  } = n;
  return ir(
    a,
    [
      ...o,
      e,
      ...Array.isArray(t) ? t : []
    ],
    {
      ...n,
      stdin: void 0,
      stdout: void 0,
      stderr: void 0,
      stdio: r,
      shell: !1
    }
  );
};
var xe = {}, or = { exports: {} }, Ds = { exports: {} }, Fi = { exports: {} }, $i = { exports: {} }, Ii = { exports: {} }, Oi = { exports: {} };
const Ms = (e, ...t) => new Promise((n) => {
  n(e(...t));
});
Oi.exports = Ms;
Oi.exports.default = Ms;
var ng = Oi.exports;
const rg = ng, js = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  const t = [];
  let n = 0;
  const r = () => {
    n--, t.length > 0 && t.shift()();
  }, i = (s, c, ...f) => {
    n++;
    const u = rg(s, ...f);
    c(u), u.then(r, r);
  }, a = (s, c, ...f) => {
    n < e ? i(s, c, ...f) : t.push(i.bind(null, s, c, ...f));
  }, o = (s, ...c) => new Promise((f) => a(s, f, ...c));
  return Object.defineProperties(o, {
    activeCount: {
      get: () => n
    },
    pendingCount: {
      get: () => t.length
    },
    clearQueue: {
      value: () => {
        t.length = 0;
      }
    }
  }), o;
};
Ii.exports = js;
Ii.exports.default = js;
var ig = Ii.exports;
const Fo = ig;
let Hs = class extends Error {
  constructor(t) {
    super(), this.value = t;
  }
};
const og = async (e, t) => t(await e), ag = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new Hs(t[0]);
  return !1;
}, Bs = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const r = Fo(n.concurrency), i = [...e].map((o) => [o, r(og, o, t)]), a = Fo(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(i.map((o) => a(ag, o)));
  } catch (o) {
    if (o instanceof Hs)
      return o.value;
    throw o;
  }
};
$i.exports = Bs;
$i.exports.default = Bs;
var sg = $i.exports;
const Us = Ee, Pn = Xe, { promisify: Gs } = ut, cg = sg, ug = Gs(Pn.stat), lg = Gs(Pn.lstat), qs = {
  directory: "isDirectory",
  file: "isFile"
};
function Ks({ type: e }) {
  if (!(e in qs))
    throw new Error(`Invalid type specified: ${e}`);
}
const Ws = (e, t) => e === void 0 || t[qs[e]]();
Fi.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, Ks(t);
  const n = t.allowSymlinks ? ug : lg;
  return cg(e, async (r) => {
    try {
      const i = await n(Us.resolve(t.cwd, r));
      return Ws(t.type, i);
    } catch {
      return !1;
    }
  }, t);
};
Fi.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, Ks(t);
  const n = t.allowSymlinks ? Pn.statSync : Pn.lstatSync;
  for (const r of e)
    try {
      const i = n(Us.resolve(t.cwd, r));
      if (Ws(t.type, i))
        return r;
    } catch {
    }
};
var fg = Fi.exports, Ni = { exports: {} };
const zs = Xe, { promisify: pg } = ut, dg = pg(zs.access);
Ni.exports = async (e) => {
  try {
    return await dg(e), !0;
  } catch {
    return !1;
  }
};
Ni.exports.sync = (e) => {
  try {
    return zs.accessSync(e), !0;
  } catch {
    return !1;
  }
};
var Ys = Ni.exports;
(function(e) {
  const t = Ee, n = fg, r = Ys, i = Symbol("findUp.stop");
  e.exports = async (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), u = async (l) => {
      if (typeof a != "function")
        return n(f, l);
      const p = await a(l.cwd);
      return typeof p == "string" ? n([p], l) : p;
    };
    for (; ; ) {
      const l = await u({ ...o, cwd: s });
      if (l === i)
        return;
      if (l)
        return t.resolve(s, l);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), u = (l) => {
      if (typeof a != "function")
        return n.sync(f, l);
      const p = a(l.cwd);
      return typeof p == "string" ? n.sync([p], l) : p;
    };
    for (; ; ) {
      const l = u({ ...o, cwd: s });
      if (l === i)
        return;
      if (l)
        return t.resolve(s, l);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = r, e.exports.sync.exists = r.sync, e.exports.stop = i;
})(Ds);
var hg = Ds.exports;
const Qs = Ee, Vs = hg, Xs = async (e) => {
  const t = await Vs("package.json", { cwd: e });
  return t && Qs.dirname(t);
};
or.exports = Xs;
or.exports.default = Xs;
or.exports.sync = (e) => {
  const t = Vs.sync("package.json", { cwd: e });
  return t && Qs.dirname(t);
};
var mg = or.exports, ar = {};
(function(e) {
  e.isInteger = (t) => typeof t == "number" ? Number.isInteger(t) : typeof t == "string" && t.trim() !== "" ? Number.isInteger(Number(t)) : !1, e.find = (t, n) => t.nodes.find((r) => r.type === n), e.exceedsLimit = (t, n, r = 1, i) => i === !1 || !e.isInteger(t) || !e.isInteger(n) ? !1 : (Number(n) - Number(t)) / Number(r) >= i, e.escapeNode = (t, n = 0, r) => {
    const i = t.nodes[n];
    i && (r && i.type === r || i.type === "open" || i.type === "close") && i.escaped !== !0 && (i.value = "\\" + i.value, i.escaped = !0);
  }, e.encloseBrace = (t) => t.type !== "brace" ? !1 : t.commas >> 0 + t.ranges >> 0 === 0 ? (t.invalid = !0, !0) : !1, e.isInvalidBrace = (t) => t.type !== "brace" ? !1 : t.invalid === !0 || t.dollar ? !0 : t.commas >> 0 + t.ranges >> 0 === 0 || t.open !== !0 || t.close !== !0 ? (t.invalid = !0, !0) : !1, e.isOpenOrClose = (t) => t.type === "open" || t.type === "close" ? !0 : t.open === !0 || t.close === !0, e.reduce = (t) => t.reduce((n, r) => (r.type === "text" && n.push(r.value), r.type === "range" && (r.type = "text"), n), []), e.flatten = (...t) => {
    const n = [], r = (i) => {
      for (let a = 0; a < i.length; a++) {
        const o = i[a];
        if (Array.isArray(o)) {
          r(o);
          continue;
        }
        o !== void 0 && n.push(o);
      }
      return n;
    };
    return r(t), n;
  };
})(ar);
const $o = ar;
var Pi = (e, t = {}) => {
  const n = (r, i = {}) => {
    const a = t.escapeInvalid && $o.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0;
    let s = "";
    if (r.value)
      return (a || o) && $o.isOpenOrClose(r) ? "\\" + r.value : r.value;
    if (r.value)
      return r.value;
    if (r.nodes)
      for (const c of r.nodes)
        s += n(c);
    return s;
  };
  return n(e);
};
/*!
 * is-number <https://github.com/jonschlinkert/is-number>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Released under the MIT License.
 */
var gg = function(e) {
  return typeof e == "number" ? e - e === 0 : typeof e == "string" && e.trim() !== "" ? Number.isFinite ? Number.isFinite(+e) : isFinite(+e) : !1;
};
/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
const Io = gg, rt = (e, t, n) => {
  if (Io(e) === !1)
    throw new TypeError("toRegexRange: expected the first argument to be a number");
  if (t === void 0 || e === t)
    return String(e);
  if (Io(t) === !1)
    throw new TypeError("toRegexRange: expected the second argument to be a number.");
  let r = { relaxZeros: !0, ...n };
  typeof r.strictZeros == "boolean" && (r.relaxZeros = r.strictZeros === !1);
  let i = String(r.relaxZeros), a = String(r.shorthand), o = String(r.capture), s = String(r.wrap), c = e + ":" + t + "=" + i + a + o + s;
  if (rt.cache.hasOwnProperty(c))
    return rt.cache[c].result;
  let f = Math.min(e, t), u = Math.max(e, t);
  if (Math.abs(f - u) === 1) {
    let m = e + "|" + t;
    return r.capture ? `(${m})` : r.wrap === !1 ? m : `(?:${m})`;
  }
  let l = Do(e) || Do(t), p = { min: e, max: t, a: f, b: u }, d = [], h = [];
  if (l && (p.isPadded = l, p.maxLen = String(p.max).length), f < 0) {
    let m = u < 0 ? Math.abs(u) : 1;
    h = Oo(m, Math.abs(f), p, r), f = p.a = 0;
  }
  return u >= 0 && (d = Oo(f, u, p, r)), p.negatives = h, p.positives = d, p.result = yg(h, d), r.capture === !0 ? p.result = `(${p.result})` : r.wrap !== !1 && d.length + h.length > 1 && (p.result = `(?:${p.result})`), rt.cache[c] = p, p.result;
};
function yg(e, t, n) {
  let r = Fr(e, t, "-", !1) || [], i = Fr(t, e, "", !1) || [], a = Fr(e, t, "-?", !0) || [];
  return r.concat(a).concat(i).join("|");
}
function vg(e, t) {
  let n = 1, r = 1, i = Po(e, n), a = /* @__PURE__ */ new Set([t]);
  for (; e <= i && i <= t; )
    a.add(i), n += 1, i = Po(e, n);
  for (i = Lo(t + 1, r) - 1; e < i && i <= t; )
    a.add(i), r += 1, i = Lo(t + 1, r) - 1;
  return a = [...a], a.sort(bg), a;
}
function wg(e, t, n) {
  if (e === t)
    return { pattern: e, count: [], digits: 0 };
  let r = Eg(e, t), i = r.length, a = "", o = 0;
  for (let s = 0; s < i; s++) {
    let [c, f] = r[s];
    c === f ? a += c : c !== "0" || f !== "9" ? a += Sg(c, f) : o++;
  }
  return o && (a += n.shorthand === !0 ? "\\d" : "[0-9]"), { pattern: a, count: [o], digits: i };
}
function Oo(e, t, n, r) {
  let i = vg(e, t), a = [], o = e, s;
  for (let c = 0; c < i.length; c++) {
    let f = i[c], u = wg(String(o), String(f), r), l = "";
    if (!n.isPadded && s && s.pattern === u.pattern) {
      s.count.length > 1 && s.count.pop(), s.count.push(u.count[0]), s.string = s.pattern + ko(s.count), o = f + 1;
      continue;
    }
    n.isPadded && (l = xg(f, n, r)), u.string = l + u.pattern + ko(u.count), a.push(u), o = f + 1, s = u;
  }
  return a;
}
function Fr(e, t, n, r, i) {
  let a = [];
  for (let o of e) {
    let { string: s } = o;
    !r && !No(t, "string", s) && a.push(n + s), r && No(t, "string", s) && a.push(n + s);
  }
  return a;
}
function Eg(e, t) {
  let n = [];
  for (let r = 0; r < e.length; r++) n.push([e[r], t[r]]);
  return n;
}
function bg(e, t) {
  return e > t ? 1 : t > e ? -1 : 0;
}
function No(e, t, n) {
  return e.some((r) => r[t] === n);
}
function Po(e, t) {
  return Number(String(e).slice(0, -t) + "9".repeat(t));
}
function Lo(e, t) {
  return e - e % Math.pow(10, t);
}
function ko(e) {
  let [t = 0, n = ""] = e;
  return n || t > 1 ? `{${t + (n ? "," + n : "")}}` : "";
}
function Sg(e, t, n) {
  return `[${e}${t - e === 1 ? "" : "-"}${t}]`;
}
function Do(e) {
  return /^-?(0+)\d/.test(e);
}
function xg(e, t, n) {
  if (!t.isPadded)
    return e;
  let r = Math.abs(t.maxLen - String(e).length), i = n.relaxZeros !== !1;
  switch (r) {
    case 0:
      return "";
    case 1:
      return i ? "0?" : "0";
    case 2:
      return i ? "0{0,2}" : "00";
    default:
      return i ? `0{0,${r}}` : `0{${r}}`;
  }
}
rt.cache = {};
rt.clearCache = () => rt.cache = {};
var _g = rt;
/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
const Ag = ut, Zs = _g, Mo = (e) => e !== null && typeof e == "object" && !Array.isArray(e), Tg = (e) => (t) => e === !0 ? Number(t) : String(t), $r = (e) => typeof e == "number" || typeof e == "string" && e !== "", jt = (e) => Number.isInteger(+e), Ir = (e) => {
  let t = `${e}`, n = -1;
  if (t[0] === "-" && (t = t.slice(1)), t === "0") return !1;
  for (; t[++n] === "0"; ) ;
  return n > 0;
}, Cg = (e, t, n) => typeof e == "string" || typeof t == "string" ? !0 : n.stringify === !0, Rg = (e, t, n) => {
  if (t > 0) {
    let r = e[0] === "-" ? "-" : "";
    r && (e = e.slice(1)), e = r + e.padStart(r ? t - 1 : t, "0");
  }
  return n === !1 ? String(e) : e;
}, Ln = (e, t) => {
  let n = e[0] === "-" ? "-" : "";
  for (n && (e = e.slice(1), t--); e.length < t; ) e = "0" + e;
  return n ? "-" + e : e;
}, Fg = (e, t, n) => {
  e.negatives.sort((s, c) => s < c ? -1 : s > c ? 1 : 0), e.positives.sort((s, c) => s < c ? -1 : s > c ? 1 : 0);
  let r = t.capture ? "" : "?:", i = "", a = "", o;
  return e.positives.length && (i = e.positives.map((s) => Ln(String(s), n)).join("|")), e.negatives.length && (a = `-(${r}${e.negatives.map((s) => Ln(String(s), n)).join("|")})`), i && a ? o = `${i}|${a}` : o = i || a, t.wrap ? `(${r}${o})` : o;
}, Js = (e, t, n, r) => {
  if (n)
    return Zs(e, t, { wrap: !1, ...r });
  let i = String.fromCharCode(e);
  if (e === t) return i;
  let a = String.fromCharCode(t);
  return `[${i}-${a}]`;
}, ec = (e, t, n) => {
  if (Array.isArray(e)) {
    let r = n.wrap === !0, i = n.capture ? "" : "?:";
    return r ? `(${i}${e.join("|")})` : e.join("|");
  }
  return Zs(e, t, n);
}, tc = (...e) => new RangeError("Invalid range arguments: " + Ag.inspect(...e)), nc = (e, t, n) => {
  if (n.strictRanges === !0) throw tc([e, t]);
  return [];
}, $g = (e, t) => {
  if (t.strictRanges === !0)
    throw new TypeError(`Expected step "${e}" to be a number`);
  return [];
}, Ig = (e, t, n = 1, r = {}) => {
  let i = Number(e), a = Number(t);
  if (!Number.isInteger(i) || !Number.isInteger(a)) {
    if (r.strictRanges === !0) throw tc([e, t]);
    return [];
  }
  i === 0 && (i = 0), a === 0 && (a = 0);
  let o = i > a, s = String(e), c = String(t), f = String(n);
  n = Math.max(Math.abs(n), 1);
  let u = Ir(s) || Ir(c) || Ir(f), l = u ? Math.max(s.length, c.length, f.length) : 0, p = u === !1 && Cg(e, t, r) === !1, d = r.transform || Tg(p);
  if (r.toRegex && n === 1)
    return Js(Ln(e, l), Ln(t, l), !0, r);
  let h = { negatives: [], positives: [] }, m = (S) => h[S < 0 ? "negatives" : "positives"].push(Math.abs(S)), g = [], w = 0;
  for (; o ? i >= a : i <= a; )
    r.toRegex === !0 && n > 1 ? m(i) : g.push(Rg(d(i, w), l, p)), i = o ? i - n : i + n, w++;
  return r.toRegex === !0 ? n > 1 ? Fg(h, r, l) : ec(g, null, { wrap: !1, ...r }) : g;
}, Og = (e, t, n = 1, r = {}) => {
  if (!jt(e) && e.length > 1 || !jt(t) && t.length > 1)
    return nc(e, t, r);
  let i = r.transform || ((p) => String.fromCharCode(p)), a = `${e}`.charCodeAt(0), o = `${t}`.charCodeAt(0), s = a > o, c = Math.min(a, o), f = Math.max(a, o);
  if (r.toRegex && n === 1)
    return Js(c, f, !1, r);
  let u = [], l = 0;
  for (; s ? a >= o : a <= o; )
    u.push(i(a, l)), a = s ? a - n : a + n, l++;
  return r.toRegex === !0 ? ec(u, null, { wrap: !1, options: r }) : u;
}, hn = (e, t, n, r = {}) => {
  if (t == null && $r(e))
    return [e];
  if (!$r(e) || !$r(t))
    return nc(e, t, r);
  if (typeof n == "function")
    return hn(e, t, 1, { transform: n });
  if (Mo(n))
    return hn(e, t, 0, n);
  let i = { ...r };
  return i.capture === !0 && (i.wrap = !0), n = n || i.step || 1, jt(n) ? jt(e) && jt(t) ? Ig(e, t, n, i) : Og(e, t, Math.max(Math.abs(n), 1), i) : n != null && !Mo(n) ? $g(n, i) : hn(e, t, 1, n);
};
var rc = hn;
const Ng = rc, jo = ar, Pg = (e, t = {}) => {
  const n = (r, i = {}) => {
    const a = jo.isInvalidBrace(i), o = r.invalid === !0 && t.escapeInvalid === !0, s = a === !0 || o === !0, c = t.escapeInvalid === !0 ? "\\" : "";
    let f = "";
    if (r.isOpen === !0)
      return c + r.value;
    if (r.isClose === !0)
      return console.log("node.isClose", c, r.value), c + r.value;
    if (r.type === "open")
      return s ? c + r.value : "(";
    if (r.type === "close")
      return s ? c + r.value : ")";
    if (r.type === "comma")
      return r.prev.type === "comma" ? "" : s ? r.value : "|";
    if (r.value)
      return r.value;
    if (r.nodes && r.ranges > 0) {
      const u = jo.reduce(r.nodes), l = Ng(...u, { ...t, wrap: !1, toRegex: !0, strictZeros: !0 });
      if (l.length !== 0)
        return u.length > 1 && l.length > 1 ? `(${l})` : l;
    }
    if (r.nodes)
      for (const u of r.nodes)
        f += n(u, r);
    return f;
  };
  return n(e);
};
var Lg = Pg;
const kg = rc, Ho = Pi, bt = ar, et = (e = "", t = "", n = !1) => {
  const r = [];
  if (e = [].concat(e), t = [].concat(t), !t.length) return e;
  if (!e.length)
    return n ? bt.flatten(t).map((i) => `{${i}}`) : t;
  for (const i of e)
    if (Array.isArray(i))
      for (const a of i)
        r.push(et(a, t, n));
    else
      for (let a of t)
        n === !0 && typeof a == "string" && (a = `{${a}}`), r.push(Array.isArray(a) ? et(i, a, n) : i + a);
  return bt.flatten(r);
}, Dg = (e, t = {}) => {
  const n = t.rangeLimit === void 0 ? 1e3 : t.rangeLimit, r = (i, a = {}) => {
    i.queue = [];
    let o = a, s = a.queue;
    for (; o.type !== "brace" && o.type !== "root" && o.parent; )
      o = o.parent, s = o.queue;
    if (i.invalid || i.dollar) {
      s.push(et(s.pop(), Ho(i, t)));
      return;
    }
    if (i.type === "brace" && i.invalid !== !0 && i.nodes.length === 2) {
      s.push(et(s.pop(), ["{}"]));
      return;
    }
    if (i.nodes && i.ranges > 0) {
      const l = bt.reduce(i.nodes);
      if (bt.exceedsLimit(...l, t.step, n))
        throw new RangeError("expanded array length exceeds range limit. Use options.rangeLimit to increase or disable the limit.");
      let p = kg(...l, t);
      p.length === 0 && (p = Ho(i, t)), s.push(et(s.pop(), p)), i.nodes = [];
      return;
    }
    const c = bt.encloseBrace(i);
    let f = i.queue, u = i;
    for (; u.type !== "brace" && u.type !== "root" && u.parent; )
      u = u.parent, f = u.queue;
    for (let l = 0; l < i.nodes.length; l++) {
      const p = i.nodes[l];
      if (p.type === "comma" && i.type === "brace") {
        l === 1 && f.push(""), f.push("");
        continue;
      }
      if (p.type === "close") {
        s.push(et(s.pop(), f, c));
        continue;
      }
      if (p.value && p.type !== "open") {
        f.push(et(f.pop(), p.value));
        continue;
      }
      p.nodes && r(p, i);
    }
    return f;
  };
  return bt.flatten(r(e));
};
var Mg = Dg, jg = {
  MAX_LENGTH: 1e4,
  CHAR_LEFT_PARENTHESES: "(",
  /* ( */
  CHAR_RIGHT_PARENTHESES: ")",
  /* ) */
  CHAR_BACKSLASH: "\\",
  /* \ */
  CHAR_BACKTICK: "`",
  /* ` */
  CHAR_COMMA: ",",
  /* , */
  CHAR_DOT: ".",
  /* . */
  CHAR_DOUBLE_QUOTE: '"',
  /* " */
  CHAR_LEFT_CURLY_BRACE: "{",
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: "[",
  /* [ */
  CHAR_NO_BREAK_SPACE: " ",
  /* \u00A0 */
  CHAR_RIGHT_CURLY_BRACE: "}",
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: "]",
  /* ] */
  CHAR_SINGLE_QUOTE: "'",
  /* ' */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: "\uFEFF"
  /* \uFEFF */
};
const Hg = Pi, {
  MAX_LENGTH: Bo,
  CHAR_BACKSLASH: Or,
  /* \ */
  CHAR_BACKTICK: Bg,
  /* ` */
  CHAR_COMMA: Ug,
  /* , */
  CHAR_DOT: Gg,
  /* . */
  CHAR_LEFT_PARENTHESES: qg,
  /* ( */
  CHAR_RIGHT_PARENTHESES: Kg,
  /* ) */
  CHAR_LEFT_CURLY_BRACE: Wg,
  /* { */
  CHAR_RIGHT_CURLY_BRACE: zg,
  /* } */
  CHAR_LEFT_SQUARE_BRACKET: Uo,
  /* [ */
  CHAR_RIGHT_SQUARE_BRACKET: Go,
  /* ] */
  CHAR_DOUBLE_QUOTE: Yg,
  /* " */
  CHAR_SINGLE_QUOTE: Qg,
  /* ' */
  CHAR_NO_BREAK_SPACE: Vg,
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: Xg
} = jg, Zg = (e, t = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  const n = t || {}, r = typeof n.maxLength == "number" ? Math.min(Bo, n.maxLength) : Bo;
  if (e.length > r)
    throw new SyntaxError(`Input length (${e.length}), exceeds max characters (${r})`);
  const i = { type: "root", input: e, nodes: [] }, a = [i];
  let o = i, s = i, c = 0;
  const f = e.length;
  let u = 0, l = 0, p;
  const d = () => e[u++], h = (m) => {
    if (m.type === "text" && s.type === "dot" && (s.type = "text"), s && s.type === "text" && m.type === "text") {
      s.value += m.value;
      return;
    }
    return o.nodes.push(m), m.parent = o, m.prev = s, s = m, m;
  };
  for (h({ type: "bos" }); u < f; )
    if (o = a[a.length - 1], p = d(), !(p === Xg || p === Vg)) {
      if (p === Or) {
        h({ type: "text", value: (t.keepEscaping ? p : "") + d() });
        continue;
      }
      if (p === Go) {
        h({ type: "text", value: "\\" + p });
        continue;
      }
      if (p === Uo) {
        c++;
        let m;
        for (; u < f && (m = d()); ) {
          if (p += m, m === Uo) {
            c++;
            continue;
          }
          if (m === Or) {
            p += d();
            continue;
          }
          if (m === Go && (c--, c === 0))
            break;
        }
        h({ type: "text", value: p });
        continue;
      }
      if (p === qg) {
        o = h({ type: "paren", nodes: [] }), a.push(o), h({ type: "text", value: p });
        continue;
      }
      if (p === Kg) {
        if (o.type !== "paren") {
          h({ type: "text", value: p });
          continue;
        }
        o = a.pop(), h({ type: "text", value: p }), o = a[a.length - 1];
        continue;
      }
      if (p === Yg || p === Qg || p === Bg) {
        const m = p;
        let g;
        for (t.keepQuotes !== !0 && (p = ""); u < f && (g = d()); ) {
          if (g === Or) {
            p += g + d();
            continue;
          }
          if (g === m) {
            t.keepQuotes === !0 && (p += g);
            break;
          }
          p += g;
        }
        h({ type: "text", value: p });
        continue;
      }
      if (p === Wg) {
        l++;
        const g = {
          type: "brace",
          open: !0,
          close: !1,
          dollar: s.value && s.value.slice(-1) === "$" || o.dollar === !0,
          depth: l,
          commas: 0,
          ranges: 0,
          nodes: []
        };
        o = h(g), a.push(o), h({ type: "open", value: p });
        continue;
      }
      if (p === zg) {
        if (o.type !== "brace") {
          h({ type: "text", value: p });
          continue;
        }
        const m = "close";
        o = a.pop(), o.close = !0, h({ type: m, value: p }), l--, o = a[a.length - 1];
        continue;
      }
      if (p === Ug && l > 0) {
        if (o.ranges > 0) {
          o.ranges = 0;
          const m = o.nodes.shift();
          o.nodes = [m, { type: "text", value: Hg(o) }];
        }
        h({ type: "comma", value: p }), o.commas++;
        continue;
      }
      if (p === Gg && l > 0 && o.commas === 0) {
        const m = o.nodes;
        if (l === 0 || m.length === 0) {
          h({ type: "text", value: p });
          continue;
        }
        if (s.type === "dot") {
          if (o.range = [], s.value += p, s.type = "range", o.nodes.length !== 3 && o.nodes.length !== 5) {
            o.invalid = !0, o.ranges = 0, s.type = "text";
            continue;
          }
          o.ranges++, o.args = [];
          continue;
        }
        if (s.type === "range") {
          m.pop();
          const g = m[m.length - 1];
          g.value += s.value + p, s = g, o.ranges--;
          continue;
        }
        h({ type: "dot", value: p });
        continue;
      }
      h({ type: "text", value: p });
    }
  do
    if (o = a.pop(), o.type !== "root") {
      o.nodes.forEach((w) => {
        w.nodes || (w.type === "open" && (w.isOpen = !0), w.type === "close" && (w.isClose = !0), w.nodes || (w.type = "text"), w.invalid = !0);
      });
      const m = a[a.length - 1], g = m.nodes.indexOf(o);
      m.nodes.splice(g, 1, ...o.nodes);
    }
  while (a.length > 0);
  return h({ type: "eos" }), i;
};
var Jg = Zg;
const qo = Pi, ey = Lg, ty = Mg, ny = Jg, _e = (e, t = {}) => {
  let n = [];
  if (Array.isArray(e))
    for (const r of e) {
      const i = _e.create(r, t);
      Array.isArray(i) ? n.push(...i) : n.push(i);
    }
  else
    n = [].concat(_e.create(e, t));
  return t && t.expand === !0 && t.nodupes === !0 && (n = [...new Set(n)]), n;
};
_e.parse = (e, t = {}) => ny(e, t);
_e.stringify = (e, t = {}) => qo(typeof e == "string" ? _e.parse(e, t) : e, t);
_e.compile = (e, t = {}) => (typeof e == "string" && (e = _e.parse(e, t)), ey(e, t));
_e.expand = (e, t = {}) => {
  typeof e == "string" && (e = _e.parse(e, t));
  let n = ty(e, t);
  return t.noempty === !0 && (n = n.filter(Boolean)), t.nodupes === !0 && (n = [...new Set(n)]), n;
};
_e.create = (e, t = {}) => e === "" || e.length < 3 ? [e] : t.expand !== !0 ? _e.compile(e, t) : _e.expand(e, t);
var ry = _e, Yt = {};
const iy = Ee, Ne = "\\\\/", Ko = `[^${Ne}]`, He = "\\.", oy = "\\+", ay = "\\?", sr = "\\/", sy = "(?=.)", ic = "[^/]", Li = `(?:${sr}|$)`, oc = `(?:^|${sr})`, ki = `${He}{1,2}${Li}`, cy = `(?!${He})`, uy = `(?!${oc}${ki})`, ly = `(?!${He}{0,1}${Li})`, fy = `(?!${ki})`, py = `[^.${sr}]`, dy = `${ic}*?`, ac = {
  DOT_LITERAL: He,
  PLUS_LITERAL: oy,
  QMARK_LITERAL: ay,
  SLASH_LITERAL: sr,
  ONE_CHAR: sy,
  QMARK: ic,
  END_ANCHOR: Li,
  DOTS_SLASH: ki,
  NO_DOT: cy,
  NO_DOTS: uy,
  NO_DOT_SLASH: ly,
  NO_DOTS_SLASH: fy,
  QMARK_NO_DOT: py,
  STAR: dy,
  START_ANCHOR: oc
}, hy = {
  ...ac,
  SLASH_LITERAL: `[${Ne}]`,
  QMARK: Ko,
  STAR: `${Ko}*?`,
  DOTS_SLASH: `${He}{1,2}(?:[${Ne}]|$)`,
  NO_DOT: `(?!${He})`,
  NO_DOTS: `(?!(?:^|[${Ne}])${He}{1,2}(?:[${Ne}]|$))`,
  NO_DOT_SLASH: `(?!${He}{0,1}(?:[${Ne}]|$))`,
  NO_DOTS_SLASH: `(?!${He}{1,2}(?:[${Ne}]|$))`,
  QMARK_NO_DOT: `[^.${Ne}]`,
  START_ANCHOR: `(?:^|[${Ne}])`,
  END_ANCHOR: `(?:[${Ne}]|$)`
}, my = {
  alnum: "a-zA-Z0-9",
  alpha: "a-zA-Z",
  ascii: "\\x00-\\x7F",
  blank: " \\t",
  cntrl: "\\x00-\\x1F\\x7F",
  digit: "0-9",
  graph: "\\x21-\\x7E",
  lower: "a-z",
  print: "\\x20-\\x7E ",
  punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
  space: " \\t\\r\\n\\v\\f",
  upper: "A-Z",
  word: "A-Za-z0-9_",
  xdigit: "A-Fa-f0-9"
};
var cr = {
  MAX_LENGTH: 1024 * 64,
  POSIX_REGEX_SOURCE: my,
  // regular expressions
  REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
  REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
  REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
  REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
  REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
  REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
  // Replace globs with equivalent patterns to reduce parsing time.
  REPLACEMENTS: {
    "***": "*",
    "**/**": "**",
    "**/**/**": "**"
  },
  // Digits
  CHAR_0: 48,
  /* 0 */
  CHAR_9: 57,
  /* 9 */
  // Alphabet chars.
  CHAR_UPPERCASE_A: 65,
  /* A */
  CHAR_LOWERCASE_A: 97,
  /* a */
  CHAR_UPPERCASE_Z: 90,
  /* Z */
  CHAR_LOWERCASE_Z: 122,
  /* z */
  CHAR_LEFT_PARENTHESES: 40,
  /* ( */
  CHAR_RIGHT_PARENTHESES: 41,
  /* ) */
  CHAR_ASTERISK: 42,
  /* * */
  // Non-alphabetic chars.
  CHAR_AMPERSAND: 38,
  /* & */
  CHAR_AT: 64,
  /* @ */
  CHAR_BACKWARD_SLASH: 92,
  /* \ */
  CHAR_CARRIAGE_RETURN: 13,
  /* \r */
  CHAR_CIRCUMFLEX_ACCENT: 94,
  /* ^ */
  CHAR_COLON: 58,
  /* : */
  CHAR_COMMA: 44,
  /* , */
  CHAR_DOT: 46,
  /* . */
  CHAR_DOUBLE_QUOTE: 34,
  /* " */
  CHAR_EQUAL: 61,
  /* = */
  CHAR_EXCLAMATION_MARK: 33,
  /* ! */
  CHAR_FORM_FEED: 12,
  /* \f */
  CHAR_FORWARD_SLASH: 47,
  /* / */
  CHAR_GRAVE_ACCENT: 96,
  /* ` */
  CHAR_HASH: 35,
  /* # */
  CHAR_HYPHEN_MINUS: 45,
  /* - */
  CHAR_LEFT_ANGLE_BRACKET: 60,
  /* < */
  CHAR_LEFT_CURLY_BRACE: 123,
  /* { */
  CHAR_LEFT_SQUARE_BRACKET: 91,
  /* [ */
  CHAR_LINE_FEED: 10,
  /* \n */
  CHAR_NO_BREAK_SPACE: 160,
  /* \u00A0 */
  CHAR_PERCENT: 37,
  /* % */
  CHAR_PLUS: 43,
  /* + */
  CHAR_QUESTION_MARK: 63,
  /* ? */
  CHAR_RIGHT_ANGLE_BRACKET: 62,
  /* > */
  CHAR_RIGHT_CURLY_BRACE: 125,
  /* } */
  CHAR_RIGHT_SQUARE_BRACKET: 93,
  /* ] */
  CHAR_SEMICOLON: 59,
  /* ; */
  CHAR_SINGLE_QUOTE: 39,
  /* ' */
  CHAR_SPACE: 32,
  /*   */
  CHAR_TAB: 9,
  /* \t */
  CHAR_UNDERSCORE: 95,
  /* _ */
  CHAR_VERTICAL_LINE: 124,
  /* | */
  CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
  /* \uFEFF */
  SEP: iy.sep,
  /**
   * Create EXTGLOB_CHARS
   */
  extglobChars(e) {
    return {
      "!": { type: "negate", open: "(?:(?!(?:", close: `))${e.STAR})` },
      "?": { type: "qmark", open: "(?:", close: ")?" },
      "+": { type: "plus", open: "(?:", close: ")+" },
      "*": { type: "star", open: "(?:", close: ")*" },
      "@": { type: "at", open: "(?:", close: ")" }
    };
  },
  /**
   * Create GLOB_CHARS
   */
  globChars(e) {
    return e === !0 ? hy : ac;
  }
};
(function(e) {
  const t = Ee, n = process.platform === "win32", {
    REGEX_BACKSLASH: r,
    REGEX_REMOVE_BACKSLASH: i,
    REGEX_SPECIAL_CHARS: a,
    REGEX_SPECIAL_CHARS_GLOBAL: o
  } = cr;
  e.isObject = (s) => s !== null && typeof s == "object" && !Array.isArray(s), e.hasRegexChars = (s) => a.test(s), e.isRegexChar = (s) => s.length === 1 && e.hasRegexChars(s), e.escapeRegex = (s) => s.replace(o, "\\$1"), e.toPosixSlashes = (s) => s.replace(r, "/"), e.removeBackslashes = (s) => s.replace(i, (c) => c === "\\" ? "" : c), e.supportsLookbehinds = () => {
    const s = process.version.slice(1).split(".").map(Number);
    return s.length === 3 && s[0] >= 9 || s[0] === 8 && s[1] >= 10;
  }, e.isWindows = (s) => s && typeof s.windows == "boolean" ? s.windows : n === !0 || t.sep === "\\", e.escapeLast = (s, c, f) => {
    const u = s.lastIndexOf(c, f);
    return u === -1 ? s : s[u - 1] === "\\" ? e.escapeLast(s, c, u - 1) : `${s.slice(0, u)}\\${s.slice(u)}`;
  }, e.removePrefix = (s, c = {}) => {
    let f = s;
    return f.startsWith("./") && (f = f.slice(2), c.prefix = "./"), f;
  }, e.wrapOutput = (s, c = {}, f = {}) => {
    const u = f.contains ? "" : "^", l = f.contains ? "" : "$";
    let p = `${u}(?:${s})${l}`;
    return c.negated === !0 && (p = `(?:^(?!${p}).*$)`), p;
  };
})(Yt);
const Wo = Yt, {
  CHAR_ASTERISK: Nr,
  /* * */
  CHAR_AT: gy,
  /* @ */
  CHAR_BACKWARD_SLASH: Dt,
  /* \ */
  CHAR_COMMA: yy,
  /* , */
  CHAR_DOT: Pr,
  /* . */
  CHAR_EXCLAMATION_MARK: Lr,
  /* ! */
  CHAR_FORWARD_SLASH: sc,
  /* / */
  CHAR_LEFT_CURLY_BRACE: kr,
  /* { */
  CHAR_LEFT_PARENTHESES: Dr,
  /* ( */
  CHAR_LEFT_SQUARE_BRACKET: vy,
  /* [ */
  CHAR_PLUS: wy,
  /* + */
  CHAR_QUESTION_MARK: zo,
  /* ? */
  CHAR_RIGHT_CURLY_BRACE: Ey,
  /* } */
  CHAR_RIGHT_PARENTHESES: Yo,
  /* ) */
  CHAR_RIGHT_SQUARE_BRACKET: by
  /* ] */
} = cr, Qo = (e) => e === sc || e === Dt, Vo = (e) => {
  e.isPrefix !== !0 && (e.depth = e.isGlobstar ? 1 / 0 : 1);
}, Sy = (e, t) => {
  const n = t || {}, r = e.length - 1, i = n.parts === !0 || n.scanToEnd === !0, a = [], o = [], s = [];
  let c = e, f = -1, u = 0, l = 0, p = !1, d = !1, h = !1, m = !1, g = !1, w = !1, S = !1, x = !1, C = !1, T = !1, I = 0, k, A, _ = { value: "", depth: 0, isGlob: !1 };
  const O = () => f >= r, v = () => c.charCodeAt(f + 1), M = () => (k = A, c.charCodeAt(++f));
  for (; f < r; ) {
    A = M();
    let F;
    if (A === Dt) {
      S = _.backslashes = !0, A = M(), A === kr && (w = !0);
      continue;
    }
    if (w === !0 || A === kr) {
      for (I++; O() !== !0 && (A = M()); ) {
        if (A === Dt) {
          S = _.backslashes = !0, M();
          continue;
        }
        if (A === kr) {
          I++;
          continue;
        }
        if (w !== !0 && A === Pr && (A = M()) === Pr) {
          if (p = _.isBrace = !0, h = _.isGlob = !0, T = !0, i === !0)
            continue;
          break;
        }
        if (w !== !0 && A === yy) {
          if (p = _.isBrace = !0, h = _.isGlob = !0, T = !0, i === !0)
            continue;
          break;
        }
        if (A === Ey && (I--, I === 0)) {
          w = !1, p = _.isBrace = !0, T = !0;
          break;
        }
      }
      if (i === !0)
        continue;
      break;
    }
    if (A === sc) {
      if (a.push(f), o.push(_), _ = { value: "", depth: 0, isGlob: !1 }, T === !0) continue;
      if (k === Pr && f === u + 1) {
        u += 2;
        continue;
      }
      l = f + 1;
      continue;
    }
    if (n.noext !== !0 && (A === wy || A === gy || A === Nr || A === zo || A === Lr) === !0 && v() === Dr) {
      if (h = _.isGlob = !0, m = _.isExtglob = !0, T = !0, A === Lr && f === u && (C = !0), i === !0) {
        for (; O() !== !0 && (A = M()); ) {
          if (A === Dt) {
            S = _.backslashes = !0, A = M();
            continue;
          }
          if (A === Yo) {
            h = _.isGlob = !0, T = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (A === Nr) {
      if (k === Nr && (g = _.isGlobstar = !0), h = _.isGlob = !0, T = !0, i === !0)
        continue;
      break;
    }
    if (A === zo) {
      if (h = _.isGlob = !0, T = !0, i === !0)
        continue;
      break;
    }
    if (A === vy) {
      for (; O() !== !0 && (F = M()); ) {
        if (F === Dt) {
          S = _.backslashes = !0, M();
          continue;
        }
        if (F === by) {
          d = _.isBracket = !0, h = _.isGlob = !0, T = !0;
          break;
        }
      }
      if (i === !0)
        continue;
      break;
    }
    if (n.nonegate !== !0 && A === Lr && f === u) {
      x = _.negated = !0, u++;
      continue;
    }
    if (n.noparen !== !0 && A === Dr) {
      if (h = _.isGlob = !0, i === !0) {
        for (; O() !== !0 && (A = M()); ) {
          if (A === Dr) {
            S = _.backslashes = !0, A = M();
            continue;
          }
          if (A === Yo) {
            T = !0;
            break;
          }
        }
        continue;
      }
      break;
    }
    if (h === !0) {
      if (T = !0, i === !0)
        continue;
      break;
    }
  }
  n.noext === !0 && (m = !1, h = !1);
  let j = c, G = "", E = "";
  u > 0 && (G = c.slice(0, u), c = c.slice(u), l -= u), j && h === !0 && l > 0 ? (j = c.slice(0, l), E = c.slice(l)) : h === !0 ? (j = "", E = c) : j = c, j && j !== "" && j !== "/" && j !== c && Qo(j.charCodeAt(j.length - 1)) && (j = j.slice(0, -1)), n.unescape === !0 && (E && (E = Wo.removeBackslashes(E)), j && S === !0 && (j = Wo.removeBackslashes(j)));
  const b = {
    prefix: G,
    input: e,
    start: u,
    base: j,
    glob: E,
    isBrace: p,
    isBracket: d,
    isGlob: h,
    isExtglob: m,
    isGlobstar: g,
    negated: x,
    negatedExtglob: C
  };
  if (n.tokens === !0 && (b.maxDepth = 0, Qo(A) || o.push(_), b.tokens = o), n.parts === !0 || n.tokens === !0) {
    let F;
    for (let D = 0; D < a.length; D++) {
      const H = F ? F + 1 : u, q = a[D], z = e.slice(H, q);
      n.tokens && (D === 0 && u !== 0 ? (o[D].isPrefix = !0, o[D].value = G) : o[D].value = z, Vo(o[D]), b.maxDepth += o[D].depth), (D !== 0 || z !== "") && s.push(z), F = q;
    }
    if (F && F + 1 < e.length) {
      const D = e.slice(F + 1);
      s.push(D), n.tokens && (o[o.length - 1].value = D, Vo(o[o.length - 1]), b.maxDepth += o[o.length - 1].depth);
    }
    b.slashes = a, b.parts = s;
  }
  return b;
};
var xy = Sy;
const kn = cr, be = Yt, {
  MAX_LENGTH: Dn,
  POSIX_REGEX_SOURCE: _y,
  REGEX_NON_SPECIAL_CHARS: Ay,
  REGEX_SPECIAL_CHARS_BACKREF: Ty,
  REPLACEMENTS: cc
} = kn, Cy = (e, t) => {
  if (typeof t.expandRange == "function")
    return t.expandRange(...e, t);
  e.sort();
  const n = `[${e.join("-")}]`;
  try {
    new RegExp(n);
  } catch {
    return e.map((i) => be.escapeRegex(i)).join("..");
  }
  return n;
}, ht = (e, t) => `Missing ${e}: "${t}" - use "\\\\${t}" to match literal characters`, Di = (e, t) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  e = cc[e] || e;
  const n = { ...t }, r = typeof n.maxLength == "number" ? Math.min(Dn, n.maxLength) : Dn;
  let i = e.length;
  if (i > r)
    throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
  const a = { type: "bos", value: "", output: n.prepend || "" }, o = [a], s = n.capture ? "" : "?:", c = be.isWindows(t), f = kn.globChars(c), u = kn.extglobChars(f), {
    DOT_LITERAL: l,
    PLUS_LITERAL: p,
    SLASH_LITERAL: d,
    ONE_CHAR: h,
    DOTS_SLASH: m,
    NO_DOT: g,
    NO_DOT_SLASH: w,
    NO_DOTS_SLASH: S,
    QMARK: x,
    QMARK_NO_DOT: C,
    STAR: T,
    START_ANCHOR: I
  } = f, k = (P) => `(${s}(?:(?!${I}${P.dot ? m : l}).)*?)`, A = n.dot ? "" : g, _ = n.dot ? x : C;
  let O = n.bash === !0 ? k(n) : T;
  n.capture && (O = `(${O})`), typeof n.noext == "boolean" && (n.noextglob = n.noext);
  const v = {
    input: e,
    index: -1,
    start: 0,
    dot: n.dot === !0,
    consumed: "",
    output: "",
    prefix: "",
    backtrack: !1,
    negated: !1,
    brackets: 0,
    braces: 0,
    parens: 0,
    quotes: 0,
    globstar: !1,
    tokens: o
  };
  e = be.removePrefix(e, v), i = e.length;
  const M = [], j = [], G = [];
  let E = a, b;
  const F = () => v.index === i - 1, D = v.peek = (P = 1) => e[v.index + P], H = v.advance = () => e[++v.index] || "", q = () => e.slice(v.index + 1), z = (P = "", W = 0) => {
    v.consumed += P, v.index += W;
  }, J = (P) => {
    v.output += P.output != null ? P.output : P.value, z(P.value);
  }, Ae = () => {
    let P = 1;
    for (; D() === "!" && (D(2) !== "(" || D(3) === "?"); )
      H(), v.start++, P++;
    return P % 2 === 0 ? !1 : (v.negated = !0, v.start++, !0);
  }, R = (P) => {
    v[P]++, G.push(P);
  }, L = (P) => {
    v[P]--, G.pop();
  }, N = (P) => {
    if (E.type === "globstar") {
      const W = v.braces > 0 && (P.type === "comma" || P.type === "brace"), $ = P.extglob === !0 || M.length && (P.type === "pipe" || P.type === "paren");
      P.type !== "slash" && P.type !== "paren" && !W && !$ && (v.output = v.output.slice(0, -E.output.length), E.type = "star", E.value = "*", E.output = O, v.output += E.output);
    }
    if (M.length && P.type !== "paren" && (M[M.length - 1].inner += P.value), (P.value || P.output) && J(P), E && E.type === "text" && P.type === "text") {
      E.value += P.value, E.output = (E.output || "") + P.value;
      return;
    }
    P.prev = E, o.push(P), E = P;
  }, Y = (P, W) => {
    const $ = { ...u[W], conditions: 1, inner: "" };
    $.prev = E, $.parens = v.parens, $.output = v.output;
    const U = (n.capture ? "(" : "") + $.open;
    R("parens"), N({ type: P, value: W, output: v.output ? "" : h }), N({ type: "paren", extglob: !0, value: H(), output: U }), M.push($);
  }, se = (P) => {
    let W = P.close + (n.capture ? ")" : ""), $;
    if (P.type === "negate") {
      let U = O;
      if (P.inner && P.inner.length > 1 && P.inner.includes("/") && (U = k(n)), (U !== O || F() || /^\)+$/.test(q())) && (W = P.close = `)$))${U}`), P.inner.includes("*") && ($ = q()) && /^\.[^\\/.]+$/.test($)) {
        const Q = Di($, { ...t, fastpaths: !1 }).output;
        W = P.close = `)${Q})${U})`;
      }
      P.prev.type === "bos" && (v.negatedExtglob = !0);
    }
    N({ type: "paren", extglob: !0, value: b, output: W }), L("parens");
  };
  if (n.fastpaths !== !1 && !/(^[*!]|[/()[\]{}"])/.test(e)) {
    let P = !1, W = e.replace(Ty, ($, U, Q, ie, V, Oe) => ie === "\\" ? (P = !0, $) : ie === "?" ? U ? U + ie + (V ? x.repeat(V.length) : "") : Oe === 0 ? _ + (V ? x.repeat(V.length) : "") : x.repeat(Q.length) : ie === "." ? l.repeat(Q.length) : ie === "*" ? U ? U + ie + (V ? O : "") : O : U ? $ : `\\${$}`);
    return P === !0 && (n.unescape === !0 ? W = W.replace(/\\/g, "") : W = W.replace(/\\+/g, ($) => $.length % 2 === 0 ? "\\\\" : $ ? "\\" : "")), W === e && n.contains === !0 ? (v.output = e, v) : (v.output = be.wrapOutput(W, v, t), v);
  }
  for (; !F(); ) {
    if (b = H(), b === "\0")
      continue;
    if (b === "\\") {
      const $ = D();
      if ($ === "/" && n.bash !== !0 || $ === "." || $ === ";")
        continue;
      if (!$) {
        b += "\\", N({ type: "text", value: b });
        continue;
      }
      const U = /^\\+/.exec(q());
      let Q = 0;
      if (U && U[0].length > 2 && (Q = U[0].length, v.index += Q, Q % 2 !== 0 && (b += "\\")), n.unescape === !0 ? b = H() : b += H(), v.brackets === 0) {
        N({ type: "text", value: b });
        continue;
      }
    }
    if (v.brackets > 0 && (b !== "]" || E.value === "[" || E.value === "[^")) {
      if (n.posix !== !1 && b === ":") {
        const $ = E.value.slice(1);
        if ($.includes("[") && (E.posix = !0, $.includes(":"))) {
          const U = E.value.lastIndexOf("["), Q = E.value.slice(0, U), ie = E.value.slice(U + 2), V = _y[ie];
          if (V) {
            E.value = Q + V, v.backtrack = !0, H(), !a.output && o.indexOf(E) === 1 && (a.output = h);
            continue;
          }
        }
      }
      (b === "[" && D() !== ":" || b === "-" && D() === "]") && (b = `\\${b}`), b === "]" && (E.value === "[" || E.value === "[^") && (b = `\\${b}`), n.posix === !0 && b === "!" && E.value === "[" && (b = "^"), E.value += b, J({ value: b });
      continue;
    }
    if (v.quotes === 1 && b !== '"') {
      b = be.escapeRegex(b), E.value += b, J({ value: b });
      continue;
    }
    if (b === '"') {
      v.quotes = v.quotes === 1 ? 0 : 1, n.keepQuotes === !0 && N({ type: "text", value: b });
      continue;
    }
    if (b === "(") {
      R("parens"), N({ type: "paren", value: b });
      continue;
    }
    if (b === ")") {
      if (v.parens === 0 && n.strictBrackets === !0)
        throw new SyntaxError(ht("opening", "("));
      const $ = M[M.length - 1];
      if ($ && v.parens === $.parens + 1) {
        se(M.pop());
        continue;
      }
      N({ type: "paren", value: b, output: v.parens ? ")" : "\\)" }), L("parens");
      continue;
    }
    if (b === "[") {
      if (n.nobracket === !0 || !q().includes("]")) {
        if (n.nobracket !== !0 && n.strictBrackets === !0)
          throw new SyntaxError(ht("closing", "]"));
        b = `\\${b}`;
      } else
        R("brackets");
      N({ type: "bracket", value: b });
      continue;
    }
    if (b === "]") {
      if (n.nobracket === !0 || E && E.type === "bracket" && E.value.length === 1) {
        N({ type: "text", value: b, output: `\\${b}` });
        continue;
      }
      if (v.brackets === 0) {
        if (n.strictBrackets === !0)
          throw new SyntaxError(ht("opening", "["));
        N({ type: "text", value: b, output: `\\${b}` });
        continue;
      }
      L("brackets");
      const $ = E.value.slice(1);
      if (E.posix !== !0 && $[0] === "^" && !$.includes("/") && (b = `/${b}`), E.value += b, J({ value: b }), n.literalBrackets === !1 || be.hasRegexChars($))
        continue;
      const U = be.escapeRegex(E.value);
      if (v.output = v.output.slice(0, -E.value.length), n.literalBrackets === !0) {
        v.output += U, E.value = U;
        continue;
      }
      E.value = `(${s}${U}|${E.value})`, v.output += E.value;
      continue;
    }
    if (b === "{" && n.nobrace !== !0) {
      R("braces");
      const $ = {
        type: "brace",
        value: b,
        output: "(",
        outputIndex: v.output.length,
        tokensIndex: v.tokens.length
      };
      j.push($), N($);
      continue;
    }
    if (b === "}") {
      const $ = j[j.length - 1];
      if (n.nobrace === !0 || !$) {
        N({ type: "text", value: b, output: b });
        continue;
      }
      let U = ")";
      if ($.dots === !0) {
        const Q = o.slice(), ie = [];
        for (let V = Q.length - 1; V >= 0 && (o.pop(), Q[V].type !== "brace"); V--)
          Q[V].type !== "dots" && ie.unshift(Q[V].value);
        U = Cy(ie, n), v.backtrack = !0;
      }
      if ($.comma !== !0 && $.dots !== !0) {
        const Q = v.output.slice(0, $.outputIndex), ie = v.tokens.slice($.tokensIndex);
        $.value = $.output = "\\{", b = U = "\\}", v.output = Q;
        for (const V of ie)
          v.output += V.output || V.value;
      }
      N({ type: "brace", value: b, output: U }), L("braces"), j.pop();
      continue;
    }
    if (b === "|") {
      M.length > 0 && M[M.length - 1].conditions++, N({ type: "text", value: b });
      continue;
    }
    if (b === ",") {
      let $ = b;
      const U = j[j.length - 1];
      U && G[G.length - 1] === "braces" && (U.comma = !0, $ = "|"), N({ type: "comma", value: b, output: $ });
      continue;
    }
    if (b === "/") {
      if (E.type === "dot" && v.index === v.start + 1) {
        v.start = v.index + 1, v.consumed = "", v.output = "", o.pop(), E = a;
        continue;
      }
      N({ type: "slash", value: b, output: d });
      continue;
    }
    if (b === ".") {
      if (v.braces > 0 && E.type === "dot") {
        E.value === "." && (E.output = l);
        const $ = j[j.length - 1];
        E.type = "dots", E.output += b, E.value += b, $.dots = !0;
        continue;
      }
      if (v.braces + v.parens === 0 && E.type !== "bos" && E.type !== "slash") {
        N({ type: "text", value: b, output: l });
        continue;
      }
      N({ type: "dot", value: b, output: l });
      continue;
    }
    if (b === "?") {
      if (!(E && E.value === "(") && n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        Y("qmark", b);
        continue;
      }
      if (E && E.type === "paren") {
        const U = D();
        let Q = b;
        if (U === "<" && !be.supportsLookbehinds())
          throw new Error("Node.js v10 or higher is required for regex lookbehinds");
        (E.value === "(" && !/[!=<:]/.test(U) || U === "<" && !/<([!=]|\w+>)/.test(q())) && (Q = `\\${b}`), N({ type: "text", value: b, output: Q });
        continue;
      }
      if (n.dot !== !0 && (E.type === "slash" || E.type === "bos")) {
        N({ type: "qmark", value: b, output: C });
        continue;
      }
      N({ type: "qmark", value: b, output: x });
      continue;
    }
    if (b === "!") {
      if (n.noextglob !== !0 && D() === "(" && (D(2) !== "?" || !/[!=<:]/.test(D(3)))) {
        Y("negate", b);
        continue;
      }
      if (n.nonegate !== !0 && v.index === 0) {
        Ae();
        continue;
      }
    }
    if (b === "+") {
      if (n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        Y("plus", b);
        continue;
      }
      if (E && E.value === "(" || n.regex === !1) {
        N({ type: "plus", value: b, output: p });
        continue;
      }
      if (E && (E.type === "bracket" || E.type === "paren" || E.type === "brace") || v.parens > 0) {
        N({ type: "plus", value: b });
        continue;
      }
      N({ type: "plus", value: p });
      continue;
    }
    if (b === "@") {
      if (n.noextglob !== !0 && D() === "(" && D(2) !== "?") {
        N({ type: "at", extglob: !0, value: b, output: "" });
        continue;
      }
      N({ type: "text", value: b });
      continue;
    }
    if (b !== "*") {
      (b === "$" || b === "^") && (b = `\\${b}`);
      const $ = Ay.exec(q());
      $ && (b += $[0], v.index += $[0].length), N({ type: "text", value: b });
      continue;
    }
    if (E && (E.type === "globstar" || E.star === !0)) {
      E.type = "star", E.star = !0, E.value += b, E.output = O, v.backtrack = !0, v.globstar = !0, z(b);
      continue;
    }
    let P = q();
    if (n.noextglob !== !0 && /^\([^?]/.test(P)) {
      Y("star", b);
      continue;
    }
    if (E.type === "star") {
      if (n.noglobstar === !0) {
        z(b);
        continue;
      }
      const $ = E.prev, U = $.prev, Q = $.type === "slash" || $.type === "bos", ie = U && (U.type === "star" || U.type === "globstar");
      if (n.bash === !0 && (!Q || P[0] && P[0] !== "/")) {
        N({ type: "star", value: b, output: "" });
        continue;
      }
      const V = v.braces > 0 && ($.type === "comma" || $.type === "brace"), Oe = M.length && ($.type === "pipe" || $.type === "paren");
      if (!Q && $.type !== "paren" && !V && !Oe) {
        N({ type: "star", value: b, output: "" });
        continue;
      }
      for (; P.slice(0, 3) === "/**"; ) {
        const je = e[v.index + 4];
        if (je && je !== "/")
          break;
        P = P.slice(3), z("/**", 3);
      }
      if ($.type === "bos" && F()) {
        E.type = "globstar", E.value += b, E.output = k(n), v.output = E.output, v.globstar = !0, z(b);
        continue;
      }
      if ($.type === "slash" && $.prev.type !== "bos" && !ie && F()) {
        v.output = v.output.slice(0, -($.output + E.output).length), $.output = `(?:${$.output}`, E.type = "globstar", E.output = k(n) + (n.strictSlashes ? ")" : "|$)"), E.value += b, v.globstar = !0, v.output += $.output + E.output, z(b);
        continue;
      }
      if ($.type === "slash" && $.prev.type !== "bos" && P[0] === "/") {
        const je = P[1] !== void 0 ? "|$" : "";
        v.output = v.output.slice(0, -($.output + E.output).length), $.output = `(?:${$.output}`, E.type = "globstar", E.output = `${k(n)}${d}|${d}${je})`, E.value += b, v.output += $.output + E.output, v.globstar = !0, z(b + H()), N({ type: "slash", value: "/", output: "" });
        continue;
      }
      if ($.type === "bos" && P[0] === "/") {
        E.type = "globstar", E.value += b, E.output = `(?:^|${d}|${k(n)}${d})`, v.output = E.output, v.globstar = !0, z(b + H()), N({ type: "slash", value: "/", output: "" });
        continue;
      }
      v.output = v.output.slice(0, -E.output.length), E.type = "globstar", E.output = k(n), E.value += b, v.output += E.output, v.globstar = !0, z(b);
      continue;
    }
    const W = { type: "star", value: b, output: O };
    if (n.bash === !0) {
      W.output = ".*?", (E.type === "bos" || E.type === "slash") && (W.output = A + W.output), N(W);
      continue;
    }
    if (E && (E.type === "bracket" || E.type === "paren") && n.regex === !0) {
      W.output = b, N(W);
      continue;
    }
    (v.index === v.start || E.type === "slash" || E.type === "dot") && (E.type === "dot" ? (v.output += w, E.output += w) : n.dot === !0 ? (v.output += S, E.output += S) : (v.output += A, E.output += A), D() !== "*" && (v.output += h, E.output += h)), N(W);
  }
  for (; v.brackets > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(ht("closing", "]"));
    v.output = be.escapeLast(v.output, "["), L("brackets");
  }
  for (; v.parens > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(ht("closing", ")"));
    v.output = be.escapeLast(v.output, "("), L("parens");
  }
  for (; v.braces > 0; ) {
    if (n.strictBrackets === !0) throw new SyntaxError(ht("closing", "}"));
    v.output = be.escapeLast(v.output, "{"), L("braces");
  }
  if (n.strictSlashes !== !0 && (E.type === "star" || E.type === "bracket") && N({ type: "maybe_slash", value: "", output: `${d}?` }), v.backtrack === !0) {
    v.output = "";
    for (const P of v.tokens)
      v.output += P.output != null ? P.output : P.value, P.suffix && (v.output += P.suffix);
  }
  return v;
};
Di.fastpaths = (e, t) => {
  const n = { ...t }, r = typeof n.maxLength == "number" ? Math.min(Dn, n.maxLength) : Dn, i = e.length;
  if (i > r)
    throw new SyntaxError(`Input length: ${i}, exceeds maximum allowed length: ${r}`);
  e = cc[e] || e;
  const a = be.isWindows(t), {
    DOT_LITERAL: o,
    SLASH_LITERAL: s,
    ONE_CHAR: c,
    DOTS_SLASH: f,
    NO_DOT: u,
    NO_DOTS: l,
    NO_DOTS_SLASH: p,
    STAR: d,
    START_ANCHOR: h
  } = kn.globChars(a), m = n.dot ? l : u, g = n.dot ? p : u, w = n.capture ? "" : "?:", S = { negated: !1, prefix: "" };
  let x = n.bash === !0 ? ".*?" : d;
  n.capture && (x = `(${x})`);
  const C = (A) => A.noglobstar === !0 ? x : `(${w}(?:(?!${h}${A.dot ? f : o}).)*?)`, T = (A) => {
    switch (A) {
      case "*":
        return `${m}${c}${x}`;
      case ".*":
        return `${o}${c}${x}`;
      case "*.*":
        return `${m}${x}${o}${c}${x}`;
      case "*/*":
        return `${m}${x}${s}${c}${g}${x}`;
      case "**":
        return m + C(n);
      case "**/*":
        return `(?:${m}${C(n)}${s})?${g}${c}${x}`;
      case "**/*.*":
        return `(?:${m}${C(n)}${s})?${g}${x}${o}${c}${x}`;
      case "**/.*":
        return `(?:${m}${C(n)}${s})?${o}${c}${x}`;
      default: {
        const _ = /^(.*?)\.(\w+)$/.exec(A);
        if (!_) return;
        const O = T(_[1]);
        return O ? O + o + _[2] : void 0;
      }
    }
  }, I = be.removePrefix(e, S);
  let k = T(I);
  return k && n.strictSlashes !== !0 && (k += `${s}?`), k;
};
var Ry = Di;
const Fy = Ee, $y = xy, oi = Ry, Mi = Yt, Iy = cr, Oy = (e) => e && typeof e == "object" && !Array.isArray(e), oe = (e, t, n = !1) => {
  if (Array.isArray(e)) {
    const u = e.map((p) => oe(p, t, n));
    return (p) => {
      for (const d of u) {
        const h = d(p);
        if (h) return h;
      }
      return !1;
    };
  }
  const r = Oy(e) && e.tokens && e.input;
  if (e === "" || typeof e != "string" && !r)
    throw new TypeError("Expected pattern to be a non-empty string");
  const i = t || {}, a = Mi.isWindows(t), o = r ? oe.compileRe(e, t) : oe.makeRe(e, t, !1, !0), s = o.state;
  delete o.state;
  let c = () => !1;
  if (i.ignore) {
    const u = { ...t, ignore: null, onMatch: null, onResult: null };
    c = oe(i.ignore, u, n);
  }
  const f = (u, l = !1) => {
    const { isMatch: p, match: d, output: h } = oe.test(u, o, t, { glob: e, posix: a }), m = { glob: e, state: s, regex: o, posix: a, input: u, output: h, match: d, isMatch: p };
    return typeof i.onResult == "function" && i.onResult(m), p === !1 ? (m.isMatch = !1, l ? m : !1) : c(u) ? (typeof i.onIgnore == "function" && i.onIgnore(m), m.isMatch = !1, l ? m : !1) : (typeof i.onMatch == "function" && i.onMatch(m), l ? m : !0);
  };
  return n && (f.state = s), f;
};
oe.test = (e, t, n, { glob: r, posix: i } = {}) => {
  if (typeof e != "string")
    throw new TypeError("Expected input to be a string");
  if (e === "")
    return { isMatch: !1, output: "" };
  const a = n || {}, o = a.format || (i ? Mi.toPosixSlashes : null);
  let s = e === r, c = s && o ? o(e) : e;
  return s === !1 && (c = o ? o(e) : e, s = c === r), (s === !1 || a.capture === !0) && (a.matchBase === !0 || a.basename === !0 ? s = oe.matchBase(e, t, n, i) : s = t.exec(c)), { isMatch: !!s, match: s, output: c };
};
oe.matchBase = (e, t, n, r = Mi.isWindows(n)) => (t instanceof RegExp ? t : oe.makeRe(t, n)).test(Fy.basename(e));
oe.isMatch = (e, t, n) => oe(t, n)(e);
oe.parse = (e, t) => Array.isArray(e) ? e.map((n) => oe.parse(n, t)) : oi(e, { ...t, fastpaths: !1 });
oe.scan = (e, t) => $y(e, t);
oe.compileRe = (e, t, n = !1, r = !1) => {
  if (n === !0)
    return e.output;
  const i = t || {}, a = i.contains ? "" : "^", o = i.contains ? "" : "$";
  let s = `${a}(?:${e.output})${o}`;
  e && e.negated === !0 && (s = `^(?!${s}).*$`);
  const c = oe.toRegex(s, t);
  return r === !0 && (c.state = e), c;
};
oe.makeRe = (e, t = {}, n = !1, r = !1) => {
  if (!e || typeof e != "string")
    throw new TypeError("Expected a non-empty string");
  let i = { negated: !1, fastpaths: !0 };
  return t.fastpaths !== !1 && (e[0] === "." || e[0] === "*") && (i.output = oi.fastpaths(e, t)), i.output || (i = oi(e, t)), oe.compileRe(i, t, n, r);
};
oe.toRegex = (e, t) => {
  try {
    const n = t || {};
    return new RegExp(e, n.flags || (n.nocase ? "i" : ""));
  } catch (n) {
    if (t && t.debug === !0) throw n;
    return /$^/;
  }
};
oe.constants = Iy;
var Ny = oe, Py = Ny;
const uc = ut, lc = ry, Me = Py, ai = Yt, Xo = (e) => e === "" || e === "./", fc = (e) => {
  const t = e.indexOf("{");
  return t > -1 && e.indexOf("}", t) > -1;
}, Z = (e, t, n) => {
  t = [].concat(t), e = [].concat(e);
  let r = /* @__PURE__ */ new Set(), i = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Set(), o = 0, s = (u) => {
    a.add(u.output), n && n.onResult && n.onResult(u);
  };
  for (let u = 0; u < t.length; u++) {
    let l = Me(String(t[u]), { ...n, onResult: s }, !0), p = l.state.negated || l.state.negatedExtglob;
    p && o++;
    for (let d of e) {
      let h = l(d, !0);
      (p ? !h.isMatch : h.isMatch) && (p ? r.add(h.output) : (r.delete(h.output), i.add(h.output)));
    }
  }
  let f = (o === t.length ? [...a] : [...i]).filter((u) => !r.has(u));
  if (n && f.length === 0) {
    if (n.failglob === !0)
      throw new Error(`No matches found for "${t.join(", ")}"`);
    if (n.nonull === !0 || n.nullglob === !0)
      return n.unescape ? t.map((u) => u.replace(/\\/g, "")) : t;
  }
  return f;
};
Z.match = Z;
Z.matcher = (e, t) => Me(e, t);
Z.isMatch = (e, t, n) => Me(t, n)(e);
Z.any = Z.isMatch;
Z.not = (e, t, n = {}) => {
  t = [].concat(t).map(String);
  let r = /* @__PURE__ */ new Set(), i = [], a = (s) => {
    n.onResult && n.onResult(s), i.push(s.output);
  }, o = new Set(Z(e, t, { ...n, onResult: a }));
  for (let s of i)
    o.has(s) || r.add(s);
  return [...r];
};
Z.contains = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${uc.inspect(e)}"`);
  if (Array.isArray(t))
    return t.some((r) => Z.contains(e, r, n));
  if (typeof t == "string") {
    if (Xo(e) || Xo(t))
      return !1;
    if (e.includes(t) || e.startsWith("./") && e.slice(2).includes(t))
      return !0;
  }
  return Z.isMatch(e, t, { ...n, contains: !0 });
};
Z.matchKeys = (e, t, n) => {
  if (!ai.isObject(e))
    throw new TypeError("Expected the first argument to be an object");
  let r = Z(Object.keys(e), t, n), i = {};
  for (let a of r) i[a] = e[a];
  return i;
};
Z.some = (e, t, n) => {
  let r = [].concat(e);
  for (let i of [].concat(t)) {
    let a = Me(String(i), n);
    if (r.some((o) => a(o)))
      return !0;
  }
  return !1;
};
Z.every = (e, t, n) => {
  let r = [].concat(e);
  for (let i of [].concat(t)) {
    let a = Me(String(i), n);
    if (!r.every((o) => a(o)))
      return !1;
  }
  return !0;
};
Z.all = (e, t, n) => {
  if (typeof e != "string")
    throw new TypeError(`Expected a string: "${uc.inspect(e)}"`);
  return [].concat(t).every((r) => Me(r, n)(e));
};
Z.capture = (e, t, n) => {
  let r = ai.isWindows(n), a = Me.makeRe(String(e), { ...n, capture: !0 }).exec(r ? ai.toPosixSlashes(t) : t);
  if (a)
    return a.slice(1).map((o) => o === void 0 ? "" : o);
};
Z.makeRe = (...e) => Me.makeRe(...e);
Z.scan = (...e) => Me.scan(...e);
Z.parse = (e, t) => {
  let n = [];
  for (let r of [].concat(e || []))
    for (let i of lc(String(r), t))
      n.push(Me.parse(i, t));
  return n;
};
Z.braces = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return t && t.nobrace === !0 || !fc(e) ? [e] : lc(e, t);
};
Z.braceExpand = (e, t) => {
  if (typeof e != "string") throw new TypeError("Expected a string");
  return Z.braces(e, { ...t, expand: !0 });
};
Z.hasBraces = fc;
var Ly = Z, ji = ve && ve.__importDefault || function(e) {
  return e && e.__esModule ? e : { default: e };
};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.readPackageJSON = xe.extractWorkspaces = xe.isMatchWorkspaces = xe.checkWorkspaces = xe.findWorkspaceRoot = void 0;
const Mn = ji(Ee), ky = ji(mg), Zo = Xe, Dy = ji(Ly);
function Ge(e) {
  e || (e = process.cwd());
  let t = ky.default.sync(e);
  if (!t)
    return null;
  e = Mn.default.normalize(t);
  let n = null, r = e;
  do {
    const i = lr(r);
    ur(i);
    let { done: a, found: o } = pc(r, e);
    if (a)
      return o;
    n = r, r = Mn.default.dirname(r);
  } while (r !== n);
  return null;
}
xe.findWorkspaceRoot = Ge;
function pc(e, t) {
  const n = lr(e), r = ur(n);
  let i = !1, a, o;
  return r && (i = !0, o = Mn.default.relative(e, t), o === "" || Hi(o, r) ? a = e : a = null), {
    done: i,
    found: a,
    relativePath: o
  };
}
xe.checkWorkspaces = pc;
function Hi(e, t) {
  return Dy.default([e], t).length > 0;
}
xe.isMatchWorkspaces = Hi;
function ur(e) {
  const t = (e || {}).workspaces;
  return t && t.packages || (Array.isArray(t) ? t : null);
}
xe.extractWorkspaces = ur;
function lr(e) {
  const t = Mn.default.join(e, "package.json");
  return Zo.existsSync(t) ? JSON.parse(Zo.readFileSync(t, "utf8")) : null;
}
xe.readPackageJSON = lr;
Ge.findWorkspaceRoot = Ge;
Ge.readPackageJSON = lr;
Ge.extractWorkspaces = ur;
Ge.isMatchWorkspaces = Hi;
Ge.default = Ge;
xe.default = Ge;
const My = xe;
My.findWorkspaceRoot;
var jy = { exports: {} }, Bi = { exports: {} };
class Hy {
  /// value;
  /// next;
  constructor(t) {
    this.value = t, this.next = void 0;
  }
}
let By = class {
  // TODO: Use private class fields when targeting Node.js 12.
  // #_head;
  // #_tail;
  // #_size;
  constructor() {
    this.clear();
  }
  enqueue(t) {
    const n = new Hy(t);
    this._head ? (this._tail.next = n, this._tail = n) : (this._head = n, this._tail = n), this._size++;
  }
  dequeue() {
    const t = this._head;
    if (t)
      return this._head = this._head.next, this._size--, t.value;
  }
  clear() {
    this._head = void 0, this._tail = void 0, this._size = 0;
  }
  get size() {
    return this._size;
  }
  *[Symbol.iterator]() {
    let t = this._head;
    for (; t; )
      yield t.value, t = t.next;
  }
};
var Uy = By;
const Gy = Uy, qy = (e) => {
  if (!((Number.isInteger(e) || e === 1 / 0) && e > 0))
    throw new TypeError("Expected `concurrency` to be a number from 1 and up");
  const t = new Gy();
  let n = 0;
  const r = () => {
    n--, t.size > 0 && t.dequeue()();
  }, i = async (s, c, ...f) => {
    n++;
    const u = (async () => s(...f))();
    c(u);
    try {
      await u;
    } catch {
    }
    r();
  }, a = (s, c, ...f) => {
    t.enqueue(i.bind(null, s, c, ...f)), (async () => (await Promise.resolve(), n < e && t.size > 0 && t.dequeue()()))();
  }, o = (s, ...c) => new Promise((f) => {
    a(s, f, ...c);
  });
  return Object.defineProperties(o, {
    activeCount: {
      get: () => n
    },
    pendingCount: {
      get: () => t.size
    },
    clearQueue: {
      value: () => {
        t.clear();
      }
    }
  }), o;
};
var Ky = qy;
const Jo = Ky;
class dc extends Error {
  constructor(t) {
    super(), this.value = t;
  }
}
const Wy = async (e, t) => t(await e), zy = async (e) => {
  const t = await Promise.all(e);
  if (t[1] === !0)
    throw new dc(t[0]);
  return !1;
}, Yy = async (e, t, n) => {
  n = {
    concurrency: 1 / 0,
    preserveOrder: !0,
    ...n
  };
  const r = Jo(n.concurrency), i = [...e].map((o) => [o, r(Wy, o, t)]), a = Jo(n.preserveOrder ? 1 : 1 / 0);
  try {
    await Promise.all(i.map((o) => a(zy, o)));
  } catch (o) {
    if (o instanceof dc)
      return o.value;
    throw o;
  }
};
var Qy = Yy;
const hc = Ee, jn = Xe, { promisify: mc } = ut, Vy = Qy, Xy = mc(jn.stat), Zy = mc(jn.lstat), gc = {
  directory: "isDirectory",
  file: "isFile"
};
function yc({ type: e }) {
  if (!(e in gc))
    throw new Error(`Invalid type specified: ${e}`);
}
const vc = (e, t) => e === void 0 || t[gc[e]]();
Bi.exports = async (e, t) => {
  t = {
    cwd: process.cwd(),
    type: "file",
    allowSymlinks: !0,
    ...t
  }, yc(t);
  const n = t.allowSymlinks ? Xy : Zy;
  return Vy(e, async (r) => {
    try {
      const i = await n(hc.resolve(t.cwd, r));
      return vc(t.type, i);
    } catch {
      return !1;
    }
  }, t);
};
Bi.exports.sync = (e, t) => {
  t = {
    cwd: process.cwd(),
    allowSymlinks: !0,
    type: "file",
    ...t
  }, yc(t);
  const n = t.allowSymlinks ? jn.statSync : jn.lstatSync;
  for (const r of e)
    try {
      const i = n(hc.resolve(t.cwd, r));
      if (vc(t.type, i))
        return r;
    } catch {
    }
};
var Jy = Bi.exports;
(function(e) {
  const t = Ee, n = Jy, r = Ys, i = Symbol("findUp.stop");
  e.exports = async (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), u = async (l) => {
      if (typeof a != "function")
        return n(f, l);
      const p = await a(l.cwd);
      return typeof p == "string" ? n([p], l) : p;
    };
    for (; ; ) {
      const l = await u({ ...o, cwd: s });
      if (l === i)
        return;
      if (l)
        return t.resolve(s, l);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.sync = (a, o = {}) => {
    let s = t.resolve(o.cwd || "");
    const { root: c } = t.parse(s), f = [].concat(a), u = (l) => {
      if (typeof a != "function")
        return n.sync(f, l);
      const p = a(l.cwd);
      return typeof p == "string" ? n.sync([p], l) : p;
    };
    for (; ; ) {
      const l = u({ ...o, cwd: s });
      if (l === i)
        return;
      if (l)
        return t.resolve(s, l);
      if (s === c)
        return;
      s = t.dirname(s);
    }
  }, e.exports.exists = r, e.exports.sync.exists = r.sync, e.exports.stop = i;
})(jy);
var wc = { exports: {} }, qe = Iu, ev = process.cwd, mn = null, tv = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return mn || (mn = ev.call(process)), mn;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var ea = process.chdir;
  process.chdir = function(e) {
    mn = null, ea.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ea);
}
var nv = rv;
function rv(e) {
  qe.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = a(e.chown), e.fchown = a(e.fchown), e.lchown = a(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = o(e.chownSync), e.fchownSync = o(e.fchownSync), e.lchownSync = o(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = s(e.stat), e.fstat = s(e.fstat), e.lstat = s(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(u, l, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(u, l, p, d) {
    d && process.nextTick(d);
  }, e.lchownSync = function() {
  }), tv === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : (function(u) {
    function l(p, d, h) {
      var m = Date.now(), g = 0;
      u(p, d, function w(S) {
        if (S && (S.code === "EACCES" || S.code === "EPERM" || S.code === "EBUSY") && Date.now() - m < 6e4) {
          setTimeout(function() {
            e.stat(d, function(x, C) {
              x && x.code === "ENOENT" ? u(p, d, w) : h(S);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        h && h(S);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(l, u), l;
  })(e.rename)), e.read = typeof e.read != "function" ? e.read : (function(u) {
    function l(p, d, h, m, g, w) {
      var S;
      if (w && typeof w == "function") {
        var x = 0;
        S = function(C, T, I) {
          if (C && C.code === "EAGAIN" && x < 10)
            return x++, u.call(e, p, d, h, m, g, S);
          w.apply(this, arguments);
        };
      }
      return u.call(e, p, d, h, m, g, S);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(l, u), l;
  })(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ (function(u) {
    return function(l, p, d, h, m) {
      for (var g = 0; ; )
        try {
          return u.call(e, l, p, d, h, m);
        } catch (w) {
          if (w.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw w;
        }
    };
  })(e.readSync);
  function t(u) {
    u.lchmod = function(l, p, d) {
      u.open(
        l,
        qe.O_WRONLY | qe.O_SYMLINK,
        p,
        function(h, m) {
          if (h) {
            d && d(h);
            return;
          }
          u.fchmod(m, p, function(g) {
            u.close(m, function(w) {
              d && d(g || w);
            });
          });
        }
      );
    }, u.lchmodSync = function(l, p) {
      var d = u.openSync(l, qe.O_WRONLY | qe.O_SYMLINK, p), h = !0, m;
      try {
        m = u.fchmodSync(d, p), h = !1;
      } finally {
        if (h)
          try {
            u.closeSync(d);
          } catch {
          }
        else
          u.closeSync(d);
      }
      return m;
    };
  }
  function n(u) {
    qe.hasOwnProperty("O_SYMLINK") && u.futimes ? (u.lutimes = function(l, p, d, h) {
      u.open(l, qe.O_SYMLINK, function(m, g) {
        if (m) {
          h && h(m);
          return;
        }
        u.futimes(g, p, d, function(w) {
          u.close(g, function(S) {
            h && h(w || S);
          });
        });
      });
    }, u.lutimesSync = function(l, p, d) {
      var h = u.openSync(l, qe.O_SYMLINK), m, g = !0;
      try {
        m = u.futimesSync(h, p, d), g = !1;
      } finally {
        if (g)
          try {
            u.closeSync(h);
          } catch {
          }
        else
          u.closeSync(h);
      }
      return m;
    }) : u.futimes && (u.lutimes = function(l, p, d, h) {
      h && process.nextTick(h);
    }, u.lutimesSync = function() {
    });
  }
  function r(u) {
    return u && function(l, p, d) {
      return u.call(e, l, p, function(h) {
        f(h) && (h = null), d && d.apply(this, arguments);
      });
    };
  }
  function i(u) {
    return u && function(l, p) {
      try {
        return u.call(e, l, p);
      } catch (d) {
        if (!f(d)) throw d;
      }
    };
  }
  function a(u) {
    return u && function(l, p, d, h) {
      return u.call(e, l, p, d, function(m) {
        f(m) && (m = null), h && h.apply(this, arguments);
      });
    };
  }
  function o(u) {
    return u && function(l, p, d) {
      try {
        return u.call(e, l, p, d);
      } catch (h) {
        if (!f(h)) throw h;
      }
    };
  }
  function s(u) {
    return u && function(l, p, d) {
      typeof p == "function" && (d = p, p = null);
      function h(m, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), d && d.apply(this, arguments);
      }
      return p ? u.call(e, l, p, h) : u.call(e, l, h);
    };
  }
  function c(u) {
    return u && function(l, p) {
      var d = p ? u.call(e, l, p) : u.call(e, l);
      return d && (d.uid < 0 && (d.uid += 4294967296), d.gid < 0 && (d.gid += 4294967296)), d;
    };
  }
  function f(u) {
    if (!u || u.code === "ENOSYS")
      return !0;
    var l = !process.getuid || process.getuid() !== 0;
    return !!(l && (u.code === "EINVAL" || u.code === "EPERM"));
  }
}
var ta = Yn.Stream, iv = ov;
function ov(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    ta.call(this);
    var a = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var o = Object.keys(i), s = 0, c = o.length; s < c; s++) {
      var f = o[s];
      this[f] = i[f];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        a._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(u, l) {
      if (u) {
        a.emit("error", u), a.readable = !1;
        return;
      }
      a.fd = l, a.emit("open", l), a._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    ta.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var a = Object.keys(i), o = 0, s = a.length; o < s; o++) {
      var c = a[o];
      this[c] = i[c];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var av = cv, sv = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function cv(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: sv(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var te = Xe, uv = nv, lv = iv, fv = av, sn = ut, le, Hn;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (le = Symbol.for("graceful-fs.queue"), Hn = Symbol.for("graceful-fs.previous")) : (le = "___graceful-fs.queue", Hn = "___graceful-fs.previous");
function pv() {
}
function Ec(e, t) {
  Object.defineProperty(e, le, {
    get: function() {
      return t;
    }
  });
}
var it = pv;
sn.debuglog ? it = sn.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (it = function() {
  var e = sn.format.apply(sn, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!te[le]) {
  var dv = ve[le] || [];
  Ec(te, dv), te.close = (function(e) {
    function t(n, r) {
      return e.call(te, n, function(i) {
        i || na(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Hn, {
      value: e
    }), t;
  })(te.close), te.closeSync = (function(e) {
    function t(n) {
      e.apply(te, arguments), na();
    }
    return Object.defineProperty(t, Hn, {
      value: e
    }), t;
  })(te.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    it(te[le]), Ia.equal(te[le].length, 0);
  });
}
ve[le] || Ec(ve, te[le]);
var bc = Ui(fv(te));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !te.__patched && (bc = Ui(te), te.__patched = !0);
function Ui(e) {
  uv(e), e.gracefulify = Ui, e.createReadStream = T, e.createWriteStream = I;
  var t = e.readFile;
  e.readFile = n;
  function n(_, O, v) {
    return typeof O == "function" && (v = O, O = null), M(_, O, v);
    function M(j, G, E, b) {
      return t(j, G, function(F) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? mt([M, [j, G, E], F, b || Date.now(), Date.now()]) : typeof E == "function" && E.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(_, O, v, M) {
    return typeof v == "function" && (M = v, v = null), j(_, O, v, M);
    function j(G, E, b, F, D) {
      return r(G, E, b, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? mt([j, [G, E, b, F], H, D || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var a = e.appendFile;
  a && (e.appendFile = o);
  function o(_, O, v, M) {
    return typeof v == "function" && (M = v, v = null), j(_, O, v, M);
    function j(G, E, b, F, D) {
      return a(G, E, b, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? mt([j, [G, E, b, F], H, D || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var s = e.copyFile;
  s && (e.copyFile = c);
  function c(_, O, v, M) {
    return typeof v == "function" && (M = v, v = 0), j(_, O, v, M);
    function j(G, E, b, F, D) {
      return s(G, E, b, function(H) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? mt([j, [G, E, b, F], H, D || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  var f = e.readdir;
  e.readdir = l;
  var u = /^v[0-5]\./;
  function l(_, O, v) {
    typeof O == "function" && (v = O, O = null);
    var M = u.test(process.version) ? function(E, b, F, D) {
      return f(E, j(
        E,
        b,
        F,
        D
      ));
    } : function(E, b, F, D) {
      return f(E, b, j(
        E,
        b,
        F,
        D
      ));
    };
    return M(_, O, v);
    function j(G, E, b, F) {
      return function(D, H) {
        D && (D.code === "EMFILE" || D.code === "ENFILE") ? mt([
          M,
          [G, E, b],
          D,
          F || Date.now(),
          Date.now()
        ]) : (H && H.sort && H.sort(), typeof b == "function" && b.call(this, D, H));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = lv(e);
    w = p.ReadStream, x = p.WriteStream;
  }
  var d = e.ReadStream;
  d && (w.prototype = Object.create(d.prototype), w.prototype.open = S);
  var h = e.WriteStream;
  h && (x.prototype = Object.create(h.prototype), x.prototype.open = C), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return w;
    },
    set: function(_) {
      w = _;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return x;
    },
    set: function(_) {
      x = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var m = w;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return m;
    },
    set: function(_) {
      m = _;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = x;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(_) {
      g = _;
    },
    enumerable: !0,
    configurable: !0
  });
  function w(_, O) {
    return this instanceof w ? (d.apply(this, arguments), this) : w.apply(Object.create(w.prototype), arguments);
  }
  function S() {
    var _ = this;
    A(_.path, _.flags, _.mode, function(O, v) {
      O ? (_.autoClose && _.destroy(), _.emit("error", O)) : (_.fd = v, _.emit("open", v), _.read());
    });
  }
  function x(_, O) {
    return this instanceof x ? (h.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
  }
  function C() {
    var _ = this;
    A(_.path, _.flags, _.mode, function(O, v) {
      O ? (_.destroy(), _.emit("error", O)) : (_.fd = v, _.emit("open", v));
    });
  }
  function T(_, O) {
    return new e.ReadStream(_, O);
  }
  function I(_, O) {
    return new e.WriteStream(_, O);
  }
  var k = e.open;
  e.open = A;
  function A(_, O, v, M) {
    return typeof v == "function" && (M = v, v = null), j(_, O, v, M);
    function j(G, E, b, F, D) {
      return k(G, E, b, function(H, q) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? mt([j, [G, E, b, F], H, D || Date.now(), Date.now()]) : typeof F == "function" && F.apply(this, arguments);
      });
    }
  }
  return e;
}
function mt(e) {
  it("ENQUEUE", e[0].name, e[1]), te[le].push(e), Gi();
}
var cn;
function na() {
  for (var e = Date.now(), t = 0; t < te[le].length; ++t)
    te[le][t].length > 2 && (te[le][t][3] = e, te[le][t][4] = e);
  Gi();
}
function Gi() {
  if (clearTimeout(cn), cn = void 0, te[le].length !== 0) {
    var e = te[le].shift(), t = e[0], n = e[1], r = e[2], i = e[3], a = e[4];
    if (i === void 0)
      it("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      it("TIMEOUT", t.name, n);
      var o = n.pop();
      typeof o == "function" && o.call(null, r);
    } else {
      var s = Date.now() - a, c = Math.max(a - i, 1), f = Math.min(c * 1.2, 100);
      s >= f ? (it("RETRY", t.name, n), t.apply(null, n.concat([i]))) : te[le].push(e);
    }
    cn === void 0 && (cn = setTimeout(Gi, 0));
  }
}
const ra = (e, t) => function(...n) {
  const r = t.promiseModule;
  return new r((i, a) => {
    t.multiArgs ? n.push((...o) => {
      t.errorFirst ? o[0] ? a(o) : (o.shift(), i(o)) : i(o);
    }) : t.errorFirst ? n.push((o, s) => {
      o ? a(o) : i(s);
    }) : n.push(i), e.apply(this, n);
  });
};
var hv = (e, t) => {
  t = Object.assign({
    exclude: [/.+(Sync|Stream)$/],
    errorFirst: !0,
    promiseModule: Promise
  }, t);
  const n = typeof e;
  if (!(e !== null && (n === "object" || n === "function")))
    throw new TypeError(`Expected \`input\` to be a \`Function\` or \`Object\`, got \`${e === null ? "null" : n}\``);
  const r = (a) => {
    const o = (s) => typeof s == "string" ? a === s : s.test(a);
    return t.include ? t.include.some(o) : !t.exclude.some(o);
  };
  let i;
  n === "function" ? i = function(...a) {
    return t.excludeMain ? e(...a) : ra(e, t).apply(this, a);
  } : i = Object.create(Object.getPrototypeOf(e));
  for (const a in e) {
    const o = e[a];
    i[a] = typeof o == "function" && r(a) ? ra(o, t) : o;
  }
  return i;
}, mv = (e) => {
  if (typeof e != "string")
    throw new TypeError("Expected a string, got " + typeof e);
  return e.charCodeAt(0) === 65279 ? e.slice(1) : e;
}, re = {}, Qt = {}, Re = {};
function Sc(e) {
  return typeof e > "u" || e === null;
}
function gv(e) {
  return typeof e == "object" && e !== null;
}
function yv(e) {
  return Array.isArray(e) ? e : Sc(e) ? [] : [e];
}
function vv(e, t) {
  var n, r, i, a;
  if (t)
    for (a = Object.keys(t), n = 0, r = a.length; n < r; n += 1)
      i = a[n], e[i] = t[i];
  return e;
}
function wv(e, t) {
  var n = "", r;
  for (r = 0; r < t; r += 1)
    n += e;
  return n;
}
function Ev(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
Re.isNothing = Sc;
Re.isObject = gv;
Re.toArray = yv;
Re.repeat = wv;
Re.isNegativeZero = Ev;
Re.extend = vv;
function Ut(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : ""), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ut.prototype = Object.create(Error.prototype);
Ut.prototype.constructor = Ut;
Ut.prototype.toString = function(t) {
  var n = this.name + ": ";
  return n += this.reason || "(unknown reason)", !t && this.mark && (n += " " + this.mark.toString()), n;
};
var Vt = Ut, ia = Re;
function qi(e, t, n, r, i) {
  this.name = e, this.buffer = t, this.position = n, this.line = r, this.column = i;
}
qi.prototype.getSnippet = function(t, n) {
  var r, i, a, o, s;
  if (!this.buffer) return null;
  for (t = t || 4, n = n || 75, r = "", i = this.position; i > 0 && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(i - 1)) === -1; )
    if (i -= 1, this.position - i > n / 2 - 1) {
      r = " ... ", i += 5;
      break;
    }
  for (a = "", o = this.position; o < this.buffer.length && `\0\r
\u2028\u2029`.indexOf(this.buffer.charAt(o)) === -1; )
    if (o += 1, o - this.position > n / 2 - 1) {
      a = " ... ", o -= 5;
      break;
    }
  return s = this.buffer.slice(i, o), ia.repeat(" ", t) + r + s + a + `
` + ia.repeat(" ", t + this.position - i + r.length) + "^";
};
qi.prototype.toString = function(t) {
  var n, r = "";
  return this.name && (r += 'in "' + this.name + '" '), r += "at line " + (this.line + 1) + ", column " + (this.column + 1), t || (n = this.getSnippet(), n && (r += `:
` + n)), r;
};
var bv = qi, oa = Vt, Sv = [
  "kind",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "defaultStyle",
  "styleAliases"
], xv = [
  "scalar",
  "sequence",
  "mapping"
];
function _v(e) {
  var t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function Av(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Sv.indexOf(n) === -1)
      throw new oa('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.defaultStyle = t.defaultStyle || null, this.styleAliases = _v(t.styleAliases || null), xv.indexOf(this.kind) === -1)
    throw new oa('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var ce = Av, aa = Re, gn = Vt, Tv = ce;
function si(e, t, n) {
  var r = [];
  return e.include.forEach(function(i) {
    n = si(i, t, n);
  }), e[t].forEach(function(i) {
    n.forEach(function(a, o) {
      a.tag === i.tag && a.kind === i.kind && r.push(o);
    }), n.push(i);
  }), n.filter(function(i, a) {
    return r.indexOf(a) === -1;
  });
}
function Cv() {
  var e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {}
  }, t, n;
  function r(i) {
    e[i.kind][i.tag] = e.fallback[i.tag] = i;
  }
  for (t = 0, n = arguments.length; t < n; t += 1)
    arguments[t].forEach(r);
  return e;
}
function St(e) {
  this.include = e.include || [], this.implicit = e.implicit || [], this.explicit = e.explicit || [], this.implicit.forEach(function(t) {
    if (t.loadKind && t.loadKind !== "scalar")
      throw new gn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
  }), this.compiledImplicit = si(this, "implicit", []), this.compiledExplicit = si(this, "explicit", []), this.compiledTypeMap = Cv(this.compiledImplicit, this.compiledExplicit);
}
St.DEFAULT = null;
St.create = function() {
  var t, n;
  switch (arguments.length) {
    case 1:
      t = St.DEFAULT, n = arguments[0];
      break;
    case 2:
      t = arguments[0], n = arguments[1];
      break;
    default:
      throw new gn("Wrong number of arguments for Schema.create function");
  }
  if (t = aa.toArray(t), n = aa.toArray(n), !t.every(function(r) {
    return r instanceof St;
  }))
    throw new gn("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
  if (!n.every(function(r) {
    return r instanceof Tv;
  }))
    throw new gn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  return new St({
    include: t,
    explicit: n
  });
};
var Nt = St, Rv = ce, Fv = new Rv("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
}), $v = ce, Iv = new $v("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
}), Ov = ce, Nv = new Ov("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
}), Pv = Nt, Ki = new Pv({
  explicit: [
    Fv,
    Iv,
    Nv
  ]
}), Lv = ce;
function kv(e) {
  if (e === null) return !0;
  var t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Dv() {
  return null;
}
function Mv(e) {
  return e === null;
}
var jv = new Lv("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: kv,
  construct: Dv,
  predicate: Mv,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    }
  },
  defaultStyle: "lowercase"
}), Hv = ce;
function Bv(e) {
  if (e === null) return !1;
  var t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Uv(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Gv(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var qv = new Hv("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Bv,
  construct: Uv,
  predicate: Gv,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
}), Kv = Re, Wv = ce;
function zv(e) {
  return 48 <= e && e <= 57 || 65 <= e && e <= 70 || 97 <= e && e <= 102;
}
function Yv(e) {
  return 48 <= e && e <= 55;
}
function Qv(e) {
  return 48 <= e && e <= 57;
}
function Vv(e) {
  if (e === null) return !1;
  var t = e.length, n = 0, r = !1, i;
  if (!t) return !1;
  if (i = e[n], (i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (i !== "0" && i !== "1") return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    if (i === "x") {
      for (n++; n < t; n++)
        if (i = e[n], i !== "_") {
          if (!zv(e.charCodeAt(n))) return !1;
          r = !0;
        }
      return r && i !== "_";
    }
    for (; n < t; n++)
      if (i = e[n], i !== "_") {
        if (!Yv(e.charCodeAt(n))) return !1;
        r = !0;
      }
    return r && i !== "_";
  }
  if (i === "_") return !1;
  for (; n < t; n++)
    if (i = e[n], i !== "_") {
      if (i === ":") break;
      if (!Qv(e.charCodeAt(n)))
        return !1;
      r = !0;
    }
  return !r || i === "_" ? !1 : i !== ":" ? !0 : /^(:[0-5]?[0-9])+$/.test(e.slice(n));
}
function Xv(e) {
  var t = e, n = 1, r, i, a = [];
  return t.indexOf("_") !== -1 && (t = t.replace(/_/g, "")), r = t[0], (r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0" ? 0 : r === "0" ? t[1] === "b" ? n * parseInt(t.slice(2), 2) : t[1] === "x" ? n * parseInt(t, 16) : n * parseInt(t, 8) : t.indexOf(":") !== -1 ? (t.split(":").forEach(function(o) {
    a.unshift(parseInt(o, 10));
  }), t = 0, i = 1, a.forEach(function(o) {
    t += o * i, i *= 60;
  }), n * t) : n * parseInt(t, 10);
}
function Zv(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Kv.isNegativeZero(e);
}
var Jv = new Wv("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Vv,
  construct: Xv,
  predicate: Zv,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0" + e.toString(8) : "-0" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    /* eslint-disable max-len */
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
}), xc = Re, e0 = ce, t0 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function n0(e) {
  return !(e === null || !t0.test(e) || // Quick hack to not allow integers end with `_`
  // Probably should update regexp & check speed
  e[e.length - 1] === "_");
}
function r0(e) {
  var t, n, r, i;
  return t = e.replace(/_/g, "").toLowerCase(), n = t[0] === "-" ? -1 : 1, i = [], "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : t.indexOf(":") >= 0 ? (t.split(":").forEach(function(a) {
    i.unshift(parseFloat(a, 10));
  }), t = 0, r = 1, i.forEach(function(a) {
    t += a * r, r *= 60;
  }), n * t) : n * parseFloat(t, 10);
}
var i0 = /^[-+]?[0-9]+e/;
function o0(e, t) {
  var n;
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (xc.isNegativeZero(e))
    return "-0.0";
  return n = e.toString(10), i0.test(n) ? n.replace("e", ".e") : n;
}
function a0(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || xc.isNegativeZero(e));
}
var s0 = new e0("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: n0,
  construct: r0,
  predicate: a0,
  represent: o0,
  defaultStyle: "lowercase"
}), c0 = Nt, _c = new c0({
  include: [
    Ki
  ],
  implicit: [
    jv,
    qv,
    Jv,
    s0
  ]
}), u0 = Nt, Ac = new u0({
  include: [
    _c
  ]
}), l0 = ce, Tc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Cc = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function f0(e) {
  return e === null ? !1 : Tc.exec(e) !== null || Cc.exec(e) !== null;
}
function p0(e) {
  var t, n, r, i, a, o, s, c = 0, f = null, u, l, p;
  if (t = Tc.exec(e), t === null && (t = Cc.exec(e)), t === null) throw new Error("Date resolve error");
  if (n = +t[1], r = +t[2] - 1, i = +t[3], !t[4])
    return new Date(Date.UTC(n, r, i));
  if (a = +t[4], o = +t[5], s = +t[6], t[7]) {
    for (c = t[7].slice(0, 3); c.length < 3; )
      c += "0";
    c = +c;
  }
  return t[9] && (u = +t[10], l = +(t[11] || 0), f = (u * 60 + l) * 6e4, t[9] === "-" && (f = -f)), p = new Date(Date.UTC(n, r, i, a, o, s, c)), f && p.setTime(p.getTime() - f), p;
}
function d0(e) {
  return e.toISOString();
}
var h0 = new l0("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: f0,
  construct: p0,
  instanceOf: Date,
  represent: d0
}), m0 = ce;
function g0(e) {
  return e === "<<" || e === null;
}
var y0 = new m0("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: g0
});
function Rc(e) {
  throw new Error('Could not dynamically require "' + e + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var nt;
try {
  var v0 = Rc;
  nt = v0("buffer").Buffer;
} catch {
}
var w0 = ce, Wi = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function E0(e) {
  if (e === null) return !1;
  var t, n, r = 0, i = e.length, a = Wi;
  for (n = 0; n < i; n++)
    if (t = a.indexOf(e.charAt(n)), !(t > 64)) {
      if (t < 0) return !1;
      r += 6;
    }
  return r % 8 === 0;
}
function b0(e) {
  var t, n, r = e.replace(/[\r\n=]/g, ""), i = r.length, a = Wi, o = 0, s = [];
  for (t = 0; t < i; t++)
    t % 4 === 0 && t && (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)), o = o << 6 | a.indexOf(r.charAt(t));
  return n = i % 4 * 6, n === 0 ? (s.push(o >> 16 & 255), s.push(o >> 8 & 255), s.push(o & 255)) : n === 18 ? (s.push(o >> 10 & 255), s.push(o >> 2 & 255)) : n === 12 && s.push(o >> 4 & 255), nt ? nt.from ? nt.from(s) : new nt(s) : s;
}
function S0(e) {
  var t = "", n = 0, r, i, a = e.length, o = Wi;
  for (r = 0; r < a; r++)
    r % 3 === 0 && r && (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]), n = (n << 8) + e[r];
  return i = a % 3, i === 0 ? (t += o[n >> 18 & 63], t += o[n >> 12 & 63], t += o[n >> 6 & 63], t += o[n & 63]) : i === 2 ? (t += o[n >> 10 & 63], t += o[n >> 4 & 63], t += o[n << 2 & 63], t += o[64]) : i === 1 && (t += o[n >> 2 & 63], t += o[n << 4 & 63], t += o[64], t += o[64]), t;
}
function x0(e) {
  return nt && nt.isBuffer(e);
}
var _0 = new w0("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: E0,
  construct: b0,
  predicate: x0,
  represent: S0
}), A0 = ce, T0 = Object.prototype.hasOwnProperty, C0 = Object.prototype.toString;
function R0(e) {
  if (e === null) return !0;
  var t = [], n, r, i, a, o, s = e;
  for (n = 0, r = s.length; n < r; n += 1) {
    if (i = s[n], o = !1, C0.call(i) !== "[object Object]") return !1;
    for (a in i)
      if (T0.call(i, a))
        if (!o) o = !0;
        else return !1;
    if (!o) return !1;
    if (t.indexOf(a) === -1) t.push(a);
    else return !1;
  }
  return !0;
}
function F0(e) {
  return e !== null ? e : [];
}
var $0 = new A0("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: R0,
  construct: F0
}), I0 = ce, O0 = Object.prototype.toString;
function N0(e) {
  if (e === null) return !0;
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1) {
    if (r = o[t], O0.call(r) !== "[object Object]" || (i = Object.keys(r), i.length !== 1)) return !1;
    a[t] = [i[0], r[i[0]]];
  }
  return !0;
}
function P0(e) {
  if (e === null) return [];
  var t, n, r, i, a, o = e;
  for (a = new Array(o.length), t = 0, n = o.length; t < n; t += 1)
    r = o[t], i = Object.keys(r), a[t] = [i[0], r[i[0]]];
  return a;
}
var L0 = new I0("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: N0,
  construct: P0
}), k0 = ce, D0 = Object.prototype.hasOwnProperty;
function M0(e) {
  if (e === null) return !0;
  var t, n = e;
  for (t in n)
    if (D0.call(n, t) && n[t] !== null)
      return !1;
  return !0;
}
function j0(e) {
  return e !== null ? e : {};
}
var H0 = new k0("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: M0,
  construct: j0
}), B0 = Nt, Xt = new B0({
  include: [
    Ac
  ],
  implicit: [
    h0,
    y0
  ],
  explicit: [
    _0,
    $0,
    L0,
    H0
  ]
}), U0 = ce;
function G0() {
  return !0;
}
function q0() {
}
function K0() {
  return "";
}
function W0(e) {
  return typeof e > "u";
}
var z0 = new U0("tag:yaml.org,2002:js/undefined", {
  kind: "scalar",
  resolve: G0,
  construct: q0,
  predicate: W0,
  represent: K0
}), Y0 = ce;
function Q0(e) {
  if (e === null || e.length === 0) return !1;
  var t = e, n = /\/([gim]*)$/.exec(e), r = "";
  return !(t[0] === "/" && (n && (r = n[1]), r.length > 3 || t[t.length - r.length - 1] !== "/"));
}
function V0(e) {
  var t = e, n = /\/([gim]*)$/.exec(e), r = "";
  return t[0] === "/" && (n && (r = n[1]), t = t.slice(1, t.length - r.length - 1)), new RegExp(t, r);
}
function X0(e) {
  var t = "/" + e.source + "/";
  return e.global && (t += "g"), e.multiline && (t += "m"), e.ignoreCase && (t += "i"), t;
}
function Z0(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
var J0 = new Y0("tag:yaml.org,2002:js/regexp", {
  kind: "scalar",
  resolve: Q0,
  construct: V0,
  predicate: Z0,
  represent: X0
}), Bn;
try {
  var ew = Rc;
  Bn = ew("esprima");
} catch {
  typeof window < "u" && (Bn = window.esprima);
}
var tw = ce;
function nw(e) {
  if (e === null) return !1;
  try {
    var t = "(" + e + ")", n = Bn.parse(t, { range: !0 });
    return !(n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression");
  } catch {
    return !1;
  }
}
function rw(e) {
  var t = "(" + e + ")", n = Bn.parse(t, { range: !0 }), r = [], i;
  if (n.type !== "Program" || n.body.length !== 1 || n.body[0].type !== "ExpressionStatement" || n.body[0].expression.type !== "ArrowFunctionExpression" && n.body[0].expression.type !== "FunctionExpression")
    throw new Error("Failed to resolve function");
  return n.body[0].expression.params.forEach(function(a) {
    r.push(a.name);
  }), i = n.body[0].expression.body.range, n.body[0].expression.body.type === "BlockStatement" ? new Function(r, t.slice(i[0] + 1, i[1] - 1)) : new Function(r, "return " + t.slice(i[0], i[1]));
}
function iw(e) {
  return e.toString();
}
function ow(e) {
  return Object.prototype.toString.call(e) === "[object Function]";
}
var aw = new tw("tag:yaml.org,2002:js/function", {
  kind: "scalar",
  resolve: nw,
  construct: rw,
  predicate: ow,
  represent: iw
}), sa = Nt, fr = sa.DEFAULT = new sa({
  include: [
    Xt
  ],
  explicit: [
    z0,
    J0,
    aw
  ]
}), Be = Re, Fc = Vt, sw = bv, $c = Xt, cw = fr, Ve = Object.prototype.hasOwnProperty, Un = 1, Ic = 2, Oc = 3, Gn = 4, Mr = 1, uw = 2, ca = 3, lw = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, fw = /[\x85\u2028\u2029]/, pw = /[,\[\]\{\}]/, Nc = /^(?:!|!!|![a-z\-]+!)$/i, Pc = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
function ua(e) {
  return Object.prototype.toString.call(e);
}
function ke(e) {
  return e === 10 || e === 13;
}
function ot(e) {
  return e === 9 || e === 32;
}
function we(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function xt(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function dw(e) {
  var t;
  return 48 <= e && e <= 57 ? e - 48 : (t = e | 32, 97 <= t && t <= 102 ? t - 97 + 10 : -1);
}
function hw(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function mw(e) {
  return 48 <= e && e <= 57 ? e - 48 : -1;
}
function la(e) {
  return e === 48 ? "\0" : e === 97 ? "\x07" : e === 98 ? "\b" : e === 116 || e === 9 ? "	" : e === 110 ? `
` : e === 118 ? "\v" : e === 102 ? "\f" : e === 114 ? "\r" : e === 101 ? "\x1B" : e === 32 ? " " : e === 34 ? '"' : e === 47 ? "/" : e === 92 ? "\\" : e === 78 ? "" : e === 95 ? " " : e === 76 ? "\u2028" : e === 80 ? "\u2029" : "";
}
function gw(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Lc(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
var kc = new Array(256), Dc = new Array(256);
for (var gt = 0; gt < 256; gt++)
  kc[gt] = la(gt) ? 1 : 0, Dc[gt] = la(gt);
function yw(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || cw, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.documents = [];
}
function Mc(e, t) {
  return new Fc(
    t,
    new sw(e.filename, e.input, e.position, e.line, e.position - e.lineStart)
  );
}
function B(e, t) {
  throw Mc(e, t);
}
function qn(e, t) {
  e.onWarning && e.onWarning.call(null, Mc(e, t));
}
var fa = {
  YAML: function(t, n, r) {
    var i, a, o;
    t.version !== null && B(t, "duplication of %YAML directive"), r.length !== 1 && B(t, "YAML directive accepts exactly one argument"), i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]), i === null && B(t, "ill-formed argument of the YAML directive"), a = parseInt(i[1], 10), o = parseInt(i[2], 10), a !== 1 && B(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = o < 2, o !== 1 && o !== 2 && qn(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    var i, a;
    r.length !== 2 && B(t, "TAG directive accepts exactly two arguments"), i = r[0], a = r[1], Nc.test(i) || B(t, "ill-formed tag handle (first argument) of the TAG directive"), Ve.call(t.tagMap, i) && B(t, 'there is a previously declared suffix for "' + i + '" tag handle'), Pc.test(a) || B(t, "ill-formed tag prefix (second argument) of the TAG directive"), t.tagMap[i] = a;
  }
};
function Qe(e, t, n, r) {
  var i, a, o, s;
  if (t < n) {
    if (s = e.input.slice(t, n), r)
      for (i = 0, a = s.length; i < a; i += 1)
        o = s.charCodeAt(i), o === 9 || 32 <= o && o <= 1114111 || B(e, "expected valid JSON character");
    else lw.test(s) && B(e, "the stream contains non-printable characters");
    e.result += s;
  }
}
function pa(e, t, n, r) {
  var i, a, o, s;
  for (Be.isObject(n) || B(e, "cannot merge mappings; the provided source object is unacceptable"), i = Object.keys(n), o = 0, s = i.length; o < s; o += 1)
    a = i[o], Ve.call(t, a) || (Lc(t, a, n[a]), r[a] = !0);
}
function _t(e, t, n, r, i, a, o, s) {
  var c, f;
  if (Array.isArray(i))
    for (i = Array.prototype.slice.call(i), c = 0, f = i.length; c < f; c += 1)
      Array.isArray(i[c]) && B(e, "nested arrays are not supported inside keys"), typeof i == "object" && ua(i[c]) === "[object Object]" && (i[c] = "[object Object]");
  if (typeof i == "object" && ua(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(a))
      for (c = 0, f = a.length; c < f; c += 1)
        pa(e, t, a[c], n);
    else
      pa(e, t, a, n);
  else
    !e.json && !Ve.call(n, i) && Ve.call(t, i) && (e.line = o || e.line, e.position = s || e.position, B(e, "duplicated mapping key")), Lc(t, i, a), delete n[i];
  return t;
}
function zi(e) {
  var t;
  t = e.input.charCodeAt(e.position), t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : B(e, "a line break is expected"), e.line += 1, e.lineStart = e.position;
}
function ae(e, t, n) {
  for (var r = 0, i = e.input.charCodeAt(e.position); i !== 0; ) {
    for (; ot(i); )
      i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (ke(i))
      for (zi(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && qn(e, "deficient indentation"), r;
}
function pr(e) {
  var t = e.position, n;
  return n = e.input.charCodeAt(t), !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || we(n)));
}
function Yi(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Be.repeat(`
`, t - 1));
}
function vw(e, t, n) {
  var r, i, a, o, s, c, f, u, l = e.kind, p = e.result, d;
  if (d = e.input.charCodeAt(e.position), we(d) || xt(d) || d === 35 || d === 38 || d === 42 || d === 33 || d === 124 || d === 62 || d === 39 || d === 34 || d === 37 || d === 64 || d === 96 || (d === 63 || d === 45) && (i = e.input.charCodeAt(e.position + 1), we(i) || n && xt(i)))
    return !1;
  for (e.kind = "scalar", e.result = "", a = o = e.position, s = !1; d !== 0; ) {
    if (d === 58) {
      if (i = e.input.charCodeAt(e.position + 1), we(i) || n && xt(i))
        break;
    } else if (d === 35) {
      if (r = e.input.charCodeAt(e.position - 1), we(r))
        break;
    } else {
      if (e.position === e.lineStart && pr(e) || n && xt(d))
        break;
      if (ke(d))
        if (c = e.line, f = e.lineStart, u = e.lineIndent, ae(e, !1, -1), e.lineIndent >= t) {
          s = !0, d = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = o, e.line = c, e.lineStart = f, e.lineIndent = u;
          break;
        }
    }
    s && (Qe(e, a, o, !1), Yi(e, e.line - c), a = o = e.position, s = !1), ot(d) || (o = e.position + 1), d = e.input.charCodeAt(++e.position);
  }
  return Qe(e, a, o, !1), e.result ? !0 : (e.kind = l, e.result = p, !1);
}
function ww(e, t) {
  var n, r, i;
  if (n = e.input.charCodeAt(e.position), n !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, r = i = e.position; (n = e.input.charCodeAt(e.position)) !== 0; )
    if (n === 39)
      if (Qe(e, r, e.position, !0), n = e.input.charCodeAt(++e.position), n === 39)
        r = e.position, e.position++, i = e.position;
      else
        return !0;
    else ke(n) ? (Qe(e, r, i, !0), Yi(e, ae(e, !1, t)), r = i = e.position) : e.position === e.lineStart && pr(e) ? B(e, "unexpected end of the document within a single quoted scalar") : (e.position++, i = e.position);
  B(e, "unexpected end of the stream within a single quoted scalar");
}
function Ew(e, t) {
  var n, r, i, a, o, s;
  if (s = e.input.charCodeAt(e.position), s !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (s = e.input.charCodeAt(e.position)) !== 0; ) {
    if (s === 34)
      return Qe(e, n, e.position, !0), e.position++, !0;
    if (s === 92) {
      if (Qe(e, n, e.position, !0), s = e.input.charCodeAt(++e.position), ke(s))
        ae(e, !1, t);
      else if (s < 256 && kc[s])
        e.result += Dc[s], e.position++;
      else if ((o = hw(s)) > 0) {
        for (i = o, a = 0; i > 0; i--)
          s = e.input.charCodeAt(++e.position), (o = dw(s)) >= 0 ? a = (a << 4) + o : B(e, "expected hexadecimal character");
        e.result += gw(a), e.position++;
      } else
        B(e, "unknown escape sequence");
      n = r = e.position;
    } else ke(s) ? (Qe(e, n, r, !0), Yi(e, ae(e, !1, t)), n = r = e.position) : e.position === e.lineStart && pr(e) ? B(e, "unexpected end of the document within a double quoted scalar") : (e.position++, r = e.position);
  }
  B(e, "unexpected end of the stream within a double quoted scalar");
}
function bw(e, t) {
  var n = !0, r, i = e.tag, a, o = e.anchor, s, c, f, u, l, p = {}, d, h, m, g;
  if (g = e.input.charCodeAt(e.position), g === 91)
    c = 93, l = !1, a = [];
  else if (g === 123)
    c = 125, l = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), g = e.input.charCodeAt(++e.position); g !== 0; ) {
    if (ae(e, !0, t), g = e.input.charCodeAt(e.position), g === c)
      return e.position++, e.tag = i, e.anchor = o, e.kind = l ? "mapping" : "sequence", e.result = a, !0;
    n || B(e, "missed comma between flow collection entries"), h = d = m = null, f = u = !1, g === 63 && (s = e.input.charCodeAt(e.position + 1), we(s) && (f = u = !0, e.position++, ae(e, !0, t))), r = e.line, Rt(e, t, Un, !1, !0), h = e.tag, d = e.result, ae(e, !0, t), g = e.input.charCodeAt(e.position), (u || e.line === r) && g === 58 && (f = !0, g = e.input.charCodeAt(++e.position), ae(e, !0, t), Rt(e, t, Un, !1, !0), m = e.result), l ? _t(e, a, p, h, d, m) : f ? a.push(_t(e, null, p, h, d, m)) : a.push(d), ae(e, !0, t), g = e.input.charCodeAt(e.position), g === 44 ? (n = !0, g = e.input.charCodeAt(++e.position)) : n = !1;
  }
  B(e, "unexpected end of the stream within a flow collection");
}
function Sw(e, t) {
  var n, r, i = Mr, a = !1, o = !1, s = t, c = 0, f = !1, u, l;
  if (l = e.input.charCodeAt(e.position), l === 124)
    r = !1;
  else if (l === 62)
    r = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; l !== 0; )
    if (l = e.input.charCodeAt(++e.position), l === 43 || l === 45)
      Mr === i ? i = l === 43 ? ca : uw : B(e, "repeat of a chomping mode identifier");
    else if ((u = mw(l)) >= 0)
      u === 0 ? B(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? B(e, "repeat of an indentation width identifier") : (s = t + u - 1, o = !0);
    else
      break;
  if (ot(l)) {
    do
      l = e.input.charCodeAt(++e.position);
    while (ot(l));
    if (l === 35)
      do
        l = e.input.charCodeAt(++e.position);
      while (!ke(l) && l !== 0);
  }
  for (; l !== 0; ) {
    for (zi(e), e.lineIndent = 0, l = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && l === 32; )
      e.lineIndent++, l = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), ke(l)) {
      c++;
      continue;
    }
    if (e.lineIndent < s) {
      i === ca ? e.result += Be.repeat(`
`, a ? 1 + c : c) : i === Mr && a && (e.result += `
`);
      break;
    }
    for (r ? ot(l) ? (f = !0, e.result += Be.repeat(`
`, a ? 1 + c : c)) : f ? (f = !1, e.result += Be.repeat(`
`, c + 1)) : c === 0 ? a && (e.result += " ") : e.result += Be.repeat(`
`, c) : e.result += Be.repeat(`
`, a ? 1 + c : c), a = !0, o = !0, c = 0, n = e.position; !ke(l) && l !== 0; )
      l = e.input.charCodeAt(++e.position);
    Qe(e, n, e.position, !1);
  }
  return !0;
}
function da(e, t) {
  var n, r = e.tag, i = e.anchor, a = [], o, s = !1, c;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = a), c = e.input.charCodeAt(e.position); c !== 0 && !(c !== 45 || (o = e.input.charCodeAt(e.position + 1), !we(o))); ) {
    if (s = !0, e.position++, ae(e, !0, -1) && e.lineIndent <= t) {
      a.push(null), c = e.input.charCodeAt(e.position);
      continue;
    }
    if (n = e.line, Rt(e, t, Oc, !1, !0), a.push(e.result), ae(e, !0, -1), c = e.input.charCodeAt(e.position), (e.line === n || e.lineIndent > t) && c !== 0)
      B(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return s ? (e.tag = r, e.anchor = i, e.kind = "sequence", e.result = a, !0) : !1;
}
function xw(e, t, n) {
  var r, i, a, o, s = e.tag, c = e.anchor, f = {}, u = {}, l = null, p = null, d = null, h = !1, m = !1, g;
  for (e.anchor !== null && (e.anchorMap[e.anchor] = f), g = e.input.charCodeAt(e.position); g !== 0; ) {
    if (r = e.input.charCodeAt(e.position + 1), a = e.line, o = e.position, (g === 63 || g === 58) && we(r))
      g === 63 ? (h && (_t(e, f, u, l, p, null), l = p = d = null), m = !0, h = !0, i = !0) : h ? (h = !1, i = !0) : B(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, g = r;
    else if (Rt(e, n, Ic, !1, !0))
      if (e.line === a) {
        for (g = e.input.charCodeAt(e.position); ot(g); )
          g = e.input.charCodeAt(++e.position);
        if (g === 58)
          g = e.input.charCodeAt(++e.position), we(g) || B(e, "a whitespace character is expected after the key-value separator within a block mapping"), h && (_t(e, f, u, l, p, null), l = p = d = null), m = !0, h = !1, i = !1, l = e.tag, p = e.result;
        else if (m)
          B(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = s, e.anchor = c, !0;
      } else if (m)
        B(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = s, e.anchor = c, !0;
    else
      break;
    if ((e.line === a || e.lineIndent > t) && (Rt(e, t, Gn, !0, i) && (h ? p = e.result : d = e.result), h || (_t(e, f, u, l, p, d, a, o), l = p = d = null), ae(e, !0, -1), g = e.input.charCodeAt(e.position)), e.lineIndent > t && g !== 0)
      B(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return h && _t(e, f, u, l, p, null), m && (e.tag = s, e.anchor = c, e.kind = "mapping", e.result = f), m;
}
function _w(e) {
  var t, n = !1, r = !1, i, a, o;
  if (o = e.input.charCodeAt(e.position), o !== 33) return !1;
  if (e.tag !== null && B(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (n = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (r = !0, i = "!!", o = e.input.charCodeAt(++e.position)) : i = "!", t = e.position, n) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (a = e.input.slice(t, e.position), o = e.input.charCodeAt(++e.position)) : B(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !we(o); )
      o === 33 && (r ? B(e, "tag suffix cannot contain exclamation marks") : (i = e.input.slice(t - 1, e.position + 1), Nc.test(i) || B(e, "named tag handle cannot contain such characters"), r = !0, t = e.position + 1)), o = e.input.charCodeAt(++e.position);
    a = e.input.slice(t, e.position), pw.test(a) && B(e, "tag suffix cannot contain flow indicator characters");
  }
  return a && !Pc.test(a) && B(e, "tag name cannot contain such characters: " + a), n ? e.tag = a : Ve.call(e.tagMap, i) ? e.tag = e.tagMap[i] + a : i === "!" ? e.tag = "!" + a : i === "!!" ? e.tag = "tag:yaml.org,2002:" + a : B(e, 'undeclared tag handle "' + i + '"'), !0;
}
function Aw(e) {
  var t, n;
  if (n = e.input.charCodeAt(e.position), n !== 38) return !1;
  for (e.anchor !== null && B(e, "duplication of an anchor property"), n = e.input.charCodeAt(++e.position), t = e.position; n !== 0 && !we(n) && !xt(n); )
    n = e.input.charCodeAt(++e.position);
  return e.position === t && B(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(t, e.position), !0;
}
function Tw(e) {
  var t, n, r;
  if (r = e.input.charCodeAt(e.position), r !== 42) return !1;
  for (r = e.input.charCodeAt(++e.position), t = e.position; r !== 0 && !we(r) && !xt(r); )
    r = e.input.charCodeAt(++e.position);
  return e.position === t && B(e, "name of an alias node must contain at least one character"), n = e.input.slice(t, e.position), Ve.call(e.anchorMap, n) || B(e, 'unidentified alias "' + n + '"'), e.result = e.anchorMap[n], ae(e, !0, -1), !0;
}
function Rt(e, t, n, r, i) {
  var a, o, s, c = 1, f = !1, u = !1, l, p, d, h, m;
  if (e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null, a = o = s = Gn === n || Oc === n, r && ae(e, !0, -1) && (f = !0, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)), c === 1)
    for (; _w(e) || Aw(e); )
      ae(e, !0, -1) ? (f = !0, s = a, e.lineIndent > t ? c = 1 : e.lineIndent === t ? c = 0 : e.lineIndent < t && (c = -1)) : s = !1;
  if (s && (s = f || i), (c === 1 || Gn === n) && (Un === n || Ic === n ? h = t : h = t + 1, m = e.position - e.lineStart, c === 1 ? s && (da(e, m) || xw(e, m, h)) || bw(e, h) ? u = !0 : (o && Sw(e, h) || ww(e, h) || Ew(e, h) ? u = !0 : Tw(e) ? (u = !0, (e.tag !== null || e.anchor !== null) && B(e, "alias node should not have any properties")) : vw(e, h, Un === n) && (u = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : c === 0 && (u = s && da(e, m))), e.tag !== null && e.tag !== "!")
    if (e.tag === "?") {
      for (e.result !== null && e.kind !== "scalar" && B(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"'), l = 0, p = e.implicitTypes.length; l < p; l += 1)
        if (d = e.implicitTypes[l], d.resolve(e.result)) {
          e.result = d.construct(e.result), e.tag = d.tag, e.anchor !== null && (e.anchorMap[e.anchor] = e.result);
          break;
        }
    } else Ve.call(e.typeMap[e.kind || "fallback"], e.tag) ? (d = e.typeMap[e.kind || "fallback"][e.tag], e.result !== null && d.kind !== e.kind && B(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + d.kind + '", not "' + e.kind + '"'), d.resolve(e.result) ? (e.result = d.construct(e.result), e.anchor !== null && (e.anchorMap[e.anchor] = e.result)) : B(e, "cannot resolve a node with !<" + e.tag + "> explicit tag")) : B(e, "unknown tag !<" + e.tag + ">");
  return e.listener !== null && e.listener("close", e), e.tag !== null || e.anchor !== null || u;
}
function Cw(e) {
  var t = e.position, n, r, i, a = !1, o;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = {}, e.anchorMap = {}; (o = e.input.charCodeAt(e.position)) !== 0 && (ae(e, !0, -1), o = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || o !== 37)); ) {
    for (a = !0, o = e.input.charCodeAt(++e.position), n = e.position; o !== 0 && !we(o); )
      o = e.input.charCodeAt(++e.position);
    for (r = e.input.slice(n, e.position), i = [], r.length < 1 && B(e, "directive name must not be less than one character in length"); o !== 0; ) {
      for (; ot(o); )
        o = e.input.charCodeAt(++e.position);
      if (o === 35) {
        do
          o = e.input.charCodeAt(++e.position);
        while (o !== 0 && !ke(o));
        break;
      }
      if (ke(o)) break;
      for (n = e.position; o !== 0 && !we(o); )
        o = e.input.charCodeAt(++e.position);
      i.push(e.input.slice(n, e.position));
    }
    o !== 0 && zi(e), Ve.call(fa, r) ? fa[r](e, r, i) : qn(e, 'unknown document directive "' + r + '"');
  }
  if (ae(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ae(e, !0, -1)) : a && B(e, "directives end mark is expected"), Rt(e, e.lineIndent - 1, Gn, !1, !0), ae(e, !0, -1), e.checkLineBreaks && fw.test(e.input.slice(t, e.position)) && qn(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && pr(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ae(e, !0, -1));
    return;
  }
  if (e.position < e.length - 1)
    B(e, "end of the stream or a document separator is expected");
  else
    return;
}
function jc(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  var n = new yw(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, B(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    Cw(n);
  return n.documents;
}
function Hc(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  var r = jc(e, n);
  if (typeof t != "function")
    return r;
  for (var i = 0, a = r.length; i < a; i += 1)
    t(r[i]);
}
function Bc(e, t) {
  var n = jc(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Fc("expected a single document in the stream, but found more");
  }
}
function Rw(e, t, n) {
  return typeof t == "object" && t !== null && typeof n > "u" && (n = t, t = null), Hc(e, t, Be.extend({ schema: $c }, n));
}
function Fw(e, t) {
  return Bc(e, Be.extend({ schema: $c }, t));
}
Qt.loadAll = Hc;
Qt.load = Bc;
Qt.safeLoadAll = Rw;
Qt.safeLoad = Fw;
var Qi = {}, Zt = Re, Jt = Vt, $w = fr, Iw = Xt, Uc = Object.prototype.toString, Gc = Object.prototype.hasOwnProperty, Ow = 9, Gt = 10, Nw = 13, Pw = 32, Lw = 33, kw = 34, qc = 35, Dw = 37, Mw = 38, jw = 39, Hw = 42, Kc = 44, Bw = 45, Wc = 58, Uw = 61, Gw = 62, qw = 63, Kw = 64, zc = 91, Yc = 93, Ww = 96, Qc = 123, zw = 124, Vc = 125, fe = {};
fe[0] = "\\0";
fe[7] = "\\a";
fe[8] = "\\b";
fe[9] = "\\t";
fe[10] = "\\n";
fe[11] = "\\v";
fe[12] = "\\f";
fe[13] = "\\r";
fe[27] = "\\e";
fe[34] = '\\"';
fe[92] = "\\\\";
fe[133] = "\\N";
fe[160] = "\\_";
fe[8232] = "\\L";
fe[8233] = "\\P";
var Yw = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
];
function Qw(e, t) {
  var n, r, i, a, o, s, c;
  if (t === null) return {};
  for (n = {}, r = Object.keys(t), i = 0, a = r.length; i < a; i += 1)
    o = r[i], s = String(t[o]), o.slice(0, 2) === "!!" && (o = "tag:yaml.org,2002:" + o.slice(2)), c = e.compiledTypeMap.fallback[o], c && Gc.call(c.styleAliases, s) && (s = c.styleAliases[s]), n[o] = s;
  return n;
}
function ha(e) {
  var t, n, r;
  if (t = e.toString(16).toUpperCase(), e <= 255)
    n = "x", r = 2;
  else if (e <= 65535)
    n = "u", r = 4;
  else if (e <= 4294967295)
    n = "U", r = 8;
  else
    throw new Jt("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + n + Zt.repeat("0", r - t.length) + t;
}
function Vw(e) {
  this.schema = e.schema || $w, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Zt.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Qw(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function ma(e, t) {
  for (var n = Zt.repeat(" ", t), r = 0, i = -1, a = "", o, s = e.length; r < s; )
    i = e.indexOf(`
`, r), i === -1 ? (o = e.slice(r), r = s) : (o = e.slice(r, i + 1), r = i + 1), o.length && o !== `
` && (a += n), a += o;
  return a;
}
function ci(e, t) {
  return `
` + Zt.repeat(" ", e.indent * t);
}
function Xw(e, t) {
  var n, r, i;
  for (n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (i = e.implicitTypes[n], i.resolve(t))
      return !0;
  return !1;
}
function Vi(e) {
  return e === Pw || e === Ow;
}
function Ft(e) {
  return 32 <= e && e <= 126 || 161 <= e && e <= 55295 && e !== 8232 && e !== 8233 || 57344 <= e && e <= 65533 && e !== 65279 || 65536 <= e && e <= 1114111;
}
function Zw(e) {
  return Ft(e) && !Vi(e) && e !== 65279 && e !== Nw && e !== Gt;
}
function ga(e, t) {
  return Ft(e) && e !== 65279 && e !== Kc && e !== zc && e !== Yc && e !== Qc && e !== Vc && e !== Wc && (e !== qc || t && Zw(t));
}
function Jw(e) {
  return Ft(e) && e !== 65279 && !Vi(e) && e !== Bw && e !== qw && e !== Wc && e !== Kc && e !== zc && e !== Yc && e !== Qc && e !== Vc && e !== qc && e !== Mw && e !== Hw && e !== Lw && e !== zw && e !== Uw && e !== Gw && e !== jw && e !== kw && e !== Dw && e !== Kw && e !== Ww;
}
function Xc(e) {
  var t = /^\n* /;
  return t.test(e);
}
var Zc = 1, Jc = 2, eu = 3, tu = 4, yn = 5;
function eE(e, t, n, r, i) {
  var a, o, s, c = !1, f = !1, u = r !== -1, l = -1, p = Jw(e.charCodeAt(0)) && !Vi(e.charCodeAt(e.length - 1));
  if (t)
    for (a = 0; a < e.length; a++) {
      if (o = e.charCodeAt(a), !Ft(o))
        return yn;
      s = a > 0 ? e.charCodeAt(a - 1) : null, p = p && ga(o, s);
    }
  else {
    for (a = 0; a < e.length; a++) {
      if (o = e.charCodeAt(a), o === Gt)
        c = !0, u && (f = f || // Foldable line = too long, and not more-indented.
        a - l - 1 > r && e[l + 1] !== " ", l = a);
      else if (!Ft(o))
        return yn;
      s = a > 0 ? e.charCodeAt(a - 1) : null, p = p && ga(o, s);
    }
    f = f || u && a - l - 1 > r && e[l + 1] !== " ";
  }
  return !c && !f ? p && !i(e) ? Zc : Jc : n > 9 && Xc(e) ? yn : f ? tu : eu;
}
function tE(e, t, n, r) {
  e.dump = (function() {
    if (t.length === 0)
      return "''";
    if (!e.noCompatMode && Yw.indexOf(t) !== -1)
      return "'" + t + "'";
    var i = e.indent * Math.max(1, n), a = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - i), o = r || e.flowLevel > -1 && n >= e.flowLevel;
    function s(c) {
      return Xw(e, c);
    }
    switch (eE(t, o, e.indent, a, s)) {
      case Zc:
        return t;
      case Jc:
        return "'" + t.replace(/'/g, "''") + "'";
      case eu:
        return "|" + ya(t, e.indent) + va(ma(t, i));
      case tu:
        return ">" + ya(t, e.indent) + va(ma(nE(t, a), i));
      case yn:
        return '"' + rE(t) + '"';
      default:
        throw new Jt("impossible error: invalid scalar style");
    }
  })();
}
function ya(e, t) {
  var n = Xc(e) ? String(t) : "", r = e[e.length - 1] === `
`, i = r && (e[e.length - 2] === `
` || e === `
`), a = i ? "+" : r ? "" : "-";
  return n + a + `
`;
}
function va(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function nE(e, t) {
  for (var n = /(\n+)([^\n]*)/g, r = (function() {
    var f = e.indexOf(`
`);
    return f = f !== -1 ? f : e.length, n.lastIndex = f, wa(e.slice(0, f), t);
  })(), i = e[0] === `
` || e[0] === " ", a, o; o = n.exec(e); ) {
    var s = o[1], c = o[2];
    a = c[0] === " ", r += s + (!i && !a && c !== "" ? `
` : "") + wa(c, t), i = a;
  }
  return r;
}
function wa(e, t) {
  if (e === "" || e[0] === " ") return e;
  for (var n = / [^ ]/g, r, i = 0, a, o = 0, s = 0, c = ""; r = n.exec(e); )
    s = r.index, s - i > t && (a = o > i ? o : s, c += `
` + e.slice(i, a), i = a + 1), o = s;
  return c += `
`, e.length - i > t && o > i ? c += e.slice(i, o) + `
` + e.slice(o + 1) : c += e.slice(i), c.slice(1);
}
function rE(e) {
  for (var t = "", n, r, i, a = 0; a < e.length; a++) {
    if (n = e.charCodeAt(a), n >= 55296 && n <= 56319 && (r = e.charCodeAt(a + 1), r >= 56320 && r <= 57343)) {
      t += ha((n - 55296) * 1024 + r - 56320 + 65536), a++;
      continue;
    }
    i = fe[n], t += !i && Ft(n) ? e[a] : i || ha(n);
  }
  return t;
}
function iE(e, t, n) {
  var r = "", i = e.tag, a, o;
  for (a = 0, o = n.length; a < o; a += 1)
    ct(e, t, n[a], !1, !1) && (a !== 0 && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  e.tag = i, e.dump = "[" + r + "]";
}
function oE(e, t, n, r) {
  var i = "", a = e.tag, o, s;
  for (o = 0, s = n.length; o < s; o += 1)
    ct(e, t + 1, n[o], !0, !0) && ((!r || o !== 0) && (i += ci(e, t)), e.dump && Gt === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  e.tag = a, e.dump = i || "[]";
}
function aE(e, t, n) {
  var r = "", i = e.tag, a = Object.keys(n), o, s, c, f, u;
  for (o = 0, s = a.length; o < s; o += 1)
    u = "", o !== 0 && (u += ", "), e.condenseFlow && (u += '"'), c = a[o], f = n[c], ct(e, t, c, !1, !1) && (e.dump.length > 1024 && (u += "? "), u += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), ct(e, t, f, !1, !1) && (u += e.dump, r += u));
  e.tag = i, e.dump = "{" + r + "}";
}
function sE(e, t, n, r) {
  var i = "", a = e.tag, o = Object.keys(n), s, c, f, u, l, p;
  if (e.sortKeys === !0)
    o.sort();
  else if (typeof e.sortKeys == "function")
    o.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Jt("sortKeys must be a boolean or a function");
  for (s = 0, c = o.length; s < c; s += 1)
    p = "", (!r || s !== 0) && (p += ci(e, t)), f = o[s], u = n[f], ct(e, t + 1, f, !0, !0, !0) && (l = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024, l && (e.dump && Gt === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, l && (p += ci(e, t)), ct(e, t + 1, u, !0, l) && (e.dump && Gt === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p));
  e.tag = a, e.dump = i || "{}";
}
function Ea(e, t, n) {
  var r, i, a, o, s, c;
  for (i = n ? e.explicitTypes : e.implicitTypes, a = 0, o = i.length; a < o; a += 1)
    if (s = i[a], (s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (e.tag = n ? s.tag : "?", s.represent) {
        if (c = e.styleMap[s.tag] || s.defaultStyle, Uc.call(s.represent) === "[object Function]")
          r = s.represent(t, c);
        else if (Gc.call(s.represent, c))
          r = s.represent[c](t, c);
        else
          throw new Jt("!<" + s.tag + '> tag resolver accepts not "' + c + '" style');
        e.dump = r;
      }
      return !0;
    }
  return !1;
}
function ct(e, t, n, r, i, a) {
  e.tag = null, e.dump = n, Ea(e, n, !1) || Ea(e, n, !0);
  var o = Uc.call(e.dump);
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  var s = o === "[object Object]" || o === "[object Array]", c, f;
  if (s && (c = e.duplicates.indexOf(n), f = c !== -1), (e.tag !== null && e.tag !== "?" || f || e.indent !== 2 && t > 0) && (i = !1), f && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (s && f && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), o === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (sE(e, t, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (aE(e, t, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    else if (o === "[object Array]") {
      var u = e.noArrayIndent && t > 0 ? t - 1 : t;
      r && e.dump.length !== 0 ? (oE(e, u, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (iE(e, u, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    } else if (o === "[object String]")
      e.tag !== "?" && tE(e, e.dump, t, a);
    else {
      if (e.skipInvalid) return !1;
      throw new Jt("unacceptable kind of an object to dump " + o);
    }
    e.tag !== null && e.tag !== "?" && (e.dump = "!<" + e.tag + "> " + e.dump);
  }
  return !0;
}
function cE(e, t) {
  var n = [], r = [], i, a;
  for (ui(e, n, r), i = 0, a = r.length; i < a; i += 1)
    t.duplicates.push(n[r[i]]);
  t.usedDuplicates = new Array(a);
}
function ui(e, t, n) {
  var r, i, a;
  if (e !== null && typeof e == "object")
    if (i = t.indexOf(e), i !== -1)
      n.indexOf(i) === -1 && n.push(i);
    else if (t.push(e), Array.isArray(e))
      for (i = 0, a = e.length; i < a; i += 1)
        ui(e[i], t, n);
    else
      for (r = Object.keys(e), i = 0, a = r.length; i < a; i += 1)
        ui(e[r[i]], t, n);
}
function nu(e, t) {
  t = t || {};
  var n = new Vw(t);
  return n.noRefs || cE(e, n), ct(n, 0, e, !0, !0) ? n.dump + `
` : "";
}
function uE(e, t) {
  return nu(e, Zt.extend({ schema: Iw }, t));
}
Qi.dump = nu;
Qi.safeDump = uE;
var dr = Qt, ru = Qi;
function hr(e) {
  return function() {
    throw new Error("Function " + e + " is deprecated and cannot be used.");
  };
}
re.Type = ce;
re.Schema = Nt;
re.FAILSAFE_SCHEMA = Ki;
re.JSON_SCHEMA = _c;
re.CORE_SCHEMA = Ac;
re.DEFAULT_SAFE_SCHEMA = Xt;
re.DEFAULT_FULL_SCHEMA = fr;
re.load = dr.load;
re.loadAll = dr.loadAll;
re.safeLoad = dr.safeLoad;
re.safeLoadAll = dr.safeLoadAll;
re.dump = ru.dump;
re.safeDump = ru.safeDump;
re.YAMLException = Vt;
re.MINIMAL_SCHEMA = Ki;
re.SAFE_SCHEMA = Xt;
re.DEFAULT_SCHEMA = fr;
re.scan = hr("scan");
re.parse = hr("parse");
re.compose = hr("compose");
re.addConstructor = hr("addConstructor");
var lE = re, fE = lE;
const iu = bc, pE = hv, dE = mv, hE = fE, ou = (e) => hE.safeLoad(dE(e));
wc.exports = (e) => pE(iu.readFile)(e, "utf8").then((t) => ou(t));
wc.exports.sync = (e) => ou(iu.readFileSync(e, "utf8"));
const mE = (e) => /^[a-z][a-zA-Z0-9]+$/.test(e), gE = (e) => /^([a-z][a-z0-9]*)(-[a-z0-9]+)*$/.test(e), { toString: yE } = Object.prototype, vE = Error.prototype.toString, wE = RegExp.prototype.toString, EE = typeof Symbol < "u" ? Symbol.prototype.toString : () => "", bE = /^Symbol\((.*)\)(.*)$/;
function SE(e) {
  return e != +e ? "NaN" : e === 0 && 1 / e < 0 ? "-0" : `${e}`;
}
function ba(e, t = !1) {
  if (e == null || e === !0 || e === !1) return `${e}`;
  if (typeof e == "number") return SE(e);
  if (typeof e == "string") return t ? `"${e}"` : e;
  if (typeof e == "function") return `[Function ${e.name || "anonymous"}]`;
  if (typeof e == "symbol") return EE.call(e).replace(bE, "Symbol($1)");
  const n = yE.call(e).slice(8, -1);
  if (n === "Date") {
    const r = e;
    return Number.isNaN(r.getTime()) ? `${r}` : r.toISOString();
  }
  return n === "Error" || e instanceof Error ? `[${vE.call(e)}]` : n === "RegExp" ? wE.call(e) : null;
}
function Sa(e, t) {
  const n = ba(e, t);
  return n !== null ? n : JSON.stringify(e, function(i, a) {
    const o = ba(this[i], t);
    return o !== null ? o : a;
  }, 2);
}
const xE = (e) => !he.isNil(e), _E = (e) => !he.isNull(e);
lt(Xn, "notNil", function(t = "${path} must be defined.") {
  return this.test("defined", t, xE);
});
lt(Xn, "notNull", function(t = "${path} cannot be null.") {
  return this.test("defined", t, _E);
});
lt(Xn, "isFunction", function(t = "${path} is not a function") {
  return this.test("is a function", t, (n) => he.isUndefined(n) || he.isFunction(n));
});
lt(mi, "isCamelCase", function(t = "${path} is not in camel case (anExampleOfCamelCase)") {
  return this.test("is in camelCase", t, (n) => n ? mE(n) : !0);
});
lt(mi, "isKebabCase", function(t = "${path} is not in kebab case (an-example-of-kebab-case)") {
  return this.test("is in kebab-case", t, (n) => n ? gE(n) : !0);
});
lt(ss, "onlyContainsFunctions", function(t = "${path} contains values that are not functions") {
  return this.test("only contains functions", t, (n) => he.isUndefined(n) || n && Object.values(n).every(he.isFunction));
});
lt(cs, "uniqueProperty", function(t, n) {
  return this.test("unique", n, function(i) {
    const a = [];
    if (i?.forEach((o, s) => {
      i.filter((f) => eo(t, f) === eo(t, o)).length > 1 && a.push(this.createError({
        path: `${this.path}[${s}].${t}`,
        message: n
      }));
    }), a.length)
      throw new de(a);
    return !0;
  });
});
Rp({
  mixed: {
    notType(e) {
      const { path: t, type: n, value: r, originalValue: i } = e, a = i != null && i !== r;
      return `${t} must be a \`${n}\` type, but the final value was: \`${Sa(r, !0)}\`${a ? ` (cast from the value \`${Sa(i, !0)}\`).` : "."}`;
    }
  }
});
K.union([
  K.string(),
  K.array(K.string())
]).describe("Select specific fields to return in the response");
K.union([
  K.literal("*"),
  K.string(),
  K.array(K.string()),
  K.record(K.string(), K.any())
]).describe("Specify which relations to populate in the response");
K.union([
  K.string(),
  K.array(K.string()),
  K.record(K.string(), K.enum([
    "asc",
    "desc"
  ])),
  K.array(K.record(K.string(), K.enum([
    "asc",
    "desc"
  ])))
]).describe("Sort the results by specified fields");
K.intersection(K.object({
  withCount: K.boolean().optional().describe("Include total count in response")
}), K.union([
  K.object({
    page: K.number().int().positive().describe("Page number (1-based)"),
    pageSize: K.number().int().positive().describe("Number of entries per page")
  }).describe("Page-based pagination"),
  K.object({
    start: K.number().int().min(0).describe("Number of entries to skip"),
    limit: K.number().int().positive().describe("Maximum number of entries to return")
  }).describe("Offset-based pagination")
])).describe("Pagination parameters");
K.record(K.string(), K.any()).describe("Apply filters to the query");
K.string().describe("Specify the locale for localized content");
K.enum([
  "draft",
  "published"
]).describe("Filter by publication status");
K.string().describe("Search query string");
const un = (e, t, n) => {
  e && e.emit && e.emit(t, n);
}, AE = (e) => [
  ...new Set(
    e.filter((t) => !!t).flatMap(({ remove: t, create: n, update: r }) => [n ? "CREATE" : "", r ? "UPDATE" : "", t ? "REMOVE" : ""].filter(
      (i) => !!i
    ))
  )
].join("_"), au = (e) => async (t) => ({
  title: t.title,
  path: t.path,
  audience: t.audience,
  type: t.type,
  uiRouterKey: t.uiRouterKey,
  order: t.order,
  collapsed: t.collapsed,
  menuAttached: t.menuAttached,
  autoSync: t.autoSync,
  removed: !1,
  updated: !0,
  externalPath: t.externalPath,
  items: t.items ? await Promise.all(t.items.map(au(e))) : [],
  master: e.master,
  parent: void 0,
  related: t.related,
  additionalFields: t.additionalFields
}), TE = (e, t) => t.slice(1).reduce((n, r) => n.concat([e, r]), t.slice(0, 1)), CE = async ({
  strapi: e
}) => {
  const n = !!e.plugin("rest-cache"), r = e.store({
    type: "plugin",
    name: "navigation"
  }), i = Ce.configSchema.parse(
    await r.get({
      key: "config"
    })
  );
  return n ? { hasCachePlugin: n, enabled: !!i.isCacheEnabled } : { hasCachePlugin: n, enabled: !1 };
}, RE = (e) => ({
  async config({ viaSettingsPage: t = !1 }) {
    const n = ne(e, "common"), r = await CE(e), a = await (await n.getPluginStore()).get({
      key: "config"
    }).then(Ce.configSchema.parse), {
      additionalFields: o,
      cascadeMenuAttached: s,
      contentTypesPopulate: c,
      contentTypesNameFields: f,
      defaultContentType: u,
      pathDefaultFields: l,
      allowedLevels: p,
      preferCustomContentTypes: d
    } = a, h = !!e.strapi.plugin("graphql");
    let m = {
      allowedContentTypes: Da,
      restrictedContentTypes: Ma,
      availableAudience: []
    };
    const g = await this.configContentTypes({}), w = {
      contentTypes: await this.configContentTypes({ viaSettingsPage: t }),
      contentTypesNameFields: {
        default: ul,
        ...mr(f) ? f : {}
      },
      contentTypesPopulate: mr(c) ? c : {},
      defaultContentType: u,
      pathDefaultFields: mr(l) ? l : {},
      allowedLevels: p,
      additionalFields: t ? o : o.filter((S) => typeof S == "string" || !!S.enabled),
      gql: {
        navigationItemRelated: g.map(({ gqlTypeName: S }) => S)
      },
      isGQLPluginEnabled: t ? h : void 0,
      cascadeMenuAttached: s,
      preferCustomContentTypes: d
    };
    if (o.includes("audience")) {
      const S = await gl(e).find({}, Number.MAX_SAFE_INTEGER);
      m = {
        ...m,
        availableAudience: S
      };
    }
    return {
      ...w,
      ...m,
      isCacheEnabled: r.enabled,
      isCachePluginEnabled: r.hasCachePlugin
    };
  },
  async configContentTypes({
    viaSettingsPage: t = !1
  }) {
    const i = await (await ne(e, "common").getPluginStore()).get({ key: "config" }).then(Ce.configSchema.parse);
    return (await Promise.all(
      i.contentTypes.filter(
        (o) => !!e.strapi.contentTypes[o] && hl(o)
      ).map(async (o) => {
        const s = Ur.parse(strapi.contentTypes[o]), { kind: c, options: f, uid: u } = s, l = f?.draftAndPublish, p = c === io.SINGLE, d = p && l, h = (m) => ({
          key: o,
          available: m
        });
        if (p) {
          const m = Bt(e, u);
          if (d) {
            const w = d ? await m.count({}, "published") : !0;
            return h(w !== 0);
          }
          return await m.count({}) !== 0 ? h(!0) : t ? h(!1) : void 0;
        }
        return h(!0);
      })
    )).reduce((o, s) => {
      if (!s?.key)
        return o;
      const { key: c, available: f } = s, u = Ur.parse(e.strapi.contentTypes[c]), l = (u.associations || []).find(
        ({ model: q }) => q === "navigationitem"
      ), {
        uid: p,
        options: d,
        info: h,
        collectionName: m,
        modelName: g,
        apiName: w,
        plugin: S,
        kind: x,
        pluginOptions: C = {}
      } = u, T = f && !d?.hidden;
      if (!T)
        return o;
      const { visible: I = !0 } = C["content-manager"] || {}, { description: k = "", displayName: A = "" } = h, _ = Kn(
        fn(e.strapi.api, `[${g}].config.routes`, []),
        (q) => q.handler.includes(".find")
      ), O = _ && _.path.split("/")[1], v = O && O !== w ? O : w || g, M = x === io.SINGLE, j = M ? v : Nu(v), G = ml(g), E = typeof p == "string" ? Wn(p.split(".")).split("-") : [], b = E.length > 1 ? E.reduce((q, z) => `${q}${Xi(z)}`, "") : Xi(g), H = e.strapi.plugin("graphql")?.service("utils")?.naming?.getTypeName(u) || "";
      return o.push({
        uid: p,
        name: G,
        draftAndPublish: d?.draftAndPublish,
        isSingle: M,
        description: k,
        collectionName: m,
        contentTypeName: b,
        label: A,
        relatedField: l ? l.alias : void 0,
        endpoint: j,
        plugin: S,
        available: T,
        visible: I,
        templateName: d?.templateName,
        gqlTypeName: H
      }), o;
    }, []);
  },
  async get({ ids: t, locale: n }) {
    let r = {};
    t && t.length && (r.id = { $in: t });
    const i = await Se(e).find({
      filters: r,
      locale: n || "*",
      limit: Number.MAX_SAFE_INTEGER,
      populate: ["items", "items.parent", "items.audience", "items.related"]
    }), a = ({
      allItems: o,
      item: s,
      parent: c
    }) => {
      const f = o.filter((u) => u.parent?.documentId === s.documentId);
      return {
        ...s,
        parent: c,
        items: f.map(
          (u) => a({
            parent: s,
            item: u,
            allItems: o
          })
        ).sort((u, l) => u.order - l.order)
      };
    };
    return i.map((o) => ({
      ...o,
      items: o.items?.filter((s) => !s.parent).map(
        (s) => a({
          allItems: o.items ?? [],
          item: s
        })
      ).sort((s, c) => s.order - c.order)
    }));
  },
  async getById({ documentId: t, locale: n, populate: r = [] }) {
    const i = ne(e, "common"), { defaultLocale: a } = await i.readLocale(), o = {
      documentId: t
    }, s = await Se(e).findOne({
      filters: o,
      locale: n || a
    }), c = await Pe(e).find({
      filters: { master: s.id },
      locale: n || a,
      limit: Number.MAX_SAFE_INTEGER,
      order: [{ order: "asc" }],
      populate: ["parent", "audience", ...r]
    });
    return {
      ...s,
      items: i.buildNestedStructure({
        navigationItems: c
      }).filter(({ parent: f }) => !f)
    };
  },
  async post({ auditLog: t, payload: n }) {
    const { masterModel: r } = ye(e), i = ne(e, "common"), { defaultLocale: a, restLocale: o } = await i.readLocale(), s = Se(e), c = [], { name: f, visible: u } = n, l = await i.getSlug({ query: f }), p = await s.save({
      name: f,
      visible: u,
      locale: a,
      slug: l
    });
    c.push(await this.getById({ documentId: p.documentId }));
    for (const d of o) {
      const h = await s.save({
        name: f,
        visible: u,
        locale: d,
        slug: l,
        documentId: p.documentId
      });
      c.push(await this.getById({ documentId: h.documentId }));
    }
    return c.map((d) => {
      un(t, "onChangeNavigation", {
        actionType: "CREATE",
        oldEntity: d,
        newEntity: d
      });
    }), await i.emitEvent({
      entity: p,
      event: "entry.create",
      uid: r.uid
    }), {
      ...p,
      items: []
    };
  },
  async put({ auditLog: t, payload: n }) {
    const { masterModel: r } = ye(e), i = ne(e, "common"), { defaultLocale: a, restLocale: o } = await i.readLocale(), s = Se(e), { name: c, visible: f, items: u } = n, l = await s.findOne({
      filters: { documentId: n.documentId },
      locale: n.locale,
      populate: "*"
    }), p = await this.getById({
      documentId: n.documentId,
      locale: n.locale
    });
    if (l.name !== c || l.visible !== f) {
      const h = c ? await i.getSlug({
        query: c
      }) : l.slug, m = await Promise.all(
        [a, ...o].map(
          (g) => s.findOne({
            filters: { documentId: l.documentId },
            locale: g
          })
        )
      );
      for (const g of m)
        await s.save({
          documentId: g.documentId,
          id: g.id,
          slug: h,
          locale: g.locale,
          name: c,
          visible: f
        });
    }
    return await i.analyzeBranch({
      navigationItems: u ?? [],
      masterEntity: l,
      prevAction: {}
    }).then(AE).then(async (h) => {
      const m = await this.getById({ documentId: l.documentId });
      un(t, "onChangeNavigation", {
        actionType: h,
        oldEntity: p,
        newEntity: m
      });
    }), await i.emitEvent({
      entity: await s.findOne({
        filters: { documentId: n.documentId },
        populate: "*"
      }),
      event: "entry.update",
      uid: r.uid
    }), await this.getById({
      documentId: n.documentId,
      locale: n.locale,
      populate: ["related"]
    });
  },
  async delete({ auditLog: t, documentId: n }) {
    const r = Se(e), i = Pe(e), a = await this.getById({ documentId: n }), o = async (f) => {
      f.length < 1 || await i.removeForIds(
        await i.findForMasterIds(f).then(
          (u) => u.reduce((l, { documentId: p }) => (p && l.push(p), l), [])
        )
      );
    }, s = await r.findOne({
      filters: { documentId: n },
      populate: "*"
    }), c = await r.find({
      filters: { documentId: s.documentId },
      locale: "*",
      populate: "*"
    });
    await o(c.map(({ id: f }) => f)), await r.remove({ documentId: s.documentId, locale: "*" }), un(t, "onNavigationDeletion", {
      entity: a,
      actionType: "DELETE"
    });
  },
  async restart() {
    e.strapi.reload.isWatching = !1, setImmediate(() => e.strapi.reload());
  },
  async restoreConfig() {
    console.log("restore");
    const t = ne(e, "common");
    await (await t.getPluginStore()).delete({ key: "config" }), await t.setDefaultConfig();
  },
  async refreshNavigationLocale(t) {
    if (!t)
      return;
    const n = ne(e, "common"), { defaultLocale: r } = await n.readLocale(), i = Se(e), a = await i.find({
      limit: Number.MAX_SAFE_INTEGER,
      locale: r
    });
    await Promise.all(
      a.map(
        ({ name: o, visible: s, slug: c, documentId: f }) => i.save({
          name: o,
          visible: s,
          locale: t,
          slug: c,
          documentId: f
        })
      )
    );
  },
  async updateConfig({ config: t }) {
    const n = ne(e, "common"), r = await n.getPluginStore(), i = await r.get({
      key: "config"
    }).then(Ce.configSchema.parse);
    ja(t.additionalFields), await r.set({ key: "config", value: t });
    const a = du(
      i.additionalFields,
      t.additionalFields,
      "name"
    ).reduce((o, s) => (typeof s == "string" || o.push(s), o), []);
    Ye(a) || await n.pruneCustomFields({ removedFields: a });
  },
  async fillFromOtherLocale({
    auditLog: t,
    source: n,
    target: r,
    documentId: i
  }) {
    const a = await this.getById({ documentId: i, locale: r });
    return await this.i18nNavigationContentsCopy({
      source: await this.getById({ documentId: i, locale: n, populate: ["related"] }),
      target: a
    }).then(() => this.getById({ documentId: i, locale: r, populate: ["related"] })).then((o) => (un(t, "onChangeNavigation", {
      actionType: "UPDATE",
      oldEntity: a,
      newEntity: o
    }), o));
  },
  async i18nNavigationContentsCopy({
    source: t,
    target: n
  }) {
    const r = ne(e, "common"), i = t.items ?? [], a = Se(e);
    if (n.items?.length)
      throw new yr("Current navigation is non-empty");
    if (!n.locale)
      throw new yr("Current navigation does not have specified locale");
    if (!i.length)
      throw new yr("Source navigation is empty");
    const o = au({
      master: n,
      locale: n.locale,
      strapi
    });
    await r.createBranch({
      action: { create: !0 },
      masterEntity: await a.findOne({
        filters: { documentId: n.documentId },
        locale: n.locale,
        populate: "*"
      }),
      navigationItems: await Promise.all(i.map(o)),
      parentItem: void 0
    });
  },
  async readNavigationItemFromLocale({
    path: t,
    source: n,
    target: r
  }) {
    const i = await this.getById({ documentId: n }), a = await this.getById({ documentId: r });
    if (!i)
      throw new kt("Unable to find source navigation for specified query");
    if (!a)
      throw new kt("Unable to find target navigation for specified query");
    const o = [
      "path",
      "related",
      "type",
      "uiRouterKey",
      "title",
      "externalPath"
    ], s = t.split(".").map((f) => parseInt(f, 10));
    (!s.some(Number.isNaN) || !s.length) && new vl("Path is invalid");
    let c = fn(
      i.items,
      TE("items", s.map(pu))
    );
    if (!c)
      throw new kt("Unable to find navigation item");
    return ju.parse(Ca(c, o));
  },
  async getContentTypeItems({
    query: t,
    uid: n
  }) {
    const a = await (await ne(e, "common").getPluginStore()).get({ key: "config" }).then(Ce.configSchema.parse), o = {
      publishedAt: {
        $notNull: !0
      }
    }, s = fn(e.strapi.contentTypes, n), { draftAndPublish: c } = s.options, f = Bt(e, n);
    try {
      return await f.findMany(
        o,
        a.contentTypesPopulate[n] || [],
        c ? "published" : void 0,
        t.locale
      );
    } catch (u) {
      return console.error(u), [];
    }
  },
  async purgeNavigationCache(t, n) {
    const r = Se(e), i = await r.findOne({ filters: { documentId: t } });
    if (!i)
      throw new kt("Navigation is not defined");
    const a = (f) => new RegExp(`/api/navigation/render/${f}`);
    let o = [a(i.documentId)];
    n && (o = (await r.find({
      filters: {
        documentId: i.documentId
      }
    })).map(({ documentId: u }) => a(u)));
    const c = strapi.plugin("rest-cache").service("cacheStore");
    return o.push(a(t)), await c.clearByRegexp(o), { success: !0 };
  },
  async purgeNavigationsCache() {
    const n = strapi.plugin("rest-cache").service("cacheStore"), r = new RegExp("/api/navigation/render(.*)");
    return await n.clearByRegexp([r]), { success: !0 };
  }
}), xa = (e, t = {}, n = []) => {
  const { title: r, related: i } = e, a = jr(i) ? Wn(i) : i;
  if (r)
    return Zi(r) && !Ye(r) ? r : void 0;
  if (a) {
    const o = FE(a, t, n);
    return Zi(o) && !Ye(o) ? o : void 0;
  }
}, FE = (e, t = {}, n = []) => {
  const { __contentType: r } = e, i = Kn(n, (o) => o.contentTypeName === r), { default: a = [] } = t;
  return fn(t, `${i ? i.collectionName : ""}`, a).map((o) => e[o]).filter((o) => o)[0] || "";
}, _a = (e, t) => {
  const n = su(e), r = t ? n.filter(({ path: a }) => a.includes(t)) : n, i = r.find(({ path: a }) => a === t);
  return {
    root: i,
    items: Ke(i) ? [] : e.filter(({ documentId: a }) => r.find((o) => o.documentId === a))
  };
}, su = (e, t, n = null) => e.filter((r) => !r.parent == null && !t ? !0 : r.parent?.documentId === t).reduce((r, i) => {
  const a = `${n || ""}/${i.path}`.replace("//", "/");
  return [
    {
      documentId: i.documentId,
      parent: n && i.parent?.documentId ? {
        id: i.parent?.id,
        documentId: i.parent?.documentId,
        path: n
      } : void 0,
      path: a
    },
    ...su(e, i.documentId, a),
    ...r
  ];
}, []), $E = (e, t) => {
  const n = hu(e, t, (r, i) => Ke(r) ? -1 : Ke(i) ? 1 : r - i);
  return Kn(n, (r) => r !== 0) || 0;
}, IE = (e) => ({
  async readAll({ locale: t, orderBy: n = "createdAt", orderDirection: r = "DESC" }) {
    return Se(e).find({
      locale: t,
      orderBy: { [n]: r }
    });
  },
  renderRFRNavigationItem({ item: t }) {
    const { uiRouterKey: n, title: r, path: i, type: a, audience: o, additionalFields: s } = t, c = {
      label: r,
      type: a,
      audience: o?.map(({ key: f }) => f),
      additionalFields: s
    };
    if (a === "WRAPPER")
      return { ...c };
    if (a === "EXTERNAL")
      return Ha(
        i,
        new At("External navigation item's path is undefined", t)
      ), {
        ...c,
        url: i
      };
    if (a === "INTERNAL")
      return {
        ...c,
        page: n
      };
    if (a === "WRAPPER")
      return {
        ...c
      };
    throw new At("Unknown item type", t);
  },
  renderRFRPage({ item: t, parent: n, enabledCustomFieldsNames: r }) {
    const {
      documentId: i,
      uiRouterKey: a,
      title: o,
      path: s,
      related: c,
      type: f,
      audience: u,
      menuAttached: l,
      additionalFields: p
    } = t, d = r.reduce(
      (h, m) => ({ ...h, [m]: p?.[m] }),
      {}
    );
    return {
      id: a,
      documentId: i,
      title: o,
      related: f === "INTERNAL" && c?.documentId && c?.__type ? {
        contentType: c.__type,
        documentId: c.documentId
      } : void 0,
      path: s,
      parent: n,
      audience: u,
      menuAttached: l,
      additionalFields: d
    };
  },
  renderRFR({
    items: t,
    parent: n,
    parentNavItem: r,
    contentTypes: i = [],
    enabledCustomFieldsNames: a
  }) {
    const o = [];
    let s = {}, c = {};
    return t.forEach((f) => {
      const { items: u, ...l } = f, p = this.renderRFRNavigationItem({
        item: l
      }), d = this.renderRFRPage({
        item: l,
        parent: n,
        enabledCustomFieldsNames: a
      });
      if (f.type !== "EXTERNAL" && (c = {
        ...c,
        [d.documentId]: {
          ...d
        }
      }), f.menuAttached && o.push(p), !n)
        s = {
          ...s,
          root: o
        };
      else {
        const h = o.filter((m) => m.type);
        Ye(h) || (s = {
          ...s,
          [n]: h.concat(r || [])
        });
      }
      if (!Ye(u)) {
        const { nav: h } = this.renderRFR({
          items: u ?? [],
          parent: d.documentId,
          parentNavItem: p,
          contentTypes: i,
          enabledCustomFieldsNames: a
        }), { pages: m } = this.renderRFR({
          items: u || [],
          parent: d.documentId,
          parentNavItem: p,
          contentTypes: i,
          enabledCustomFieldsNames: a
        });
        c = {
          ...c,
          ...m
        }, s = {
          ...s,
          ...h
        };
      }
    }), {
      pages: c,
      nav: s
    };
  },
  renderTree({
    items: t = [],
    documentId: n,
    path: r = "",
    itemParser: i = (a) => Promise.resolve(a)
  }) {
    return Promise.all(
      t.reduce((a, o) => (o.parent?.documentId === n && a.push(i(mu(o), r)), a), [])
    ).then(
      (a) => a.sort((o, s) => o.order !== void 0 && s.order !== void 0 ? o.order - s.order : 0)
    );
  },
  getCustomFields(t) {
    return t.reduce((n, r) => (r !== "audience" && n.push(r), n), []);
  },
  async renderType({
    criteria: t = {},
    filter: n,
    itemCriteria: r = {},
    locale: i,
    populate: a,
    rootPath: o,
    type: s = "FLAT",
    wrapRelated: c,
    status: f = "published"
  }) {
    const u = ne(e, "admin"), l = ne(e, "common"), p = {
      ...t,
      visible: !0
    }, d = Se(e), h = Pe(e);
    let m;
    if (i ? m = await d.find({
      filters: {
        ...p
      },
      locale: i,
      limit: 1
    }) : m = await d.find({
      filters: p,
      limit: 1
    }), jr(m) && (m = gr(m)), m && m.documentId) {
      const g = await h.find({
        filters: {
          master: Ca(m, ["slug", "id"]),
          ...r
        },
        locale: i,
        limit: Number.MAX_SAFE_INTEGER,
        order: [{ order: "asc" }],
        populate: ["audience", "parent", "related"]
      }), w = await l.mapToNavigationItemDTO({
        locale: i,
        master: m,
        navigationItems: g,
        populate: a,
        status: f
      }), { contentTypes: S, contentTypesNameFields: x, additionalFields: C } = await u.config({
        viaSettingsPage: !1
      }), T = this.getCustomFields(C).reduce(
        (_, O) => O.enabled ? [..._, O.name] : _,
        []
      ), I = (_) => c && _ ? {
        documentId: _.documentId,
        ..._
      } : _, k = C.filter(
        (_) => typeof _ != "string"
      ), A = (_) => (O, v) => {
        const M = k.find(({ name: G }) => G === v);
        let j = _.additionalFields?.[v];
        if (j)
          switch (M?.type) {
            case "media":
              j = JSON.parse(j);
              break;
            case "boolean":
              j = j === "true";
              break;
          }
        return { ...O, [v]: j };
      };
      switch (s) {
        case "TREE":
        case "RFR":
          const _ = async (F, D = "") => {
            const H = F.type === "EXTERNAL", q = H ? void 0 : `${D === "/" ? "" : D}/${gr(F.path) === "/" ? F.path.substring(1) : F.path}`, z = typeof q == "string" ? await l.getSlug({
              query: (gr(q) === "/" ? q.substring(1) : q).replace(/\//g, "-")
            }) : void 0, J = jr(F.related) ? Wn(F.related) : F.related, Ae = I(J), R = T.reduce(A(F), {});
            return {
              id: F.id,
              documentId: F.documentId,
              title: xa(F, x, S) ?? "Title missing",
              menuAttached: F.menuAttached,
              order: F.order,
              path: (H ? F.externalPath : q) ?? "Path is missing",
              type: F.type,
              uiRouterKey: F.uiRouterKey,
              slug: !z && F.uiRouterKey ? await l.getSlug({ query: F.uiRouterKey }) : z,
              related: H || !J ? void 0 : {
                ...Ae
              },
              audience: Ye(F.audience) ? void 0 : F.audience,
              items: await this.renderTree({
                itemParser: _,
                path: q,
                documentId: F.documentId,
                items: w
              }),
              collapsed: F.collapsed,
              additionalFields: R || {}
            };
          }, { items: O, root: v } = _a(
            w,
            o
          ), M = await this.renderTree({
            itemParser: _,
            items: Ke(o) ? w : O,
            path: v?.parent?.path,
            documentId: v?.parent?.documentId
          }), j = n ? M.filter((F) => F.uiRouterKey === n) : M;
          return s === "RFR" ? this.renderRFR({
            items: j,
            contentTypes: S.map((F) => F.contentTypeName),
            enabledCustomFieldsNames: T
          }) : j;
        default:
          const G = Ke(o) ? w : _a(w, o).items, E = /* @__PURE__ */ new Map(), b = (F, D = E) => {
            const H = D.get(F);
            if (!Ke(H)) return H;
            const q = G.find((R) => R.documentId === F);
            if (Ke(q)) return [];
            const { order: z, parent: J } = q, Ae = J ? b(J.documentId, D).concat(z) : [z];
            return D.set(F, Ae), Ae;
          };
          return G.map((F) => {
            const D = T.reduce(
              A(F),
              {}
            );
            return {
              ...F,
              audience: F.audience?.map((H) => H.key),
              title: xa(F, x, S) || "",
              related: I(F.related),
              items: null,
              additionalFields: D
            };
          }).sort(
            (F, D) => $E(b(F.documentId), b(D.documentId))
          );
      }
    }
    throw new kt();
  },
  renderChildren({
    childUIKey: t,
    idOrSlug: n,
    locale: r,
    menuOnly: i,
    type: a = "FLAT",
    wrapRelated: o,
    status: s
  }) {
    const c = { $or: [{ documentId: n }, { slug: n }] }, f = a === "FLAT" ? void 0 : t, u = {
      ...i && { menuAttached: !0 },
      ...a === "FLAT" ? { uiRouterKey: t } : {}
    };
    return this.renderType({
      type: a,
      criteria: c,
      itemCriteria: u,
      filter: f,
      wrapRelated: o,
      locale: r,
      status: s
    });
  },
  render({
    idOrSlug: t,
    locale: n,
    menuOnly: r,
    populate: i,
    rootPath: a,
    type: o = "FLAT",
    wrapRelated: s,
    status: c
  }) {
    const f = { $or: [{ documentId: t }, { slug: t }] }, u = r ? { menuAttached: !0 } : {};
    return this.renderType({
      type: o,
      criteria: f,
      itemCriteria: u,
      rootPath: a,
      wrapRelated: s,
      locale: n,
      populate: i,
      status: c
    });
  }
}), OE = ({
  checkData: e,
  parentItem: t
}) => new Promise((n, r) => {
  if (t && t.items) {
    for (let i of e)
      for (let a of t.items)
        if (a.path === i.path && a.id !== i.id && i.type === "INTERNAL" && !a.removed)
          return r(
            new At(
              `Duplicate path:${i.path} in parent: ${t.title || "root"} for ${i.title} and ${a.title} items`,
              {
                parentTitle: t.title,
                parentId: t.id,
                path: i.path,
                errorTitles: [i.title, a.title]
              }
            )
          );
  }
  return n();
}), NE = async (e, t, n, r, i) => {
  if (!t)
    return {
      title: void 0,
      path: void 0
    };
  const a = await Bt(
    e,
    t.__type
  ).findById(t.documentId, void 0, "published", { locale: n }), s = (Ye(r[t.__type]) ? r.default : r[t.__type]).reduce((u, l) => u || a?.[l]?.toString(), ""), f = (i[t.__type] || []).reduce((u, l) => u || a?.[l]?.toString(), void 0) || a?.id.toString();
  return { title: s, path: f };
}, ln = {
  navigation: {},
  "navigation-item": {}
}, PE = (e) => ({
  async getPluginStore() {
    return await strapi.store({ type: "plugin", name: "navigation" });
  },
  async mapToNavigationItemDTO({
    locale: t,
    master: n,
    navigationItems: r,
    parent: i,
    populate: a,
    status: o = "published"
  }) {
    const s = [], f = await (await this.getPluginStore()).get({
      key: "config"
    }).then(Ce.configSchema.parse), u = await Promise.all(
      r.map(async (l) => {
        if (!l.related?.__type || !l.related.documentId)
          return l;
        const p = a ?? f.contentTypesPopulate[l.related.__type], h = await Bt({ strapi }, l.related.__type).findById(
          l.related.documentId,
          p,
          o,
          {
            locale: t
          }
        );
        return {
          ...l,
          related: {
            ...h,
            __type: l.related.__type,
            documentId: l.related.documentId
          }
        };
      })
    );
    for (const l of u) {
      const { items: p = [], ...d } = l;
      s.push({
        ...d,
        parent: i ?? d.parent,
        items: await this.mapToNavigationItemDTO({
          navigationItems: p,
          populate: a,
          master: n,
          parent: d,
          locale: t,
          status: o
        })
      });
    }
    return s;
  },
  setDefaultConfig() {
    return Ua({ strapi, forceDefault: !0 });
  },
  getBranchName({ item: t }) {
    const n = !!t.documentId, r = t.removed;
    if (n && !r)
      return "toUpdate";
    if (n && r)
      return "toRemove";
    if (!n && !r)
      return "toCreate";
  },
  async analyzeBranch({
    masterEntity: t,
    navigationItems: n = [],
    parentItem: r,
    prevAction: i = {}
  }) {
    const { toCreate: a, toRemove: o, toUpdate: s } = n.reduce(
      (u, l) => {
        const p = this.getBranchName({
          item: l
        });
        return p ? { ...u, [p]: [...u[p], l] } : u;
      },
      {
        toRemove: [],
        toCreate: [],
        toUpdate: []
      }
    ), c = {
      create: i.create || a.length > 0,
      update: i.update || s.length > 0,
      remove: i.remove || o.length > 0
    }, f = [...a, ...s];
    return await OE({
      checkData: f,
      parentItem: r
    }), Promise.all([
      this.createBranch({
        action: c,
        masterEntity: t,
        navigationItems: a,
        parentItem: r
      }),
      this.removeBranch({
        navigationItems: o,
        action: c
      }),
      this.updateBranch({
        action: c,
        masterEntity: t,
        navigationItems: s,
        parentItem: r
      })
    ]).then(([u, l, p]) => [...u, ...l, ...p]);
  },
  async removeBranch({
    navigationItems: t = [],
    action: n = {}
  }) {
    const r = [];
    for (const i of t)
      i.documentId && (n.remove = !0, await Pe(e).remove(i), r.push(n), i.items?.length && (await this.removeBranch({
        navigationItems: i.items
      })).forEach((o) => {
        r.push(o);
      }));
    return r;
  },
  async createBranch({
    action: t,
    masterEntity: n,
    navigationItems: r,
    parentItem: i
  }) {
    let a = [];
    const o = ne(e, "admin"), { contentTypesNameFields: s, pathDefaultFields: c } = await o.config({
      viaSettingsPage: !1
    });
    for (const f of r) {
      t.create = !0;
      const { parent: u, master: l, items: p, documentId: d, id: h, related: m, autoSync: g, ...w } = f, S = g ? await NE(
        e,
        m,
        n?.locale || "en",
        s,
        c
      ) : {}, x = w.title || S?.title, C = w.path || S?.path, T = d && h ? {
        ...w,
        documentId: d,
        id: h,
        master: n ? n.id : void 0,
        parent: i ? i.id : void 0,
        autoSync: g,
        title: x,
        path: C,
        related: m
      } : {
        ...w,
        documentId: void 0,
        id: void 0,
        master: n ? n.id : void 0,
        parent: i ? i.id : void 0,
        autoSync: g,
        title: x,
        path: C,
        related: m
      }, I = await Pe(e).save({
        item: T,
        locale: n?.locale
      });
      if (f.items?.length) {
        const k = await this.createBranch({
          action: {},
          masterEntity: n,
          navigationItems: f.items,
          parentItem: I
        });
        a = a.concat(k).concat([t]);
      } else
        a.push(t);
    }
    return a;
  },
  async updateBranch({
    masterEntity: t,
    navigationItems: n,
    action: r,
    parentItem: i
  }) {
    const a = [];
    for (const o of n) {
      r.update = !0;
      const { documentId: s, updated: c, parent: f, master: u, items: l, ...p } = o;
      let d;
      c ? d = await Pe(e).save({
        item: {
          documentId: s,
          ...p
        },
        locale: t?.locale
      }) : d = o, l?.length ? (await this.analyzeBranch({
        navigationItems: l,
        prevAction: {},
        masterEntity: t,
        parentItem: d
      })).forEach((m) => {
        a.push(m);
      }) : a.push(r);
    }
    return a;
  },
  async emitEvent({ entity: t, event: n, uid: r }) {
    const i = strapi.getModel(r), a = await Id(
      {
        ...i,
        schema: i.__schema__,
        getModel: () => i
      },
      t
    );
    strapi.webhookRunner ? strapi.webhookRunner.eventHub.emit(n, {
      model: i.modelName,
      entry: a
    }) : console.warn("Webhook runner not present. Contact with Strapi Navigation Plugin team.");
  },
  async pruneCustomFields({ removedFields: t }) {
    const n = t.map(({ name: o }) => `additionalFields.${o}`), r = t.map(({ name: o }) => o), a = (await Pe(e).find({
      filters: {
        additionalFields: {
          $contains: [r]
        }
      }
    })).map(
      (o) => vn(o, n)
    );
    for (const o of a)
      await Pe(e).save({
        item: {
          documentId: o.documentId,
          additionalFields: o.additionalFields
        }
      });
  },
  async getSlug({ query: t }) {
    let n = Ou(t);
    if (n) {
      const r = await Pe(e).count({
        $or: [
          {
            uiRouterKey: {
              $startsWith: n
            }
          },
          { uiRouterKey: n }
        ]
      });
      r && (n = `${n}-${r}`);
    }
    return n.toLowerCase();
  },
  registerLifeCycleHook({ callback: t, contentTypeName: n, hookName: r }) {
    ln[n][r] || (ln[n][r] = []), ln[n][r]?.push(t);
  },
  async runLifeCycleHook({ contentTypeName: t, event: n, hookName: r }) {
    const i = ln[t][r] ?? [];
    for (const a of i)
      await a(n);
  },
  buildNestedStructure({
    navigationItems: t,
    id: n
  }) {
    return (t?.reduce((r, i) => (n && i.parent?.id !== n || r.push({
      ...vn(i, ["related", "items"]),
      related: i.related,
      items: this.buildNestedStructure({
        navigationItems: t,
        id: i.id
      })
    }), r), []) ?? [])?.sort((r, i) => r.order - i.order) ?? [];
  },
  async readLocale() {
    const t = strapi.plugin("i18n").service("locales");
    let n = await t.getDefaultLocale(), r = (await t.find({})).map(({ code: i }) => i).filter((i) => i !== n);
    return n || (n = r[0], r = r.slice(1)), {
      defaultLocale: n,
      restLocale: r
    };
  },
  updateConfigSchema: tl,
  updateCreateNavigationSchema: il,
  updateNavigationItemAdditionalField: nl,
  updateNavigationItemCustomField: rl,
  updateUpdateNavigationSchema: ol
}), Aa = "navigations_items", Ta = "related", LE = (e) => ({
  async migrateRelatedIdToDocumentId() {
    if (!await strapi.db.connection.schema.hasColumn(
      Aa,
      Ta
    ))
      return;
    console.log("Navigation plugin :: Migrations :: Related id to document id - START");
    const n = Pe(e), r = await n.findV4({
      filters: {},
      limit: Number.MAX_SAFE_INTEGER
    });
    await Promise.all(
      r.map(async (i) => {
        const a = i.related;
        if (a && typeof a == "string") {
          const [o, s] = a.split(cl);
          if (!gu(parseInt(s, 10))) {
            const c = await e.strapi.query(o).findOne({ where: { id: s } });
            c && await n.save({
              item: {
                documentId: i.documentId,
                related: { __type: o, documentId: c.documentId }
              }
            });
          }
        }
      })
    ), await strapi.db.connection.schema.alterTable(Aa, (i) => {
      i.dropColumn(Ta);
    }), console.log("Navigation plugin :: Migrations :: Related id to document id - DONE");
  }
}), kE = {
  admin: RE,
  common: PE,
  client: IE,
  migrate: LE
}, cb = {
  bootstrap: Yl,
  destroy: Ql,
  register: Xl,
  config: Yr,
  controllers: mf,
  contentTypes: sf,
  middlewares: Ga,
  policies: gf,
  routes: wf,
  services: kE
};
export {
  cb as default
};
