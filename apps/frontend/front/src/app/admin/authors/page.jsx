"use client";

import { useEffect,useState } from "react";

export default function AdminAuthors(){

    const [authors,setAuthors]=useState([]);

    function token(){
        return document.cookie.split("; ").find(r=>r.startsWith("token="))?.split("=")[1];
    }

    async function load(){

        const res=await fetch("/api/proxy/admin/authors",{
            headers:{Authorization:`Bearer ${token()}`}
        });

        setAuthors(await res.json());

    }

    useEffect(()=>{load()},[]);

    return(

        <div className="p-8">

            <h1 className="text-2xl font-bold mb-6">
                Authors
            </h1>

            {authors.map(a=>(

                <div key={a.id} className="border p-4 mb-4 flex gap-4 items-center">

                    <img
                        src={a.avatar}
                        className="w-12 h-12 rounded-full"
                    />

                    <div>

                        <h2 className="font-semibold">
                            {a.name}
                        </h2>

                        <p className="text-gray-500">
                            {a.bio}
                        </p>

                    </div>

                </div>

            ))}

        </div>

    );

}