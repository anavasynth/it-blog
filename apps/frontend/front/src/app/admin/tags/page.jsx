"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminTags(){

    const [tags,setTags]=useState([]);

    function token(){
        return document.cookie.split("; ").find(r=>r.startsWith("token="))?.split("=")[1];
    }

    async function load(){

        const res=await fetch("/api/proxy/admin/tags",{
            headers:{Authorization:`Bearer ${token()}`}
        });

        setTags(await res.json());
    }

    async function del(id){

        await fetch(`/api/proxy/admin/tags/${id}`,{
            method:"DELETE",
            headers:{Authorization:`Bearer ${token()}`}
        });

        load();
    }

    useEffect(()=>{load()},[]);

    return(

        <div className="p-8">

            <div className="flex justify-between mb-6">

                <h1 className="text-2xl font-bold">Теги</h1>

                <Link
                    href="/admin/tags/create"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    + Створити
                </Link>

            </div>

            {tags.map(tag=>(

                <div key={tag.id} className="border p-4 mb-4 flex justify-between">

                    <span>{tag.name}</span>

                    <div className="flex gap-3">

                        <Link
                            href={`/admin/tags/edit/${tag.id}`}
                            className="text-blue-600"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={()=>del(tag.id)}
                            className="text-red-600"
                        >
                            Delete
                        </button>

                    </div>

                </div>

            ))}

        </div>

    );

}