"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateArticle() {

    const router = useRouter();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function getToken() {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
    }

    async function createArticle(e) {

        e.preventDefault();

        await fetch("/api/proxy/admin/articles", {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                title,
                content
            })

        });

        router.push("/admin/articles");

    }

    return (

        <div className="p-8 max-w-xl">

            <h1 className="text-2xl font-bold mb-6">
                Створити статтю
            </h1>

            <form
                onSubmit={createArticle}
                className="flex flex-col gap-4"
            >

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="border p-2"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Content"
                    className="border p-2 h-40"
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