"use client";

import { useState } from "react";

export default function Upload(){

    const[file,setFile]=useState(null);

    function token(){
        return document.cookie.split("; ").find(r=>r.startsWith("token="))?.split("=")[1];
    }

    async function upload(e){

        e.preventDefault();

        const form=new FormData();
        form.append("file",file);

        const res=await fetch("/api/proxy/admin/upload",{
            method:"POST",
            headers:{Authorization:`Bearer ${token()}`},
            body:form
        });

        const data=await res.json();

        alert("Uploaded: "+data.url);

    }

    return(

        <div className="p-8">

            <h1 className="text-2xl font-bold mb-6">
                Upload cover
            </h1>

            <form
                onSubmit={upload}
                className="flex flex-col gap-4"
            >

                <input
                    type="file"
                    onChange={e=>setFile(e.target.files[0])}
                />

                <button className="bg-blue-600 text-white p-2 rounded">
                    Upload
                </button>

            </form>

        </div>

    );

}