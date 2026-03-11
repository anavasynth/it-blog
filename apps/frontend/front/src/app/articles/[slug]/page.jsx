import Link from "next/link";

async function getArticleBySlug(slug) {

    const res = await fetch(
        `http://localhost:3000/api/proxy/articles/${slug}`,
        {
            method: "GET",
            cache: "no-store"
        }
    );

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
}

export default async function ArticlePage({ params }) {

    // Next.js 15 FIX
    const { slug } = await params;

    const article = await getArticleBySlug(slug);

    if (!article) {
        return (

            <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">

                <div className="max-w-4xl mx-auto">

                    <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                        Статтю не знайдено
                    </h1>

                    <Link
                        href="/"
                        className="text-blue-600 hover:underline"
                    >
                        Повернутись на головну
                    </Link>

                </div>

            </div>

        );
    }

    const date = article.published_at
        ? new Date(article.published_at).toLocaleDateString("uk-UA")
        : "Немає";

    return (

        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">

            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow p-6">

                {/* COVER */}

                {article.cover_url && (

                    <img
                        src={article.cover_url}
                        alt={article.title}
                        className="w-full h-[320px] object-cover rounded-lg mb-6"
                    />

                )}

                {/* TITLE */}

                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                    {article.title}
                </h1>

                {/* META */}

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex flex-wrap gap-4">

                    <span>

                        Автор:{" "}

                        {article.author_slug ? (

                            <Link
                                href={`/authors/${article.author_slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                {article.author_name}
                            </Link>

                        ) : "Немає"}

                    </span>

                    <span>

                        Категорія:{" "}

                        {article.category_slug ? (

                            <Link
                                href={`/categories/${article.category_slug}`}
                                className="text-blue-600 hover:underline"
                            >
                                {article.category_name}
                            </Link>

                        ) : "Немає"}

                    </span>

                    <span>
                        Дата: {date}
                    </span>

                    <span>
                        Перегляди: {article.views ?? 0}
                    </span>

                </div>

                {/* TAGS */}

                <div className="mb-6">

                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Теги
                    </div>

                    <div className="flex flex-wrap gap-2">

                        {article.tags?.length ? (

                            article.tags.map((tag) => (

                                <Link
                                    key={tag.slug}
                                    href={`/tags/${tag.slug}`}
                                    className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm hover:bg-zinc-300 dark:hover:bg-zinc-700"
                                >
                                    {tag.name}
                                </Link>

                            ))

                        ) : (

                            <span className="text-gray-500">
                                Немає
                            </span>

                        )}

                    </div>

                </div>

                {/* CONTENT */}

                <div className="text-base leading-7 text-gray-800 dark:text-gray-200 whitespace-pre-line">

                    {article.content || "Немає"}

                </div>

            </div>

        </div>

    );

}