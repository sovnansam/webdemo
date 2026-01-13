const dev = import.meta.env.DEV;

const API_BASE = dev
  ? "/API" 
  : "http://192.168.10.10:9592/ksfh_backend/API";

export default API_BASE;
