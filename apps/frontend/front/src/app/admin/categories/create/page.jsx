"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateCategory() {

    const router = useRouter();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function getToken() {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
    }

    async function createCategory(e) {

        e.preventDefault();

        await fetch("/api/proxy/admin/categories", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                name,
                description
            })

        });

        router.push("/admin/categories");

    }

    return (

        <div className="p-8 max-w-xl">

            <h1 className="text-2xl font-bold mb-6">
                Створити категорію
            </h1>

            <form
                onSubmit={createCategory}
                className="flex flex-col gap-4"
            >

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border p-2"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border p-2"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Створити
                </button>

            </form>

        </div>

    );
}