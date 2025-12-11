const dev = import.meta.env.DEV;

export const API_BASE = dev
  ? "/API"
  : "http://203.189.137.34:1265/ksfh_backend/API";
