import { Loader, Select, Text, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Stepper, { Step } from '../../components/authArea/Stepper';
import classes from "./Register.module.css";
import { Dropzone } from '@mantine/dropzone';
import { SkillLevel, validateRegisterFormByStep } from "../../utils/formUtils";
import { useRegisterForm } from "../../utils/hooks/useRegisterForm";
import { onRegister } from "../../utils/authUtils";

export function Register() {

    const [currentStep, setCurrentStep] = useState(1); // control displayed step
    const [image, setImage] = useState<File | null>(null); // control displayed step
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const form = useRegisterForm();
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('token')) navigate('/leaderboard');
    }, [])

    function handleStepChange(step: number) {
        setCurrentStep(step); // Keep state in sync
        return validateRegisterFormByStep(form, step);
    }

    async function handleComplete() {
        try {
            setIsLoading(true);
            const { email, password, username, profileImageFile } = form.getValues();
            // const { email, password, username, profileImageFile, instruments, skillLevel } = form.getValues();

            // create new user in DB and update storage
            await onRegister({ username, email, password, profileImageFile });

            navigate('/');
        } catch (error: any) {
            console.error(error);
            setCurrentStep(2); // reject back to step 2 on error
            form.setErrors({ user: error.message });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="Register background-gradient min-h-screen pt-24">
            <Stepper
                currentStep={currentStep} // controlled step
                onStepChange={(step) => setCurrentStep(step)}
                onFinalStepCompleted={() => handleComplete()}
                backButtonText="Previous"
                nextButtonText="Next"
                nextButtonProps={{
                    onClick: (e) => {
                        const isValid = handleStepChange(currentStep);
                        if (isValid) e.preventDefault();
                    }
                }}
            >
                <Step >
                    <h2>Welcome to Music Duels!</h2>
                    <p>Let's get it started!</p>
                </Step>
                <Step>
                    <h2>Credentials</h2>
                    <TextInput
                        withAsterisk
                        label="Email"
                        placeholder="your@email.com"
                        key={form.key('email')}
                        {...form.getInputProps('email')}
                    />
                    <TextInput
                        withAsterisk
                        type="password"
                        label="Password"
                        placeholder="your password"
                        key={form.key('password')}
                        {...form.getInputProps('password')}
                    />
                    <TextInput
                        withAsterisk
                        label="username"
                        placeholder="your anonymous username"
                        key={form.key('username')}
                        {...form.getInputProps('username')}
                    />
                    {form.errors.user && (
                        <Text c="red" size="sm" mt="sm">
                            {form.errors.user}
                        </Text>
                    )}
                </Step>
                <Step>
                    <h2>Let us get to know you better...</h2>

                    <Select
                        withAsterisk
                        mt="md"
                        comboboxProps={{ withinPortal: true }}
                        data={Object.values(SkillLevel)}
                        placeholder="Pick one"
                        label="Pick your skill level"
                        classNames={classes}
                        key={form.key('skillLevel')}
                        {...form.getInputProps('skillLevel')}
                    />
                    <TextInput
                        type="string"
                        label="instruments"
                        placeholder="Insert the instruments you play on"
                        key={form.key('instruments')}
                        {...form.getInputProps('instruments')}
                    />
                </Step>
                <Step>
                    <h2>Upload Profile Image</h2>
                    <Dropzone
                        className={classes.dropzone}
                        onDrop={(file) => {
                            setImage(file[0]);
                            form.setFieldValue('profileImageFile', file[0]);
                        }}
                        onReject={(files) => console.log('rejected files', files)}
                        maxSize={5 * 1024 ** 2} // 5MB
                        accept={['image/*']}
                    >
                        {image ?
                            <div className={classes.droppedImageContainer}>
                                <img
                                    src={URL.createObjectURL(image)}
                                    className={classes.profileImage}
                                />
                                <Text size="sm" c="dimmed" mt="xs">{image.name}</Text>
                            </div>
                            :
                            <div>
                                <Text size="xl" inline>
                                    Drag images here or click to select files
                                </Text>
                                <Text size="sm" c="dimmed" inline mt={7}>
                                    Upload your profile image (max 5MB)
                                </Text>
                            </div>
                        }
                    </Dropzone>
                </Step>
                <Step>
                    {isLoading
                        ? <div className="flex justify-center items-center">
                            <Loader color="indigo" size="xl" type="dots" />
                        </div>
                        : <h2>Now the show begins!!!</h2>
                    }
                </Step>
            </Stepper>
        </div>
    );
}
