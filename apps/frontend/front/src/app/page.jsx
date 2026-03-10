"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

async function getArticles({ page = 1, limit = 10 } = {}) {

    const res = await fetch(`/api/proxy/articles?page=${page}&limit=${limit}`);

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();

}

export default function HomePage() {

    const router = useRouter();

    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {

        getArticles({ page, limit: 10 })
            .then(setArticles)
            .catch(console.error);

    }, [page]);

    function handleSearch(e) {

        e.preventDefault();

        if (!search.trim()) return;

        router.push(`/search?q=${search}`);

    }

    function goAdmin() {

        router.push("/admin");

    }

    function logout() {

        // видаляємо token
        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

        router.push("/auth/login");

    }

    return (

        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8 font-sans">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold text-black dark:text-white">
                    IT Blog
                </h1>

                <div className="flex gap-3">

                    <button
                        onClick={goAdmin}
                        className="bg-black text-white px-4 py-2 rounded"
                    >
                        Admin
                    </button>

                    <button
                        onClick={logout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>

                </div>

            </div>

            {/* SEARCH */}

            <form
                onSubmit={handleSearch}
                className="flex gap-2 mb-8"
            >

                <input
                    type="text"
                    placeholder="Пошук статей..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Пошук
                </button>

            </form>

            {/* ARTICLES */}

            <div className="flex flex-col gap-6">

                {articles.length === 0 && (

                    <p className="text-gray-500 dark:text-gray-400">
                        Статей ще немає
                    </p>

                )}

                {articles.map((article) => (

                    <div
                        key={article.id}
                        className="border rounded-lg p-4 shadow hover:shadow-md transition bg-white dark:bg-zinc-900"
                    >

                        {article.cover && (

                            <img
                                src={article.cover}
                                alt={article.title}
                                className="w-full h-48 object-cover rounded mb-4"
                            />

                        )}

                        <h2 className="text-xl font-semibold text-black dark:text-white mb-2">

                            <Link
                                href={`/articles/${article.slug}`}
                                className="hover:underline"
                            >
                                {article.title}
                            </Link>

                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                            {article.content}
                        </p>

                        <p className="text-sm text-gray-500 dark:text-gray-400">

                            Автор:{" "}

                            <Link
                                href={`/authors/${article.author}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {article.author}
                            </Link>

                            {" | Категорія: "}

                            <Link
                                href={`/categories/${article.category}`}
                                className="text-blue-600 hover:underline font-medium"
                            >
                                {article.category}
                            </Link>

                            {" | Теги: "}

                            {article.tags?.length
                                ? article.tags.map((tag) => (

                                    <Link
                                        key={tag}
                                        href={`/tags/${tag}`}
                                        className="text-blue-600 hover:underline mr-2"
                                    >
                                        {tag}
                                    </Link>

                                ))
                                : "Немає"}

                        </p>

                    </div>

                ))}

            </div>

            {/* PAGINATION */}

            <div className="flex justify-center gap-4 mt-8">

                <button
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                    Попередня
                </button>

                <span className="px-4 py-2 text-black dark:text-white">
                    {page}
                </span>

                <button
                    onClick={() => setPage((p) => p + 1)}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded"
                >
                    Наступна
                </button>

            </div>

        </div>

    );

}