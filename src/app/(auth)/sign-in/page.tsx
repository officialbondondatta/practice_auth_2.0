"use client"
import { signIn } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const SignInPage = () => {
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputData = Object.fromEntries(formData.entries()) as Record<string, string>
        const { data, error } = await signIn.email({
            email: inputData.email,
            password: inputData.password,
            rememberMe: true
        })
        console.log(data)

    }
    const handleGoogle = async () => {
        const { data, error } = await signIn.social({
            provider: "google"
        })
        console.log(data, error)
    }
    return (
        <div className="bg-sky-200 container mx-auto flex flex-col items-center justify-center mt-10">
            <h2 className="text-2xl mt-5">Sign In</h2>
            <Form className="flex flex-col gap-4 p-5" onSubmit={onSubmit}>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
            <div className="mt-2">
                <Button onClick={handleGoogle}>Or Sign in with Google</Button>
            </div>
        </div>
    );
};

export default SignInPage;