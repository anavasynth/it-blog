"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function CategoryPage() {

    const params = useParams();
    const slug = params.slug;

    const [category, setCategory] = useState(null);
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);

    const limit = 5;

    useEffect(() => {

        if (!slug) return;

        async function loadData() {

            try {

                const catRes = await fetch("/api/proxy/categories");
                const categories = await catRes.json();

                const currentCategory = categories.find(c => c.slug === slug);
                setCategory(currentCategory);

                const artRes = await fetch(
                    `/api/proxy/categories/${slug}/articles?page=${page}&limit=${limit}`
                );

                const artData = await artRes.json();
                setArticles(artData);

            } catch (err) {
                console.error(err);
            }

        }

        loadData();

    }, [slug, page]);

    if (!category) {
        return <div className="p-8">Завантаження...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">

            <h1 className="text-3xl font-bold mb-2 text-black dark:text-white">
                {category.name}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-8">
                {category.description}
            </p>

            <div className="flex flex-col gap-6">

                {articles.map(article => (

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

                        <h2 className="text-xl font-semibold mb-2">
                            <Link
                                href={`/articles/${article.slug}`}
                                className="hover:underline"
                            >
                                {article.title}
                            </Link>
                        </h2>

                        <p className="text-gray-700 dark:text-gray-300 mb-2 line-clamp-3">
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

            <div className="flex justify-center gap-4 mt-8">

                <button
                    onClick={() => setPage(p => Math.max(p - 1, 1))}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Попередня
                </button>

                <span>{page}</span>

                <button
                    onClick={() => setPage(p => p + 1)}
                    className="px-4 py-2 bg-gray-200 rounded"
                >
                    Наступна
                </button>

            </div>

        </div>
    );
}