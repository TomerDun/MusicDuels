
import type { UseFormReturnType } from "@mantine/form";

export type RegisterFormType = UseFormReturnType<{
    email: string;
    password: string;
    username: string;
    profileImageFile: File | null;
    skillLevel: SkillLevel;
    instruments: string;
}>;

export enum SkillLevel {
    Beginner = 'beginner',
    Amateur = 'amateur',
    Pro = 'pro'
}

export function validateRegisterFormByStep(form: RegisterFormType, step: number) {
    switch (step) {
        case 2:
            const emailValid = form.validateField('email');
            const pwdValid = form.validateField('password');
            const usernameValid = form.validateField('username');
            return emailValid.hasError || pwdValid.hasError || usernameValid.hasError;
        case 3:
            const instrumentsValid = form.validateField('instruments');
            const skillLevelValid = form.validateField('skillLevel');
            return instrumentsValid.hasError || skillLevelValid.hasError;
        case 4:
            const profileImageFileValid = form.validateField('profileImageFile');
            return profileImageFileValid.hasError;
        default:
            return false;
    }
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