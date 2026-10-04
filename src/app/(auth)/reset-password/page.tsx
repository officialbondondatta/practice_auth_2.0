import { Suspense } from "react";
import ResetPassword from "./ResetPassword";


const ResetPasswordPage = () => {
    return (
        <div className="flex flex-col items-center justify-center mt-10 bg-lime-300 p-5 container mx-auto">
            <h2 className="mb-5 text-xl font-semibold">Reset Your Password</h2>
            <Suspense fallback="Loading...">
                <ResetPassword></ResetPassword>
            </Suspense>
        </div>
    );
};

export default ResetPasswordPage;