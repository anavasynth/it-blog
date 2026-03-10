"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function TagPage() {

    const params = useParams();
    const slug = params.slug;

    const [articles, setArticles] = useState([]);

    useEffect(() => {

        if (!slug) return;

        async function loadArticles() {

            try {

                const res = await fetch(`/api/proxy/tags/${slug}/articles`);

                if (!res.ok) {
                    throw new Error("Помилка отримання статей");
                }

                const data = await res.json();
                setArticles(data);

            } catch (err) {
                console.error(err);
            }

        }

        loadArticles();

    }, [slug]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">

            <h1 className="text-3xl font-bold mb-6 text-black dark:text-white">
                Тег: {slug}
            </h1>

            <div className="flex flex-col gap-6">

                {articles.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400">
                        Немає статей з цим тегом
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
                                className="text-blue-600 hover:underline"
                            >
                                {article.author}
                            </Link>

                            {" | Категорія: "}
                            <Link
                                href={`/categories/${article.category}`}
                                className="text-blue-600 hover:underline"
                            >
                                {article.category}
                            </Link>

                            {" | Теги: "}
                            {article.tags?.map(tag => (
                                <Link
                                    key={tag}
                                    href={`/tags/${tag}`}
                                    className="text-blue-600 hover:underline mr-2"
                                >
                                    {tag}
                                </Link>
                            ))}

                        </p>

                    </div>

                ))}

            </div>

        </div>
    );
}