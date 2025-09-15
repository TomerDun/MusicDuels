import { useForm } from "@mantine/form";
import { City, Gender, Profession, Education, RelationshipStatus } from "../formUtils";

export function useRegisterForm() {

    const form =  useForm({
        mode: 'uncontrolled',
        initialValues: {
            email: '',
            password: '',
            userName: '',
            birthdate: '',
            gender: '' as Gender,
            city: '' as City,
            profession: '' as Profession,
            education: '' as Education,
            relationshipStatus: '' as RelationshipStatus,
        },

        validate: {
            email: (value) => {
                if (!value) return 'Email is required';
                return /^\S+@\S+\.\S+$/.test(value) ? null : 'Invalid email format';
            },
            password: (value) => {
                if (!value) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters long';
                return null;
            },
            userName: (value) => {
                if (!value) return 'Username is required';
                if (value.length < 2) return 'Username must be at least 2 characters long';
                if (value.length > 20) return 'Username must be less than 20 characters';
                if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Username can only contain letters, numbers, and underscores';
                return null;
            },
            birthdate: (value) => {
                if (!value) return 'Birthdate is required';
                
                const birthDate = new Date(value);
                if (isNaN(birthDate.getTime())) return 'Please enter a valid date';
                
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                const monthDiff = today.getMonth() - birthDate.getMonth();
                
                // Adjust age if birthday hasn't occurred this year
                const actualAge = monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate()) 
                    ? age - 1 
                    : age;
                
                if (actualAge < 13) return 'You must be at least 13 years old';
                if (actualAge > 120) return 'Please enter a valid birthdate';
                if (birthDate > today) return 'Birthdate cannot be in the future';
                return null;
            },
            gender: (value) => {
                if (!value || value === undefined) return 'Gender is required';
                if (!Object.values(Gender).includes(value as Gender)) return 'Please select a valid gender';
                return null;
            },
            city: (value) => {
                if (!value) return 'City is required';
                if (!value || value === undefined) return 'City is required';
                if (!Object.values(City).includes(value as City)) return 'Please select a valid city';
                return null;
            },
            profession: (value) => {
                if (!value || value === undefined) return null;
                if (!Object.values(Profession).includes(value as Profession)) return 'Please select a valid profession';
                return null;
            },
            education: (value) => {
                if (!value || value === undefined) return null;
                if (!Object.values(Education).includes(value as Education)) return 'Please select a valid education level';
                return null;
            },
            relationshipStatus: (value) => {
                if (!value || value === undefined) return null;
                if (!Object.values(RelationshipStatus).includes(value as RelationshipStatus)) return 'Please select a valid relationship status';
                return null;
            },
        },
    })

    return form;

}

