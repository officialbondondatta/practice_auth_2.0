"use client"
import { useState } from "react";
import { Link, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "@/lib/auth-client";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const router = useRouter()
    const { data, isPending } = useSession()

    if (isPending) {
        return <h2>Loading...</h2>
    }

    const navLinks = <>
        <li>
            <Link href="#">Features</Link>
        </li>
        <li>
            <Link href="#" className="font-medium text-accent" aria-current="page">
                Dashboard
            </Link>
        </li>
        <li>
            <Link href="#">Pricing</Link>
        </li>
    </>
    const authButtons = <>
        {
            data ?
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                    <h2>Welcome, {data.user.name}</h2>
                    <Button onClick={async () => await signOut()} className="w-full">Sign Out</Button>
                </li>
                :
                <li className="mt-4 flex flex-col gap-2 border-t border-separator pt-4">
                    <Link href="/sign-in" className="block py-2">
                        Login
                    </Link>
                    <Button onClick={() => router.push("/sign-up")} className="w-full">Sign Up</Button>
                </li>
        }

    </>

    return (
        <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg">
            <header className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <span className="sr-only">Menu</span>
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {isMenuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                    <div className="flex items-center gap-3">
                        <Link href="/" className="font-bold">ACME</Link>
                    </div>
                </div>
                <ul className="hidden items-center gap-4 md:flex">
                    {navLinks}
                </ul>
                <div className="hidden items-center gap-4 md:flex">
                    {authButtons}
                </div>
            </header>
            {isMenuOpen && (
                <div className="border-t border-separator md:hidden">
                    <ul className="flex flex-col gap-2 p-4">
                        {navLinks}
                        {authButtons}
                    </ul>
                </div>
            )}
        </nav>
    );
}
export default Navbar