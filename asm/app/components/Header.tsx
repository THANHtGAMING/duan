
"use client"

import { useEffect, useState } from "react";
import { ISanpham, ILoai } from "../components/cautrucdata";
import Link from "next/link";




export default function Header() {

const [user, setUser] = useState<{ ho_ten: string; vai_tro: number } | null>(null);

  const [tu_khoa, setTukhoa] = useState("");
  const [dsSP, setDsSP] = useState([] as ISanpham[])
  const page = 1
   const [ds_loai, setds_Iloai] = useState ([] as ILoai[])
   const [id_trongloai, setidtrong_Loai] =useState([] as ISanpham[])


 const handleLogout = () => {
    sessionStorage.clear();
    setUser(null);
     window.location.reload();     
  };

   useEffect(() => {
  const sessionUser = sessionStorage.getItem("user");
  if (sessionUser && sessionUser !== "undefined") {
    try {
      setUser(JSON.parse(sessionUser));
    } catch (error) {
      console.error("Lỗi parse user:", error);
      setUser(null);
    }
  }
}, []);
  useEffect(() => {
  if (id_trongloai && typeof id_trongloai === "number") {
    fetch(`http://localhost:3000/api/sptrongloai/${id_trongloai}`)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => setidtrong_Loai(data))
      .catch(err => console.error("Lỗi fetch:", err));
  }
}, [id_trongloai]);

   //
  useEffect (() =>{
  fetch (`http://localhost:3000/api/loai/`)
  .then( res => res.json())
  .then(data => setds_Iloai(data))  //  const loai:ILoai  = kq_loai as ILoai;
  },[])
//
  useEffect(() => {
    setTimeout(() => {
      if (tu_khoa) {
        fetch(`http://localhost:3000/api/timkiem/${tu_khoa}/${page}`)
          .then(res => res.json())
          .then(data => setDsSP(data))
      } else {
        setDsSP([])
      }
    }, 300)

  }, [tu_khoa])

  return (
    <>
      <div className=" w-[1520px] mx-auto flex flex-row mx-auto  px-[100px] py-4 justify-between  ">
        <div className="font-sans font-nomal text-sm text-[#292D32]">Need help? Call us: (+98) 0234 456 789</div>
        <div>
          <i className="fa-light fa-location-dot text-[#292D32] "></i> <span className="mx-4 text-[#292D32]">Ourstore</span>
          <i className="fa-light fa-truck text-[#292D32]"></i> <span className="mx-4 text-[#292D32]">Track your order</span>
        </div>
      </div><div className="w-full bg-[#003F62]  py-8">
        <div className=" w-[1330px] mx-auto flex flex-row justify-between items-center  gap-[9vw]">
          <div className=""><a href=""><img src="/logo 1 (1).png" alt="" /></a></div>
          <div className="relative">
            <input value={tu_khoa} onChange={(e) => setTukhoa(e.target.value)} className=" bg-white w-[438px] p-4 rounded-3xl placeholder: font-semibold text-[#292D32] pl-7"
              placeholder="Tìm kiếm thứ gì đó" type="text" />
            <ul className="absolute bg-white w-[230px] group-hover:bottom-[-70px] z-9999 ">
              {dsSP.map((sp: ISanpham) => (
                <li key={sp.id} className=" hover:bg-[#003F62] hover:text-white flex flex-row justify-center items-center gap-1 mb-2">
                  <> <div><a href=""><img className="w-[50px] object-cover" src={sp.hinh} alt="" /></a></div>
                    <div onClick={() => setTukhoa("")}><Link className=" text-black hover:text-white  " href={`/sp/${sp.id}`}>{sp.ten_sp}</Link> </div>
                  </>

                </li>
              ))}
            </ul>
            <button className="absolute text-white px-8 py-4 font-semibold rounded-3xl bg-[#EDA415] right-0 ">Tìm kiếm</button>
          </div>
     <div className="flex-grow text-right text-white relative-group">
  {!user ? (
    <Link href="/dangnhap">
      <i className="fa-light fa-user"></i> Đăng nhập
    </Link>
  ) : (
    <div className="relative inline-block group">
      {/* Trigger */}
      <div className="cursor-pointer">
        <i className="fa-light fa-user"></i> {user.ho_ten.trim().split(" ").pop()}
      </div>

      {/* Dropdown menu */}
     <div className="absolute right-0 z-30 hidden group-hover:block bg-white text-black rounded shadow-lg min-w-[150px]">
  {user?.vai_tro === 1 && (
    <Link
      className="block w-full text-left px-4 py-2 hover:bg-gray-200"
      href="/admin"
    >
      Trang Admin
    </Link>
  )}
  <Link
    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
    href="/doipass"
  >
    Đổi pass
  </Link>
 
  <button
    onClick={handleLogout}
    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
  >
    Thoát
  </button>
</div>
    </div>
  )}

  {/* Các nút khác */}
  <a className="ml-[30px]" href="">
    <i className="fa-light fa-heart"></i>{" "}
    <span className="bg-[#EDA415] rounded-full px-2 mr-[5px]">0</span> Yêu thích
  </a>
  <Link href="/gio-hang">
    <i className="fa-light fa-cart-shopping ml-2"></i>{" "}
    <span className="bg-[#EDA415] rounded-full px-2 mx-[5px]">0</span> Giỏ Hàng
  </Link>
</div>
  
  
        </div>
      </div>
      <div className="w-full    bg-[#F4F4F4]">
        <div className="w-[1340px] mx-auto flex flex-row justify-between items-center  gap-[8vw]">
          <div className="bg-[#EDA415] p-7 text-white font-semibold  font-sans text-base "> Browse categories <i
            className="fa-light fa-chevron-down ml-2"></i></div>
          <div>
            <ul className="flex flex-row gap-x-4 font-bold  text-base text-[#3A3A3A]">
              <li><Link href={"/"}>Trang chủ <i className="fa-light fa-chevron-down"></i></Link></li>
     <li className="relative group list-none">
  <div className="cursor-pointer px-4" >
    <p className="flex items-center gap-1">
      Danh mục <i className="fa-light fa-chevron-down"></i>
    </p>
  </div>

  <ul className="absolute hidden group-hover:block top-full left-0  w-44 bg-white border rounded shadow-lg z-10">
    {ds_loai.map((ds: ILoai)=>(
       <li key={ds.id} className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer">


        <Link   className=" text-black " href={`/sptrongloai/${ds.id}`}>{ds.ten_loai}</Link>
       </li>
    ))}

  </ul>
</li>


              <li><Link href={"/tin"}>Báo</Link></li>
              <li><a href=''>Trang <i className="fa-light fa-chevron-down"></i></a></li>
              <li><a href=''>Về chúng tôi</a></li>
            </ul>
          </div>
          <div className=" text-right font-bold text-base text-[#003F62]">30 Ngày Hoàn Trả</div>
        </div>
      </div>


    </>
  )
}