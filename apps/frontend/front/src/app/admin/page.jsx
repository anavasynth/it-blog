"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {

    const router = useRouter();

    function logout() {

        // видаляємо токен
        document.cookie =
            "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Lax";

        // редірект на сторінку логіну
        router.replace("/auth/login");

    }

    return (

        <div className="p-8">

            <div className="flex justify-between items-center mb-6">

                <h1 className="text-3xl font-bold">
                    Admin Panel
                </h1>

                <button
                    onClick={logout}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>

            </div>

            <div className="flex flex-col gap-4">

                <Link
                    href="/admin/articles"
                    className="text-blue-600 hover:underline"
                >
                    Статті
                </Link>

                <Link
                    href="/admin/categories"
                    className="text-blue-600 hover:underline"
                >
                    Категорії
                </Link>

                <Link
                    href="/admin/tags"
                    className="text-blue-600 hover:underline"
                >
                    Теги
                </Link>

                <Link
                    href="/admin/authors"
                    className="text-blue-600 hover:underline"
                >
                    Автори
                </Link>

                <Link
                    href="/admin/upload"
                    className="text-blue-600 hover:underline"
                >
                    Upload Image
                </Link>

            </div>

        </div>

    );

}