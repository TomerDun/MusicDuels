// Utils related to backend server connection

export const API_URL_DEV = 'http://localhost:8080'
export const API_URL = 'https://musicduels.onrender.com' // PRODUCTION

export function authHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const tokenHeader = 'Bearer ' + token
    return {'Authorization': tokenHeader};
}