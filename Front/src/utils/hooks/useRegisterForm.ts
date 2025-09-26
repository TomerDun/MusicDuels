import { useForm } from "@mantine/form";
import { SkillLevel } from "../formUtils";

export function useRegisterForm() {

    const form = useForm({
        mode: 'uncontrolled',
        // initialValues: {
        //     email: 'itai@gmail.com',
        //     password: '1234',
        //     username: 'itai',
        //     instruments: 'aaaa',
        //     skillLevel: 'pro' as SkillLevel,
        //     profileImageFile: null as null|File
        // },
        initialValues: {
            email: '',
            password: '',
            username: '',
            instruments: '',
            skillLevel: '' as SkillLevel,
            profileImageFile: null as null | File
        },

        validate: {
            email: (value) => {
                if (!value) return 'Email is required';
                return /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email format';
            },
            password: (value) => {
                if (!value) return 'Password is required';
                if (value.length < 4) return 'Password must be at least 4 characters long';
                return null;
            },
            username: (value) => {
                if (!value) return 'Username is required';
                if (2 > value.length || value.length > 20) return 'Username must be between 2 to 20 characters long';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                return null;
            },
            skillLevel: (value) => {
                if (!value || value === undefined) return 'Skill level is required';
                if (!Object.values(SkillLevel).includes(value as SkillLevel)) return 'Please select a valid skill level';
                return null;
            },
            // TODO:  check array
            instruments: (value) => {
                if (!value || value === undefined) return []; // or null?
                //validate array's items
                return null;
            },
            // TODO: file validation
            profileImageFile: (value) => {
                if (!value || value === undefined) return null;
                return null;
            }
        },
    })

    return form;

}

