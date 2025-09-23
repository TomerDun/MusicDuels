// Utils related to backend server connection

// TODO: Move BRANCH to .env file

type Branch = 'production' | 'development';

const API_URLS = {
    'development': 'http://localhost:8080',
    'production': 'https://musicduels.onrender.com'
}

export const API_URL = 'https://localhost:8080';


export function authHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const tokenHeader = 'Bearer ' + token
    return {'Authorization': tokenHeader};
}


type callApiOptions = {
    addAuthHeader?: boolean
    contentType?: string
    customToken?: string
}

export async function callApi(endpoint: string, method: string = 'GET', body?: object, options?:callApiOptions) {        
    const branch = import.meta.env.MODE as Branch;
    const baseUrl:string = API_URLS[branch]
    const url = baseUrl + endpoint;
    const headers: any = {
        'Content-Type': 'Application/json'        
    }
    let requestBody = body ? JSON.stringify(body) : undefined;
    let token:string | boolean | null = null; // null: need to add token from localStorage | false: don't add token | string: token data added from options

    // Allow custom options
    if (options) {
        if (options.contentType) headers["Content-Type"] = options.contentType;
        if (options.addAuthHeader !== undefined && options.addAuthHeader === false) token = false;
        if (options.customToken) token = options.customToken
    }

    // Add auth headers
    if (token === null) {
        token = localStorage.getItem('token');
        throw new Error('Could not add auth headers - token not available in localStorage')
    }
    if (token !== false) headers['Authorzation'] = 'Bearer ' + token;

    const res = await fetch(url, {method: method, headers: headers, body: requestBody})
    const data = await res.json();

    if (!res.ok) {
        throw new Error(data);
    }

    return data;
}