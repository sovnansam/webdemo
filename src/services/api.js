// src/services/api.js
const API_BASE_URL = import.meta.env.PROD 
  ? import.meta.env.VITE_API_URL || '/API'  // Falls back to /API if env var not set
  : '/API';

export const fetchData = async () => {
  const response = await fetch(`${API_BASE_URL}/your-endpoint`);
  return response.json();
};