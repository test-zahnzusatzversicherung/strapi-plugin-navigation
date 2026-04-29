import Bn, { useRef as We, useEffect as V, useCallback as E, useState as N, useMemo as X, createContext as nn, useContext as an } from "react";
import { jsx as n, jsxs as w, Fragment as ie } from "react/jsx-runtime";
import oe, { useTheme as On } from "styled-components";
import { getFetchClient as j, useRBAC as zn, useMediaQuery as Mt, useIsMobile as on, useIsTablet as _n, useIsDesktop as Qn, Form as at, useNotification as Oe, Layouts as qe, useStrapiApp as Un, Page as Te, useAuth as Kn } from "@strapi/strapi/admin";
import { useDrop as Wn, useDrag as Hn, DndProvider as Xn } from "react-dnd";
import { HTML5Backend as Gn } from "react-dnd-html5-backend";
import { Routes as Zn, Route as kt } from "react-router-dom";
import { useQuery as Fe, useMutation as ge, useQueryClient as be, QueryClient as rn, QueryClientProvider as ln } from "@tanstack/react-query";
import { once as Jn, isEmpty as Y, capitalize as sn, get as J, first as vt, orderBy as Yn, isObject as He, isNil as Be, isString as ot, set as it, sortBy as Xe, isNumber as qt, isBoolean as ea, isNull as ta, isArray as na } from "lodash";
import { useIntl as A } from "react-intl";
import { Dialog as Qe, Flex as P, Typography as F, Button as K, Modal as H, Grid as S, TextInput as we, Toggle as me, Box as D, Table as dn, Thead as cn, Tr as et, Th as ce, Checkbox as Dt, IconButton as ye, Tbody as un, Td as ue, Loader as bt, Tag as aa, Field as Vt, SingleSelect as xe, SingleSelectOption as Ae, Badge as pn, CardTitle as oa, IconButtonGroup as mn, Card as ia, CardBody as jt, Divider as tt, TextButton as ra, Link as la, MultiSelect as De, MultiSelectOption as Ve, Textarea as sa, Combobox as gn, ComboboxOption as da, Searchbar as ca, NumberInput as ua, VisuallyHidden as pa, Tooltip as ma, TFooter as ga, Accordion as Ue, Alert as ha } from "@strapi/design-system";
import { Check as Ge, WarningCircle as fa, Feather as ya, Pencil as Tt, Trash as wt, Information as ba, CaretDown as Ia, CaretUp as Ca, Drag as va, Eye as hn, ArrowClockwise as Ta, Earth as wa, Cog as Sa, Link as xa, Plus as St, ArrowRight as Aa, Search as Fa, ListPlus as Na, Minus as Ra, EyeStriked as $a, PriceTag as La, Play as Ea, Typhoon as Pa } from "@strapi/icons";
import * as s from "zod";
import { z as g } from "zod";
import { usePluginTheme as Ma, Field as L, prefixPluginTranslations as Bt, flattenObject as Ot } from "@sensinum/strapi-utils";
import { prop as nt } from "lodash/fp";
const de = "navigation", ka = ({ setPlugin: e }) => {
  const t = We(e);
  return V(() => {
    t.current?.(de);
  }, []), null;
}, qa = 92, Da = oe.svg`
  path {
    fill: ${({ theme: e }) => e.colors.neutral500};
  }
`, Va = ({ width: e = 20, height: t = 20 }) => /* @__PURE__ */ n(
  Da,
  {
    viewBox: `0 0 ${e} ${t}`,
    xmlns: "http://www.w3.org/2000/svg",
    height: t,
    width: e,
    children: /* @__PURE__ */ n("g", { style: { transform: `scale(${e / qa})` }, children: /* @__PURE__ */ n(
      "path",
      {
        d: `M78,23.5H14c-3.6,0-6.5-2.9-6.5-6.5s2.9-6.5,6.5-6.5h64c3.6,0,6.5,2.9,6.5,6.5S81.6,23.5,78,23.5z M84.5,46
        c0-3.6-2.9-6.5-6.5-6.5H14c-3.6,0-6.5,2.9-6.5,6.5s2.9,6.5,6.5,6.5h64C81.6,52.5,84.5,49.6,84.5,46z M84.5,75c0-3.6-2.9-6.5-6.5-6.5
        H14c-3.6,0-6.5,2.9-6.5,6.5s2.9,6.5,6.5,6.5h64C81.6,81.5,84.5,78.6,84.5,75z`
      }
    ) })
  }
), ja = () => /* @__PURE__ */ n(Va, {}), zt = {
  en: () => import("../_chunks/en-L50uvYty.mjs"),
  de: () => import("../_chunks/de-C330VYhA.mjs"),
  fr: () => import("../_chunks/fr-DWobxKQZ.mjs"),
  ca: () => import("../_chunks/ca-BGB_PMcy.mjs")
}, It = (e) => `${de}.${e}`, l = (e, t) => ({
  id: It(e),
  defaultMessage: t ?? It(e)
}), xt = g.object({
  name: g.string({ required_error: "requiredError" }).nonempty("requiredError").refine((e) => !e.includes(" "), { message: "noSpaceError" }),
  label: g.string({ required_error: "requiredError" }).nonempty("requiredError"),
  description: g.string().optional(),
  placeholder: g.string().optional(),
  required: g.boolean().optional(),
  enabled: g.boolean().optional()
}), Ba = xt.extend({
  type: g.literal("select"),
  multi: g.boolean(),
  options: g.array(g.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
}), Oa = xt.extend({
  type: g.enum(["boolean", "string"]),
  multi: g.literal(!1).optional(),
  options: g.array(g.string()).max(0).optional()
}), za = xt.extend({
  type: g.literal("media"),
  multi: g.literal(!1).optional(),
  options: g.array(g.string()).max(0).optional()
}), fn = g.discriminatedUnion("type", [
  Oa,
  za,
  Ba
]), _a = g.union([
  g.literal("audience"),
  fn
]), Qa = g.object({
  additionalFields: g.array(_a),
  allowedLevels: g.number(),
  availableAudience: g.object({
    id: g.number(),
    documentId: g.string(),
    name: g.string(),
    key: g.string()
  }).array(),
  contentTypes: g.array(g.string()),
  defaultContentType: g.string().optional(),
  contentTypesNameFields: g.record(g.string(), g.array(g.string())),
  contentTypesPopulate: g.record(g.string(), g.array(g.string())),
  gql: g.object({
    navigationItemRelated: g.array(g.string())
  }),
  pathDefaultFields: g.record(g.string(), g.any()),
  cascadeMenuAttached: g.boolean(),
  preferCustomContentTypes: g.boolean(),
  isCacheEnabled: g.boolean().optional(),
  isCachePluginEnabled: g.boolean().optional()
}), Ua = g.object({
  uid: g.string(),
  isDisplayed: g.boolean(),
  apiID: g.string(),
  kind: g.enum(["collectionType", "singleType"]),
  info: g.object({
    singularName: g.string(),
    pluralName: g.string(),
    displayName: g.string(),
    description: g.string().optional()
  }),
  attributes: g.record(g.string(), g.unknown())
}), Ka = s.object({
  id: s.number(),
  documentId: s.string(),
  name: s.string(),
  key: s.string()
}), yn = s.enum(["INTERNAL", "EXTERNAL", "WRAPPER"]), Wa = s.object({
  id: s.number(),
  documentId: s.string(),
  title: s.string(),
  type: yn,
  path: s.string().or(s.null()).optional(),
  externalPath: s.string().or(s.null()).optional(),
  uiRouterKey: s.string(),
  menuAttached: s.boolean(),
  order: s.number().int(),
  collapsed: s.boolean(),
  autoSync: s.boolean().or(s.null()).optional(),
  related: s.object({ documentId: s.string().optional(), __type: s.string() }).catchall(s.unknown()).nullish(),
  additionalFields: s.record(s.string(), s.unknown()).or(s.null()).optional(),
  audience: s.array(Ka).or(s.null()).optional(),
  viewId: s.number().optional(),
  viewParentId: s.number().optional(),
  structureId: s.string().optional(),
  removed: s.boolean().optional(),
  isSearchActive: s.boolean().optional(),
  updated: s.boolean().optional()
}), bn = Wa.extend({
  items: s.lazy(() => bn.array().or(s.null())).optional()
}), _t = s.object({
  id: s.number(),
  documentId: s.string(),
  name: s.string(),
  slug: s.string(),
  locale: s.string(),
  visible: s.boolean(),
  items: s.array(bn)
}), At = s.object({
  name: s.string({ required_error: "requiredError" }).nonempty("requiredError").refine((e) => !e.includes(" "), { message: "noSpaceError" }),
  label: s.string({ required_error: "requiredError" }).nonempty("requiredError"),
  description: s.string().optional(),
  placeholder: s.string().optional(),
  required: s.boolean().optional(),
  enabled: s.boolean().optional()
}), Ha = At.extend({
  type: s.literal("select"),
  multi: s.boolean(),
  options: s.array(s.string(), { required_error: "requiredError" }).min(1, { message: "requiredError" })
}), Xa = At.extend({
  type: s.enum(["boolean", "string"]),
  multi: s.literal(!1).optional(),
  options: s.array(s.string()).max(0).optional()
}), Ga = At.extend({
  type: s.literal("media"),
  multi: s.literal(!1).optional(),
  options: s.array(s.string()).max(0).optional()
}), Za = s.discriminatedUnion("type", [
  Xa,
  Ga,
  Ha
]), Ja = s.union([
  s.literal("audience"),
  Za
]), Ya = s.object({
  uid: s.string(),
  name: s.string(),
  draftAndPublish: s.boolean(),
  isSingle: s.boolean(),
  description: s.string(),
  collectionName: s.string(),
  contentTypeName: s.string(),
  label: s.string(),
  endpoint: s.string(),
  available: s.boolean(),
  visible: s.boolean()
}), eo = s.object({
  additionalFields: s.array(Ja),
  allowedLevels: s.number(),
  availableAudience: s.object({
    id: s.number(),
    documentId: s.string(),
    name: s.string(),
    key: s.string()
  }).array(),
  contentTypes: s.array(s.string()),
  defaultContentType: s.string().optional(),
  contentTypesNameFields: s.record(s.string(), s.array(s.string())),
  contentTypesPopulate: s.record(s.string(), s.array(s.string())),
  gql: s.object({
    navigationItemRelated: s.array(s.string())
  }),
  pathDefaultFields: s.record(s.string(), s.string().array()),
  cascadeMenuAttached: s.boolean(),
  preferCustomContentTypes: s.boolean(),
  allowedContentTypes: s.string().array(),
  restrictedContentTypes: s.string().array(),
  isCacheEnabled: s.boolean().optional(),
  isCachePluginEnabled: s.boolean().optional()
}), Qt = eo.omit({
  contentTypes: !0
}).extend({
  contentTypes: Ya.array()
}), to = s.object({
  defaultLocale: s.string(),
  restLocale: s.string().array()
}), no = s.enum(["collectionType", "singleType"]), ao = s.object({
  singularName: s.string(),
  pluralName: s.string(),
  displayName: s.string(),
  description: s.string().optional(),
  name: s.string().optional()
}), In = s.object({
  required: s.boolean().optional(),
  max: s.number().optional(),
  min: s.number().optional(),
  minLength: s.number().optional(),
  maxLength: s.number().optional(),
  private: s.boolean().optional(),
  configurable: s.boolean().optional(),
  default: s.any().optional()
}), oo = s.enum([
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
]), io = In.extend({
  type: oo
}), ro = In.extend({
  type: s.literal("enumeration"),
  enum: s.string().array()
}), lo = s.object({
  type: s.literal("component"),
  component: s.string(),
  repeatable: s.boolean().optional()
}), so = s.object({
  type: s.literal("dynamiczone"),
  components: s.string().array()
}), co = s.object({
  media: s.literal("media"),
  allowedTypes: s.enum(["images", "videos", "audios", "files"]).array(),
  required: s.boolean().optional()
}), uo = s.enum([
  "oneToOne",
  "oneToMany",
  "manyToOne",
  "manyToMany",
  "morphToMany",
  "manyToMorph"
]), po = s.object({
  type: s.literal("relation"),
  relation: uo,
  target: s.string(),
  mappedBy: s.string().optional(),
  inversedBy: s.string().optional()
}), mo = s.record(
  s.string(),
  s.union([
    io,
    ro,
    lo,
    so,
    po,
    co
  ])
), go = s.object({
  kind: no,
  collectionName: s.string(),
  info: ao,
  options: s.object({
    draftAndPublish: s.boolean().optional(),
    hidden: s.boolean().optional(),
    templateName: s.string().optional()
  }).optional(),
  attributes: mo,
  actions: s.record(s.string(), s.any()).optional(),
  lifecycles: s.record(s.string(), s.any()).optional(),
  uid: s.string(),
  apiName: s.string().optional(),
  // TODO?: remove
  associations: s.object({
    model: s.string(),
    alias: s.string()
  }).array().optional(),
  modelName: s.string().optional(),
  plugin: s.string().optional(),
  pluginOptions: s.record(s.string(), s.any()).optional(),
  isSingle: s.boolean().optional()
});
go.pick({
  info: !0,
  kind: !0,
  attributes: !0,
  options: !0
});
const ho = s.object({
  id: s.number(),
  documentId: s.string(),
  locale: s.string().or(s.null()).optional()
}).and(s.record(s.string(), s.any())), fo = s.object({ slug: s.string() }), yo = s.object({
  externalPath: s.string().or(s.null()).optional(),
  path: s.string().or(s.null()).optional(),
  related: s.object({ documentId: s.string().optional(), __type: s.string() }).catchall(s.unknown()).nullish(),
  title: s.string(),
  type: yn,
  uiRouterKey: s.string()
}), q = "navigation", B = Jn((e) => ({
  getIndexPrefix() {
    return [q];
  },
  readAll() {
    return e.get(`/${q}`).then(({ data: t }) => _t.array().parse(t));
  },
  readAllIndex() {
    return [q, "navigations"];
  },
  delete(t) {
    return e.del(`/${q}/${t}`);
  },
  create(t) {
    return e.post(`/${q}/`, t);
  },
  update(t) {
    return e.put(`/${q}/${t.documentId}`, t).then(({ data: a }) => a).then(_t.parse);
  },
  purge({ documentId: t, withLangVersions: a }) {
    return e.del(
      `/${q}/cache/purge/${t ?? ""}?clearLocalisations=${!!a}`
    );
  },
  slugify(t) {
    const a = new URLSearchParams();
    return a.append("q", t), e.get(`/${q}/slug?${a.toString()}`).then(({ data: o }) => fo.parse(o)).then(({ slug: o }) => o);
  },
  readConfig() {
    return e.get(`/${q}/config`).then(({ data: t }) => Qt.parse(t));
  },
  readConfigIndex() {
    return [q, "config"];
  },
  healthCheck() {
    return e.get("/_health");
  },
  healthCheckIndex() {
    return ["health"];
  },
  readNavigationItemFromLocale({
    source: t,
    structureId: a,
    target: o,
    documentId: i
  }) {
    return e.get(
      `/${q}/i18n/item/read/${i}/${t}/${o}?path=${a}`
    );
  },
  updateConfig(t) {
    return e.put(`/${q}/config`, t).then(() => {
    });
  },
  restart() {
    return e.get(`/${q}/settings/restart`).then(() => {
    });
  },
  restoreConfig() {
    return e.del(`/${q}/config`).then(() => {
    });
  },
  readSettingsConfig() {
    return e.get(`/${q}/settings/config`).then(({ data: t }) => {
      const a = Qt.parse(t);
      return {
        ...a,
        contentTypes: a.contentTypes.map(({ uid: o }) => o)
      };
    });
  },
  readSettingsConfigIndex() {
    return [q, "config"];
  },
  readContentType() {
    return e.get("/content-manager/content-types").then(({ data: t }) => Ua.array().parse(t.data));
  },
  readContentTypeIndex() {
    return [q, "content-manager", "content-types"];
  },
  readContentTypeItems({ uid: t, locale: a, query: o }) {
    const i = new URLSearchParams();
    return o && i.append("_q", o), a && i.append("locale", a), e.get(`/${q}/content-type-items/${t}?${i.toString()}`).then(({ data: r }) => ho.array().parse(r));
  },
  readContentTypeItemsIndex({
    uid: t,
    locale: a,
    query: o
  }) {
    return [q, "content-manager", "content-type-items", t, a, o];
  },
  readLocale() {
    return e.get(`/${q}/settings/locale`).then((t) => to.parse(t.data));
  },
  readLocaleIndex() {
    return [q, "locale"];
  },
  copyNavigationLocale({
    documentId: t,
    source: a,
    target: o
  }) {
    return e.put(`/${q}/i18n/copy/${t}/${a}/${o}`);
  },
  copyNavigationItemLocale({
    source: t,
    structureId: a = "",
    target: o
  }) {
    return e.get(`/${q}/i18n/item/read/${t}/${o}?path=${a}`).then((i) => yo.parse(i.data));
  }
})), rt = (e) => ({
  ...e,
  viewId: Math.floor(Math.random() * 152e4),
  items: e.items?.map(rt)
}), Ft = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readLocaleIndex(),
    queryFn: t.readLocale,
    staleTime: 1 / 0
  });
}, Cn = (e) => {
  const t = j(), a = B(t);
  return Fe({
    queryKey: a.readContentTypeItemsIndex(e),
    queryFn: () => a.readContentTypeItems(e),
    staleTime: 1e3 * 60 * 3,
    enabled: !!e.uid
  });
}, bo = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readContentTypeIndex(),
    queryFn: () => t.readContentType(),
    staleTime: 1e3 * 60 * 3
  });
}, Io = () => {
  const e = j(), t = B(e), a = be();
  return () => {
    a.resetQueries({
      queryKey: t.readAllIndex()
    });
  };
}, Co = () => {
  const e = j(), t = B(e), a = be();
  return () => {
    a.resetQueries({
      queryKey: t.readContentTypeIndex()
    });
  };
}, vo = (e) => {
  const t = j(), a = B(t), o = be();
  return () => {
    o.invalidateQueries({
      queryKey: a.readContentTypeItemsIndex(e)
    });
  };
}, To = () => {
  const e = j(), t = B(e), a = be();
  return () => {
    a.invalidateQueries({
      queryKey: t.readAllIndex()
    });
  };
}, wo = () => {
  const e = j(), t = B(e), a = be();
  return () => a.invalidateQueries({ queryKey: t.readLocaleIndex() });
}, Nt = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readAllIndex(),
    queryFn() {
      return t.readAll().then(
        (a) => a.map(
          (o) => ({
            ...o,
            items: o.items.map(rt)
          })
        )
      );
    },
    staleTime: 1e3 * 60 * 5
  });
}, So = () => {
  const e = be(), t = j(), a = B(t);
  return E(() => {
    e.invalidateQueries({
      queryKey: a.getIndexPrefix()
    });
  }, [e, t, a]);
}, xo = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn(a) {
      return Promise.all(a.map(t.delete));
    }
  });
}, Ao = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn: t.copyNavigationItemLocale
  });
}, Fo = () => {
  const e = j(), t = B(e), a = be();
  return ge({
    mutationFn: t.copyNavigationLocale,
    onSuccess() {
      a.invalidateQueries({
        queryKey: t.readAllIndex()
      });
    }
  });
}, No = () => {
  const e = j(), t = B(e), a = be();
  return ge({
    mutationFn: t.create,
    onSuccess() {
      a.invalidateQueries({
        queryKey: t.readAllIndex()
      });
    }
  });
}, vn = ({
  onError: e,
  onSuccess: t
}) => {
  const a = j(), o = B(a), i = be();
  return ge({
    mutationFn: o.update,
    onSuccess(r) {
      i.invalidateQueries({
        queryKey: o.readAllIndex()
      }), t?.(r);
    },
    onError: e
  });
}, Tn = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn(a) {
      return a?.length ? Promise.all(
        a.map((o) => t.purge({ documentId: o, withLangVersions: !0 }))
      ) : t.purge({});
    }
  });
}, ne = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readConfigIndex(),
    queryFn: t.readConfig
  });
}, Ro = /* @__PURE__ */ n(fa, {}), lt = ({
  isVisible: e = !1,
  isActionAsync: t = !1,
  children: a,
  onConfirm: o,
  onCancel: i,
  header: r,
  labelCancel: d,
  labelConfirm: c,
  iconConfirm: m,
  mainIcon: p = Ro
}) => {
  const { formatMessage: u } = A();
  return e ? /* @__PURE__ */ n(
    Qe.Root,
    {
      open: e,
      onOpenChange: (C) => {
        !C && e && i?.(void 0);
      },
      title: r || u(l("components.confirmation.dialog.header", "Confirmation")),
      children: /* @__PURE__ */ w(Qe.Content, { children: [
        /* @__PURE__ */ n(Qe.Body, { icon: p, children: /* @__PURE__ */ n(P, { justifyContent: "center", children: /* @__PURE__ */ n(F, { id: "dialog-confirm-description", children: a || u(l("components.confirmation.dialog.description")) }) }) }),
        /* @__PURE__ */ w(Qe.Footer, { children: [
          /* @__PURE__ */ n(Qe.Cancel, { children: /* @__PURE__ */ n(K, { fullWidth: !0, onClick: i, variant: "tertiary", disabled: t, children: d || u(l("components.confirmation.dialog.button.cancel", "Cancel")) }) }),
          /* @__PURE__ */ n(
            K,
            {
              fullWidth: !0,
              onClick: o,
              variant: "danger-light",
              startIcon: m || /* @__PURE__ */ n(Ge, {}),
              disabled: t,
              children: c || u(l("components.confirmation.dialog.button.confirm", "Confirm"))
            }
          )
        ] })
      ] })
    }
  ) : null;
}, Ut = /* @__PURE__ */ n(ie, {}), $o = ({ onConfirm: e, onCancel: t }) => {
  const { formatMessage: a } = A();
  return /* @__PURE__ */ n(
    lt,
    {
      isVisible: !0,
      header: a(l("pages.view.actions.i18nCopyItems.confirmation.header")),
      labelConfirm: a(l("pages.view.actions.i18nCopyItems.confirmation.confirm")),
      iconConfirm: Ut,
      mainIcon: Ut,
      onConfirm: e,
      onCancel: t,
      children: a(l("pages.view.actions.i18nCopyItems.confirmation.content"))
    }
  );
}, Lo = (e) => {
  const [t, a] = N(!1), [o, i] = N(void 0), r = E(() => {
    a(!1);
  }, [a]), d = E(() => {
    o && (e(o), a(!1));
  }, [e, o]), c = X(
    () => t ? /* @__PURE__ */ n($o, { onConfirm: d, onCancel: r }) : null,
    [t, d, r]
  );
  return X(
    () => ({
      setI18nCopyModalOpened: a,
      setI18nCopySourceLocale: i,
      i18nCopyItemsModal: c,
      i18nCopySourceLocale: o
    }),
    [i, a, c, o]
  );
}, Eo = () => {
  const e = wo(), t = To();
  V(() => {
    e(), t();
  }, []);
}, Po = ({ cancel: e, perform: t, trigger: a }) => {
  const o = {};
  return {
    perform: (i) => {
      const r = i ?? o.value;
      r && t(r);
    },
    trigger: (i) => {
      o.value = i, a();
    },
    cancel: e
  };
}, Mo = (e, t) => {
  const a = Ft(), [o, i] = N(), [r, d] = N(!1), c = X(
    () => Po({
      perform: (p) => {
        i(p), d(!1), t(!1);
      },
      trigger: () => d(!0),
      cancel: () => d(!1)
    }),
    [i, d]
  ), m = X(
    () => (a.data ? [a.data.defaultLocale, ...a.data.restLocale] : []).filter((p) => p !== o),
    [a.data, o]
  );
  return V(() => {
    !o && a.data?.defaultLocale && (i(a.data?.defaultLocale), t(!1));
  }, [e, o, a.data?.defaultLocale]), {
    localeData: a.data,
    currentLocale: o,
    isChangeLanguageVisible: r,
    changeCurrentLocaleAction: c,
    availableLocales: m
  };
}, ko = (e) => {
  const [t, a] = N(), [o, i] = N(!1), r = E(
    (p, u = {}) => {
      a(u), i(p);
    },
    [i]
  ), d = E(() => {
    r(!1);
  }, [r]), c = E(
    (p, u, C = !0, h = "", v = !0, f = "0", y = 0) => {
      e && (p.preventDefault(), p.stopPropagation(), r(!0, {
        viewParentId: u,
        isMenuAllowedLevel: C,
        levelPath: h,
        parentAttachedToMenu: v,
        structureId: f,
        viewId: void 0,
        order: y + 1
      }));
    },
    [r, e]
  ), m = E(
    ({
      item: p,
      levelPath: u = "",
      parentAttachedToMenu: C = !0
    }) => {
      r(!0, {
        ...p,
        levelPath: u,
        parentAttachedToMenu: C
      });
    },
    [r]
  );
  return {
    activeNavigationItem: t,
    addNewNavigationItem: c,
    editNavigationItem: m,
    closeNavigationItemPopup: d,
    isItemPopupVisible: o
  };
}, wn = (e, t, a) => {
  const o = e.reduce((i, r) => {
    const d = r.items?.length ? wn(r.items ?? [], t) : [];
    return t(r) ? [r, ...d, ...i] : [...d, ...i];
  }, []);
  if (a !== void 0) {
    const i = a % o.length;
    return o.map((r, d) => i === d ? { ...r, isSearchActive: !0 } : r);
  }
  return o;
}, qo = (e) => {
  const [{ value: t, index: a }, o] = N({
    value: "",
    index: 0
  }), i = Y(t), r = (t || "").toLowerCase(), d = i ? [] : wn(
    e?.items.map((c) => ({ ...c })) ?? [],
    (c) => (c?.title || "").toLowerCase().includes(r),
    r ? a : void 0
  );
  return {
    searchValue: t,
    setSearchValue: o,
    isSearchEmpty: i,
    filteredList: d
  };
}, mt = (e) => `plugin::navigation.${e}`, gt = {
  read: "read",
  update: "update",
  settings: "settings"
}, Le = {
  access: [{ action: mt(gt.read), subject: null }],
  update: [{ action: mt(gt.update), subject: null }],
  settings: [{ action: mt(gt.settings), subject: null }]
}, Do = () => {
  const e = X(
    () => ({
      access: Le.access || Le.update,
      update: Le.update
    }),
    []
  ), {
    isLoading: t,
    allowedActions: { canUpdate: a, canAccess: o }
  } = zn(e);
  return { canAccess: o, canUpdate: a, isLoadingForPermissions: t };
}, Ze = () => {
  const {
    theme: { breakpoints: e }
  } = Ma(), t = !Mt(e.small), a = on(), o = _n(), i = Qn(), r = Mt("@media (min-width: 1280px)");
  return { isSmallMobile: t, isMobile: a, isTablet: o, isDesktop: i, isLargeDesktop: r };
}, Ke = (e = []) => Yn(e, ["order"], ["asc"]).map((t, a) => {
  const o = a + 1;
  return {
    ...t,
    order: o,
    updated: t.updated || o !== t.order
  };
}), Ye = (e, t) => e.type === "INTERNAL" ? {
  type: "INTERNAL",
  collapsed: !!e.collapsed,
  id: e.id,
  documentId: e.documentId,
  menuAttached: !!e.menuAttached,
  order: e.order ?? 0,
  path: e.path,
  title: e.title,
  uiRouterKey: e.uiRouterKey,
  additionalFields: e.additionalFields,
  audience: e.audience?.map(
    (a) => t.availableAudience.find((o) => o.documentId === a)
  ) ?? [],
  autoSync: e.autoSync,
  items: e.items?.length ? je(e, e.items, t) : e.items,
  related: {
    __type: e.relatedType,
    documentId: e.related
  },
  viewId: e.viewId,
  viewParentId: e.viewParentId,
  structureId: e.structureId,
  removed: e.removed,
  updated: e.updated
} : e.type === "EXTERNAL" ? {
  type: "EXTERNAL",
  collapsed: !!e.collapsed,
  id: e.id,
  documentId: e.documentId,
  menuAttached: !!e.menuAttached,
  order: e.order ?? 0,
  title: e.title,
  uiRouterKey: e.uiRouterKey,
  additionalFields: e.additionalFields,
  autoSync: e.autoSync,
  items: e.items?.length ? je(e, e.items, t) : e.items,
  path: "",
  viewId: e.viewId,
  structureId: e.structureId,
  viewParentId: e.viewParentId,
  removed: e.removed,
  updated: e.updated,
  externalPath: e.externalPath ?? "",
  audience: e.audience?.map(
    (a) => t.availableAudience.find((o) => o.documentId === a)
  ) ?? []
} : {
  type: "WRAPPER",
  collapsed: !!e.collapsed,
  id: e.id,
  documentId: e.documentId,
  menuAttached: !!e.menuAttached,
  order: e.order ?? 0,
  path: e.path ?? "",
  title: e.title,
  uiRouterKey: e.uiRouterKey,
  additionalFields: e.additionalFields,
  audience: e.audience?.map(
    (a) => t.availableAudience.find((o) => o.documentId === a)
  ) ?? [],
  autoSync: e.autoSync,
  items: e.items?.length ? je(e, e.items, t) : e.items,
  viewId: e.viewId,
  viewParentId: e.viewParentId,
  structureId: e.structureId,
  removed: e.removed,
  updated: e.updated
}, je = (e, t = [], a) => {
  if (!e.viewParentId) {
    if (e.viewId) {
      const i = t.map((r) => r.viewId === e.viewId ? Ye(e, a) : {
        ...r,
        items: r.items?.length ? je(e, r.items, a) : r.items
      });
      return Ke(i);
    }
    return [
      ...Ke([...t, Ye({ ...e, viewId: Date.now() }, a)])
    ];
  }
  const o = t.map((i) => {
    const r = i.items || [];
    if (e.viewParentId === i.viewId) {
      if (!e.viewId)
        return {
          ...i,
          items: [
            ...Ke([
              ...r,
              Ye({ ...e, viewId: Date.now() }, a)
            ])
          ]
        };
      const d = r.map((c) => c.viewId === e.viewId ? Ye(e, a) : c);
      return {
        ...i,
        items: Ke(d)
      };
    }
    return {
      ...i,
      items: i.items?.length ? je(e, i.items, a) : i.items
    };
  });
  return Ke(o);
}, st = (e, t) => {
  const a = t?.contentTypes ?? [], o = t?.contentTypesNameFields ?? {}, i = o.default ?? [], { __collectionUid: r } = e, d = a.find(({ uid: u }) => u === r);
  if (d?.isSingle)
    return d.label;
  const c = [
    ...i,
    ...i.map((u) => sn(u))
  ], m = J(
    o,
    `${d ? d.uid : r}`,
    c
  ), p = (Y(m) ? c : m).map((u) => e[u]).filter((u) => u);
  return vt(p) || "";
}, Vo = ({
  relatedRef: e,
  relatedType: t = {},
  type: a,
  isCollection: o
}) => o ? t.available || e.available : a === "INTERNAL" && (e ? "publishedAt" in e : !1) ? J(e, "publishedAt", !0) : !0, Se = (e, t = !1) => {
  const { __type: a, documentId: o } = e.type === "INTERNAL" && e.related ? e.related : {
    __type: "",
    documentId: ""
  };
  return e.type === "INTERNAL" ? {
    type: "INTERNAL",
    id: e.id,
    documentId: e.documentId,
    additionalFields: e.additionalFields ?? {},
    path: e.path ?? "",
    relatedType: a,
    related: o,
    title: e.title,
    uiRouterKey: e.uiRouterKey,
    autoSync: e.autoSync ?? void 0,
    collapsed: e.collapsed,
    externalPath: void 0,
    order: e.order ?? 0,
    menuAttached: e.menuAttached,
    viewId: e.viewId,
    viewParentId: e.viewParentId,
    items: t ? e.items : e.items?.map((i) => Se(i)) ?? void 0,
    removed: e.removed,
    updated: e.updated,
    isSearchActive: e.isSearchActive
  } : e.type === "EXTERNAL" ? {
    type: "EXTERNAL",
    id: e.id,
    documentId: e.documentId,
    additionalFields: e.additionalFields ?? {},
    title: e.title,
    uiRouterKey: e.uiRouterKey,
    autoSync: e.autoSync ?? void 0,
    collapsed: e.collapsed,
    externalPath: e.externalPath,
    order: e.order ?? 0,
    menuAttached: e.menuAttached,
    viewId: e.viewId,
    viewParentId: e.viewParentId,
    items: t ? e.items : e.items?.map((i) => Se(i)) ?? void 0,
    removed: e.removed,
    updated: e.updated,
    isSearchActive: e.isSearchActive
  } : {
    type: "WRAPPER",
    id: e.id,
    documentId: e.documentId,
    additionalFields: e.additionalFields ?? {},
    title: e.title,
    uiRouterKey: e.uiRouterKey,
    autoSync: e.autoSync ?? void 0,
    collapsed: e.collapsed,
    order: e.order ?? 0,
    menuAttached: e.menuAttached,
    viewId: e.viewId,
    viewParentId: e.viewParentId,
    items: t ? e.items : e.items?.map((i) => Se(i)) ?? void 0,
    removed: e.removed,
    updated: e.updated,
    isSearchActive: e.isSearchActive,
    path: e.path ?? ""
  };
}, Sn = (e) => e.find(({ isPending: t }) => t), ke = (e, t) => e.collapsed !== t ? {
  ...e,
  collapsed: t,
  updated: !0,
  items: e.items?.map((a) => ke(a, t))
} : {
  ...e,
  items: e.items?.map((a) => ke(a, t))
}, ze = ({ start: e, end: t }) => /* @__PURE__ */ w(H.Footer, { children: [
  /* @__PURE__ */ n(H.Close, { children: Kt(e) }),
  Kt(t)
] }), Kt = (e) => e ? /* @__PURE__ */ n(K, { onClick: e.onClick, variant: e.variant, disabled: e.disabled, children: e.children }) : null, jo = ({ alreadyUsedNames: e }) => g.object({
  name: g.string().min(2).and(g.string().refine((t) => !e.includes(t), "Name already used")),
  // TODO: add translation
  visible: g.boolean()
}), xn = ({
  navigation: e,
  onChange: t,
  alreadyUsedNames: a = [],
  isLoading: o
}) => {
  const [i, r] = N({}), [d, c] = N(), { formatMessage: m } = A(), { name: p, visible: u } = i, C = (f, y, I) => {
    if (I) {
      let b = f, T = y;
      if (He(f)) {
        const { name: $, value: z } = f.target;
        b = $, T = Be(T) ? z : T;
      }
      return ot(b) && h(b, T), I(f, T);
    }
  }, h = (f, y) => {
    r(
      it(
        {
          ...i
        },
        f,
        y
      )
    );
  }, v = (f) => {
    const y = J(d, f);
    if (y)
      return y;
  };
  return V(() => {
    e && (e.name ? r({
      ...e
    }) : (r({
      name: "New navigation",
      visible: !0
    }), t({
      name: "New navigation",
      visible: !0,
      disabled: !0
    })));
  }, []), V(() => {
    if (`${p}-${u}` != `${e.name}-${e.visible}`) {
      const { error: f } = jo({ alreadyUsedNames: a }).safeParse(i);
      t({
        ...e,
        name: p,
        visible: u,
        disabled: !Y(f?.issues)
      }), c(
        f ? f.issues.reduce((y, I) => ({
          ...y,
          [I.path.join(".")]: I.message
        }), {}) : void 0
      );
    }
  }, [p, u]), /* @__PURE__ */ n(at, { width: "auto", height: "auto", method: "POST", initialValues: i, children: ({ values: f, onChange: y }) => /* @__PURE__ */ w(S.Root, { gap: 5, children: [
    /* @__PURE__ */ n(S.Item, { m: 6, xs: 12, children: /* @__PURE__ */ n(
      L,
      {
        name: "name",
        label: m(l("popup.navigation.form.name.label", "Name")),
        error: v("name"),
        children: /* @__PURE__ */ n(
          we,
          {
            name: "name",
            type: "string",
            placeholder: m(
              l("popup.navigation.form.name.placeholder", "Navigations's name")
            ),
            onChange: (I, b) => C(I, b, y),
            value: f.name,
            disabled: o
          }
        )
      }
    ) }),
    /* @__PURE__ */ n(S.Item, { m: 6, xs: 12, children: /* @__PURE__ */ n(
      L,
      {
        name: "visible",
        label: m(l("popup.navigation.form.visible.label", "Visibility")),
        error: v("visible"),
        children: /* @__PURE__ */ n(
          me,
          {
            name: "visible",
            checked: f.visible,
            onChange: (I) => C(I, !f.visible, y),
            onLabel: m(l("popup.navigation.form.visible.toggle.visible")),
            offLabel: m(l("popup.navigation.form.visible.toggle.hidden")),
            disabled: o,
            width: "100%"
          }
        )
      }
    ) })
  ] }) });
}, Bo = {
  name: "",
  items: [],
  visible: !1
}, Oo = ({ setState: e, current: t, isLoading: a, alreadyUsedNames: o }) => {
  const i = E(
    ({ disabled: r, ...d }) => {
      e({
        view: "CREATE",
        current: d,
        alreadyUsedNames: o,
        disabled: r
      });
    },
    [e]
  );
  return /* @__PURE__ */ n(
    xn,
    {
      alreadyUsedNames: o,
      navigation: t,
      onChange: i,
      isLoading: a
    }
  );
}, zo = ({ onSubmit: e, onReset: t, disabled: a, isLoading: o }) => {
  const { formatMessage: i } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      start: {
        children: i(l("popup.item.form.button.cancel")),
        variant: "tertiary",
        disabled: o,
        onClick: t
      },
      end: {
        children: i(l("popup.navigation.manage.button.save")),
        variant: "default",
        disabled: o || a,
        onClick: e
      }
    }
  );
}, _o = /* @__PURE__ */ n(Tt, {}), Qo = /* @__PURE__ */ n(wt, {}), Wt = /* @__PURE__ */ n(ya, {}), Uo = ({ navigations: e, selected: t, setState: a }) => {
  const o = ne(), i = !!t.length, { formatMessage: r } = A(), d = Ft(), c = E(
    () => a({
      navigations: e,
      selected: i ? [] : e.map((I) => I),
      view: "LIST"
    }),
    [a, e, i]
  ), m = X(() => new Set(t.map(nt("documentId"))), [t]), p = (I, b) => () => {
    a({
      navigations: e,
      selected: b ? t.filter(({ documentId: T }) => T !== I.documentId) : t.concat([I]),
      view: "LIST"
    });
  }, u = (I) => () => {
    a({
      view: "EDIT",
      current: I,
      navigation: I,
      alreadyUsedNames: e.reduce(
        (b, { name: T }) => T !== I.name ? b.concat([T]) : b,
        []
      )
    });
  }, C = (I) => () => {
    a({
      view: "DELETE",
      navigations: I
    });
  }, h = (I) => () => {
    a({
      view: "CACHE_PURGE",
      navigations: I
    });
  }, v = E(C(t), [C]), f = E(h(t), [h]), y = (I) => [I].concat(
    e.filter(
      (b) => b.documentId === I.documentId && b.locale !== I.locale
    )
  );
  return /* @__PURE__ */ w(ie, { children: [
    /* @__PURE__ */ n(S.Root, { children: /* @__PURE__ */ n(S.Item, { col: 12, paddingBottom: 3, children: i ? /* @__PURE__ */ w(P, { direction: "row", gap: 1, children: [
      /* @__PURE__ */ n(D, { paddingRight: 3, children: r(l("popup.navigation.manage.table.hasSelected"), {
        count: t.length
      }) }),
      /* @__PURE__ */ n(K, { onClick: v, variant: "tertiary", children: r(l("popup.navigation.manage.button.delete")) }),
      o.data?.isCacheEnabled ? /* @__PURE__ */ n(K, { onClick: f, variant: "tertiary", children: r(l("popup.navigation.manage.button.purge")) }) : null
    ] }) : null }) }),
    /* @__PURE__ */ w(dn, { rowCount: e.length, colCount: 6, children: [
      /* @__PURE__ */ n(cn, { children: /* @__PURE__ */ w(et, { children: [
        /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(Dt, { onCheckedChange: c, check: i }) }),
        /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: r(l("popup.navigation.manage.table.id")) }) }),
        /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: r(l("popup.navigation.manage.table.name")) }) }),
        /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: r(l("popup.navigation.manage.table.locale")) }) }),
        /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: r(l("popup.navigation.manage.table.visibility")) }) }),
        /* @__PURE__ */ n(ce, { children: o.data?.isCacheEnabled ? /* @__PURE__ */ n(P, { direction: "row", children: /* @__PURE__ */ n(D, { paddingLeft: 1, children: /* @__PURE__ */ n(
          ye,
          {
            onClick: h([]),
            label: r(l("popup.navigation.manage.button.purge")),
            noBorder: !0,
            children: Wt
          }
        ) }) }) : null })
      ] }) }),
      /* @__PURE__ */ n(un, { children: e.filter(({ locale: I }) => I === d.data?.defaultLocale).map((I) => /* @__PURE__ */ w(et, { children: [
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(
          Dt,
          {
            onCheckedChange: p(
              I,
              m.has(I.documentId)
            ),
            checked: m.has(I.documentId)
          }
        ) }),
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: I.documentId }) }),
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: I.name }) }),
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: y(I).map(nt("locale")).join(", ") }) }),
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: I.visible ? r(l("popup.navigation.manage.navigation.visible")) : r(l("popup.navigation.manage.navigation.hidden")) }) }),
        /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ w(P, { width: "100%", direction: "row", alignItems: "center", justifyContent: "flex-end", children: [
          /* @__PURE__ */ n(D, { paddingLeft: 1, children: /* @__PURE__ */ n(
            ye,
            {
              onClick: u(I),
              label: r(l("popup.navigation.manage.button.edit")),
              noBorder: !0,
              children: _o
            }
          ) }),
          /* @__PURE__ */ n(D, { paddingLeft: 1, children: /* @__PURE__ */ n(
            ye,
            {
              onClick: C([I]),
              label: r(l("popup.navigation.manage.button.delete")),
              noBorder: !0,
              children: Qo
            }
          ) }),
          o.data?.isCacheEnabled ? /* @__PURE__ */ n(D, { paddingLeft: 1, children: /* @__PURE__ */ n(
            ye,
            {
              onClick: h([I]),
              label: r(l("popup.navigation.manage.button.purge")),
              noBorder: !0,
              children: Wt
            }
          ) }) : null
        ] }) })
      ] }, I.documentId)) })
    ] })
  ] });
}, Ko = ({
  onClose: e,
  state: t,
  setState: a,
  navigations: o,
  isLoading: i
}) => {
  const { formatMessage: r } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      start: {
        onClick: e,
        variant: "tertiary",
        disabled: i,
        children: r(l("popup.item.form.button.cancel"))
      },
      end: {
        onClick: () => a({
          view: "CREATE",
          alreadyUsedNames: o.map(({ name: d }) => d),
          current: Bo
        }),
        variant: "default",
        disabled: i,
        children: r(l("popup.navigation.manage.button.create"))
      }
    }
  );
}, Wo = ({ navigations: e }) => {
  const { formatMessage: t } = A();
  return /* @__PURE__ */ w(S.Root, { children: [
    /* @__PURE__ */ n(S.Item, { col: 12, paddingBottom: 1, children: /* @__PURE__ */ n(P, { children: /* @__PURE__ */ n(F, { variant: "beta", children: t(l("popup.navigation.manage.delete.header")) }) }) }),
    /* @__PURE__ */ n(S.Item, { col: 12, paddingBottom: 1, children: /* @__PURE__ */ n(F, { variant: "omega", fontWeight: "semiBold", children: Xo(e) }) })
  ] });
}, Ho = ({ state: e, onSubmit: t, onReset: a, isLoading: o }) => {
  const { formatMessage: i } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      start: {
        children: i(l("popup.item.form.button.cancel")),
        disabled: o,
        onClick: a,
        variant: "tertiary"
      },
      end: {
        children: i(l("popup.navigation.manage.button.delete")),
        disabled: o,
        onClick: t,
        variant: "danger"
      }
    }
  );
}, Xo = (e) => e.map(nt("name")).join(", "), Go = ({ errors: e }) => {
  const { formatMessage: t } = A(), { toggleNotification: a } = Oe();
  return V(() => {
    e.map((o) => {
      a({
        type: "warning",
        message: t({ id: "", defaultMessage: o.message })
      }), console.error(o);
    });
  }, []), /* @__PURE__ */ n(S.Root, { children: /* @__PURE__ */ n(S.Item, { col: 12, children: t(l("popup.navigation.manage.error.message")) }) });
}, Zo = ({ onReset: e }) => {
  const { formatMessage: t } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      end: {
        children: t(l("popup.navigation.manage.button.goBack")),
        onClick: e,
        variant: "secondary"
      }
    }
  );
}, Jo = ({
  alreadyUsedNames: e,
  current: t,
  isLoading: a,
  navigation: o,
  setState: i
}) => {
  const r = X(() => t ?? o, [t]), d = E(
    ({ disabled: c, ...m }) => {
      i({
        view: "EDIT",
        alreadyUsedNames: e,
        current: m,
        disabled: c,
        navigation: o
      });
    },
    [i, o, e]
  );
  return /* @__PURE__ */ n(
    xn,
    {
      navigation: r,
      onChange: d,
      isLoading: a,
      alreadyUsedNames: e
    }
  );
}, Yo = ({ onSubmit: e, onReset: t, disabled: a, isLoading: o }) => {
  const { formatMessage: i } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      start: {
        children: i(l("popup.item.form.button.cancel")),
        disabled: o,
        onClick: t,
        variant: "tertiary"
      },
      end: {
        children: i(l("popup.navigation.manage.button.save")),
        disabled: o || a,
        onClick: e,
        variant: "secondary"
      }
    }
  );
}, ei = ({ navigations: e }) => {
  const { formatMessage: t } = A();
  return /* @__PURE__ */ w(S.Root, { children: [
    /* @__PURE__ */ n(S.Item, { col: 12, paddingBottom: 1, children: /* @__PURE__ */ n(P, { children: /* @__PURE__ */ n(F, { variant: "beta", children: t(l("popup.navigation.manage.purge.header")) }) }) }),
    /* @__PURE__ */ n(S.Item, { col: 12, paddingBottom: 1, children: /* @__PURE__ */ n(F, { variant: "omega", fontWeight: "semiBold", children: ni(e) }) })
  ] });
}, ti = ({ onSubmit: e, onReset: t, isLoading: a }) => {
  const { formatMessage: o } = A();
  return /* @__PURE__ */ n(
    ze,
    {
      start: {
        children: o(l("popup.item.form.button.cancel")),
        disabled: a,
        onClick: t,
        variant: "tertiary"
      },
      end: {
        children: o(l("popup.navigation.manage.footer.button.purge")),
        disabled: a,
        onClick: e,
        variant: "danger"
      }
    }
  );
}, ni = (e) => e.map(nt("name")).join(", "), ai = ({ initialState: e, isOpened: t, onClose: a }) => {
  const { formatMessage: o } = A(), [i, r] = N(e), { toggleNotification: d } = Oe(), c = So(), m = xo(), p = No(), u = vn({}), C = Tn(), h = Nt(), v = Ft(), f = X(
    () => Xe(h.data ?? [], "id"),
    [h.data]
  ), y = Sn([
    m,
    h,
    p,
    u,
    C,
    v
  ]), I = E(() => r({ view: "INITIAL" }), [r]), b = E(async () => {
    const k = i.view === "DELETE" ? () => {
      m.mutate(
        i.navigations.reduce((x, M) => (M.documentId && x.push(M.documentId), x), []),
        {
          onSuccess: c
        }
      );
    } : i.view === "EDIT" ? () => {
      u.mutate(i.current, {
        onSuccess() {
          c(), d({
            type: "success",
            message: o(l("notification.navigation.submit"))
          });
        },
        onError(x) {
          console.warn(x), d({
            type: "warning",
            message: o(l("notification.navigation.error"), {
              errorTitles: ""
            })
          });
        }
      });
    } : i.view === "CREATE" && i.current ? () => {
      p.mutate(i.current, {
        onSuccess() {
          c(), d({
            type: "success",
            message: o(l("notification.navigation.submit"))
          });
        },
        onError(x) {
          console.warn(x), d({
            type: "warning",
            message: o(l("notification.navigation.error"), {
              errorTitles: ""
            })
          });
        }
      });
    } : i.view === "CACHE_PURGE" ? () => {
      C.mutate(
        i.navigations.reduce((x, M) => (M.documentId && x.push(M.documentId), x), []),
        {
          onSuccess: c
        }
      );
    } : () => {
    };
    try {
      k(), r({ view: "INITIAL" });
    } catch (x) {
      r({
        view: "ERROR",
        errors: x instanceof Error ? [x] : []
      });
    }
  }, [
    i,
    r,
    c,
    p,
    C,
    u,
    m,
    d,
    o,
    l
  ]);
  V(() => {
    (i.view === "INITIAL" || i.view === "LIST") && r({
      view: "LIST",
      navigations: f,
      selected: []
    });
  }, [i.view, f]);
  const T = oi(i, o, !!y), $ = ii(i, r, !!y), z = ri({
    state: i,
    setState: r,
    onClose: a,
    onSubmit: b,
    onReset: I,
    navigations: f,
    isLoading: !!y
  });
  return /* @__PURE__ */ n(
    H.Root,
    {
      labelledBy: "condition-modal-breadcrumbs",
      onOpenChange: (k) => {
        k || a?.();
      },
      open: t,
      children: /* @__PURE__ */ w(H.Content, { children: [
        /* @__PURE__ */ n(H.Header, { children: /* @__PURE__ */ n(F, { variant: "omega", fontWeight: "bold", textColor: "neutral800", as: "h2", children: T }) }),
        /* @__PURE__ */ n(H.Body, { children: $ }),
        z
      ] })
    }
  );
}, oi = (e, t, a) => {
  switch (e.view) {
    case "LIST":
    case "CREATE":
    case "ERROR":
    case "CACHE_PURGE":
    case "DELETE":
      return /* @__PURE__ */ w(P, { direction: "row", children: [
        a ? /* @__PURE__ */ n(bt, { small: !0 }) : null,
        t(l(`popup.navigation.manage.header.${e.view}`))
      ] });
    case "EDIT":
      return /* @__PURE__ */ w(P, { direction: "row", children: [
        a ? /* @__PURE__ */ n(bt, { small: !0 }) : null,
        t(l("popup.navigation.manage.header.EDIT"), {
          name: e.navigation.name
        })
      ] });
    case "INITIAL":
      return null;
    default:
      return Rt(e);
  }
}, ii = (e, t, a) => {
  const o = {
    setState: t,
    isLoading: a
  };
  switch (e.view) {
    case "LIST":
      return /* @__PURE__ */ n(Uo, { ...e, ...o });
    case "EDIT":
      return /* @__PURE__ */ n(Jo, { ...e, ...o });
    case "CREATE":
      return /* @__PURE__ */ n(Oo, { ...e, ...o });
    case "DELETE":
      return /* @__PURE__ */ n(Wo, { ...e, ...o });
    case "CACHE_PURGE":
      return /* @__PURE__ */ n(ei, { ...e, ...o });
    case "INITIAL":
      return /* @__PURE__ */ n(bt, { small: !0 });
    case "ERROR":
      return /* @__PURE__ */ n(Go, { ...e, ...o });
    default:
      return Rt(e);
  }
}, ri = (e) => {
  switch (e.state.view) {
    case "LIST":
      return /* @__PURE__ */ n(Ko, { ...e });
    case "CREATE":
      return /* @__PURE__ */ n(zo, { ...e, disabled: e.state.disabled });
    case "EDIT":
      return /* @__PURE__ */ n(Yo, { ...e, disabled: e.state.disabled });
    case "DELETE":
      return /* @__PURE__ */ n(Ho, { ...e });
    case "CACHE_PURGE":
      return /* @__PURE__ */ n(ti, { ...e });
    case "ERROR":
      return /* @__PURE__ */ n(Zo, { ...e });
    case "INITIAL":
      return null;
    default:
      return Rt(e.state);
  }
}, Rt = (e) => (console.warn(`Unknown state "${e?.view}". (${JSON.stringify(e)})`), null), li = () => {
  const [e, t] = N(!1), a = E(() => t(!0), [t]), o = E(() => t(!1), [t]), i = X(
    () => e ? /* @__PURE__ */ n(ai, { initialState: { view: "INITIAL" }, isOpened: !0, onClose: o }) : null,
    [e, o]
  );
  return X(
    () => ({
      navigationManagerModal: i,
      openNavigationManagerModal: a,
      closeNavigationManagerModal: o
    }),
    [i, a, o]
  );
}, Me = oe(S.Item)`
  order: ${({ orderInitial: e }) => e ?? "unset"};

  @media (min-width: 520px) {
    order: ${({ orderSmall: e }) => e ?? "unset"};
  }

  @media (min-width: 768px) {
    order: ${({ orderMedium: e }) => e ?? "unset"};
  }
`, Ht = /* @__PURE__ */ n(Ge, {}), si = ({
  activeNavigation: e,
  availableNavigations: t,
  structureHasErrors: a,
  structureHasChanged: o,
  isSaving: i,
  handleChangeSelection: r,
  handleLocalizationSelection: d,
  handleSave: c,
  handleCachePurge: m,
  permissions: p = {},
  locale: u,
  currentLocale: C
}) => {
  const { formatMessage: h } = A(), { openNavigationManagerModal: v, navigationManagerModal: f } = li(), y = ne(), I = !!u.restLocale?.length, b = y.data?.isCacheEnabled, { canUpdate: T } = p, { isDesktop: $, isMobile: z, isLargeDesktop: k } = Ze();
  return /* @__PURE__ */ n(ie, { children: /* @__PURE__ */ n(
    qe.Header,
    {
      title: h(l("header.title", "UI Navigation")),
      subtitle: k && h(l("header.description")),
      primaryAction: /* @__PURE__ */ w(
        P,
        {
          direction: "row",
          size: 2,
          width: k ? "auto" : z ? "100%" : "728px",
          children: [
            /* @__PURE__ */ n(D, { width: "100%", children: /* @__PURE__ */ w(
              S.Root,
              {
                gap: { initial: 2, medium: 4 },
                width: "100%",
                style: y.data?.isCacheEnabled ? { display: "flex" } : void 0,
                children: [
                  !I && k ? /* @__PURE__ */ n(S.Item, { m: 2, xs: 0 }) : null,
                  T && /* @__PURE__ */ n(
                    Me,
                    {
                      m: 3,
                      xs: b ? 4 : 6,
                      orderInitial: 3,
                      orderSmall: 3,
                      orderMedium: 1,
                      children: /* @__PURE__ */ n(
                        K,
                        {
                          onClick: v,
                          startIcon: null,
                          type: "button",
                          variant: "secondary",
                          fullWidth: !0,
                          size: "S",
                          children: h(l("header.action.manage"))
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ n(
                    Me,
                    {
                      m: T ? 4 : 10,
                      xs: I ? 9 : 12,
                      orderInitial: 1,
                      orderSmall: 1,
                      orderMedium: 2,
                      children: /* @__PURE__ */ n(Vt.Root, { width: "100%", children: /* @__PURE__ */ n(
                        xe,
                        {
                          type: "select",
                          placeholder: "Change navigation",
                          name: "navigationSelect",
                          onChange: (x) => {
                            const M = t.find(
                              ({ documentId: _ }) => x === _
                            );
                            M && r(M);
                          },
                          value: e?.documentId,
                          size: "S",
                          style: null,
                          children: t.filter(({ locale: x }) => x === C).map(({ documentId: x, name: M }) => /* @__PURE__ */ n(Ae, { value: x, children: M }, x))
                        }
                      ) })
                    }
                  ),
                  I ? /* @__PURE__ */ n(Me, { m: 2, xs: 3, orderInitial: 2, orderSmall: 2, orderMedium: 3, children: /* @__PURE__ */ n(Vt.Root, { width: "100%", children: /* @__PURE__ */ n(
                    xe,
                    {
                      type: "select",
                      placeholder: h(
                        l("pages.main.header.localization.select.placeholder")
                      ),
                      name: "navigationLocalizationSelect",
                      onChange: d,
                      value: C,
                      size: "S",
                      children: [u.defaultLocale, ...u.restLocale].map((x) => /* @__PURE__ */ n(Ae, { value: x, children: x }, x))
                    }
                  ) }) }) : null,
                  T && /* @__PURE__ */ n(
                    Me,
                    {
                      m: 3,
                      xs: b ? 4 : 6,
                      orderInitial: 4,
                      orderSmall: 4,
                      orderMedium: 4,
                      children: /* @__PURE__ */ n(
                        K,
                        {
                          onClick: c,
                          startIcon: Ht,
                          disabled: a || !o || i,
                          type: "submit",
                          fullWidth: !0,
                          size: "S",
                          children: h(l("submit.cta.save"))
                        }
                      )
                    }
                  ),
                  b && /* @__PURE__ */ w(ie, { children: [
                    $ && /* @__PURE__ */ n(Me, { m: 9, orderInitial: 5, orderSmall: 5, orderMedium: 5 }),
                    /* @__PURE__ */ n(Me, { m: 3, xs: 4, orderInitial: 6, orderSmall: 6, orderMedium: 6, children: /* @__PURE__ */ n(
                      K,
                      {
                        onClick: m,
                        startIcon: Ht,
                        variant: "danger",
                        type: "submit",
                        fullWidth: !0,
                        size: "S",
                        children: h(l("submit.cta.cache.purge"))
                      }
                    ) })
                  ] })
                ]
              }
            ) }),
            T && f
          ]
        }
      ),
      secondaryAction: !z && /* @__PURE__ */ n(aa, { icon: /* @__PURE__ */ n(ba, { "aria-hidden": !0 }), children: e ? h(l("header.meta"), {
        id: e?.documentId,
        key: e?.slug
      }) : null })
    }
  ) });
}, Xt = /* @__PURE__ */ n(ie, {}), di = ({ onConfirm: e, onCancel: t }) => {
  const { formatMessage: a } = A();
  return /* @__PURE__ */ n(
    lt,
    {
      isVisible: !0,
      header: a(l("pages.view.actions.changeLanguage.confirmation.header")),
      labelConfirm: a(
        l("pages.view.actions.changeLanguage.confirmation.confirm")
      ),
      iconConfirm: Xt,
      mainIcon: Xt,
      onConfirm: e,
      onCancel: t,
      children: a(l("pages.view.actions.changeLanguage.confirmation.content"))
    }
  );
}, ci = ({ startActions: e, endActions: t }) => /* @__PURE__ */ w(
  P,
  {
    direction: { initial: "column-reverse", small: "row" },
    justifyContent: { initial: "flex-start", small: "space-between" },
    width: "100%",
    gap: { initial: 2, small: 0 },
    children: [
      /* @__PURE__ */ n(P, { alignItems: "space-between", width: "100%", children: e }),
      /* @__PURE__ */ n(
        P,
        {
          gap: { initial: 2, small: 0 },
          alignItems: "space-between",
          width: "100%",
          justifyContent: { initial: "flex-start", small: "flex-end" },
          children: t
        }
      )
    ]
  }
), ui = oe.div`
  border-radius: 50%;
  background: #dcdce4;
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`, pi = ({ toggle: e, collapsed: t, itemsCount: a }) => {
  const { isSmallMobile: o } = Ze();
  return /* @__PURE__ */ w(
    P,
    {
      justifyContent: "space-between",
      alignItems: "center",
      onClick: e,
      cursor: "pointer",
      style: { marginRight: "16px" },
      children: [
        /* @__PURE__ */ n(ui, { children: t ? /* @__PURE__ */ n(Ia, { width: "16px", height: "9px" }) : /* @__PURE__ */ n(Ca, { width: "16px", height: "9px" }) }),
        !o && /* @__PURE__ */ w(F, { variant: "pi", children: [
          a,
          " nested ",
          a === 1 ? "item" : "items"
        ] })
      ]
    }
  );
}, Ct = oe(pn).withConfig({
  shouldForwardProp: (e) => !["small"].includes(e)
})`
  border: 1px solid
    ${({ theme: e, borderColor: t }) => e.colors[t]};

  ${({ small: e, theme: t }) => e && `
			padding: ${t.spaces[1]} ${t.spaces[2]};
			margin: 0px ${t.spaces[3]};
			vertical-align: middle;

			cursor: default;

			span {
				font-size: .65rem;
				line-height: 1;
				vertical-align: middle;
			}
		`}
`, mi = oe.span`
  display: flex;
  align-items: center;
  justify-content: center;

  height: ${({ isMobile: e }) => e ? "24px" : "32px"};
  width: ${({ isMobile: e }) => e ? "24px" : "32px"};
  padding: ${({ theme: e, isMobile: t }) => t ? e.spaces[1] : e.spaces[2]};

  background: ${({ theme: e, isActive: t }) => t ? e.colors.neutral150 : e.colors.neutral0};
  border: 1px solid ${({ theme: e }) => e.colors.neutral200};
  border-radius: ${({ theme: e }) => e.borderRadius};
  cursor: pointer;
  transition: background-color 0.3s ease-in;

  svg {
    height: ${({ theme: e }) => e.spaces[3]};
    width: ${({ theme: e }) => e.spaces[3]};

    > g,
    path {
      fill: ${({ theme: e }) => e.colors.neutral500};
    }
  }
  &:hover {
    svg {
      > g,
      path {
        fill: ${({ theme: e }) => e.colors.neutral600};
      }
    }
  }
  &:active {
    svg {
      > g,
      path {
        fill: ${({ theme: e }) => e.colors.neutral400};
      }
    }
  }
  &[aria-disabled='true'] {
    background-color: ${({ theme: e }) => e.colors.neutral150};
    svg {
      path {
        fill: ${({ theme: e }) => e.colors.neutral600};
      }
    }
  }
`, gi = Bn.forwardRef((e, t) => {
  const { isSmallMobile: a } = Ze();
  return /* @__PURE__ */ n(mi, { ...e, ref: t, isMobile: a, children: /* @__PURE__ */ n(va, {}) });
}), hi = oe(oa)`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  > div > * {
    margin: 0px ${({ theme: e }) => e.spaces[1]};
  }
`, fi = /* @__PURE__ */ n(Tt, {}), yi = /* @__PURE__ */ n(wt, {}), bi = /* @__PURE__ */ n(hn, {}), Ii = /* @__PURE__ */ n(Ta, {}), Ci = { zIndex: 2 }, vi = { maxWidth: "425px" }, Ti = ({
  title: e,
  path: t,
  icon: a,
  removed: o,
  canUpdate: i,
  onItemRemove: r,
  onItemEdit: d,
  onItemRestore: c,
  dragRef: m,
  menuAttached: p,
  isSearchActive: u
}) => {
  const { formatMessage: C } = A(), { isSmallMobile: h } = Ze();
  return /* @__PURE__ */ w(hi, { children: [
    /* @__PURE__ */ w(P, { alignItems: "center", children: [
      i && /* @__PURE__ */ n(gi, { ref: m, isActive: u }),
      /* @__PURE__ */ n(F, { variant: "omega", fontWeight: "bold", fontSize: h ? "12px" : "14px", children: e }),
      /* @__PURE__ */ n(
        F,
        {
          variant: "omega",
          fontWeight: "bold",
          textColor: "neutral500",
          fontSize: h ? "12px" : "14px",
          ellipsis: !0,
          style: vi,
          children: t
        }
      ),
      /* @__PURE__ */ n(P, { children: a })
    ] }),
    /* @__PURE__ */ w(P, { alignItems: "center", style: Ci, children: [
      /* @__PURE__ */ n(
        Ct,
        {
          borderColor: p ? "success200" : "neutral200",
          backgroundColor: p ? "success100" : "neutral100",
          textColor: p ? "success600" : "neutral600",
          small: !0,
          children: C(
            l(`components.navigationItem.badge.${p ? "attached" : "notAttached"}`)
          )
        }
      ),
      o && /* @__PURE__ */ n(Ct, { borderColor: "danger200", backgroundColor: "danger100", textColor: "danger600", children: C(l("components.navigationItem.badge.removed")) }),
      /* @__PURE__ */ w(mn, { children: [
        /* @__PURE__ */ n(
          ht,
          {
            isActive: u,
            disabled: o,
            onClick: d,
            label: C(
              l(
                `components.navigationItem.action.${i ? "edit" : "view"}`,
                i ? "Edit" : "View"
              )
            ),
            children: i ? fi : bi,
            isMobile: h
          }
        ),
        i && /* @__PURE__ */ n(ie, { children: o ? /* @__PURE__ */ n(
          ht,
          {
            isActive: u,
            onClick: c,
            label: C(
              l("components.navigationItem.action.restore", "Restore")
            ),
            variant: "success-light",
            children: Ii,
            isMobile: h
          }
        ) : /* @__PURE__ */ n(
          ht,
          {
            isActive: u,
            onClick: r,
            variant: "danger-light",
            label: C(
              l("components.navigationItem.action.remove", "Remove")
            ),
            children: yi,
            isMobile: h
          }
        ) })
      ] })
    ] })
  ] });
}, ht = oe(ye)`
  transition: background-color 0.3s ease-in;
  ${({ isActive: e, theme: t }) => e ? `background-color: ${t.colors.neutral150} ;` : ""}
  height: ${({ isMobile: e }) => e ? "24px" : "32px"};
  width: ${({ isMobile: e }) => e ? "24px" : "32px"};
  padding: ${({ isMobile: e, theme: t }) => e ? t.spaces[1] : t.spaces[2]};
`, wi = oe.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 1;

  background: rgba(255, 255, 255, 0.75);
`, Si = oe.div.withConfig({
  shouldForwardProp: (e) => !["level", "isLast"].includes(e)
})`
  position: relative;
  margin-top: ${({ theme: e }) => e.spaces[2]};
  margin-left: ${({ level: e }) => e && "54px"};

  ${({ level: e, theme: t, isLast: a }) => e && `
      &::before {
        ${!a && 'content: "";'}
        display: block;
        top: ${t.spaces[1]};
        left: -24px;
        position: absolute;
        height: calc(100% + ${t.spaces[2]});
        width: 19px;
        border: 0px solid transparent;
        border-left: 4px solid ${t.colors.neutral300};
      }

      &::after {
        content: "";
        display: block;
        height: 22px;
        width: 19px;
        position: absolute;
        top: ${t.spaces[1]};
        left: -${t.spaces[6]};
        
        background: transparent;
        border: 4px solid ${t.colors.neutral300};
        border-top: transparent;
        border-right: transparent;
        border-radius: 0 0 0 100%;
      }
    `};
`, xi = ({
  item: e,
  isLast: t = !1,
  level: a = 0,
  levelPath: o = "",
  isParentAttachedToMenu: i,
  onItemLevelAdd: r,
  onItemRemove: d,
  onItemRestore: c,
  onItemEdit: m,
  onItemReOrder: p,
  onItemToggleCollapse: u,
  onItemSubmit: C,
  displayChildren: h,
  permissions: v,
  structureId: f,
  viewParentId: y,
  locale: I
}) => {
  const b = Se(e, !0), { formatMessage: T } = A(), $ = ne(), z = on(), k = b.type === "EXTERNAL", x = b.type === "WRAPPER", M = qt($.data?.allowedLevels) ? a < $.data.allowedLevels - 1 : !0, _ = qt($.data?.allowedLevels) ? a < $.data.allowedLevels : !0, re = !Y(e.items) && !h, Q = k ? void 0 : `${o === "/" ? "" : o}/${b.path === "/" ? "" : b.path}`.replace(
    "//",
    "/"
  ), le = Cn({
    uid: b.type === "INTERNAL" ? b.relatedType ?? "" : "",
    locale: I
  }), ee = bo().data?.find(
    (W) => b.type === "INTERNAL" ? W.uid === b.relatedType : !1
  ), _e = ee?.uid.includes("api::"), pe = le.data?.find(
    (W) => b.type === "INTERNAL" ? W.documentId === b.related : !1
  ) ?? { documentId: "", id: 0 }, Re = !!pe?.publishedAt, G = k ? "" : st(pe, $.data), R = ee?.info.displayName ?? "", Z = Re ? "success" : "secondary", se = v.canUpdate, U = We(null), $e = We(null), Ie = We(null), [, Ce] = Wn({
    accept: `navigation-item_${o}`,
    hover(W, ve) {
      const te = W.order ?? 0, Pe = e.order ?? 0;
      if (te === Pe)
        return;
      const ct = $e.current.getBoundingClientRect(), ut = (ct.bottom - ct.top) / 2, Pt = ve.getClientOffset();
      if (!Pt)
        return;
      const pt = Pt.y - ct.top, jn = pt > ut ? (e.order ?? 0) + 0.5 : (e.order ?? 0) - 0.5;
      te < Pe && pt < ut || te > Pe && pt > ut || p({
        item: Se(W, !0),
        newOrder: jn
      });
    },
    collect: (W) => ({
      isOverCurrent: W.isOver({ shallow: !0 })
    })
  }), [{ isDragging: Pn }, Mn, kn] = Hn({
    type: `navigation-item_${o}`,
    item: () => e,
    collect: (W) => ({
      isDragging: W.isDragging()
    })
  }), Ee = {
    dragRef: Mn(U),
    dropRef: Ce($e),
    previewRef: kn(Ie)
  }, qn = (W) => {
    const ve = ee?.kind === "singleType", te = W?.locale ? `?plugins[i18n][locale]=${W?.locale}` : "";
    return `/admin/content-manager/${ve ? "single-types" : "collection-types"}/${ee?.uid}${ve ? "" : "/" + W?.documentId}${te}`;
  }, Dn = E(
    (W) => {
      if (!se)
        return;
      const ve = (b.items ?? []).reduce((te, { order: Pe }) => te < Pe ? Pe : te, 0);
      return r(
        W,
        b.viewId,
        M,
        Q,
        b.menuAttached,
        `${f}.${b.items?.length ?? 0}`,
        ve
      );
    },
    [
      b.viewId,
      M,
      Q,
      b.menuAttached,
      f,
      b.items,
      se
    ]
  );
  V(() => {
    b.isSearchActive && Ee.dropRef?.current?.scrollIntoView?.({
      behavior: "smooth",
      block: "center",
      inline: "center"
    });
  }, [b.isSearchActive, Ee.dropRef.current]);
  const Vn = vo({
    uid: b.type === "INTERNAL" ? b.relatedType ?? "" : "",
    locale: I
  });
  V(() => {
    Vn();
  }, []);
  const Et = On();
  return /* @__PURE__ */ w(
    Si,
    {
      level: a,
      isLast: t,
      style: { opacity: Pn ? 0.2 : 1 },
      ref: Ee ? Ee.dropRef : void 0,
      children: [
        /* @__PURE__ */ w(
          ia,
          {
            style: {
              width: z ? "100%" : "728px",
              zIndex: 1,
              position: "relative",
              overflow: "hidden",
              backgroundColor: b.isSearchActive ? Et.colors.secondary100 : void 0,
              borderColor: b.isSearchActive ? Et.colors.secondary200 : void 0,
              transition: "background-color 0.3s ease-in"
            },
            children: [
              b.removed && /* @__PURE__ */ n(wi, {}),
              /* @__PURE__ */ w("div", { ref: Ee.previewRef, children: [
                /* @__PURE__ */ n(jt, { children: /* @__PURE__ */ n(
                  Ti,
                  {
                    title: e.title ?? "",
                    path: k ? b.externalPath : Q,
                    icon: k ? /* @__PURE__ */ n(wa, {}) : x ? /* @__PURE__ */ n(Sa, {}) : /* @__PURE__ */ n(xa, {}),
                    onItemRemove: () => d({ ...e, viewParentId: y }),
                    onItemEdit: () => {
                      const { __type: W, documentId: ve } = e.related ?? {};
                      e.type !== "EXTERNAL" && e.type !== "INTERNAL" && e.type !== "WRAPPER" || m({
                        item: e.type === "INTERNAL" ? {
                          ...e,
                          type: "INTERNAL",
                          isMenuAllowedLevel: _,
                          isParentAttachedToMenu: i,
                          isSearchActive: !1,
                          relatedType: W ?? "",
                          related: ve ?? "",
                          additionalFields: e.additionalFields ?? {},
                          items: e.items ?? [],
                          autoSync: e.autoSync ?? !0,
                          externalPath: void 0,
                          viewParentId: y,
                          audience: e.audience?.map(({ documentId: te }) => te) ?? []
                        } : e.type === "EXTERNAL" ? {
                          ...e,
                          type: "EXTERNAL",
                          isMenuAllowedLevel: _,
                          isParentAttachedToMenu: i,
                          isSearchActive: !1,
                          relatedType: void 0,
                          related: void 0,
                          additionalFields: e.additionalFields ?? {},
                          items: e.items ?? [],
                          autoSync: e.autoSync ?? !0,
                          externalPath: e.externalPath ?? "",
                          viewParentId: y,
                          audience: e.audience?.map(({ documentId: te }) => te) ?? []
                        } : {
                          ...e,
                          type: "WRAPPER",
                          isMenuAllowedLevel: _,
                          isParentAttachedToMenu: i,
                          isSearchActive: !1,
                          additionalFields: e.additionalFields ?? {},
                          items: e.items ?? [],
                          autoSync: e.autoSync ?? !0,
                          viewParentId: y,
                          audience: e.audience?.map(({ documentId: te }) => te) ?? []
                        },
                        levelPath: o,
                        isParentAttachedToMenu: i
                      });
                    },
                    onItemRestore: () => c({ ...e, viewParentId: y }),
                    dragRef: Ee.dragRef,
                    menuAttached: !!b.menuAttached,
                    removed: b.removed,
                    canUpdate: se,
                    isSearchActive: b.isSearchActive
                  }
                ) }),
                /* @__PURE__ */ n(tt, {}),
                /* @__PURE__ */ n(jt, { style: { padding: "8px" }, children: /* @__PURE__ */ w(
                  P,
                  {
                    style: { width: "100%" },
                    direction: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    children: [
                      /* @__PURE__ */ w(P, { children: [
                        !Y(e.items) && /* @__PURE__ */ n(
                          pi,
                          {
                            toggle: () => u({ ...e, viewParentId: y }),
                            collapsed: b.collapsed,
                            itemsCount: e.items?.length ?? 0
                          }
                        ),
                        se && M && /* @__PURE__ */ n(
                          ra,
                          {
                            disabled: b.removed,
                            startIcon: /* @__PURE__ */ n(St, {}),
                            onClick: Dn,
                            size: "S",
                            children: /* @__PURE__ */ n(
                              F,
                              {
                                variant: "pi",
                                fontWeight: "bold",
                                textColor: b.removed ? "neutral600" : "primary600",
                                fontSize: { initial: "1.1rem", small: "1.2rem" },
                                children: T(l("components.navigationItem.action.newItem"))
                              }
                            )
                          }
                        )
                      ] }),
                      b.type === "INTERNAL" && b.related && !pe.id ? /* @__PURE__ */ w(P, { justifyContent: "center", alignItems: "center", children: [
                        /* @__PURE__ */ w(
                          F,
                          {
                            variant: "omega",
                            textColor: "neutral600",
                            fontSize: { initial: "1.2rem", small: "1.4rem" },
                            children: [
                              R,
                              " / "
                            ]
                          }
                        ),
                        /* @__PURE__ */ n(
                          F,
                          {
                            variant: "omega",
                            textColor: "neutral800",
                            fontSize: { initial: "1.2rem", small: "1.4rem" },
                            children: T(l("components.navigationItem.related.localeMissing"))
                          }
                        )
                      ] }) : null,
                      G && /* @__PURE__ */ w(P, { justifyContent: "center", alignItems: "center", children: [
                        !z && /* @__PURE__ */ n(
                          Ct,
                          {
                            borderColor: `${Z}200`,
                            backgroundColor: `${Z}100`,
                            textColor: `${Z}600`,
                            className: "action",
                            small: !0,
                            children: T(
                              l(
                                `components.navigationItem.badge.${Re ? "published" : "draft"}`
                              )
                            )
                          }
                        ),
                        /* @__PURE__ */ w(
                          F,
                          {
                            variant: "omega",
                            textColor: "neutral600",
                            fontSize: { initial: "1.2rem", small: "1.4rem" },
                            children: [
                              R,
                              " / "
                            ]
                          }
                        ),
                        /* @__PURE__ */ n(
                          F,
                          {
                            variant: "omega",
                            textColor: "neutral800",
                            fontSize: { initial: "1.2rem", small: "1.4rem" },
                            children: G
                          }
                        ),
                        _e && /* @__PURE__ */ n(
                          la,
                          {
                            href: qn(pe ?? void 0),
                            endIcon: /* @__PURE__ */ n(Aa, {}),
                            children: " "
                          }
                        )
                      ] })
                    ]
                  }
                ) })
              ] })
            ]
          }
        ),
        re && !b.removed && !b.collapsed && /* @__PURE__ */ n(
          An,
          {
            onItemLevelAdd: r,
            onItemEdit: m,
            onItemSubmit: C,
            isParentAttachedToMenu: b.menuAttached,
            items: e.items ?? [],
            level: a + 1,
            levelPath: Q,
            permissions: v,
            structurePrefix: f,
            viewParentId: b.viewId,
            locale: I
          }
        )
      ]
    }
  );
}, Ai = oe.div`
  position: relative;
  ${({ level: e, theme: t }) => e && `
    &::before {
      content: "";
      display: block;
      height: ${t.spaces[3]};
      width: 19px;

      position: absolute;
      top: -${t.spaces[2]};
      left: 30px;
      
      border: 0px solid transparent;
      border-left: 4px solid ${t.colors.neutral300};
    }
  `};
`, An = ({
  isParentAttachedToMenu: e = !1,
  items: t,
  level: a = 0,
  levelPath: o = "",
  onItemEdit: i,
  onItemLevelAdd: r,
  onItemSubmit: d,
  displayFlat: c,
  permissions: m,
  structurePrefix: p,
  viewParentId: u,
  locale: C
}) => {
  const h = ({
    item: I,
    newOrder: b
  }) => {
    d({
      ...I,
      order: b
    });
  }, v = (I) => {
    d(
      Se(
        {
          ...I,
          removed: !0
        },
        !0
      )
    );
  }, f = (I) => {
    d(
      Se(
        {
          ...I,
          removed: !1
        },
        !0
      )
    );
  }, y = (I) => {
    d(
      Se(
        {
          ...I,
          collapsed: !I.collapsed,
          updated: !0,
          isSearchActive: !1
        },
        !0
      )
    );
  };
  return /* @__PURE__ */ n(Ai, { "data-level": a, children: t?.map((I, b) => /* @__PURE__ */ n(
    xi,
    {
      item: I,
      isLast: b === t.length - 1,
      level: a,
      levelPath: o,
      isParentAttachedToMenu: e,
      onItemLevelAdd: r,
      onItemEdit: i,
      onItemSubmit: d,
      onItemRestore: f,
      onItemRemove: v,
      onItemReOrder: h,
      onItemToggleCollapse: y,
      displayChildren: c,
      permissions: m,
      structureId: p ? `${p}.${b}` : b.toString(),
      viewParentId: u,
      locale: C
    },
    `list-item-${I.viewId || b}`
  )) });
}, Fi = ({
  handleCancel: e,
  handleSubmit: t,
  submitDisabled: a,
  canUpdate: o
}) => {
  const { formatMessage: i } = A();
  return o ? /* @__PURE__ */ w(H.Footer, { children: [
    /* @__PURE__ */ n(H.Close, { children: /* @__PURE__ */ n(K, { onClick: e, variant: "tertiary", children: i(l("popup.item.form.button.cancel")) }) }),
    /* @__PURE__ */ n(K, { onClick: t, disabled: a, children: i(l("popup.item.form.button.save")) })
  ] }) : null;
}, Ni = [
  /^mailto:[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/,
  /^tel:(\+\d{1,3})?[\s]?(\(?\d{2,3}\)?)?[\s.-]?(\d{3})?[\s.-]?\d{3,4}$/,
  /^#.*/,
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
  /(\/[a-z0-9\-._~%!$&'()*+,;=:@]+)+\/?/
], $t = ({ additionalFields: e }) => g.object({
  title: g.string(),
  autoSync: g.boolean().optional(),
  removed: g.boolean().optional(),
  updated: g.boolean().optional(),
  uiRouterKey: g.string(),
  levelPath: g.string().optional(),
  isMenuAllowedLevel: g.boolean().optional(),
  parentAttachedToMenu: g.boolean().optional(),
  viewId: g.number().optional(),
  structureId: g.string().optional(),
  menuAttached: g.boolean().optional(),
  collapsed: g.boolean().optional(),
  isSearchActive: g.boolean().optional(),
  viewParentId: g.number().optional(),
  id: g.number().optional(),
  documentId: g.string().optional(),
  audience: g.string().array().optional(),
  order: g.number().optional(),
  items: g.any().array().optional(),
  additionalFields: g.object(
    e.reduce((t, a) => {
      if (typeof a == "string")
        return t;
      switch (a.type) {
        case "string":
          t[a.name] = a.required ? g.string() : g.string().optional();
          break;
        case "boolean":
          t[a.name] = a.required ? g.boolean() : g.boolean().optional();
        case "media":
          t[a.name] = a.required ? g.any() : g.any().optional();
        case "select": {
          a.multi ? t[a.name] = a.required ? g.string().array() : g.string().array().optional() : t[a.name] = a.required ? g.string() : g.string().optional();
          break;
        }
      }
      return t;
    }, {})
  )
}), Ri = ({
  additionalFields: e,
  isSingleSelected: t
}) => $t({
  additionalFields: e
}).extend({
  type: g.literal("INTERNAL"),
  path: g.string().or(g.null()).optional(),
  externalPath: g.string().nullish(),
  relatedType: g.string(),
  related: t ? g.string().optional() : g.string()
}), $i = ({
  isSingleSelected: e,
  additionalFields: t
}) => $t({
  additionalFields: t
}).extend({
  type: g.literal("EXTERNAL"),
  path: g.string().or(g.null()).optional(),
  externalPath: g.string().min(1).refine((a) => Ni.some((o) => o.test(a))),
  relatedType: g.string().optional(),
  related: g.string().optional()
}), Li = ({
  isSingleSelected: e,
  additionalFields: t
}) => $t({
  additionalFields: t
}).extend({
  type: g.literal("WRAPPER"),
  path: g.string().or(g.null()).optional()
}), Ei = (e) => g.discriminatedUnion("type", [
  $i(e),
  Ri(e),
  Li(e)
]), Gt = {
  autoSync: !0,
  type: "INTERNAL",
  relatedType: "",
  menuAttached: !1,
  title: "",
  externalPath: "",
  path: "",
  additionalFields: {},
  audience: [],
  updated: !1,
  uiRouterKey: ""
}, Pi = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn(a) {
      return t.slugify(a);
    }
  });
}, Mi = () => {
  const e = ne();
  return { encodePayload: (o) => ({
    ...o,
    additionalFields: e.data?.additionalFields.reduce((i, r) => {
      const { name: d, type: c } = r;
      if (d in (o.additionalFields ?? {})) {
        let m = o.additionalFields[d];
        switch (c) {
          case "boolean":
            m = ea(m) ? `${m}` : m;
            break;
          case "media":
            m = m && JSON.stringify(m);
            break;
        }
        return {
          ...i,
          [d]: m
        };
      }
      return i;
    }, {}) || {}
  }), decodePayload: (o) => ({
    ...o,
    additionalFields: e.data?.additionalFields.reduce((i, r) => {
      const { name: d, type: c } = r;
      if (d in (o.additionalFields ?? {})) {
        let m = o.additionalFields[d];
        switch (c) {
          case "boolean":
            m = m === "true";
            break;
          case "media":
            m = m && JSON.parse(m);
            break;
        }
        return {
          ...i,
          [d]: m
        };
      }
      return i;
    }, {}) || {}
  }) };
}, ki = () => {
  const { formatMessage: e } = A(), [t, a] = N(
    {}
  ), [o, i] = N(), r = (p, u, C) => {
    if (C) {
      let h = p, v = u;
      if (He(p)) {
        const { name: f, value: y } = p.target;
        h = f, v = Be(v) ? y : v;
      }
      return ot(h) && d(h, v), C(p, v);
    }
  }, d = (p, u) => {
    a(
      it(
        {
          ...t,
          additionalFields: {
            ...t.additionalFields
          },
          updated: !0
        },
        p,
        u
      )
    );
  };
  return {
    formValue: t,
    renderError: (p, u) => J(o, p) ? e(l(u ?? p)) : void 0,
    setFormError: i,
    handleChange: r,
    setFormValue: a,
    setFormValueItem: d,
    setFormValuesItems: (p) => a({
      ...t,
      ...p,
      updated: !0
    })
  };
}, qi = async ({
  slugify: e,
  title: t,
  config: a,
  related: o,
  relatedType: i,
  contentTypeItems: r
}) => {
  if (t)
    return t ? await e(t) : void 0;
  if (o) {
    const d = st(
      {
        ...r?.find((c) => c.documentId === o.toString()) ?? {
          documentId: "",
          id: 0
        },
        __collectionUid: i
      },
      a
    );
    return d ? await e(d) : void 0;
  }
}, Di = ({
  currentType: e,
  config: t,
  contentTypeItems: a,
  currentRelated: o,
  currentRelatedType: i,
  isSingleSelected: r
}) => {
  if (e !== "INTERNAL" || !i)
    return "";
  const d = t?.pathDefaultFields[i] ?? [];
  if (Y(e) && !Y(d)) {
    const c = r ? vt(a ?? []) : a?.find(({ id: p }) => p === o);
    return d.map((p) => c?.[p] ?? "").filter((p) => !!p.toString().trim())[0] ?? "";
  }
  return "";
}, Vi = ({
  currentPath: e,
  isExternal: t,
  current: a,
  currentType: o = "INTERNAL",
  config: i,
  contentTypeItems: r,
  currentRelated: d,
  currentRelatedType: c,
  isSingleSelected: m
}) => {
  if (!t) {
    const p = Y(e) || e === "/" ? Di({
      currentType: o,
      config: i,
      contentTypeItems: r,
      currentRelated: d,
      currentRelatedType: c,
      isSingleSelected: m
    }) : e || "";
    return `${a.levelPath !== "/" ? `${a.levelPath}` : ""}/${p}`.replace("//", "/");
  }
}, Fn = nn({
  values: {},
  onChange: () => null,
  handleChange: () => null,
  renderError: () => "",
  setFormValueItem: () => null,
  canUpdate: void 0,
  isLoading: !0
}), he = () => an(Fn), ji = () => {
  const { formatMessage: e } = A(), t = ne(), { values: a, onChange: o, handleChange: i, renderError: r, canUpdate: d } = he(), m = (t.data?.contentTypes.length ? ["INTERNAL", "EXTERNAL", "WRAPPER"] : ["EXTERNAL", "WRAPPER"]).map((p) => ({
    key: p,
    value: p,
    label: e(l(`popup.item.form.type.${p.toLowerCase()}.label`))
  }));
  return /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", m: 8, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "type",
      label: e(l("popup.item.form.type.label", "Internal link")),
      error: r("type"),
      hint: e(l("popup.item.form.title.placeholder", "e.g. Blog")),
      children: /* @__PURE__ */ n(
        xe,
        {
          onChange: (p) => i("type", p, o),
          value: a.type,
          name: "type",
          disabled: !d,
          width: "100%",
          children: m.map(({ key: p, label: u, value: C }) => /* @__PURE__ */ n(Ae, { value: C, children: u }, p))
        }
      )
    }
  ) }, "title");
}, Bi = ({ current: e }) => {
  const { formatMessage: t } = A(), a = ne(), { values: o, onChange: i, handleChange: r, renderError: d, canUpdate: c } = he();
  return /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", m: 4, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "menuAttached",
      label: t(l("popup.item.form.menuAttached.label", "MenuAttached")),
      error: d("menuAttached"),
      hint: t(
        l("popup.item.form.menuAttached.placeholder", "is menu item attached to menu")
      ),
      children: /* @__PURE__ */ n(
        me,
        {
          name: "menuAttached",
          checked: o.menuAttached,
          onChange: (m) => r(m, !o.menuAttached, i),
          value: o.menuAttached,
          onLabel: t(l("popup.item.form.menuAttached.value.yes", "yes")),
          offLabel: t(l("popup.item.form.menuAttached.value.no", "no")),
          disabled: !c || (a.data?.cascadeMenuAttached ? !(e.isMenuAllowedLevel && e.parentAttachedToMenu) : !1),
          width: "100%"
        }
      )
    }
  ) }, "menuAttached");
}, Oi = oe(S.Item)`
  order: ${({ orderInitial: e }) => e ?? "unset"};

  @media (min-width: 768px) {
    order: ${({ orderMedium: e }) => e ?? "unset"};
  }
`, zi = () => {
  const { formatMessage: e } = A(), { values: t, onChange: a, handleChange: o, renderError: i, canUpdate: r } = he();
  return /* @__PURE__ */ n(
    Oi,
    {
      alignItems: "flex-start",
      col: t.type === "INTERNAL" ? 8 : 12,
      m: t.type === "INTERNAL" ? 8 : 12,
      xs: 12,
      orderInitial: 2,
      orderMedium: 1,
      children: /* @__PURE__ */ n(
        L,
        {
          name: "title",
          label: e(l("popup.item.form.title.label", "Title")),
          error: i("title"),
          hint: e(l("popup.item.form.title.placeholder", "e.g. Blog")),
          children: /* @__PURE__ */ n(
            we,
            {
              type: "string",
              disabled: !r || t.autoSync && t.type === "INTERNAL",
              name: "title",
              onChange: (d, c) => o(d, c, a),
              value: t.title || ""
            }
          )
        }
      )
    },
    "title"
  );
}, _i = oe(S.Item)`
  order: ${({ orderInitial: e }) => e ?? "unset"};

  @media (min-width: 768px) {
    order: ${({ orderMedium: e }) => e ?? "unset"};
  }
`, Qi = () => {
  const { formatMessage: e } = A(), { values: t, onChange: a, handleChange: o, renderError: i, canUpdate: r } = he();
  return /* @__PURE__ */ n(
    _i,
    {
      alignItems: "flex-start",
      col: 4,
      m: 4,
      xs: 12,
      orderInitial: 1,
      orderMedium: 2,
      children: /* @__PURE__ */ n(
        L,
        {
          name: "autoSync",
          label: e(l("popup.item.form.autoSync.label", "Read fields from related")),
          error: i("autoSync"),
          children: /* @__PURE__ */ n(
            me,
            {
              name: "autoSync",
              checked: t.autoSync,
              onChange: (d) => o(d, !t.autoSync, a),
              disabled: !r,
              onLabel: "Enabled",
              offLabel: "Disabled"
            }
          )
        }
      )
    },
    "autoSync"
  );
}, Ui = ({
  contentTypeItems: e,
  current: t,
  isSingleSelected: a
}) => {
  const { formatMessage: o } = A(), i = ne(), { values: r, onChange: d, handleChange: c, renderError: m, canUpdate: p } = he(), u = r.type === "EXTERNAL" ? "externalPath" : "path", C = r.type === "INTERNAL" ? r : {
    related: void 0,
    relatedType: void 0
  }, h = Vi({
    currentPath: r.path,
    isExternal: r.type === "EXTERNAL",
    current: t,
    currentType: r.type,
    config: i.data,
    contentTypeItems: e,
    currentRelated: C.related,
    currentRelatedType: C.relatedType,
    isSingleSelected: a
  });
  return /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", col: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: u,
      label: o(l(`popup.item.form.${u}.label`, "Path")),
      error: m(u, `popup.item.form.${u}.validation.type`),
      hint: [
        o(l(`popup.item.form.${u}.placeholder`, "e.g. Blog")),
        h ? o(l("popup.item.form.type.external.description"), {
          value: h
        }) : ""
      ].join(" "),
      children: /* @__PURE__ */ n(
        we,
        {
          disabled: !p,
          name: u,
          onChange: (v, f) => c(v, f, d),
          value: (r.type === "EXTERNAL" ? r.externalPath : r.path) || "",
          width: "100%"
        }
      )
    }
  ) }, "title");
}, Ki = "", Wi = {
  type: "media",
  required: !1,
  attribute: {
    multiple: !1,
    allowedTypes: ["files", "images", "videos", "audios"]
  },
  pluginOptions: {
    i18n: {
      localized: !1
    }
  }
}, Hi = ({
  name: e,
  field: t,
  isLoading: a,
  onChange: o,
  onChangeEnhancer: i,
  value: r,
  disabled: d
}) => {
  const { toggleNotification: c } = Oe(), { formatMessage: m } = A(), u = Un("AdditionalFieldInput", (h) => h.fields).media, C = X(
    () => ({
      id: t.name,
      name: e || t.name,
      disabled: a || d,
      placeholder: t.placeholder
    }),
    [t, a]
  );
  switch (V(() => {
    if (t.type === "media") {
      const h = ta(r) ? void 0 : r;
      i(C.name, h, o);
    }
  }, [r]), t.type) {
    case "boolean":
      return /* @__PURE__ */ n(
        me,
        {
          ...C,
          checked: !!r,
          onChange: (h) => i(h, !r, o),
          onLabel: "true",
          offLabel: "false",
          type: "checkbox"
        }
      );
    case "string":
      return /* @__PURE__ */ n(
        sa,
        {
          ...C,
          onChange: (h, v) => i(h, v, o),
          value: r || Ki
        }
      );
    case "select":
      return t.multi ? /* @__PURE__ */ n(
        De,
        {
          ...C,
          onChange: (h) => i(C.name, h, o),
          value: Be(r) ? t.multi ? [] : null : r,
          multi: t.multi,
          withTags: t.multi,
          children: t.options.map((h, v) => /* @__PURE__ */ n(Ve, { value: h, children: h }, `${t.name}-option-${v}`))
        }
      ) : /* @__PURE__ */ n(
        xe,
        {
          ...C,
          onChange: (h) => i(C.name, h, o),
          value: Be(r) ? t.multi ? [] : null : r,
          multi: t.multi,
          withTags: t.multi,
          children: t.options.map((h, v) => /* @__PURE__ */ n(Ae, { value: h, children: h }, `${t.name}-option-${v}`))
        }
      );
    case "media":
      return /* @__PURE__ */ n(u, { ...C, ...Wi, value: r });
    default:
      throw c({
        type: "warning",
        message: m(l("notification.error.customField.type"))
      }), new Error("Type of custom field is unsupported");
  }
}, Xi = ({ additionalField: e }) => {
  const { canUpdate: t, isLoading: a, onChange: o, handleChange: i, renderError: r, values: d } = he();
  return /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", s: 6, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: `additionalFields.${e.name}`,
      label: e.label,
      hint: e.description,
      required: e.required,
      error: r(`additionalFields.${e.name}`),
      children: /* @__PURE__ */ n(
        Hi,
        {
          name: `additionalFields.${e.name}`,
          field: e,
          isLoading: a,
          onChange: o,
          onChangeEnhancer: i,
          value: J(d?.additionalFields, e.name),
          disabled: !t
        }
      )
    }
  ) }, e.name);
}, Gi = () => {
  const { formatMessage: e } = A(), a = ne().data?.availableAudience ?? [], o = X(
    () => a.map((p) => ({
      value: p.documentId ?? 0,
      label: p.name ?? " "
    })),
    [a]
  ), { isLoading: i, renderError: r, onChange: d, handleChange: c, values: m } = he();
  return /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", col: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "audience",
      label: e(l("popup.item.form.audience.label")),
      error: r("audience"),
      hint: !i && Y(o) ? e(l("popup.item.form.title.placeholder", "e.g. Blog")) : void 0,
      children: /* @__PURE__ */ n(
        De,
        {
          name: "audience",
          value: m.audience,
          onChange: (p) => c("audience", p, d),
          width: "100%",
          children: o.map(({ value: p, label: u }) => /* @__PURE__ */ n(Ve, { value: p, children: u }, p))
        }
      )
    }
  ) }, "audience");
}, Zi = () => {
  const e = ne();
  if (!e.data?.additionalFields || Y(e.data.additionalFields))
    return null;
  const t = e.data.additionalFields.filter(
    (o) => o !== "audience"
  ), a = e.data.additionalFields.find((o) => o === "audience");
  return /* @__PURE__ */ w(ie, { children: [
    /* @__PURE__ */ n(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(tt, { width: "100%" }) }) }),
    /* @__PURE__ */ w(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: [
      t.map((o) => /* @__PURE__ */ n(Xi, { additionalField: o }, o.name)),
      a && /* @__PURE__ */ n(Gi, {})
    ] }),
    /* @__PURE__ */ n(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(tt, { width: "100%" }) }) })
  ] });
}, Ji = ({
  availableLocale: e,
  current: t,
  currentNavigation: a,
  setIsLoading: o,
  setFormValuesItems: i
}) => {
  const { formatMessage: r } = A(), [d, c] = N(), m = Ao(), p = Nt(), { canUpdate: u, isLoading: C } = he(), h = X(
    () => e.map((f, y) => ({
      key: `${f}-${y}`,
      value: f,
      label: f
    })),
    [e]
  ), v = E(
    async (f) => {
      f.preventDefault(), f.stopPropagation();
      const y = p.data?.find(({ locale: I }) => I === d);
      y && (o(!0), m.mutate(
        {
          target: a.documentId,
          structureId: t.structureId,
          source: y.documentId
        },
        {
          onSuccess(I) {
            m.reset();
            const { type: b, externalPath: T, path: $, related: z, title: k, uiRouterKey: x } = I;
            i({
              type: b,
              externalPath: T,
              path: $,
              title: k,
              uiRouterKey: x,
              related: z
            });
          },
          onSettled() {
            o(!1);
          }
        }
      ));
    },
    [o, m, p]
  );
  return !h || h.length < 1 ? null : /* @__PURE__ */ n(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ w(S.Item, { alignItems: "flex-start", col: 12, children: [
    /* @__PURE__ */ n(tt, { marginTop: 5, marginBottom: 5 }),
    /* @__PURE__ */ w(S.Root, { gap: 5, children: [
      /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", col: 6, lg: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "i18n.locale",
          label: r(
            l("popup.item.form.i18n.locale.label", "Copy details from")
          ),
          children: /* @__PURE__ */ n(
            xe,
            {
              name: "i18n.locale",
              onChange: c,
              value: d,
              disabled: C || !u,
              placeholder: r(
                l("popup.item.form.i18n.locale.placeholder", "locale")
              ),
              children: h.map(({ key: f, label: y, value: I }) => /* @__PURE__ */ n(Ae, { value: I, children: y }, f))
            }
          )
        }
      ) }),
      u && /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", col: 6, lg: 12, paddingTop: 6, children: /* @__PURE__ */ n(D, { children: /* @__PURE__ */ n(
        K,
        {
          variant: "tertiary",
          onClick: v,
          disabled: C || !d,
          children: r(l("popup.item.form.i18n.locale.button"))
        }
      ) }) })
    ] })
  ] }, "title") });
}, Zt = (e, t) => t ? e.find((a) => a.value === t)?.label ?? "" : "", Nn = ({
  name: e,
  onClear: t,
  onChange: a,
  options: o,
  value: i,
  disabled: r
}) => {
  const [d, c] = N(Zt(o, i));
  return V(() => {
    c(Zt(o, i));
  }, [i, o]), /* @__PURE__ */ n(
    gn,
    {
      name: e,
      autocomplete: "list",
      onClear: t,
      onChange: a,
      onTextValueChange: c,
      value: i,
      textValue: d,
      options: o,
      disabled: r,
      width: "100%",
      children: o.map(({ key: m, label: p, value: u }) => /* @__PURE__ */ n(da, { value: u, children: p }, m))
    }
  );
}, Yi = ({
  contentTypeItems: e,
  current: t,
  currentRelatedType: a,
  isSingleSelected: o,
  setFormValuesItems: i,
  setIsSingleSelected: r
}) => {
  const { formatMessage: d } = A(), c = ne(), {
    canUpdate: m,
    isLoading: p,
    renderError: u,
    setFormValueItem: C,
    values: h
  } = he(), v = X(
    () => Xe(
      c.data?.contentTypes.map((f) => ({
        key: f.uid,
        value: f.uid,
        label: f.label
      })),
      (f) => f.label
    ),
    [c.data, a]
  );
  return V(() => {
    if (!a)
      return;
    const f = c.data?.contentTypes.find(
      (y) => y.uid === a
    );
    if (f && (r(f.isSingle), f.isSingle && e?.length)) {
      const y = e[0];
      y && C("related", y.documentId);
    }
  }, [a, c.data, e]), V(() => {
    a === "" && C("relatedType", c.data?.defaultContentType);
  }, [c.data?.defaultContentType, h.type, a]), /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", m: a && !o ? 6 : 12, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "relatedType",
      label: d(l("popup.item.form.relatedType.label", "Related Type")),
      error: u("relatedType"),
      hint: !p && Y(v) ? d(
        l("popup.item.form.relatedType.empty", "There are no more content types")
      ) : void 0,
      children: /* @__PURE__ */ n(
        Nn,
        {
          name: "relatedType",
          onClear: () => i({
            related: void 0,
            relatedType: void 0,
            title: h.autoSync ? "" : h.title
          }),
          onChange: (f) => i({
            related: void 0,
            relatedType: f,
            title: h.autoSync ? "" : h.title
          }),
          value: a,
          options: v,
          disabled: !c.data?.contentTypes.length || !m
        }
      )
    }
  ) });
}, er = (e, t, a) => {
  const o = ne();
  V(() => {
    if (!e.autoSync || !e.related || !e.relatedType || !o.data)
      return;
    const i = t?.find((p) => p.documentId === e.related);
    if (!i)
      return;
    const { contentTypesNameFields: r, pathDefaultFields: d } = o.data, c = e.path ? e.path : (d[e.relatedType]?.reduce((p, u) => p || i?.[u], void 0) || i.id).toString(), m = (r[e.relatedType] ?? []).concat(r.default ?? []).reduce((p, u) => p ? p.toString() : i?.[u], void 0);
    c && e.path, m && e.title, a({
      path: c,
      title: m
    });
  }, [e.autoSync, e.related, e.relatedType, t, o.data]);
}, tr = ({
  appendLabelPublicationStatus: e,
  contentTypeItems: t,
  isSingleSelected: a,
  values: o,
  setFormValuesItems: i
}) => {
  const { formatMessage: r } = A(), d = ne(), { canUpdate: c, isLoading: m, handleChange: p, onChange: u, renderError: C } = he(), h = Xe(
    t?.map((f) => {
      const I = e(
        st(
          {
            ...f,
            __collectionUid: o.relatedType
          },
          d.data
        ),
        f,
        !1
      ) + (f?.id ? ` (id: ${f.id})` : "");
      return {
        key: f?.documentId?.toString(),
        value: f?.documentId?.toString(),
        label: I
      };
    }) ?? [],
    (f) => f.label
  ), v = Y(h);
  return er(o, t, i), !o.relatedType || a ? null : /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", m: 6, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "related",
      label: r(l("popup.item.form.related.label", "Related")),
      error: C("related"),
      hint: !m && v ? r(
        l("popup.item.form.related.empty", "There are no more entities"),
        { contentTypeName: o.relatedType }
      ) : void 0,
      children: /* @__PURE__ */ n(
        Nn,
        {
          name: "related",
          onClear: () => p("related", void 0, u),
          onChange: (f) => p("related", f, u),
          value: o.related,
          options: h,
          disabled: m || v || !c
        }
      )
    }
  ) });
}, nr = [], ar = ({
  availableLocale: e,
  isLoading: t,
  current: a = Gt,
  onSubmit: o,
  onCancel: i,
  appendLabelPublicationStatus: r = or,
  locale: d,
  permissions: c = {},
  currentNavigation: m
}) => {
  const { formatMessage: p } = A(), [u, C] = N(t), { canUpdate: h } = c, [v, f] = N(!1), y = ne(), I = y.data?.contentTypes ?? [], { toggleNotification: b } = Oe(), {
    formValue: T,
    renderError: $,
    setFormError: z,
    handleChange: k,
    setFormValue: x,
    setFormValueItem: M,
    setFormValuesItems: _
  } = ki(), { encodePayload: re, decodePayload: Q } = Mi(), le = T.type === "INTERNAL", fe = le && !T.related && !v || u, ee = Cn({
    uid: le ? T.relatedType : "",
    locale: d
  }), _e = async (G, R) => {
    G.preventDefault();
    const Z = re(R), {
      success: se,
      data: U,
      error: $e
    } = Ei({
      isSingleSelected: v,
      additionalFields: y.data?.additionalFields ?? nr
    }).safeParse(Z);
    if (se) {
      const Ie = U.title.trim() ? U.title.trim() : U.type === "INTERNAL" ? Re(U?.related?.toString(), U.relatedType, v) : "";
      C(!0);
      const Ce = await qi(
        U.type === "INTERNAL" ? {
          slugify: pe.mutateAsync,
          title: Ie,
          related: U.related,
          relatedType: U.relatedType
        } : { slugify: pe.mutateAsync, title: Ie }
      );
      if (pe.reset(), C(!1), !Ce) {
        b({
          type: "warning",
          message: p(l("popup.item.form.uiRouter.unableToRender"))
        });
        return;
      }
      o(
        U.type === "INTERNAL" ? {
          ...U,
          title: Ie,
          uiRouterKey: Ce
        } : {
          ...U,
          title: Ie,
          uiRouterKey: Ce
        }
      );
    } else $e && z(
      $e.issues.reduce((Ie, Ce) => ({
        ...Ie,
        [Ce.path.join(".")]: Ce.message
      }), {})
    );
  }, pe = Pi(), Re = E(
    (G, R, Z) => {
      let se;
      if (Z) {
        if (se = ee.data?.find(
          (U) => U.uid === R || U.__collectionUid === R
        ), !se)
          return I.find((U) => U.uid === R)?.contentTypeName;
      } else
        se = {
          ...ee.data?.find(({ documentId: $e }) => $e === G) || {
            documentId: null
          },
          __collectionUid: R
        };
      return st(se, y.data);
    },
    [ee.data, y.data, I]
  );
  return V(() => {
    x(
      Q({
        ...Gt,
        ...a
      })
    );
  }, [a]), /* @__PURE__ */ w(ie, { children: [
    /* @__PURE__ */ n(H.Body, { children: /* @__PURE__ */ n(at, { width: "auto", height: "auto", method: "POST", initialValues: T, children: ({ values: G, onChange: R }) => /* @__PURE__ */ w(
      Fn.Provider,
      {
        value: {
          values: G,
          onChange: R,
          handleChange: k,
          renderError: $,
          setFormValueItem: M,
          canUpdate: h,
          isLoading: u
        },
        children: [
          /* @__PURE__ */ w(S.Root, { gap: 5, paddingBottom: 1, children: [
            /* @__PURE__ */ n(ji, {}),
            /* @__PURE__ */ n(Bi, { current: a })
          ] }),
          /* @__PURE__ */ w(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: [
            /* @__PURE__ */ n(zi, {}),
            G.type === "INTERNAL" && /* @__PURE__ */ n(Qi, {})
          ] }),
          /* @__PURE__ */ n(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: /* @__PURE__ */ n(
            Ui,
            {
              contentTypeItems: ee.data,
              current: a,
              isSingleSelected: v
            }
          ) }),
          G.type === "INTERNAL" && /* @__PURE__ */ w(S.Root, { gap: 5, paddingTop: 1, paddingBottom: 1, children: [
            /* @__PURE__ */ n(
              Yi,
              {
                contentTypeItems: ee.data,
                current: a,
                currentRelatedType: G.relatedType,
                isSingleSelected: v,
                setFormValuesItems: _,
                setIsSingleSelected: f
              }
            ),
            /* @__PURE__ */ n(
              tr,
              {
                appendLabelPublicationStatus: r,
                contentTypeItems: ee.data,
                values: G,
                isSingleSelected: v,
                setFormValuesItems: _
              }
            )
          ] }),
          G.type !== "INTERNAL" && /* @__PURE__ */ n(S.Root, { display: "none", children: /* @__PURE__ */ n(D, { display: "none", children: /* @__PURE__ */ n(gn, {}) }) }),
          /* @__PURE__ */ n(Zi, {}),
          /* @__PURE__ */ n(
            Ji,
            {
              availableLocale: e,
              current: a,
              currentNavigation: m,
              setIsLoading: C,
              setFormValuesItems: _
            }
          ),
          /* @__PURE__ */ n(S.Root, { gap: 5, children: /* @__PURE__ */ n(S.Item, { alignItems: "flex-start", col: 12 }, "title") })
        ]
      }
    ) }) }),
    /* @__PURE__ */ n(
      Fi,
      {
        handleSubmit: (G) => _e(G, T),
        handleCancel: i,
        submitDisabled: fe,
        canUpdate: h
      }
    )
  ] });
}, or = () => "", ir = ({
  isNewItem: e,
  canUpdate: t
}) => {
  const { formatMessage: a } = A();
  let o = "view";
  return t && (o = e ? "new" : "edit"), /* @__PURE__ */ n(H.Header, { children: /* @__PURE__ */ n(
    F,
    {
      variant: "omega",
      fontWeight: "bold",
      textColor: "neutral800",
      as: "h2",
      id: "asset-dialog-title",
      children: a(l(`popup.item.header.${o}`))
    }
  ) });
}, rr = ({
  availableLocale: e,
  isOpen: t,
  isLoading: a,
  currentItem: o = {},
  onSubmit: i,
  onClose: r,
  locale: d,
  permissions: c,
  currentNavigation: m
}) => {
  const { formatMessage: p } = A(), u = (v) => {
    i(v);
  }, C = (v, f, y) => `${Vo({
    relatedRef: f,
    type: f.isSingle ? "INTERNAL" : f.type,
    isCollection: y
  }) ? "" : `[${p(l("notification.navigation.item.relation.status.draft"))}] `.toUpperCase()}${v}`, h = !!o.viewId;
  return /* @__PURE__ */ n(
    H.Root,
    {
      labelledBy: "condition-modal-breadcrumbs",
      onOpenChange: (v) => {
        v || r({
          preventDefault() {
          },
          stopPropagation() {
          },
          target: {}
        });
      },
      open: t,
      children: /* @__PURE__ */ w(H.Content, { children: [
        /* @__PURE__ */ n(ir, { isNewItem: !h, canUpdate: c?.canUpdate }),
        /* @__PURE__ */ n(
          ar,
          {
            availableLocale: e,
            current: o,
            isLoading: a,
            onSubmit: u,
            onCancel: r,
            appendLabelPublicationStatus: C,
            locale: d,
            permissions: c,
            currentNavigation: m
          }
        )
      ] })
    }
  );
}, ft = 0, lr = ({ value: e, setValue: t, initialIndex: a = ft }) => {
  const [o, i] = N(e), [r, d] = N(e), [c, m] = N(a), { isSmallMobile: p } = Ze(), [u, C] = N(!!e || p), h = We(null), { formatMessage: v } = A();
  V(() => {
    u && setTimeout(() => {
      h.current?.querySelector("input")?.focus();
    }, 0);
  }, [u]), V(() => {
    c && o === r && t({
      value: o,
      index: c
    });
  }, [c, o, r]), V(() => {
    o !== r && (d(o), m(ft), t({
      value: o,
      index: ft
    }));
  }, [o, r]);
  const f = E((b) => {
    b.code.toLowerCase() === "enter" && m((T) => T + 1);
  }, []), y = E(
    (b) => {
      i(b.target.value);
    },
    [i]
  ), I = E(() => {
    i(""), C(!1);
  }, [i, C]);
  return u ? /* @__PURE__ */ w("div", { ref: h, style: { width: "100%" }, children: [
    /* @__PURE__ */ n(
      ca,
      {
        name: "searchbar",
        onClear: I,
        value: e,
        size: "S",
        onChange: y,
        clearLabel: "Clearing the search",
        placeholder: v(
          l("pages.main.search.placeholder", "Type to start searching...")
        ),
        onKeyDown: f,
        children: "Search for navigation items"
      }
    ),
    /* @__PURE__ */ n(
      F,
      {
        variant: "pi",
        fontColor: "neutral150",
        style: { margin: "3px 0 0" },
        display: { initial: "none", medium: "inline-block" },
        children: v(
          l("pages.main.search.subLabel", "press ENTER to highlight next item")
        )
      }
    )
  ] }) : /* @__PURE__ */ n(ye, { children: /* @__PURE__ */ n(Fa, {}), onClick: () => C(!u) });
}, sr = ({
  currentNavigation: e,
  setCurrentNavigation: t,
  canUpdate: a,
  addNewNavigationItem: o
}) => {
  const { formatMessage: i } = A(), r = E(() => {
    e && t({
      ...e,
      items: e.items.map((p) => ke(p, !1))
    });
  }, [t, e, ke]), d = E(() => {
    e && t({
      ...e,
      items: e.items.map((p) => ke(p, !0))
    });
  }, [t, e, ke]), c = E(
    (p) => {
      const u = (e?.items ?? []).reduce(
        (C, { order: h }) => Math.max(C, h),
        0
      );
      o(
        p,
        void 0,
        !0,
        "",
        !0,
        e?.items.length.toString(),
        u + 1
      );
    },
    [o, e?.items]
  ), m = [
    {
      onClick: r,
      type: "submit",
      variant: "tertiary",
      tradId: "header.action.expandAll",
      margin: "8px"
    },
    {
      onClick: d,
      type: "submit",
      variant: "tertiary",
      tradId: "header.action.collapseAll",
      margin: "8px"
    }
  ];
  return a && m.push({
    onClick: c,
    type: "submit",
    variant: "primary",
    tradId: "header.action.newItem",
    startIcon: /* @__PURE__ */ n(St, {}),
    margin: "8px"
  }), m.map(({ tradId: p, margin: u, ...C }, h) => /* @__PURE__ */ n(D, { marginLeft: { initial: 0, small: u }, children: /* @__PURE__ */ w(K, { ...C, children: [
    " ",
    i(l(p)),
    " "
  ] }) }, h));
}, dr = ({
  canUpdate: e,
  addNewNavigationItem: t,
  availableLocale: a,
  availableNavigations: o,
  currentNavigation: i,
  setCurrentNavigation: r
}) => {
  const d = Fo(), { formatMessage: c } = A(), m = Co(), p = Io(), {
    i18nCopyItemsModal: u,
    i18nCopySourceLocale: C,
    setI18nCopyModalOpened: h,
    setI18nCopySourceLocale: v
  } = Lo(
    E(
      (y) => {
        const I = o.find(
          ({ locale: b, documentId: T }) => b === y && T === i?.documentId
        );
        I && I.documentId && i?.documentId && d.mutate(
          {
            source: I.locale,
            target: i.locale,
            documentId: I.documentId
          },
          {
            onSuccess(b) {
              d.reset(), r({
                ...b.data,
                items: b.data.items.map(rt)
              }), m(), p();
            }
          }
        );
      },
      [i]
    )
  ), f = E(() => {
    C && h(!0);
  }, [h, C]);
  return /* @__PURE__ */ w(P, { direction: "column", minHeight: "400px", justifyContent: "center", children: [
    /* @__PURE__ */ n(D, { padding: 4, children: /* @__PURE__ */ n(F, { variant: "beta", textColor: "neutral600", children: c(l("empty.description")) }) }),
    e && /* @__PURE__ */ n(
      K,
      {
        variant: "secondary",
        startIcon: /* @__PURE__ */ n(Na, {}),
        label: c(l("empty.cta")),
        onClick: t,
        children: c(l("empty.cta"))
      }
    ),
    e && !!a.length && /* @__PURE__ */ w(P, { direction: "column", justifyContent: "center", children: [
      /* @__PURE__ */ n(D, { paddingTop: 3, paddingBottom: 3, children: /* @__PURE__ */ n(F, { variant: "beta", textColor: "neutral600", children: c(l("view.i18n.fill.cta.header")) }) }),
      /* @__PURE__ */ w(P, { direction: "row", justifyContent: "center", alignItems: "center", children: [
        /* @__PURE__ */ n(D, { paddingLeft: 1, paddingRight: 1, children: /* @__PURE__ */ n(
          xe,
          {
            onChange: v,
            value: C,
            size: "S",
            children: a.map((y) => /* @__PURE__ */ n(Ae, { value: y, children: c(l("view.i18n.fill.option"), { locale: y }) }, y))
          }
        ) }),
        /* @__PURE__ */ n(D, { paddingLeft: 1, paddingRight: 1, children: /* @__PURE__ */ n(
          K,
          {
            variant: "tertiary",
            onClick: f,
            disabled: !C,
            size: "S",
            children: c(l("view.i18n.fill.cta.button"))
          }
        ) })
      ] })
    ] }),
    e && u
  ] });
}, cr = new rn(), ur = () => {
  const { formatMessage: e } = A(), t = Nt(), a = ne(), o = Tn(), { toggleNotification: i } = Oe(), [r, d] = N(), [c, m] = N(), [p, u] = N(!1), { canAccess: C, canUpdate: h, isLoadingForPermissions: v } = Do(), {
    localeData: f,
    currentLocale: y,
    isChangeLanguageVisible: I,
    changeCurrentLocaleAction: b,
    availableLocales: T
  } = Mo(t.data, u), { searchValue: $, setSearchValue: z, isSearchEmpty: k, filteredList: x } = qo(c), {
    activeNavigationItem: M,
    addNewNavigationItem: _,
    editNavigationItem: re,
    closeNavigationItemPopup: Q,
    isItemPopupVisible: le
  } = ko(h), fe = Sn([t, { isPending: v }]), ee = vn({
    onError: (R) => {
      i({
        type: "danger",
        message: e(l("notification.navigation.update.error"))
      });
      try {
        console.error(R), console.log(R.response.data.error);
      } catch {
      }
    },
    onSuccess: (R) => {
      m({
        ...R,
        items: R.items.map(rt)
      }), d({
        documentId: R.documentId,
        id: R.id
      }), u(!1);
    }
  }), _e = () => {
    c && ee.mutate(c);
  }, pe = (R) => {
    R.preventDefault(), R.stopPropagation(), R.target.tagName !== "HTML" && Q();
  }, Re = (R) => {
    if (c && a.data) {
      const Z = je(
        R,
        c?.items ?? [],
        a.data
      );
      m({
        ...c,
        items: Z
      }), u(!0), Q();
    }
  }, G = k ? c?.items ?? [] : x;
  return V(() => {
    if (!c && t.data?.[0]) {
      let R;
      r?.documentId && (R = t.data.find(
        (Z) => Z.documentId === r.documentId && Z.id === r.id
      )), d(void 0), m(R || vt(t.data));
    }
  }, [t.data, c]), V(() => {
    if (c && y !== c.locale) {
      d(void 0);
      const R = t.data?.find(
        (Z) => Z.documentId === c.documentId && Z.locale === y
      );
      R && R.documentId === c.documentId && R.locale !== c.locale && m(R);
    }
  }, [c, y, t.data]), Eo(), !t.data || !f || fe ? /* @__PURE__ */ n(Te.Loading, {}) : /* @__PURE__ */ w(qe.Root, { children: [
    /* @__PURE__ */ n(Te.Title, { children: e(l("header.title", "UI Navigation")) }),
    /* @__PURE__ */ w(Te.Main, { children: [
      /* @__PURE__ */ n(
        si,
        {
          availableNavigations: t.data,
          activeNavigation: c,
          handleCachePurge: () => o.mutate(void 0),
          handleChangeSelection: m,
          handleLocalizationSelection: p ? b.trigger : b.perform,
          handleSave: _e,
          locale: f,
          structureHasChanged: p,
          isSaving: ee.isPending,
          permissions: { canUpdate: h },
          currentLocale: y
        }
      ),
      /* @__PURE__ */ w(qe.Content, { children: [
        /* @__PURE__ */ n(
          ci,
          {
            startActions: /* @__PURE__ */ n(lr, { value: $, setValue: z }),
            endActions: /* @__PURE__ */ n(
              sr,
              {
                currentNavigation: c,
                setCurrentNavigation: m,
                canUpdate: h,
                addNewNavigationItem: _
              }
            )
          }
        ),
        c?.items.length ? /* @__PURE__ */ n(
          An,
          {
            items: G,
            onItemLevelAdd: _,
            onItemEdit: re,
            onItemSubmit: Re,
            displayFlat: !k,
            isParentAttachedToMenu: !0,
            permissions: { canUpdate: h, canAccess: C },
            structurePrefix: "",
            locale: y ?? ""
          }
        ) : /* @__PURE__ */ n(
          dr,
          {
            canUpdate: h,
            addNewNavigationItem: _,
            availableLocale: T,
            availableNavigations: t.data,
            currentNavigation: c,
            setCurrentNavigation: m
          }
        ),
        le && y && c && /* @__PURE__ */ n(
          rr,
          {
            availableLocale: T,
            currentItem: M,
            onSubmit: Re,
            onClose: pe,
            locale: y,
            permissions: { canUpdate: h },
            isOpen: le,
            isLoading: v,
            currentNavigation: c
          }
        ),
        I && /* @__PURE__ */ n(
          di,
          {
            onCancel: () => b.cancel(),
            onConfirm: () => b.perform()
          }
        )
      ] })
    ] })
  ] });
};
function pr() {
  return /* @__PURE__ */ n(ln, { client: cr, children: /* @__PURE__ */ n(ur, {}) });
}
const mr = () => /* @__PURE__ */ n(Xn, { backend: Gn, children: /* @__PURE__ */ w(Zn, { children: [
  /* @__PURE__ */ n(kt, { path: "/", index: !0, Component: pr }),
  /* @__PURE__ */ n(kt, { path: "/*", Component: Te.Error })
] }) }), gr = "3.3.7", hr = ["string", "boolean", "select", "media"], Je = {
  background: "neutral0",
  hasRadius: !0,
  shadow: "filterShadow",
  padding: 6
}, fr = /^(?<type>[a-z0-9-]+)\:{2}(?<api>[a-z0-9-]+)\.{1}(?<contentType>[a-z0-9-]+)$/i, yr = (e = "", t = {}) => {
  const {
    allowedContentTypes: a = [],
    restrictedContentTypes: o = [],
    contentTypes: i = [],
    preferCustomContentTypes: r = !1
  } = t, c = (r ? ["api::", ...i] : a).filter((p) => e.includes(p) || e === p).length > 0, m = o.filter((p) => e.includes(p) || e === p).length === 0;
  return !!e && c && m;
}, br = (e = "") => {
  const t = (r) => r.split("-").map((d) => sn(d)).join(""), [a, o, i] = Ir(e);
  return a === "api" ? t(i) : `${t(o)}${t(i)}`;
}, Ir = (e = "") => e.split(fr).filter((t) => t && t.length > 0), Jt = "SERVER OFFLINE", Rn = (e, t) => new Promise((a) => {
  fetch(`${window.strapi.backendURL}/_health`, {
    method: "HEAD",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json",
      "Keep-Alive": "false"
    }
  }).then((o) => {
    if (o.status >= 400)
      throw new Error();
    if (!t)
      throw new Error(Jt);
    a(e);
  }).catch((o) => {
    setTimeout(() => Rn(e, o.message !== Jt).then(
      a
    ), 100);
  });
}), Lt = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readSettingsConfigIndex(),
    queryFn() {
      return t.readSettingsConfig();
    },
    staleTime: 1e3 * 60 * 5
  });
}, $n = () => {
  const e = j(), t = B(e), a = Fe({
    queryKey: t.healthCheckIndex(),
    queryFn: () => t.healthCheck(),
    retry: !0,
    retryDelay: 1e3 * 5,
    enabled: !1
  });
  return ge({
    mutationFn: () => t.restart().then(() => a.refetch())
  });
}, Ln = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn: () => t.restoreConfig()
  });
}, dt = () => {
  const e = j(), t = B(e);
  return Fe({
    queryKey: t.readContentTypeIndex(),
    queryFn: () => t.readContentType(),
    staleTime: 1 / 0
  });
}, Cr = () => {
  const e = j(), t = B(e);
  return ge({
    mutationFn(a) {
      return t.updateConfig({
        ...a,
        contentTypesNameFields: Object.fromEntries(
          a.contentTypesNameFields.map(({ key: o, fields: i }) => [o, i])
        ),
        contentTypesPopulate: Object.fromEntries(
          a.contentTypesPopulate.map(({ key: o, fields: i }) => [o, i])
        ),
        pathDefaultFields: Object.fromEntries(
          a.pathDefaultFields.map(({ key: o, fields: i }) => [o, i])
        ),
        additionalFields: a.audienceFieldChecked ? [...a.additionalFields, "audience"] : a.additionalFields,
        gql: {
          navigationItemRelated: a.contentTypes.map((o) => br(o))
        }
      });
    }
  });
}, yt = (e, t) => {
  const a = t.map((i) => ({
    key: i,
    fields: e[i] ?? []
  }));
  return Object.entries(e).filter(([i, r]) => !t.includes(i)).map(([i, r]) => ({
    key: i,
    fields: r
  })).concat(a);
}, vr = ({ config: e, setFormValue: t }) => {
  V(() => {
    if (e) {
      const {
        additionalFields: a,
        contentTypes: o,
        contentTypesNameFields: i,
        contentTypesPopulate: r,
        pathDefaultFields: d
      } = e;
      t({
        ...e,
        additionalFields: a.filter((c) => typeof c != "string"),
        audienceFieldChecked: a.includes("audience"),
        contentTypesNameFields: yt(i, o),
        contentTypesPopulate: yt(r, o),
        pathDefaultFields: yt(d, o)
      });
    }
  }, [e]);
}, En = nn({
  values: {},
  onChange: () => null,
  handleChange: () => null,
  restartStatus: { required: !1 },
  setRestartStatus: () => null,
  renderError: () => "",
  setFormValueItem: () => null
}), Ne = () => an(En), Tr = () => {
  const e = Lt(), { formatMessage: t } = A(), { values: a, onChange: o, handleChange: i, restartStatus: r } = Ne();
  return /* @__PURE__ */ n(D, { ...Je, width: "100%", children: /* @__PURE__ */ w(P, { direction: "column", alignItems: "flex-start", gap: 2, children: [
    /* @__PURE__ */ n(F, { variant: "delta", as: "h2", children: t(l("pages.settings.additional.title")) }),
    /* @__PURE__ */ w(S.Root, { gap: 4, width: "100%", children: [
      /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(D, { width: "100%", children: /* @__PURE__ */ n(
        L,
        {
          name: "allowedLevels",
          label: t(l("pages.settings.form.allowedLevels.label")),
          hint: t(l("pages.settings.form.allowedLevels.hint")),
          children: /* @__PURE__ */ n(
            ua,
            {
              width: "100%",
              name: "allowedLevels",
              type: "number",
              placeholder: t(
                l("pages.settings.form.allowedLevels.placeholder")
              ),
              onChange: (d, c) => {
                if (He(d)) {
                  const m = parseInt(d.target.value);
                  return i(
                    d.target.name,
                    isNaN(m) ? 0 : m,
                    o
                  );
                }
                return i(d, c, o);
              },
              value: a.allowedLevels,
              disabled: r.required
            }
          )
        }
      ) }) }),
      /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "cascadeMenuAttached",
          label: t(l("pages.settings.form.cascadeMenuAttached.label")),
          hint: t(l("pages.settings.form.cascadeMenuAttached.hint")),
          children: /* @__PURE__ */ n(
            me,
            {
              width: "100%",
              name: "cascadeMenuAttached",
              checked: a.cascadeMenuAttached,
              onChange: (d) => i(d, !a.cascadeMenuAttached, o),
              onLabel: t(l("components.toggle.enabled")),
              offLabel: t(l("components.toggle.disabled")),
              disabled: r.required
            }
          )
        }
      ) }),
      /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "audienceFieldChecked",
          label: t(l("pages.settings.form.audience.label")),
          hint: t(l("pages.settings.form.audience.hint")),
          children: /* @__PURE__ */ n(
            me,
            {
              name: "audienceFieldChecked",
              checked: a.audienceFieldChecked,
              onChange: (d) => i(d, !a.audienceFieldChecked, o),
              onLabel: t(l("components.toggle.enabled")),
              offLabel: t(l("components.toggle.disabled")),
              disabled: r.required,
              width: "100%"
            }
          )
        }
      ) }),
      e.data?.isCachePluginEnabled && /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "isCacheEnabled",
          label: t(l("pages.settings.form.cache.label")),
          hint: t(l("pages.settings.form.cache.hint")),
          children: /* @__PURE__ */ n(
            me,
            {
              name: "isCacheEnabled",
              checked: a.isCacheEnabled,
              onChange: (d) => i(d, !a.isCacheEnabled, o),
              onLabel: t(l("components.toggle.enabled")),
              offLabel: t(l("components.toggle.disabled")),
              disabled: r.required,
              width: "100%"
            }
          )
        }
      ) })
    ] })
  ] }) });
}, Yt = /* @__PURE__ */ n(La, {}), wr = /* @__PURE__ */ n(St, {}), ae = "pages.settings.form.customFields.table.", Sr = ({
  data: e = [],
  onOpenModal: t,
  onRemoveCustomField: a,
  onToggleCustomField: o
}) => {
  const [i, r] = N(!1), [d, c] = N(null), { toggleNotification: m } = Oe(), p = X(() => Xe(e, "name"), [e]), { formatMessage: u } = A(), C = E(
    (f) => {
      c(f), r(!0);
    },
    [c, r]
  ), h = E(() => {
    c(null), r(!1);
  }, [c, r]), v = E(() => {
    d === null ? m({
      type: "warning",
      message: u(l(`${ae}confirmation.error`))
    }) : a(d), h();
  }, [h, d, It, a, m]);
  return /* @__PURE__ */ w(ie, { children: [
    /* @__PURE__ */ n(
      lt,
      {
        isVisible: i,
        header: u(l(`${ae}confirmation.header`)),
        children: u(l(`${ae}confirmation.message`)),
        labelConfirm: u(l(`${ae}confirmation.confirm`)),
        iconConfirm: Yt,
        mainIcon: Yt,
        onConfirm: v,
        onCancel: h
      }
    ),
    /* @__PURE__ */ w(
      dn,
      {
        width: "100%",
        colCount: 4,
        rowCount: e.length + 1,
        footer: /* @__PURE__ */ n(
          ga,
          {
            onClick: (f) => {
              f.preventDefault(), t(null);
            },
            icon: wr,
            children: u(l(`${ae}footer`))
          }
        ),
        children: [
          /* @__PURE__ */ n(cn, { children: /* @__PURE__ */ w(et, { children: [
            /* @__PURE__ */ n(ce, { width: "20%", children: /* @__PURE__ */ n(F, { variant: "sigma", textColor: "neutral600", children: u(l(`${ae}header.name`)) }) }),
            /* @__PURE__ */ n(ce, { width: "60%", children: /* @__PURE__ */ n(F, { variant: "sigma", textColor: "neutral600", children: u(l(`${ae}header.label`)) }) }),
            /* @__PURE__ */ n(ce, { width: "15%", children: /* @__PURE__ */ n(F, { variant: "sigma", textColor: "neutral600", children: u(l(`${ae}header.type`)) }) }),
            /* @__PURE__ */ n(ce, { width: "5%", children: /* @__PURE__ */ n(F, { variant: "sigma", textColor: "neutral600", children: u(l(`${ae}header.required`)) }) }),
            /* @__PURE__ */ n(ce, { children: /* @__PURE__ */ n(pa, {}) })
          ] }) }),
          /* @__PURE__ */ n(un, { children: p.map(
            (f) => typeof f != "string" ? /* @__PURE__ */ w(et, { children: [
              /* @__PURE__ */ n(ue, { width: "20%", children: /* @__PURE__ */ n(F, { fontWeight: "semiBold", textColor: "neutral800", children: f.name }) }),
              /* @__PURE__ */ n(ue, { width: "60%", children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: f.label }) }),
              /* @__PURE__ */ n(ue, { width: "15%", children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: f.type }) }),
              /* @__PURE__ */ n(ue, { width: "5%", children: /* @__PURE__ */ n(
                ma,
                {
                  description: u(
                    l(`${ae}${f.required ? "required" : "notRequired"}`)
                  ),
                  children: /* @__PURE__ */ n(F, { textColor: "neutral800", children: f.required ? /* @__PURE__ */ n(Ge, {}) : /* @__PURE__ */ n(Ra, {}) })
                }
              ) }),
              /* @__PURE__ */ n(ue, { children: /* @__PURE__ */ n(P, { width: "100%", justifyContent: "flex-end", alignItems: "center", children: /* @__PURE__ */ w(mn, { children: [
                /* @__PURE__ */ n(
                  ye,
                  {
                    onClick: () => o(f),
                    label: u(
                      l(`${ae}${f.enabled ? "disable" : "enable"}`)
                    ),
                    variant: f.enabled ? "success-light" : "tertiary",
                    children: f.enabled ? /* @__PURE__ */ n(hn, {}) : /* @__PURE__ */ n($a, {}),
                    style: { minWidth: 50 }
                  }
                ),
                /* @__PURE__ */ n(
                  ye,
                  {
                    onClick: () => t(f),
                    label: u(l(`${ae}edit`)),
                    children: /* @__PURE__ */ n(Tt, {}),
                    style: { minWidth: 50 }
                  }
                ),
                /* @__PURE__ */ n(
                  ye,
                  {
                    onClick: () => C(f),
                    label: u(l(`${ae}remove`)),
                    children: /* @__PURE__ */ n(wt, {}),
                    style: { minWidth: 50 }
                  }
                )
              ] }) }) })
            ] }, f.name) : null
          ) })
        ]
      }
    )
  ] });
}, xr = ({ onChange: e, initialValue: t, ...a }) => {
  const [o, i] = N(
    na(t) ? t.join(";") : ""
  );
  return /* @__PURE__ */ n(we, { ...a, onChange: (d) => {
    const c = d?.target.value ?? "", m = c.split(";").map((p) => p.trim()).filter((p) => !!p.length);
    i(c ?? ""), e(m);
  }, value: o });
}, O = "pages.settings.form.customFields.popup.", Ar = (e) => e.map((t, a) => ({
  key: `${t}-${a}`,
  metadatas: {
    intlLabel: {
      id: t,
      defaultMessage: t
    },
    hidden: !1,
    disabled: !1
  },
  value: t,
  label: t
})), Fr = ({
  isEditForm: e,
  customField: t,
  onSubmit: a,
  onClose: o
}) => {
  const i = Ar(hr), { formatMessage: r } = A(), [d, c] = N(
    t ? {
      ...t
    } : {
      name: "",
      label: "",
      type: "string",
      required: !1,
      multi: !1,
      enabled: !0
    }
  ), [m, p] = N(), { type: u } = d;
  V(() => {
    t && c({
      ...t
    });
  }, [t]);
  const C = (y, I, b) => {
    if (b) {
      let T = y, $ = I;
      if (He(y)) {
        const { name: z, value: k } = y.target;
        T = z, $ = Be($) ? k : $;
      }
      return ot(T) && h(T, $), b(y, $);
    }
  }, h = (y, I) => {
    c(
      it(
        {
          ...d
        },
        y,
        I
      )
    );
  }, v = (y) => {
    const I = J(m, y);
    if (I)
      return r(l(`${O}${y}.${I}`));
  }, f = (y, I) => {
    const { success: b, data: T, error: $ } = fn.safeParse(I);
    b ? a(T) : $ && p(
      $.issues.reduce((z, k) => ({
        ...z,
        [k.path.join(".")]: k.message
      }), {})
    );
  };
  return /* @__PURE__ */ w(ie, { children: [
    /* @__PURE__ */ n(H.Body, { children: /* @__PURE__ */ n(at, { method: "POST", width: "auto", height: "auto", initialValues: d, children: ({ values: y, onChange: I }) => /* @__PURE__ */ w(S.Root, { gap: 5, children: [
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "name",
          label: r(l(`${O}name.label`)),
          hint: r(l(`${O}name.description`)),
          error: v("name"),
          required: !0,
          children: /* @__PURE__ */ n(
            we,
            {
              name: "name",
              value: y.name,
              onChange: (b, T) => C(b, T, I),
              placeholder: r(l(`${O}name.placeholder`)),
              type: "string",
              disabled: e,
              width: "100%"
            }
          )
        }
      ) }, "name"),
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "label",
          label: r(l(`${O}label.label`)),
          hint: r(l(`${O}label.description`)),
          error: v("label"),
          required: !0,
          children: /* @__PURE__ */ n(
            we,
            {
              name: "label",
              value: y.label,
              onChange: (b, T) => C(b, T, I),
              placeholder: r(l(`${O}label.placeholder`)),
              type: "string",
              width: "100%"
            }
          )
        }
      ) }, "label"),
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "description",
          label: r(l(`${O}description.label`)),
          hint: r(l(`${O}description.description`)),
          error: v("description"),
          children: /* @__PURE__ */ n(
            we,
            {
              name: "description",
              value: y.description,
              onChange: (b, T) => C(b, T, I),
              placeholder: r(l(`${O}description.placeholder`)),
              type: "string",
              width: "100%"
            }
          )
        }
      ) }, "description"),
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "placeholder",
          label: r(l(`${O}placeholder.label`)),
          hint: r(l(`${O}placeholder.description`)),
          error: v("placeholder"),
          children: /* @__PURE__ */ n(
            we,
            {
              name: "placeholder",
              value: y.placeholder,
              onChange: (b, T) => C(b, T, I),
              placeholder: r(l(`${O}placeholder.placeholder`)),
              type: "string",
              width: "100%"
            }
          )
        }
      ) }, "placeholder"),
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "type",
          label: r(l(`${O}type.label`)),
          hint: r(l(`${O}type.description`)),
          required: !0,
          children: /* @__PURE__ */ n(
            xe,
            {
              name: "type",
              value: y.type,
              onChange: (b) => C("type", b, I),
              disabled: e,
              width: "100%",
              children: i.map(({ key: b, label: T, value: $ }) => /* @__PURE__ */ n(Ae, { value: $, children: T }, b))
            }
          )
        }
      ) }, "type"),
      u === "select" && /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
          L,
          {
            name: "multi",
            label: r(l(`${O}multi.label`)),
            hint: r(l(`${O}multi.description`)),
            error: v("multi"),
            children: /* @__PURE__ */ n(
              me,
              {
                name: "multi",
                checked: y.multi,
                onChange: (b) => C(b, !y.multi, I),
                onLabel: "true",
                offLabel: "false",
                width: "100%"
              }
            )
          }
        ) }, "multi"),
        /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
          L,
          {
            name: "options",
            label: r(l(`${O}options.label`)),
            hint: r(l(`${O}options.description`)),
            error: v("options"),
            children: /* @__PURE__ */ n(
              xr,
              {
                name: "options",
                onChange: (b) => C("options", b, I),
                initialValue: y.options
              }
            )
          }
        ) }, "options")
      ] }),
      /* @__PURE__ */ n(S.Item, { col: 12, children: /* @__PURE__ */ n(
        L,
        {
          name: "required",
          label: r(l(`${O}required.label`)),
          hint: r(l(`${O}required.description`)),
          error: v("required"),
          children: /* @__PURE__ */ n(
            me,
            {
              name: "required",
              placeholder: r(l(`${O}required.placeholder`)),
              checked: y.required,
              onChange: (b) => C(b, !y.required, I),
              onLabel: "true",
              offLabel: "false",
              width: "100%"
            }
          )
        }
      ) }, "required")
    ] }) }) }),
    /* @__PURE__ */ w(H.Footer, { children: [
      /* @__PURE__ */ n(H.Close, { children: /* @__PURE__ */ n(K, { onClick: o, variant: "tertiary", children: r(l("popup.item.form.button.cancel")) }) }),
      /* @__PURE__ */ n(K, { onClick: (y) => f(y, d), children: r(l("popup.item.form.button.save")) })
    ] })
  ] });
}, Nr = ({
  isOpen: e,
  onClose: t,
  onSubmit: a,
  data: o
}) => {
  const i = !!o, { formatMessage: r } = A();
  return /* @__PURE__ */ n(
    H.Root,
    {
      onOpenChange: (d) => {
        d || t();
      },
      open: e,
      labelledBy: "custom-field-modal",
      children: /* @__PURE__ */ w(H.Content, { children: [
        /* @__PURE__ */ n(H.Header, { children: /* @__PURE__ */ n(
          F,
          {
            variant: "omega",
            fontWeight: "bold",
            textColor: "neutral800",
            as: "h2",
            id: "asset-dialog-title",
            children: r(
              l(
                `pages.settings.form.customFields.popup.header.${i ? "edit" : "new"}`
              )
            )
          }
        ) }),
        /* @__PURE__ */ n(
          Fr,
          {
            isEditForm: i,
            customField: o,
            onSubmit: a,
            onClose: t
          }
        )
      ] })
    }
  );
}, Rr = () => {
  const { formatMessage: e } = A(), {
    values: { additionalFields: t },
    setFormValueItem: a
  } = Ne(), [o, i] = N(!1), [r, d] = N(
    null
  ), c = (C) => {
    d(C), i(!0);
  }, m = (C) => {
    const h = t.filter(
      (v) => typeof v != "string" ? v.name !== C.name : !0
    );
    a("additionalFields", h), d(null), i(!1);
  }, p = (C) => {
    const h = { ...C, enabled: !C.enabled }, v = t.map(
      (f) => typeof f != "string" && C.name === f.name ? h : f
    );
    a("additionalFields", v);
  }, u = (C) => {
    const v = !!t.find(
      (f) => typeof f != "string" ? f.name === C.name : !1
    ) ? t.map(
      (f) => typeof f != "string" && C.name === f.name ? C : f
    ) : [...t, C];
    a("additionalFields", v), d(null), i(!1);
  };
  return /* @__PURE__ */ w(D, { ...Je, width: "100%", children: [
    /* @__PURE__ */ n(F, { variant: "delta", as: "h2", children: e(l("pages.settings.customFields.title")) }),
    /* @__PURE__ */ n(D, { padding: 1 }),
    /* @__PURE__ */ n(
      Sr,
      {
        data: t,
        onOpenModal: c,
        onRemoveCustomField: m,
        onToggleCustomField: p
      }
    ),
    o && /* @__PURE__ */ n(
      Nr,
      {
        onClose: () => i(!1),
        onSubmit: u,
        isOpen: o,
        data: r
      }
    )
  ] });
}, $r = () => {
  const { formatMessage: e } = A(), { values: t, onChange: a, handleChange: o, restartStatus: i } = Ne();
  return /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "preferCustomContentTypes",
      label: e(l("pages.settings.form.preferCustomContentTypes.label")),
      hint: e(l("pages.settings.form.preferCustomContentTypes.hint")),
      children: /* @__PURE__ */ n(
        me,
        {
          name: "preferCustomContentTypes",
          checked: t.preferCustomContentTypes,
          onChange: (r) => o(r, !t.preferCustomContentTypes, a),
          onLabel: e(l("components.toggle.enabled")),
          offLabel: e(l("components.toggle.disabled")),
          disabled: i.required,
          width: "100%"
        }
      )
    }
  ) });
}, Lr = () => {
  const e = Lt(), t = dt(), { formatMessage: a } = A(), { values: o, onChange: i, handleChange: r, restartStatus: d, setFormValueItem: c, renderError: m } = Ne(), { contentTypes: p, preferCustomContentTypes: u } = o, C = Xe(
    Object.values(t.data ?? []).filter(
      ({ uid: h }) => yr(h, {
        allowedContentTypes: e.data?.allowedContentTypes,
        restrictedContentTypes: e.data?.restrictedContentTypes,
        preferCustomContentTypes: u,
        contentTypes: p
      })
    ).map((h) => {
      const v = t.data?.find((f) => f.uid === h.uid);
      if (v) {
        const { isDisplayed: f, kind: y } = v;
        return {
          ...h,
          available: f,
          isSingle: y === "singleType"
        };
      }
      return h;
    }),
    (h) => h.info.displayName
  );
  return /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "contentTypes",
      label: a(l("pages.settings.form.contentTypes.label")),
      hint: a(l("pages.settings.form.contentTypes.hint")),
      children: /* @__PURE__ */ n(
        De,
        {
          name: "contentTypes",
          label: a(l("pages.settings.form.contentTypes.label")),
          "aria-label": a(l("pages.settings.form.contentTypes.label")),
          placeholder: a(l("pages.settings.form.contentTypes.placeholder")),
          value: o.contentTypes,
          onChange: (h) => {
            r("contentTypes", h, i);
            const {
              contentTypesNameFields: v = [],
              contentTypesPopulate: f = [],
              pathDefaultFields: y = []
            } = o, I = h.filter(
              (T) => !v.find(($) => $.key === T)
            ) ?? [], b = v.filter(
              (T) => !h.includes(T.key) || T.key === "default"
            ).map(({ key: T }) => T) ?? [];
            c("contentTypesNameFields", [
              ...v.filter(
                ({ key: T }) => !b.includes(T) || T === "default"
              ) ?? [],
              ...I.map((T) => ({ key: T, fields: [] }))
            ]), c("contentTypesPopulate", [
              ...f.filter(
                ({ key: T }) => !b.includes(T) || T === "default"
              ) ?? [],
              ...I.map((T) => ({ key: T, fields: [] }))
            ]), c("pathDefaultFields", [
              ...y.filter(
                ({ key: T }) => !b.includes(T) || T === "default"
              ) ?? [],
              ...I.map((T) => ({ key: T, fields: [] }))
            ]);
          },
          disabled: d.required,
          error: m("contentTypes"),
          withTags: !0,
          width: "100%",
          children: C.map((h) => /* @__PURE__ */ n(Ve, { value: h.uid, children: h.info.displayName }, h.uid))
        }
      )
    }
  ) });
}, Er = () => {
  const e = dt(), { formatMessage: t } = A(), { values: a, onChange: o, handleChange: i, restartStatus: r, renderError: d } = Ne(), c = X(
    () => a.contentTypes?.map((m) => e.data?.find(({ uid: p }) => p === m)).filter(
      (m) => m !== void 0
    ) || [],
    [a.contentTypes, e.data]
  );
  return V(() => {
    a.defaultContentType && (a.contentTypes.includes(a.defaultContentType) || i("defaultContentType", void 0, o));
  }, [a.contentTypes]), /* @__PURE__ */ n(S.Item, { col: 4, s: 12, xs: 12, children: /* @__PURE__ */ n(
    L,
    {
      name: "defaultContentType",
      label: t(l("pages.settings.form.defaultContentType.label")),
      hint: t(l("pages.settings.form.defaultContentType.hint")),
      children: /* @__PURE__ */ n(
        xe,
        {
          name: "defaultContentType",
          label: t(l("pages.settings.form.defaultContentType.label")),
          "aria-label": t(l("pages.settings.form.defaultContentType.label")),
          placeholder: t(l("pages.settings.form.defaultContentType.placeholder")),
          value: a.defaultContentType,
          onChange: (m) => i("defaultContentType", m, o),
          onClear: () => i("defaultContentType", void 0, o),
          disabled: r.required,
          error: d("defaultContentType"),
          withTags: !0,
          width: "100%",
          children: c.map((m) => /* @__PURE__ */ n(Ae, { value: m.uid, children: m.info.displayName }, m.uid))
        }
      )
    }
  ) });
}, Pr = ["relation", "media", "component", "dynamiczone"], Mr = () => {
  const e = dt(), { formatMessage: t } = A(), { values: a, onChange: o, handleChange: i, restartStatus: r, renderError: d } = Ne(), {
    contentTypes: c,
    contentTypesNameFields: m
  } = a;
  return /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: c?.length ? /* @__PURE__ */ n(Ue.Root, { style: { width: "100%" }, children: m.map((p, u) => {
    const C = e.data?.find(({ uid: y }) => y === p.key), h = C?.attributes ?? {}, v = Object.keys(h).sort(), f = v.filter(
      (y) => Pr.includes(h[y]?.type)
    );
    return C ? /* @__PURE__ */ w(Ue.Item, { value: p.key, children: [
      /* @__PURE__ */ n(Ue.Header, { children: /* @__PURE__ */ n(Ue.Trigger, { children: C?.info.displayName ?? t(l("pages.settings.form.nameField.default")) }) }),
      /* @__PURE__ */ n(Ue.Content, { children: /* @__PURE__ */ w(S.Root, { gap: 4, padding: 2, children: [
        /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ n(
          L,
          {
            name: `contentTypesNameFields[${u}]`,
            label: t(l("pages.settings.form.nameField.label")),
            hint: t(
              l(
                `pages.settings.form.nameField.${Y(J(a, `contentTypesNameFields[${u}].fields`, [])) ? "empty" : "hint"}`
              )
            ),
            children: /* @__PURE__ */ n(
              De,
              {
                name: `contentTypesNameFields[${u}]`,
                placeholder: t(
                  l("pages.settings.form.nameField.placeholder")
                ),
                value: J(a, `contentTypesNameFields[${u}].fields`),
                onChange: (y) => {
                  const I = J(a, "contentTypesNameFields", []).map(
                    (b, T) => T === u ? {
                      ...b,
                      fields: y
                    } : b
                  );
                  return i("contentTypesNameFields", I, o);
                },
                disabled: r.required,
                error: d(`contentTypesNameFields[${u}]`),
                withTags: !0,
                children: v.map((y) => /* @__PURE__ */ n(Ve, { value: y, children: y }, y))
              }
            )
          }
        ) }),
        /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ n(
          L,
          {
            name: `contentTypesPopulate[${u - 1}]`,
            label: t(l("pages.settings.form.populate.label")),
            hint: t(
              l(
                `pages.settings.form.populate.${Y(J(a, `contentTypesPopulate[${u - 1}]fields`, [])) ? "empty" : "hint"}`
              )
            ),
            children: /* @__PURE__ */ n(
              De,
              {
                width: "100%",
                name: `contentTypesPopulate[${u - 1}]`,
                placeholder: t(
                  l("pages.settings.form.populate.placeholder")
                ),
                value: J(a, `contentTypesPopulate[${u - 1}].fields`, []),
                onChange: (y) => {
                  const I = J(a, "contentTypesPopulate", []).map(
                    (b, T) => T === u - 1 ? {
                      ...b,
                      fields: y
                    } : b
                  );
                  return i("contentTypesPopulate", I, o);
                },
                disabled: r.required,
                error: d(`contentTypesPopulate[${u - 1}]`),
                withTags: !0,
                children: f.map((y) => /* @__PURE__ */ n(Ve, { value: y, children: y }, y))
              }
            )
          }
        ) }),
        /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ n(
          L,
          {
            name: `pathDefaultFields[${u - 1}]`,
            label: t(
              l("pages.settings.form.pathDefaultFields.label")
            ),
            hint: t(
              l(
                `pages.settings.form.pathDefaultFields.${Y(J(a, `pathDefaultFields[${u - 1}].fields`, [])) ? "empty" : "hint"}`
              )
            ),
            children: /* @__PURE__ */ n(
              De,
              {
                name: `pathDefaultFields[${u - 1}]`,
                width: "100%",
                placeholder: t(
                  l("pages.settings.form.pathDefaultFields.placeholder")
                ),
                value: J(a, `pathDefaultFields[${u - 1}].fields`, []),
                onChange: (y) => {
                  const I = J(a, "pathDefaultFields", []).map((b, T) => T === u - 1 ? {
                    ...b,
                    fields: y
                  } : b);
                  return i("pathDefaultFields", I, o);
                },
                disabled: r.required,
                error: d(`pathDefaultFields[${u - 1}]`),
                withTags: !0,
                children: v.map((y) => /* @__PURE__ */ n(Ve, { value: y, children: y }, y))
              }
            )
          }
        ) })
      ] }) })
    ] }, p.key) : null;
  }) }) : null });
}, kr = () => {
  const { formatMessage: e } = A();
  return /* @__PURE__ */ n(D, { ...Je, width: "100%", children: /* @__PURE__ */ w(P, { direction: "column", alignItems: "flex-start", gap: 2, children: [
    /* @__PURE__ */ n(F, { variant: "delta", as: "h2", children: e(l("pages.settings.general.title")) }),
    /* @__PURE__ */ n(S.Root, { gap: 4, width: "100%", children: /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ w(S.Root, { gap: 4, width: "100%", children: [
      /* @__PURE__ */ n($r, {}),
      /* @__PURE__ */ n(Lr, {}),
      /* @__PURE__ */ n(Er, {}),
      /* @__PURE__ */ n(Mr, {})
    ] }) }) })
  ] }) });
}, qr = oe(ha)`
  [role='status'] {
    flex-direction: column;
  }
`, Dr = ({ setIsReloading: e }) => {
  const { formatMessage: t } = A(), a = $n(), { restartStatus: o, setRestartStatus: i } = Ne(), r = async () => {
    a.mutate(void 0, {
      onSuccess() {
        e(!0), Rn(!0).then((c) => {
          c && window.location.reload();
        });
      },
      onError() {
        i({ required: !1 });
      }
    });
  }, d = () => i({ required: !1 });
  return o.required ? /* @__PURE__ */ n(D, { ...Je, width: "100%", children: /* @__PURE__ */ n(
    qr,
    {
      closeLabel: t(l("pages.settings.actions.restart.alert.cancel")),
      title: t(l("pages.settings.actions.restart.alert.title")),
      action: /* @__PURE__ */ n(D, { children: /* @__PURE__ */ n(K, { onClick: r, startIcon: /* @__PURE__ */ n(Ea, {}), children: t(l("pages.settings.actions.restart.label")) }) }),
      onClose: d,
      children: /* @__PURE__ */ w(ie, { children: [
        /* @__PURE__ */ n(D, { paddingBottom: 1, children: t(l("pages.settings.actions.restart.alert.description")) }),
        o.reasons?.map((c, m) => /* @__PURE__ */ n(
          D,
          {
            paddingBottom: 1,
            children: t(
              l(`pages.settings.actions.restart.alert.reason.${c}`)
            )
          },
          m
        ))
      ] })
    }
  ) }) : null;
}, Vr = ({ hasSettingsReadPermissions: e }) => {
  const { formatMessage: t } = A(), a = Ln(), { setRestartStatus: o } = Ne(), [i, r] = N(!1), d = async (c) => {
    r(!1), c && (a.mutate(), o({ required: !0 }));
  };
  return /* @__PURE__ */ n(D, { ...Je, width: "100%", children: /* @__PURE__ */ w(P, { direction: "column", alignItems: "flex-start", gap: 2, children: [
    /* @__PURE__ */ n(F, { variant: "delta", as: "h2", children: t(l("pages.settings.restoring.title")) }),
    /* @__PURE__ */ w(S.Root, { gap: 4, width: "100%", children: [
      /* @__PURE__ */ n(S.Item, { col: 12, s: 12, xs: 12, children: /* @__PURE__ */ n(F, { children: t(l("pages.settings.actions.restore.description")) }) }),
      /* @__PURE__ */ w(S.Item, { col: 12, s: 12, xs: 12, children: [
        e && /* @__PURE__ */ n(
          K,
          {
            variant: "danger-light",
            startIcon: /* @__PURE__ */ n(Ge, {}),
            onClick: () => r(!0),
            children: t(l("pages.settings.actions.restore.label"))
          }
        ),
        /* @__PURE__ */ n(
          lt,
          {
            isVisible: i,
            header: t(l("pages.settings.actions.restore.confirmation.header")),
            labelConfirm: t(
              l("pages.settings.actions.restore.confirmation.confirm")
            ),
            iconConfirm: /* @__PURE__ */ n(Pa, {}),
            onConfirm: () => d(!0),
            onCancel: () => d(!1),
            children: t(l("pages.settings.actions.restore.confirmation.description"))
          }
        )
      ] })
    ] })
  ] }) });
}, jr = Qa.omit({ contentTypesNameFields: !0 }).extend({
  audienceFieldChecked: g.boolean(),
  contentTypesNameFields: g.object({
    key: g.string(),
    fields: g.string().array()
  }).array(),
  contentTypesPopulate: g.object({
    key: g.string(),
    fields: g.string().array()
  }).array(),
  pathDefaultFields: g.object({
    key: g.string(),
    fields: g.string().array()
  }).array()
}), Br = gr, en = new rn(), Or = () => {
  const e = Lt(), t = dt(), a = Cr(), o = Ln(), i = $n(), { formatMessage: r } = A(), [d, c] = N({ required: !1 }), [m, p] = N(!1), u = Kn("SettingsPage", (x) => x.permissions), C = X(() => !!u.find(({ action: x }) => x === Le.settings[0].action), [u]), h = X(() => !!u.find(({ action: x }) => x === Le.access[0].action), [u]), v = e.isPending || t.isPending || a.isPending || i.isPending || o.isPending, [f, y] = N({}), [I, b] = N(), T = (x, M, _) => {
    if (_) {
      let re = x, Q = M;
      if (He(x)) {
        const { name: le, value: fe } = x.target;
        re = le, Q = Be(Q) ? fe : Q;
      }
      return ot(re) && $(re, Q), _(x, Q);
    }
  }, $ = (x, M) => {
    y(
      (_) => it(
        {
          ..._
        },
        x,
        M
      )
    );
  }, z = (x) => {
    if (J(I, x))
      return r(l(x));
  }, k = (x, M) => {
    const { success: _, data: re, error: Q } = jr.safeParse(M);
    _ ? a.mutate(re, {
      onSuccess() {
        c({ required: !0 }), a.reset();
      }
    }) : Q && (b(
      Q.issues.reduce((le, fe) => ({
        ...le,
        [fe.path.join(".")]: fe.message
      }), {})
    ), console.warn("Invalid form data", Q));
  };
  return vr({ config: e.data, setFormValue: y }), C ? v || m ? /* @__PURE__ */ n(Te.Loading, {}) : /* @__PURE__ */ n(qe.Root, { children: /* @__PURE__ */ w(Te.Main, { children: [
    /* @__PURE__ */ n(Te.Title, { children: r(l("pages.settings.header.title")) }),
    /* @__PURE__ */ n(
      qe.Header,
      {
        title: r(l("pages.settings.header.title")),
        subtitle: /* @__PURE__ */ w(P, { direction: "row", gap: 3, alignItems: "center", justifyContent: "space-between", children: [
          /* @__PURE__ */ n(F, { variant: "epsilon", textColor: "neutral600", tag: "p", children: r(l("pages.settings.header.description")) }),
          /* @__PURE__ */ n(pn, { color: "neutral", minWidth: "fit-content", children: /* @__PURE__ */ w("span", { style: { textTransform: "none" }, children: [
            "v",
            Br
          ] }) })
        ] }),
        primaryAction: h ? /* @__PURE__ */ n(
          K,
          {
            startIcon: /* @__PURE__ */ n(Ge, {}),
            disabled: d.required,
            onClick: (x) => k(x, f),
            children: r(l("pages.settings.actions.submit"))
          }
        ) : null
      }
    ),
    /* @__PURE__ */ n(qe.Content, { children: /* @__PURE__ */ n(at, { method: "POST", width: "auto", height: "auto", initialValues: f, children: ({ values: x, onChange: M }) => /* @__PURE__ */ n(
      En.Provider,
      {
        value: {
          values: x,
          onChange: M,
          handleChange: T,
          restartStatus: d,
          setRestartStatus: c,
          renderError: z,
          setFormValueItem: $
        },
        children: /* @__PURE__ */ w(P, { direction: "column", gap: 4, children: [
          /* @__PURE__ */ n(Dr, { setIsReloading: p }),
          /* @__PURE__ */ n(kr, {}),
          /* @__PURE__ */ n(Tr, {}),
          /* @__PURE__ */ n(Rr, {}),
          /* @__PURE__ */ n(Vr, { hasSettingsReadPermissions: h })
        ] })
      }
    ) }) })
  ] }) }) : /* @__PURE__ */ n(Te.NoPermissions, {});
};
function zr() {
  return en.invalidateQueries(), /* @__PURE__ */ n(ln, { client: en, children: /* @__PURE__ */ n(Or, {}) });
}
const _r = "navigation", tn = "Navigation", rl = {
  register(e) {
    e.createSettingSection(
      {
        id: de,
        intlLabel: {
          id: `${de}.plugin.section.name`,
          defaultMessage: `${tn} plugin`
        }
      },
      [
        {
          intlLabel: {
            id: `${de}.plugin.section.item`,
            defaultMessage: "Configuration"
          },
          id: "navigation",
          to: de,
          Component() {
            return zr;
          },
          permissions: Le.settings
        }
      ]
    ), e.addMenuLink({
      to: `plugins/${de}`,
      icon: ja,
      intlLabel: {
        id: `${de}.plugin.name`,
        defaultMessage: tn
      },
      Component() {
        return mr;
      },
      permissions: Le.access,
      position: 1
    }), e.registerPlugin({
      id: de,
      initializer: ka,
      isReady: !1,
      name: _r
    });
  },
  registerTrads: async function({ locales: e = [] }) {
    return Promise.all(
      e.map(async (t) => t in zt ? zt[t]().then(({ default: o }) => ({
        data: Bt(Ot(o), de),
        locale: t
      })) : {
        data: Bt(Ot({}), de),
        locale: t
      })
    );
  }
};
export {
  rl as default
};
