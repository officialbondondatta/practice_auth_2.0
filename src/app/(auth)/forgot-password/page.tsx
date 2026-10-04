"use client"
import { requestPasswordReset } from "@/lib/auth-client";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";

const ForgotPasswordPage = () => {
    const handleForgotPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const inputData = Object.fromEntries(formData.entries()) as Record<string, string>
        const resData = await requestPasswordReset({
            email: inputData.email,
            redirectTo: "/reset-password"
        })

        console.log(inputData)
    };
    return (
        <div className="flex flex-col items-center justify-center mt-10 bg-lime-300 p-5 container mx-auto">
            <h2 className="mb-5 text-xl font-semibold">Forgot Password</h2>
            <Form className="flex flex-col gap-4" onSubmit={handleForgotPassword}>
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
                <div className="flex gap-2">
                    <Button type="submit">
                        Submit
                    </Button>
                    <Button type="reset" variant="secondary">
                        Reset
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default ForgotPasswordPage;