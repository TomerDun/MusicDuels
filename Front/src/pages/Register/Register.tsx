import { Select, Text, TextInput } from "@mantine/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import Stepper, { Step } from '../../components/authArea/Stepper';
import classes from "./Register.module.css";
import { Dropzone } from '@mantine/dropzone';
// import { createUser } from "../../../utils/apiUtils/authApiUtils";
// import { insertProfile, type ProfileToDB } from "../../../utils/apiUtils/profileApiUtils";
import { SkillLevel, validateRegisterFormByStep } from "../../utils/formUtils";
import { useRegisterForm } from "../../utils/hooks/useRegisterForm";
// import { profileStore } from "../../../stores/ProfileStore";

export function Register() {

    const [currentStep, setCurrentStep] = useState(1); // control displayed step
    const [image, setImage] = useState<File | null>(null); // control displayed step
    const form = useRegisterForm();
    const navigate = useNavigate();

    function handleStepChange(step: number) {
        setCurrentStep(step); // Keep state in sync
        return validateRegisterFormByStep(form, step);
    }

    async function handleComplete() {
        try {
            console.log("handle complete register");
            const { email, password, username, profileImageFile, instruments, skillLevel } = form.getValues();

            // // create new user in DB
            // const newUser = await createUser(email, password);
            // const newProfileData: ProfileToDB = {
            const newProfileData = {
                // userId: newUser?.id as string,
                username,
                email,
                profileImageFile,
                instruments,
                skillLevel
            }

            // // create profile in DB and update activeProfile in store
            // await insertProfile(newProfileData);     
            // if (newUser) {
            //     profileStore.getActiveProfile(newUser.id);
            // }

            navigate('/');
        } catch (error: any) {
            console.error(error);
            // reject back to step 2 on error
            setCurrentStep(2);

            // Set specific error based on error type
            if (error.message.includes('User already registered')) {
                form.setErrors({
                    email: 'This email is already registered. Please use a different email.'
                });
            } else form.setErrors({ user: error.message });
        }
    }

    return (
        <div className="Register pt-24">
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
                <Step>
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
                        withAsterisk
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
                    <h2>Final Step</h2>
                    <p>Now the show begins!!!</p>
                </Step>
            </Stepper>
        </div>
    );
}
