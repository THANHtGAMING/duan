"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

import { ISanpham } from "@/app/components/cautrucdata";
import ShowDetailSP from "@/app/components/showDetailSP";


export default function SP() {
  const params = useParams();
  const id = params.id as string;

  const [sp, setSp] = useState({} as ISanpham);
  const [spArr, setSpArr] = useState([] as ISanpham[]);

  // Lấy chi tiết sản phẩm
  useEffect(() => {
    fetch(`http://localhost:3000/api/sp/${id}`)
      .then((res) => res.json())
      .then((data) => setSp(data));
  }, [id]);

  // Lấy toàn bộ sản phẩm
  useEffect(() => {
    fetch(`http://localhost:3000/api/sanpham/`)
      .then((res) => res.json())
      .then((data) => setSpArr(data));
  }, []);

  // Sản phẩm liên quan: cùng loại với sản phẩm đang xem, loại bỏ chính nó
  const relatedProducts = spArr.filter(
    (p) => p.id_loai === sp.id_loai && p.id !== sp.id
  );

return (
  <>
    <Header />

    {/* Chi tiết sản phẩm */}
    <div className="max-w-[1330px] mx-auto flex flex-grow justify-start gap-10 mt-10">
      <ShowDetailSP sp={sp} />
    </div>

    {/* Sản phẩm liên quan */}
    <div className="max-w-[1350px] mx-auto mt-10">
      <h2 className="text-[27px] text-[#1B5A7D] font-bold font-sans mb-5">
        Sản phẩm liên quan
      </h2>

      <div className="grid grid-cols-4 gap-6">
        {relatedProducts.length > 0 ? (
          relatedProducts.slice(0, 4).map((item: ISanpham) => (
            <div
              key={item.id}
              className="border border-[#B6B6B6] rounded-2xl px-[14px] py-[22px] relative group overflow-hidden"
            >
              <a href="#">
                <img className="mx-auto" src={item.hinh} alt="" />
              </a>
              <h1 className="text-xl font-semibold text-[#003F62] whitespace-nowrap">
                {item.ten_sp}
              </h1>
              <h2 className="text-base text-[#4A4A4A] font-semibold my-5">
              {Number(item.gia).toLocaleString("vi")} VND
              </h2>

              {/* Nút thêm vào giỏ */}
              <div className="flex flex-grow justify-between items-center gap-2 absolute bottom-[-100px] group-hover:bottom-0 transition-all duration-300">
                <button className="px-7 py-4 bg-[#87BCD9] font-semibold  rounded-xl cursor-pointer text-base text-[#272727] font-sans">
                  Add to cart
                  <span className="px-2 py-1 ml-3 bg-[#EDA415] rounded-full text-white">
                    <i className="fa-regular fa-cart-shopping"></i>
                  </span>
                </button>
                <button className="px-6 py-4 bg-[#87BCD9] border rounded-3xl cursor-pointer ml-3">
                  <i className="fa-light fa-eye"></i>
                </button>
              </div>

              {/* Rating */}
              <div className="rating mt-4 text-black">
                <i className="fa-light fa-star mr-2"></i>
                <i className="fa-light fa-star mr-2"></i>
                <i className="fa-light fa-star mr-2"></i>
                <i className="fa-light fa-star mr-2"></i>
                <i className="fa-light fa-star mr-2"></i>
              </div>

              {/* Icon yêu thích */}
              <div className="absolute right-4 top-5 px-2 py-1 bg-[#B3D4E5] rounded-full">
                <i className="fa-light fa-heart"></i>
              </div>
            </div>
          ))
        ) : (
          <p>Không có sản phẩm liên quan.</p>
        )}
      </div>
    </div>

    <Footer />
  </>
)
}
