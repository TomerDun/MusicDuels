// Utils related to backend server connection
type Branch = 'production' | 'development';

const API_URLS = {
    'development': 'http://localhost:8080',
    'production': 'https://musicduels.onrender.com'
}

export function authHeaders() {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const tokenHeader = 'Bearer ' + token
    return { 'Authorization': tokenHeader };
}


type callApiOptions = {
    addAuthHeader?: boolean
    contentType?: string
    customToken?: string
}

export async function callApi(endpoint: string, method: string = 'GET', body?: object, options?: callApiOptions) {
    const branch = import.meta.env.MODE as Branch;
    const baseUrl: string = API_URLS[branch]
    const url = baseUrl + endpoint;
    const headers: any = {
        'Content-Type': 'Application/json'
    }
    let requestBody = body ? JSON.stringify(body) : undefined;
    let token: string | boolean | null = null; // null: need to add token from localStorage | false: don't add token | string: token data added from options

    // Allow custom options
    if (options) {
        if (options.contentType) headers["Content-Type"] = options.contentType;
        if (options.addAuthHeader !== undefined && options.addAuthHeader === false) token = false;
        if (options.customToken) token = options.customToken
    }

    // Add auth headers
    if (token === null) {
        token = localStorage.getItem('token');
        if (!token) throw new Error('Could not add auth headers - token not available in localStorage')
    }
    if (token !== false) headers['Authorization'] = 'Bearer ' + token;

    const res = await fetch(url, { method: method, headers: headers, body: requestBody })
    const data = await res.json();

    if (!res.ok) {
        throw data;
        // throw new Error(data);
    }

    return data;
}

// specific api call for FormData with no content type header and no stringify
export async function callApiFormData(endpoint: string, method: string = 'GET', body: FormData) {
    const branch = import.meta.env.MODE as Branch;
    const baseUrl: string = API_URLS[branch]
    const url = baseUrl + endpoint;
    const res = await fetch(url, { method: method, body });
    const data = await res.json();

    if (!res.ok) throw data;

    return data;
}