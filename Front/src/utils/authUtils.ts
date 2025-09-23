// TODO: put connection variables on a global

import { userStore } from "../stores/UserStore";
import type { RegisterRequest } from "../types/AuthTypes";
import type { User } from "../types/UserTypes";
import { API_URL } from "./serverUtils";

export async function onLogin(email: string, password: string) {
    const body = JSON.stringify({ email, password })
    try {
        const res = await fetch(API_URL + '/auth/login', { body: body, method: 'POST', headers: { 'Content-Type': 'application/json' } });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }
        const data = await res.json();
        const user = data.user as User;

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', user.id);
        userStore.setActiveUser(user);

        return data;
    }
    catch (err) {
        console.error('error fetching login: ', err)
        throw err;
    }
}

// TODO: add type for response from register (user type)
export async function onRegister(body: RegisterRequest) {
    try {
        const formData = new FormData();

        // Add all your form fields to FormData
        formData.append('email', body.email);
        formData.append('username', body.username);
        formData.append('password', body.password);
        if (body.profileImageFile)
            formData.append('profileImageFile', body.profileImageFile);

        const res = await fetch(API_URL + '/auth/register', {
            body: formData,
            method: 'POST',
        });
        const data = await res.json();
        const user = data.user as User;

        if (!res.ok) {
            // handle existing email or username
            if (data.message.errors[0].type.includes('unique'))
                throw new Error(
                    data.message.errors[0].path === 'username'
                        ? 'Username already exists!'
                        : 'Email already exists!'
                )
            throw new Error(data.message);
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', user.id);
        userStore.setActiveUser(user);

        return data;
    }
    catch (err) {
        console.error('error fetching register: ', err)
        throw err;
    }
}

export function onLogout() {
    userStore.logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}