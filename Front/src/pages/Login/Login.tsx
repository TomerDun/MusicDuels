import { Button, Container, Paper, PasswordInput, Text, TextInput, Title } from '@mantine/core';
import { useForm } from '@mantine/form';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { onLogin } from '../../utils/authUtils';
import { validateEmail, validatePassword } from '../../utils/formUtils';
import classes from './Login.module.css';

function Login() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const form = useForm({
        mode: 'uncontrolled',
        // initialValues: { email: '', password: '' },
        initialValues: { email: 'itai@gmail.com', password: '1234' },
        validate: {
            email: (value) => validateEmail(value),
            password: (value) => validatePassword(value)
        },
    });

    async function handleSubmit(values: { email: string; password: string }) {
        try {
            form.clearErrors();
            if (form.validate().hasErrors) return;

            setIsLoading(true);

            // Auth logic
            await onLogin(values.email, values.password);
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

// export default Login
export default observer(Login)