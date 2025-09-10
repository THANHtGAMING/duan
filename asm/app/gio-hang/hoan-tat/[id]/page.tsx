


"use client"
import { useEffect, useState } from "react"

import {  useParams, useRouter } from "next/navigation"

import { ICart } from "@/app/components/cautrucdata"
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function HoanTatPage() {
  const params = useParams()
    const id_dh = Number(params.id)
    const [donHang, setDonHang] = useState([] as ICart[]) 
     const router = useRouter()
    
useEffect(() => {
  const user = sessionStorage.getItem("user");

  if (!user) {
    alert("Bạn cần đăng nhập để xem đơn hàng");
    router.push("/dangnhap");
    return;
  }

  const email = sessionStorage.getItem("email") 
 
  
  fetch(`http://localhost:3000/api/luugiohang/${id_dh}?email=${encodeURIComponent(email!)}`)
    .then((res) => {
      if (res.status === 403) throw new Error("Bạn không thể xem đơn hàng này");
      return res.json();
    })
    .then((data) => setDonHang(data))
    .catch((err) => {
      alert(err.message);
      router.push("/");
    });
}, [id_dh]);
    const tongTien = donHang.reduce((tong, sp) => {
  return tong + (Number(sp.so_luong) * Number(sp.gia));
}, 0);
    return (
        <>
        <Header></Header>
  <div className="p-6 max-w-4xl mx-auto">
    <h1 className="text-3xl font-bold text-green-600 mb-6 text-center">🎉 Success!</h1>

    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700"> 🧾Product Detail</h2>
      </div>

      <table className="min-w-full text-sm text-gray-700">
        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
          <tr>
                <th className="px-4 py-3 text-left">Hình ảnh</th>
            <th className="px-4 py-3 text-left">Product</th>
            <th className="px-4 py-3 text-center">Quantity</th>
            <th className="px-4 py-3 text-right">Price</th>
            <th className="px-4 py-3 text-right">Subtotal</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {donHang.map((sp, i) => (
            <tr key={i} className="hover:bg-gray-50 transition">
             <td className="px-4 py-3"> <img className="w-[50px]" src={sp.hinh} alt="" /></td>
              <td className="px-4 py-3">{sp.ten_sp}</td>
              <td className="px-4 py-3 text-center">{sp.so_luong}</td>
              <td className="px-4 py-3 text-right">{Number(sp.gia).toLocaleString()} ₫</td>
              <td className="px-4 py-3 text-right">
                {(sp.so_luong * sp.gia).toLocaleString()} ₫
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-yellow-100 text-black font-bold text-base">
            <td colSpan={3} className="px-4 py-3 text-right">Total:</td>
            <td className="px-4 py-3 text-right">{tongTien.toLocaleString()} ₫</td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
  <Footer></Footer>
  </>
);
}
