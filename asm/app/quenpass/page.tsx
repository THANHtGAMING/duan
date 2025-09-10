"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function LostPass() {
    const [email, setEmail] = useState("");
    const [thong_bao, setThong_bao] = useState('')
    const [isSuccess, setIsSuccess] = useState(false);
    const router= useRouter();
     async function handleSubmit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
             setTimeout (() =>{
        setThong_bao("" );
    },5000)
       try {
    const res = await fetch(`http://localhost:3000/api/quenpass`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
    });

    const data = await res.json();

    if (!res.ok) {
        setThong_bao(data?.thong_bao || "Lỗi server");
           setIsSuccess(false); // ❌ Lỗi
    } else {
        setThong_bao(data.thong_bao);
          setIsSuccess(true); // ✅ Thành công
        setTimeout(() => {
            router.push("/dangnhap");
        }, 3000);
    }

} catch (err) {
   
        setThong_bao("Emai khong ton tai." + err );
         setIsSuccess(false);
       
  
}
     }
     return (
        <>
        <Header></Header>
      <form
  onSubmit={handleSubmit}
  className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 mx-auto mt-[100px]"
>
  <h2 className=" text-black text-2xl font-bold text-center py-3 rounded-lg mb-6">
    Quên mật khẩu
  </h2>

  {/* Email Input */}
  <div className="mb-5">
    <label className="block text-gray-700 font-medium mb-2">Email</label>
    <input
      type="email"
      className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-black"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="nhapemail@abc.com"
    />
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-lg transition duration-300"
  >
    Gửi mật khẩu mới
  </button>

  {/* Thông báo */}
  {thong_bao && (
    <div
      className={`fixed bottom-10 right-10 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500 
        ${isSuccess ? "bg-green-500" : "bg-red-500"}`}
    >
      {thong_bao}
    </div>
  )}
</form>
<Footer></Footer>
        </>
     )
}