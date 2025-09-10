"use client"
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";
import Header from "../components/Header"
import Footer from "../components/Footer"
export default function Login() {
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";
  const router = useRouter();

  const emailRef = useRef<HTMLInputElement>(null);
  const matkhauRef = useRef<HTMLInputElement>(null);
  const thongbaoRef = useRef<HTMLElement>(null);

  const [showPassword, setShowPassword] = useState(false); // 👈 trạng thái hiện/ẩn mật khẩu

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const mat_khau = matkhauRef.current?.value || "";

    if (email.trim() === "") {
      thongbaoRef.current!.innerHTML = "Chưa nhập email";
    
      thongbaoRef.current!.style.opacity = "1";
      emailRef.current!.focus();
      setTimeout(() => (thongbaoRef.current!.innerHTML = ""), 3000);
      return;
    }
    if (mat_khau.trim() === "") {
      thongbaoRef.current!.innerHTML = "Chưa nhập mật khẩu";
      thongbaoRef.current!.style.opacity = "1";
      matkhauRef.current!.focus();
      setTimeout(() => (thongbaoRef.current!.innerHTML = ""), 3000);
      return;
    }

    const otp = {
      method: "post",
      body: JSON.stringify({ email, mat_khau }),
      headers: { "Content-type": "application/json" },
    };

    fetch(`http://localhost:3000/api/dangnhap`, otp)
      .then((res) => res.json())
    .then((data) => {
    thongbaoRef.current!.innerHTML = data.thong_bao;

    if (!data.token) {
        // ❌ Không có token => tài khoản chưa kích hoạt, sai mật khẩu, v.v.
        return;
    }

    // ✅ Có token => lưu thông tin và chuyển hướng
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("user", JSON.stringify(data.info));
    sessionStorage.setItem("expiresIn", data.expiresIn);
    sessionStorage.setItem("email", data.info.email);

    setTimeout(() => {
        router.push(redirect);
    }, 1000);
})
  };

  return (
    <>
    <Header></Header>
      <div className="w-[1440px] mx-auto max-w-md bg-white p-8 rounded-2xl shadow-2xl mt-[100px]">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Đăng Nhập
        </h2>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              ref={emailRef}
              placeholder="nhapemail@abc.com"
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 placeholder: text-black"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Mật khẩu</label>
            <div className="relative">
              <input
                ref={matkhauRef}
                type={showPassword ? "text" : "password"} // 👈 toggle hiển thị
                placeholder="********"
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 pr-10 placeholder: text-black"
              />
              {/* Icon con mắt */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <i className="fa-regular fa-eye-slash"></i>
                ) : (
                  <i className="fa-regular fa-eye"></i>
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <Link
              className="text-purple-600 hover:underline"
              href={"/quenpass"}
            >
              Quên mật khẩu?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl transition duration-300 shadow-md"
          >
            Đăng Nhập
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            Bạn chưa có tài khoản?
            <Link
              href={"/dangky"}
              className="text-purple-600 font-medium hover:underline"
            >
              Đăng ký
            </Link>
          </p>
          <div className="fixed bottom-10 right-10 bg-green-500 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500">
            <b ref={thongbaoRef}></b>
          </div>
        </form>
      </div>
      <Footer></Footer>
    </>
  );
}
