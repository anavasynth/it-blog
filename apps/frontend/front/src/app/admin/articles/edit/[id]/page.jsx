"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditArticle() {

    const params = useParams();
    const router = useRouter();

    const id = params.id;

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function getToken() {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
    }

    async function loadArticle() {

        const res = await fetch("/api/proxy/admin/articles", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();

        const article = data.find(a => a.id == id);

        setTitle(article.title);
        setContent(article.content);

    }

    async function updateArticle(e) {

        e.preventDefault();

        await fetch(`/api/proxy/admin/articles/${id}`, {

            method: "PUT",

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

    useEffect(() => {
        loadArticle();
    }, []);

    return (

        <div className="p-8 max-w-xl">

            <h1 className="text-2xl font-bold mb-6">
                Редагувати статтю
            </h1>

            <form
                onSubmit={updateArticle}
                className="flex flex-col gap-4"
            >

                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2"
                />

                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 h-40"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Оновити
                </button>

            </form>

        </div>

    );
}