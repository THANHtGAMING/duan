"use client"
import { useEffect, useState } from "react";
import { ISanpham } from "./components/cautrucdata";
import Show1SP from "./components/show1sp";
import Header from "./components/Header";
import Footer from "./components/Footer";
export default  function Home() {
  const [sp_hot, gansp_hot] = useState([] as ISanpham[])
  const [currentPage, setcurrentPage] = useState(1);
  
  const producsPerpage =4
  useEffect (() =>{
      fetch (`http://localhost:3000/api/sphot/16`)
     .then(res => res.json())
     .then(data => gansp_hot(data ))
  },[])
  const start = (currentPage -1) * producsPerpage
  const end = start + producsPerpage
  const currentProducts = sp_hot.slice(start, end)
  const tongtrang = Math.ceil(sp_hot.length / producsPerpage)
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
  
  return (
    <>
    <Header></Header>
    <div className="w-[1440px] mx-auto">
      <div className="flex flex-row justify-around py-[60px] ">
        <div className="mt-[100px]">
          <h1 className="font-bold text-2xl text-[#1B5A7D] text-5xl text-sans mb-7">Canon <br/> camera</h1>
          <a className="py-4 px-7 bg-[#EDA415] text-white font-semibold text-base rounded-3xl" href="">Cửa hàng</a>
          <a className="border border-[#316887] py-4 px-7 text-[#316887] font-semibold text-base rounded-3xl ml-3"
            href="">Xem thêm</a>
        </div>
        <div>
          <a href=""><img className="block max-w-full" src="/product.png" alt=""/></a>
        </div>
      </div>
    </div>
    <div className="w-[1350px] mx-auto mt-[20px]">
      <div className="flex flex row p-10">
        <div className="font-bold text-[#1B5A7D] text-2xl text-sans">Sản phẩm phổ biến</div>
        <div className="flex-grow text-right mt-1 ">
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] "
            href="">Cameras</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Laptops</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Tablets</a>
          <a className="border border-[#003F62] px-8 py-1 rounded-3xl font-semibold text-base text-[#1B5A7D] ml-2"
            href="">Mouse</a>
        </div>
      </div>
    </div>
      <div className="w-[1330px] mx-auto flex flex-row flex-wrap  items-center justify-between   ">
       {currentProducts.map((sp:ISanpham) => <Show1SP key={sp.id} sp={sp}/> )}
   </div>
     <div className="w-[1330px] mx-auto mt-6 flex justify-center space-x-2">
      {pageButtons}
    </div>
<Footer></Footer>
    </>
 

     
 
    
    
  )
}