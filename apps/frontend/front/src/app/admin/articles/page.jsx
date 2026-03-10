"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminArticles() {

    const [articles, setArticles] = useState([]);

    function getToken() {
        const match = document.cookie.match(/(^| )token=([^;]+)/);
        return match ? match[2] : null;
    }

    async function loadArticles() {

        try {

            const token = getToken();

            const res = await fetch("/api/proxy/admin/articles", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await res.json();

            console.log("ADMIN ARTICLES:", data);

            if (Array.isArray(data)) {
                setArticles(data);
            }
            else if (Array.isArray(data.articles)) {
                setArticles(data.articles);
            }
            else if (Array.isArray(data.data)) {
                setArticles(data.data);
            }
            else {
                setArticles([]);
            }

        } catch (err) {
            console.error(err);
        }

    }

    async function deleteArticle(id) {

        const token = getToken();

        if (!confirm("Видалити статтю?")) return;

        try {

            await fetch(`/api/proxy/admin/articles/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            loadArticles();

        } catch (err) {
            console.error(err);
        }

    }

    useEffect(() => {
        loadArticles();
    }, []);

    return (

        <div className="min-h-screen bg-zinc-50 p-8">

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Admin Articles
                </h1>

                <Link
                    href="/admin/articles/create"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Створити
                </Link>

            </div>

            {articles.length === 0 && (
                <p>Статей немає</p>
            )}

            <div className="flex flex-col gap-6">

                {articles.map(article => (

                    <div
                        key={article.id}
                        className="border rounded-lg p-4 shadow bg-white"
                    >

                        {article.cover && (

                            <img
                                src={article.cover}
                                alt={article.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />

                        )}

                        <h2 className="text-xl font-semibold mb-2">
                            {article.title}
                        </h2>

                        <p className="text-gray-700 mb-3">
                            {article.content}
                        </p>

                        <p className="text-sm text-gray-500 mb-4">
                            Автор: {article.author} | Категорія: {article.category}
                        </p>

                        <div className="flex gap-4">

                            <Link
                                href={`/admin/articles/edit/${article.id}`}
                                className="text-blue-600 hover:underline"
                            >
                                Редагувати
                            </Link>

                            <button
                                onClick={() => deleteArticle(article.id)}
                                className="text-red-600 hover:underline"
                            >
                                Видалити
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>

    );

}