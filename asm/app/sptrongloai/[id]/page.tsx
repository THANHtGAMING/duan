
'use client'


import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {  ISanpham, ILoai } from "@/app/components/cautrucdata";
import Show1SP from "@/app/components/show1sp";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default  function SPtrongloai( ) {
    const spPerpage = 8
     const [loai, setLoai] = useState([] as ILoai[]);
    const params = useParams();
 const id_loai = params.id;
 const [sp_arr, gan_sp] = useState ([] as ISanpham[])
 const [currentPage, setcurrentPage] = useState(1)
 useEffect(() =>{
     fetch (`http://localhost:3000/api/sptrongloai/${id_loai}`)
     .then(res => res.json())
     .then(data => gan_sp(data))
     fetch(`http://localhost:3000/api/loai`)
      .then(res => res.json())
      .then(data => setLoai(data));
 },[id_loai])

 const start = (currentPage -1) * spPerpage
  const end = start + spPerpage
    const sp_hientai = sp_arr.slice(start, end)
 const tongtrang = Math.ceil(sp_arr.length / spPerpage)
   const pageButtons = [];
for (let i = 1; i <= tongtrang; i++) {
  pageButtons.push(
    <button
      key={i}
      onClick={() => setcurrentPage(i)}
      className={`px-4 py-2 border rounded-md ${
        currentPage === i
          ? "bg-blue-600 text-white"
          : "bg-white text-blue-600 border-blue-600"
      }`}
    >
      {i}
    </button>
  );
}
const tenLoai = loai.find(l => String(l.id) === String(id_loai))?.ten_loai || "";
    return (
        <>
   <Header></Header>
   <div className="w-[1440px] mx-[300px] font-bold text-[#1B5A7D] text-2xl text-sans mt-2">Sản phẩm loại: {tenLoai}</div>
       <div className="w-[1330px] mx-auto flex flex-row flex-wrap  items-center justify-between   ">
              {sp_hientai.map((sp:ISanpham) => <Show1SP key={sp.id} sp={sp}/> )}
          </div>
            <div className="w-[1330px] mx-auto mt-6 flex justify-center space-x-2">
      {pageButtons}
    </div>
    <Footer></Footer>
       </>
 
    )
}