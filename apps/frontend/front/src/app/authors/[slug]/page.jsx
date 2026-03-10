"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function AuthorPage() {

    const params = useParams();
    const slug = params.slug;

    const [author, setAuthor] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {

        if (!slug) return;

        async function loadData() {

            try {

                const authorRes = await fetch(`/api/proxy/authors/${slug}`);
                const authorData = await authorRes.json();
                setAuthor(authorData);

                const articlesRes = await fetch(`/api/proxy/authors/${slug}/articles`);
                const articlesData = await articlesRes.json();
                setArticles(articlesData);

            } catch (err) {
                console.error(err);
            }

        }

        loadData();

    }, [slug]);

    if (!author) {
        return <div className="p-8">Завантаження...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">

            {/* Профіль автора */}

            <div className="flex gap-6 mb-10 items-center">

                {author.avatar && (
                    <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-32 h-32 rounded-full object-cover"
                    />
                )}

                <div>
                    <h1 className="text-3xl font-bold text-black dark:text-white">
                        {author.name}
                    </h1>

                    <p className="text-gray-600 dark:text-gray-300 mt-2">
                        {author.bio}
                    </p>
                </div>

            </div>

            <h2 className="text-2xl font-semibold mb-6 text-black dark:text-white">
                Статті автора
            </h2>

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

        </div>
    );
}