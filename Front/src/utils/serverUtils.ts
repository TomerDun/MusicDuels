// Utils related to backend server connection

export const API_URL = 'http://localhost:8080'

export function authHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const tokenHeader = 'Bearer ' + token
    return {'Authorization': tokenHeader};
}