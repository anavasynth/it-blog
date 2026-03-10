"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (!username || !password) {
            alert("Введіть username і password");
            return;
        }

        setLoading(true);

        try {

            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || "Login failed");
                setLoading(false);
                return;
            }

            // зберігаємо JWT токен
            document.cookie = `token=${data.token}; path=/; SameSite=Lax`;

            // редірект на головну
            router.replace("/");

        } catch (err) {

            console.error(err);
            alert("Server error");

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="flex justify-center items-center min-h-screen">

            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 w-80 p-6 border rounded-lg shadow"
            >

                <h1 className="text-xl font-bold text-center">
                    Login
                </h1>

                <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="border p-2 rounded"
                />

                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                >
                    {loading ? "Loading..." : "Login"}
                </button>

            </form>

        </div>

    );

}