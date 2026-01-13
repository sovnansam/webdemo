const dev = import.meta.env.DEV;

const API_BASE = dev
  ? "/API" 
<<<<<<< HEAD
  : "http://192.168.10.10:9592/ksfh_backend/API";
=======
  : "http://203.189.137.34:1265/ksfh_backend/API";
>>>>>>> 715a80b7da83e6f47e9210a2af538bd8763982be

export default API_BASE;
