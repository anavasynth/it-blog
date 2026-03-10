async function getArticleBySlug(slug) {
    const res = await fetch(`http://localhost:3000/api/proxy/articles/${slug}`, {
        method: "GET",
        cache: "no-store",
    });

    if (res.status === 404) {
        return null;
    }

    if (!res.ok) {
        throw new Error(`Request failed: ${res.status}`);
    }

    return res.json();
}

export default async function ArticlePage({ params }) {
    const { slug } = await params;
    const article = await getArticleBySlug(slug);

    if (!article) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-black dark:text-white mb-4">
                        Статтю не знайдено
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Такої статті зараз немає.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black p-8">
            <div className="max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
                {article.cover ? (
                    <img
                        src={article.cover}
                        alt={article.title}
                        className="w-full h-[320px] object-cover rounded-lg mb-6"
                    />
                ) : null}

                <h1 className="text-4xl font-bold text-black dark:text-white mb-4">
                    {article.title}
                </h1>

                <div className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex flex-wrap gap-3">
                    <span>Автор: {article.author || "Немає"}</span>
                    <span>Категорія: {article.category || "Немає"}</span>
                    <span>Дата: {article.date || "Немає"}</span>
                    <span>Перегляди: {article.views ?? "Немає"}</span>
                </div>

                <div className="mb-6">
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                        Теги
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {article.tags?.length ? (
                            article.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 rounded-full bg-zinc-200 dark:bg-zinc-800 text-sm text-black dark:text-white"
                                >
                                    {tag}
                                </span>
                            ))
                        ) : (
                            <span className="text-gray-500 dark:text-gray-400">Немає</span>
                        )}
                    </div>
                </div>

                <div className="text-base leading-7 text-gray-800 dark:text-gray-200 whitespace-pre-line">
                    {article.content || "Немає"}
                </div>
            </div>
        </div>
    );
}
