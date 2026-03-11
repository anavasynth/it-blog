"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    Pencil,
    Trash2,
    Plus,
    User,
    Folder,
    ArrowLeft
} from "lucide-react";

export default function AdminArticles() {

    const router = useRouter();

    const [articles, setArticles] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const dialogRef = useRef(null);

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
            setArticles([]);

        }

    }

    function openDeleteModal(id) {

        setDeleteId(id);
        dialogRef.current?.showModal();

    }

    function closeModal() {

        dialogRef.current?.close();
        setDeleteId(null);

    }

    async function confirmDelete() {

        const token = getToken();

        try {

            setDeleteLoading(true);

            await fetch(`/api/proxy/admin/articles/${deleteId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            closeModal();
            loadArticles();

        } catch (err) {

            console.error(err);

        } finally {

            setDeleteLoading(false);

        }

    }

    useEffect(() => {
        loadArticles();
    }, []);

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            {/* HEADER */}

            <div className="flex justify-between items-center mb-10">

                <div className="flex items-center gap-4">

                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-600 hover:text-black"
                    >

                        <ArrowLeft size={18} />

                        Назад

                    </button>

                    <h1 className="text-3xl font-bold text-gray-800">
                        Admin Articles
                    </h1>

                </div>

                <Link
                    href="/admin/articles/create"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg transition"
                >

                    <Plus size={18} />

                    Створити статтю

                </Link>

            </div>

            {articles.length === 0 && (

                <div className="text-gray-500 text-lg">
                    Немає статей
                </div>

            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                {articles.map(article => (

                    <div
                        key={article.id}
                        className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden flex flex-col"
                    >

                        {/* COVER */}

                        {article.cover ? (

                            <img
                                src={article.cover}
                                alt={article.title || "cover"}
                                className="h-52 w-full object-cover"
                            />

                        ) : (

                            <div className="h-52 flex items-center justify-center bg-gray-200 text-gray-500">
                                Немає зображення
                            </div>

                        )}

                        <div className="p-5 flex flex-col flex-grow">

                            {/* TITLE */}

                            <h2 className="text-xl font-semibold mb-2 text-gray-800">

                                {article.title
                                    ? article.title
                                    : "Немає назви"}

                            </h2>

                            {/* CONTENT */}

                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">

                                {article.content
                                    ? article.content
                                    : "Немає опису"}

                            </p>

                            {/* META */}

                            <div className="text-sm text-gray-500 mb-6 space-y-1">

                                <div className="flex items-center gap-2">

                                    <User size={16} />

                                    <span>
                                        {article.author || "Немає автора"}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <Folder size={16} />

                                    <span>
                                        {article.category || "Немає категорії"}
                                    </span>

                                </div>

                            </div>

                            {/* ACTIONS */}

                            <div className="flex gap-3 mt-auto">

                                <Link
                                    href={`/admin/articles/edit/${article.id}`}
                                    className="flex items-center justify-center gap-2 flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
                                >

                                    <Pencil size={16} />

                                    Редагувати

                                </Link>

                                <button
                                    onClick={() => openDeleteModal(article.id)}
                                    className="flex items-center justify-center gap-2 flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                                >

                                    <Trash2 size={16} />

                                    Видалити

                                </button>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            {/* DELETE MODAL */}

            <dialog
                ref={dialogRef}
                className="rounded-xl p-0 backdrop:bg-black/40"
            >

                <div className="w-[420px] p-6">

                    <h2 className="text-lg font-semibold mb-2">
                        Видалити статтю
                    </h2>

                    <p className="text-gray-600 text-sm mb-6">
                        Ви впевнені що хочете видалити статтю? Цю дію неможливо скасувати.
                    </p>

                    <div className="flex justify-end gap-3">

                        <button
                            onClick={closeModal}
                            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                        >
                            Скасувати
                        </button>

                        <button
                            onClick={confirmDelete}
                            disabled={deleteLoading}
                            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                        >

                            <Trash2 size={16} />

                            {deleteLoading
                                ? "Видалення..."
                                : "Видалити"}

                        </button>

                    </div>

                </div>

            </dialog>

        </div>

    );

}