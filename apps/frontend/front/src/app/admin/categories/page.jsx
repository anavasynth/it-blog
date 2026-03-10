"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminCategories() {

    const [categories, setCategories] = useState([]);

    function getToken() {
        return document.cookie
            .split("; ")
            .find(row => row.startsWith("token="))
            ?.split("=")[1];
    }

    async function loadCategories() {

        const res = await fetch("/api/proxy/admin/categories", {
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        const data = await res.json();
        setCategories(data);

    }

    async function deleteCategory(id) {

        await fetch(`/api/proxy/admin/categories/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getToken()}`
            }
        });

        loadCategories();
    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (

        <div className="p-8">

            <div className="flex justify-between mb-6">

                <h1 className="text-2xl font-bold">
                    Категорії
                </h1>

                <Link
                    href="/admin/categories/create"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Створити
                </Link>

            </div>

            {categories.map(category => (

                <div
                    key={category.id}
                    className="border p-4 mb-4 rounded flex justify-between"
                >

                    <div>

                        <h2 className="font-semibold">
                            {category.name}
                        </h2>

                        <p className="text-gray-500">
                            {category.description}
                        </p>

                    </div>

                    <div className="flex gap-3">

                        <Link
                            href={`/admin/categories/edit/${category.id}`}
                            className="text-blue-600"
                        >
                            Редагувати
                        </Link>

                        <button
                            onClick={() => deleteCategory(category.id)}
                            className="text-red-600"
                        >
                            Видалити
                        </button>

                    </div>

                </div>

            ))}

        </div>

    );
}