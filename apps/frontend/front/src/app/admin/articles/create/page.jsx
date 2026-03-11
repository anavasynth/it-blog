"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import {
    Save,
    ArrowLeft,
    FileText
} from "lucide-react";

export default function CreateArticle() {

    const router = useRouter();

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

    const [loading, setLoading] = useState(false);

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

    async function createArticle(e) {

        e.preventDefault();

        try {

            setLoading(true);

            await fetch("/api/proxy/admin/articles", {

                method: "POST",

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

        } catch (error) {

            console.error(error);

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <div className="max-w-3xl mx-auto">

                <div className="flex justify-between items-center mb-8">

                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <FileText size={22} />
                        Створити статтю
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
                        onSubmit={createArticle}
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
                                placeholder="Назва статті"
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
                                placeholder="Короткий опис"
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
                                placeholder="Текст статті"
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
                                placeholder="/images/example.jpg"
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
                                ? "Створення..."
                                : "Створити"}

                        </button>

                    </form>

                </div>

            </div>

        </div>

    );
}