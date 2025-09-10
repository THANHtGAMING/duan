import { createSlice } from "@reduxjs/toolkit"; // hàm tạo slice
 import { current } from "@reduxjs/toolkit"; //lấy giá trị hiện tại trong store
import { ISanpham , ICart } from "../components/cautrucdata";
export const cartSlice = createSlice({
    name : 'cart',
    initialState : {listSP:[] as ICart[], order:{}}, //giá trị hiện lại
    reducers :{ // hàm reducer là hàm sử lí action từ ui gửi lên và trả lại một state mới 
        themSP: (state, params ) => { // state là một object ở trong state có nhiều object khác VD: user, sanpham,..
            const sp = params.payload as ISanpham;
            const index = state.listSP.findIndex((s :ICart) => s.id === sp.id )
            if (index >=0 ) state.listSP[index].so_luong++
                else{
                    const c:ICart ={id:sp.id, ten_sp:sp.ten_sp,so_luong:1, gia:sp.gia_km, hinh:sp.hinh}
                    state.listSP.push(c)
                }
            console.log(`đã thêm sản phẩm vào store`, current(state).listSP);
            
        },
      suaSL: (state, params ) => {
        const id: number = Number(params.payload[0])
        const so_luong:number = Number(params.payload[1]) 
        const index = state.listSP.findIndex( s => s.id   === id)
        if ( index !== -1)state.listSP[index].so_luong = so_luong


      },
      xoaSP: (state, params ) => {
        const id:number = Number(params.payload);
        const index = state.listSP.findIndex((s: ICart) => s.id === id)
        if (index !== -1 ) state.listSP.splice(index, 1)
            console.log("đã xóa sản phẩm", params);
            
        
      },
           xoaGH: (state ) => {
            state.listSP.length =0
            state.listSP =[];
            console.log("đã xóa giỏ hàng");
            
         },
    },
});
export const {themSP, xoaGH, xoaSP, suaSL } = cartSlice.actions
export default cartSlice.reducer