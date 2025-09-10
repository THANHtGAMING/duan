
"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function Doipass() {

    const [email, setEmail] = useState('');
    const [pass_old, setPassold] = useState("")
      const [pass_new1, setPass1] = useState("")
  const [pass_new2, setPass2] = useState("")
  const [thong_bao, setThongbao] = useState("")
  const [token, setToken] = useState("");
  const router = useRouter();
   setTimeout(() => {
        setThongbao("")
    }, 5000);
  useEffect (() => {
    if(sessionStorage.getItem("token") === null){
        alert("Bạn chưa đăng nhập")
        router.push("/dangnhap")
    }
    setToken(sessionStorage.getItem("token") || "") ;
    setEmail (sessionStorage.getItem("email") ||"");
  }, [])
  const handleChangePass =(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    if (pass_old === "") {
        setThongbao("Vui lòng nhập mật khẩu hiện tại"); 
        return;
    }
    if (pass_new1 ==="" && pass_new1 != pass_new2) {
        setThongbao("Hai mật khẩu không giống nhau");
        return;
    }
    const otp = {
        method:"post",
             headers:{"Content-type" :"application/json",'Authorization': `Bearer ${token}`},
        body :JSON.stringify({pass_old, pass_new1, pass_new2}),
   
    }
    try {
        fetch(`http://localhost:3000/api/doipass`, otp)
        .then(res => res.json())
        .then(data =>{
            if (data.thong_bao ==="Đã cập nhật") {
                setThongbao("Đã cập nhật mật khẩu")
                setTimeout (() =>{
                    router.push("/")
                },3000)
            }
        })
    } catch (error) {
        console.log(error);
        
    }
  }
    return (
        <>
        <Header></Header>
        <div className="bg-white p-8 rounded-2xl shadow-lg w-[1440px] mx-auto max-w-md">
    <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Đổi Mật Khẩu</h2>

    <form onSubmit={handleChangePass} className="space-y-5">
  <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" >
         Email:
        </label>
        <input
        value={email}
         onChange={(e) =>{setEmail(e.target.value)}}
          type="email"
          id="currentPassword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder: text-black"
          placeholder="Nhập mật khẩu hiện tại"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" >
          Mật khẩu hiện tại
        </label>
        <input
        value={pass_old}
         onChange={(e) =>{setPassold(e.target.value)}}
       
          type="password"
          id="currentPassword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder: text-black"
          placeholder="Nhập mật khẩu hiện tại"
        />
         
      </div>

  
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" >
          Mật khẩu mới
        </label>
        <input
        value={pass_new1}
        onChange={(e) =>{setPass1(e.target.value)}}
          type="password"
          id="newPassword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder: text-black"
          placeholder="Nhập mật khẩu mới"
        />
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1" >
          Xác nhận mật khẩu mới
        </label>
        <input
        value={pass_new2}
         onChange={(e) =>{setPass2(e.target.value)}}
          type="password"
          id="confirmPassword"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder: text-black"
          placeholder="Nhập lại mật khẩu mới"
        />
      </div>

    
      <div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 "
        >
          Đổi mật khẩu
        </button>
          {thong_bao && (
  <p className="text-red-600 text-center font-medium">{thong_bao}</p>
)}
      </div>
    </form>
  </div>
  <Footer></Footer>
  </>
    )
}