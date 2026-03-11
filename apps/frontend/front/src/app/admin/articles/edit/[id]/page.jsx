"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
    Save,
    ArrowLeft,
    FileText
} from "lucide-react";

export default function EditArticle() {

    const params = useParams();
    const router = useRouter();

    const id = params.id;

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        title: "",
        excerpt: "",
        content: "",
        cover_url: "",
        author_id: 1,
        category_id: 1,
        status: "draft",
        meta_title: "",
        meta_description: "",
        published_at: ""
    });

    function getToken() {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
    }

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function loadArticle() {

        try {

            const res = await fetch("/api/proxy/admin/articles", {
                headers: {
                    Authorization: `Bearer ${getToken()}`
                }
            });

            const data = await res.json();

            const article = data.find(a => a.id == id);

            if (!article) return;

            setForm({
                title: article.title || "",
                excerpt: article.excerpt || "",
                content: article.content || "",
                cover_url: article.cover_url || "",
                author_id: article.author_id || 1,
                category_id: article.category_id || 1,
                status: article.status || "draft",
                meta_title: article.meta_title || "",
                meta_description: article.meta_description || "",
                published_at: article.published_at
                    ? article.published_at.slice(0,16)
                    : ""
            });

        } catch (err) {

            console.error(err);

        }

    }

    async function updateArticle(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await fetch(`/api/proxy/admin/articles/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`
                },

                body: JSON.stringify({
                    ...form,
                    author_id: Number(form.author_id),
                    category_id: Number(form.category_id)
                })

            });

            router.push("/admin/articles");

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {
        loadArticle();
    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FileText size={22} />
                        Редагувати статтю
                    </h1>

                    <Link
                        href="/admin/articles"
                        className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >
                        <ArrowLeft size={18} />
                        Назад
                    </Link>

                </div>

                <div className="bg-white shadow rounded-xl p-8">

                    <form
                        onSubmit={updateArticle}
                        className="flex flex-col gap-6"
                    >

                        {/* TITLE */}

                        <div>

                            <label className="text-sm font-medium">
                                Назва
                            </label>

                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                            {!form.title && (
                                <p className="text-xs text-gray-400">
                                    немає назви
                                </p>
                            )}

                        </div>

                        {/* EXCERPT */}

                        <div>

                            <label className="text-sm font-medium">
                                Короткий опис
                            </label>

                            <textarea
                                name="excerpt"
                                value={form.excerpt}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* CONTENT */}

                        <div>

                            <label className="text-sm font-medium">
                                Контент
                            </label>

                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1 h-40"
                            />

                        </div>

                        {/* COVER */}

                        <div>

                            <label className="text-sm font-medium">
                                Cover URL
                            </label>

                            <input
                                name="cover_url"
                                value={form.cover_url}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* AUTHOR */}

                        <div>

                            <label className="text-sm font-medium">
                                Author ID
                            </label>

                            <input
                                name="author_id"
                                type="number"
                                value={form.author_id}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* CATEGORY */}

                        <div>

                            <label className="text-sm font-medium">
                                Category ID
                            </label>

                            <input
                                name="category_id"
                                type="number"
                                value={form.category_id}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* STATUS */}

                        <div>

                            <label className="text-sm font-medium">
                                Status
                            </label>

                            <select
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            >

                                <option value="draft">
                                    draft
                                </option>

                                <option value="published">
                                    published
                                </option>

                            </select>

                        </div>

                        {/* META TITLE */}

                        <div>

                            <label className="text-sm font-medium">
                                Meta title
                            </label>

                            <input
                                name="meta_title"
                                value={form.meta_title}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* META DESCRIPTION */}

                        <div>

                            <label className="text-sm font-medium">
                                Meta description
                            </label>

                            <textarea
                                name="meta_description"
                                value={form.meta_description}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* PUBLISHED */}

                        <div>

                            <label className="text-sm font-medium">
                                Published date
                            </label>

                            <input
                                type="datetime-local"
                                name="published_at"
                                value={form.published_at}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 mt-1"
                            />

                        </div>

                        {/* BUTTON */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
                        >

                            <Save size={18} />

                            {loading
                                ? "Оновлення..."
                                : "Оновити"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );

}