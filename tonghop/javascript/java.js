function showNotification(className, content) {
    document.getElementById("Notification").classList.add(className)
    document.getElementById("contentNotification").innerHTML= content
    setTimeout(() => {
        document.getElementById("Notification").classList.remove(className)
        document.getElementById("contentNotification").innerHTML= ''
    }, 3000);
}
function checkUser() {
    const user =[
        {
            account:"admin",
            password: "tuan"
        },
        {
            account: "admin1",
            password:"tuan"
        }
    ];
    let account =document.getElementById("account").value
    let password =document.getElementById("password").value
    if (account && password) {
        const check = user.some(value => value.account ===account && value.password ===password)
        if (check) {
            window.location.replace("dashboard.html")
            localStorage.setItem("tokenLogin", account)
        } else {
            showNotification("alert-danger" , "Wrong account or password")
        }
    } else {
        showNotification("alert-danger" , "Enter account or password")
    }
}
function checkLogin() {
    const check = localStorage.getItem("tokenLogin") && localStorage.getItem("tokenLogin")
    if (check) {
        window.location.replace("dashboard.html")
    } else {
        window.location.replace("login.html")
    }
}
function render() {
    const accountName =  localStorage.getItem("tokenLogin") && localStorage.getItem("tokenLogin")
  if (accountName) {
    document.getElementById("accountName").innerText = accountName
renderProduct()
  } else {
window.location.replace("login.html")
  }
}
function checkLogout(){
    localStorage.removeItem("tokenLogin")
    window.location.replace("login.html")
}
function showImage() {
 if (document.getElementById("image").value) {
    const image = document.getElementById("image").files.item(0).name
    document.getElementById("showImage").innerHTML=`<img src="img/${image}" alt="" width="200">`
 } else {
    document.getElementById("showImage").innerHTML=``
 }
}
 async function addProduct(){
    const image = document.getElementById("image").value ? document.getElementById("image").files.item(0).name: ''
    const catelory= document.getElementById("catelory").value
    const name = document.getElementById("name").value
    const price = document.getElementById("price").value
    if(image && catelory && name && price){
    try {
      await axios.post("http://localhost:3310/sanpham",{
        image:image,
        catelory:catelory,
        name:name,
        price:price
      })
    } catch (error) {
        console.log(error);
    }

    } else {
        showNotification("alert-danger" ,"Vui long them san pham")
    }
}
async function fetchProduct(){
    try {
        return await axios.get("http://localhost:3310/sanpham")
    } catch (error) {
        console.log(error);
    }
}
async function renderProduct() {
    fetchProduct().then(data=>{
        let product =""
        data.data.map(value =>   {
            product +=` <tr>
            <td scope="col">${value.id}</td>
            <td scope="col">${value.name}</td>
            <td scope="col"><img src="img/${value.image}" width="200 alt=""></td>
            <td scope="col">${value.catelory}</td>
            <td scope="col">${value.price}</td>
            <th scope="col"><button type="button" class="btn btn-warning">Edit</button>
            <button type="button" class="btn btn-danger">Delete</button></th>
     
          </tr>`
          document.getElementById("content").innerHTML =product
        })
    })
}