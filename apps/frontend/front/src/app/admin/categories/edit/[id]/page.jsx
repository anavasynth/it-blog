"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditCategory() {

    const params = useParams();
    const router = useRouter();

    const id = params.id;

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

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

        const category = data.find(c => c.id == id);

        setName(category.name);
        setDescription(category.description);

    }

    async function updateCategory(e) {

        e.preventDefault();

        await fetch(`/api/proxy/admin/categories/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getToken()}`
            },

            body: JSON.stringify({
                name,
                description
            })

        });

        router.push("/admin/categories");

    }

    useEffect(() => {
        loadCategories();
    }, []);

    return (

        <div className="p-8 max-w-xl">

            <h1 className="text-2xl font-bold mb-6">
                Редагувати категорію
            </h1>

            <form
                onSubmit={updateCategory}
                className="flex flex-col gap-4"
            >

                <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border p-2"
                />

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white p-2 rounded"
                >
                    Оновити
                </button>

            </form>

        </div>

    );
}