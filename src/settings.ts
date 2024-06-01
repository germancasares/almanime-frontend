export const ENVIRONMENT = import.meta.env.MODE;
export const IS_DEVELOPMENT = ENVIRONMENT === "development";
export const SENTRY_DSN = import.meta.env.VITE_SENTRY_DSN as string ?? "";
export const RELEASE = import.meta.env.VITE_RELEASE as string ?? "";
export const SHOULD_PERSIST_QUERIES = import.meta.env.VITE_SHOULD_PERSIST_QUERIES === "true";
export const AUTH0_DOMAIN = import.meta.env.VITE_AUTH0_DOMAIN as string ?? "";
export const AUTH0_CLIENT_ID = import.meta.env.VITE_AUTH0_CLIENT_ID as string ?? "";
export const AUTH0_AUDIENCE = import.meta.env.VITE_AUTH0_AUDIENCE as string ?? "";
export const API = import.meta.env.VITE_API as string ?? "";
