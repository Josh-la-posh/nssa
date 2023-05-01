/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_API_BASE_URL: string;
  readonly VITE_APP_CLIENT_DOMAIN: string;
  readonly VITE_APP_ADMIN_DOMAIN: string;
  readonly VITE_APP_SEO_DOMAIN: string;
  readonly VITE_APP_API_MOCKING: boolean;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
