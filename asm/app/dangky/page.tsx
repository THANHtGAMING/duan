"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header"
import Footer from "../components/Footer"
export default function Logup() {
    const router = useRouter()
    const [ho_ten, setHT] = useState("");
    const [email, setEmail] = useState("");
    const [mat_khau, setpass1] = useState("");
    const [go_lai_mat_khau, setpass2] = useState("");
    const [thong_bao, setThongbao] = useState("");
    const [isSuccess, setisSuccess] = useState(false)

    // Trạng thái ẩn/hiện mật khẩu
    const [showPass1, setShowPass1] = useState(false)
    const [showPass2, setShowPass2] = useState(false)

    const handleDangky = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setTimeout(() => {
            setThongbao("");
        }, 5000)

        if (mat_khau != go_lai_mat_khau) {
            setThongbao("Hai mật khẩu không giống nhau")
            setisSuccess(false)
            return
        }

        const otp = {
            method: "post",
            body: JSON.stringify({ ho_ten, email, mat_khau, go_lai_mat_khau }),
            headers: { "Content-type": "application/json" }
        }

        fetch(`http://localhost:3000/api/dangky`, otp)
            .then(res => res.json())
            .then(data => {
                setThongbao(data.thong_bao)
                setisSuccess(data.thong_bao.toLowerCase().includes("thành công"))

                if (data.thong_bao.toLowerCase().includes("thành công")) {
                    setTimeout(() => {
                        router.push("/dangnhap")
                    }, 1500)
                }
            })
    }

    return (
        <>
        <Header></Header>
        <div className="w-[1440px] mx-auto bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mt-5">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Tạo tài khoản mới</h2>

            <form onSubmit={handleDangky} className="space-y-5">
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Họ và tên</label>
                    <input value={ho_ten} onChange={e => setHT(e.target.value)} type="text" name="name" placeholder="Nguyễn Văn A"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-black" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" name="email" placeholder="email@example.com"
                        className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-black" required />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Mật khẩu</label>
                    <div className="relative">
                        <input
                            value={mat_khau}
                            onChange={e => setpass1(e.target.value)}
                            type={showPass1 ? "text" : "password"}
                            name="password"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass1(!showPass1)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-600 hover:underline"
                        >
                            {showPass1 ? <i className="fa-regular fa-eye-slash"></i> :  <i className="fa-regular fa-eye"></i>}
                        </button>
                    </div>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-1">Xác nhận mật khẩu</label>
                    <div className="relative">
                        <input
                            value={go_lai_mat_khau}
                            onChange={e => setpass2(e.target.value)}
                            type={showPass2 ? "text" : "password"}
                            name="confirmPassword"
                            placeholder="••••••••"
                            className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 outline-none text-black"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPass2(!showPass2)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-purple-600 hover:underline"
                        >
                            {showPass2 ?   <i className="fa-regular fa-eye-slash"></i> :  <i className="fa-regular fa-eye"></i>}
                        </button>
                    </div>
                </div>

                <button type="submit"
                    className="w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition duration-300">
                    Đăng ký
                </button>

                <h1 className="text-center text-gray-500 mt-4">
                    Đã có tài khoản?
                    <a href="/login" className="text-purple-600 font-medium hover:underline"> Đăng nhập</a>
                </h1>

                {thong_bao && (
                    <div
                        className={`fixed bottom-10 right-10 text-white text-lg font-semibold px-6 py-3 rounded-xl shadow-lg transition-opacity duration-500 
                            ${isSuccess ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                        {thong_bao}
                    </div>
                )}
            </form>
        </div>
        <Footer></Footer>
        </>
    )
}
