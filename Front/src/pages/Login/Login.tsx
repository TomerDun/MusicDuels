import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import classes from './Login.module.css';
// import { profileStore } from '../../../stores/ProfileStore';
import { observer } from 'mobx-react-lite';
// import { loginUser } from '../../../utils/apiUtils/authApiUtils';
import { validateEmail, validatePassword } from '../../utils/formUtils';
import { onLogin } from '../../utils/authUtils';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        initialValues: { email: '', password: '' },
        validate: {
            email: (value) => validateEmail(value),
            password: (value) => validatePassword(value)
        },
    });

    async function handleSubmit(values: { email: string; password: string }) {
        console.log('handle submit');
        try {
            form.clearErrors();
            if (form.validate().hasErrors) return;

        //     setIsLoading(true);

            // Auth logic
            const data = await onLogin(values.email, values.password);
            console.log('handleSubmit data',data);
            // await profileStore.getActiveProfile(data.user.id)
            navigate('/');

        } catch (error: any) {
            form.setErrors({ form: error.message });
            console.error('Error logging in: ', error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="Login pt-24">
            <Container size={420} my={40}>
                <Title ta="center" className={classes.title}>
                    Welcome back!
                </Title>
                <Text className={classes.subtitle}>
                    Do not have an account yet? <Link to={'/register'}>Create account</Link>
                </Text>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Paper withBorder shadow="sm" p={22} mt={30} radius="md">
                        <TextInput
                            label="Email"
                            type='email'
                            placeholder="you@gmail.com"
                            withAsterisk
                            radius="md"
                            key={form.key('email')}
                            {...form.getInputProps('email')}
                            onBlur={() => form.validateField('email')}
                        />
                        <PasswordInput
                            label="Password"
                            type='password'
                            placeholder="Your password"
                            withAsterisk
                            mt="md"
                            radius="md"
                            key={form.key('password')}
                            {...form.getInputProps('password')}
                            onBlur={() => form.validateField('password')}
                        />
                        {form.errors.form && (
                            <Text c="red" size="sm" mt="sm">
                                {form.errors.form}
                            </Text>
                        )}
                        <Button
                            type='submit'
                            loading={isLoading}
                            fullWidth
                            mt="xl"
                            radius="md"
                            className={classes.loginButton}
                            onClick={() => form.clearErrors()}
                        >
                            Log in
                        </Button>
                    </Paper>
                </form>
            </Container>
        </div>
    );
}

export default Login
// export default observer(Login)