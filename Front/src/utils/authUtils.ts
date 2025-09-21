// TODO: put connection variables on a global

import type { RegisterRequest } from "../types/AuthTypes";
import { API_URL } from "./serverUtils";

export async function onLogin(email:string, password:string) {
    const body = JSON.stringify({email, password})
    try {
        const res = await fetch(API_URL + '/auth/login', {body: body, method: 'POST', headers: {'Content-Type': 'application/json'}});
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();


        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        
        return data;
    }
    catch (err) {
        console.error('error fetching login: ', err)
        throw err;
    }
}

// TODO: add type for response from register (user type)
// TODO: Change to form data after implementing image upload
export async function onRegister(body:RegisterRequest) {    
    try {
        const res = await fetch(API_URL + '/auth/register', {body: JSON.stringify(body), method: 'POST', headers: {'Content-Type': 'application/json'}});
        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message);
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user.id);
        
        return data;
    }
    catch (err) {
        console.error('error fetching register: ', err)
        throw err;
    }
}