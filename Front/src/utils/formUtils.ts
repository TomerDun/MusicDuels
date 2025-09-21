
import type { UseFormReturnType } from "@mantine/form";

export function validateRegisterFormByStep(form: RegisterFormType, step: number) {
    switch (step) {
        case 2:
            const emailValid = form.validateField('email');
            const pwdValid = form.validateField('password');
            const usernameValid = form.validateField('username');
            return emailValid.hasError || pwdValid.hasError || usernameValid.hasError
        case 3:
            const profileImageFileValid = form.validateField('profileImageFile');
            const instrumentsValid = form.validateField('instruments');
            const skillLevelValid = form.validateField('skillLevel');
            return profileImageFileValid || instrumentsValid.hasError || skillLevelValid.hasError;
        default:
            return false;
    }
}

export function validateAllRegisterForm(form: RegisterFormType) {
    return form.validate().hasErrors;
}

export type RegisterFormType = UseFormReturnType<{
    email: string;
    password: string;
    username: string;
    profileImageFile?: File;
    skillLevel: SkillLevel;
    instruments?: string;
}>;

export enum SkillLevel {
    Beginner = 'beginner',
    Amateur = 'amateur',
    Pro = 'pro'
}

export function validateEmail(value: string) {
    if (!value) return ('Email is required');
    if (!/^\S+@\S+$/.test(value)) return ('Invalid email');
    return null;
}

export function validatePassword(value: string) {
    if (!value) return ('Password is required');
    if (value.trim().length < 4) return ('Password must be at least 4 chars')
    return null;
}

// TODO: check if used
export function validateUsername(value: string) {
    if (!value) return ('Username is required');
    if (value.trim().length < 2) return ('Username must be at least 2 chars')
    return null;
}