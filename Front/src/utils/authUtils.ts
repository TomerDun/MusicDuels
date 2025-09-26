// TODO: put connection variables on a global

import { userStore } from "../stores/UserStore";
import type { RegisterRequest } from "../types/AuthTypes";
import type { User } from "../types/UserTypes";
import { callApi, callApiFormData } from "./serverUtils";

export async function onLogin(email: string, password: string) {
    const body = { email, password }
    try {
        const data = await callApi('/auth/login', 'POST', body, { addAuthHeader: false });
        const user = data.user as User;

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', user.id);
        userStore.setActiveUser(user);

        return data;
    }
    catch (err:any) {
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

        const data = await callApiFormData('/auth/register', 'POST', formData);

        const user = data.user as User;

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', user.id);
        userStore.setActiveUser(user);

        return data;
    }
    catch (err: any) {
        console.error('error fetching register: ', err)
        if (err.message.errors[0].type.includes('unique')) {
            throw new Error(
                err.message.errors[0].path === 'username'
                    ? 'Username already exists!'
                    : 'Email already exists!'
            )
        }
        throw new Error(err.message);
    }
}

export function onLogout() {
    userStore.logoutUser();
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
}