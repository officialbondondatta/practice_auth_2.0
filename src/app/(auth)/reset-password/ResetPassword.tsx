"use client"
import { resetPassword } from "@/lib/auth-client";
import { Button, Description, FieldError, Form, Input, Label, TextField, toast } from "@heroui/react";
import { useSearchParams } from "next/navigation";

const ResetPassword = () => {
    const getToken = useSearchParams()
    const token = getToken.get('token')
    if (!token) {
        alert("Missing reset token. Please use the link from your email.");
        return;
    }
    const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const inputData = Object.fromEntries(formData.entries())

        const resData = await resetPassword({
            newPassword: inputData.password as string,
            token
        })
        toast.success("Password reset successful")
    }
    return (
        <div>
            <Form className="flex flex-col gap-4" onSubmit={handleResetPassword}>

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
                    <Label>New Password</Label>
                    <Input placeholder="Enter your new password" />
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
        </div>
    );
};

export default ResetPassword;