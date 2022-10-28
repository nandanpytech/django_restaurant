const cards=document.querySelector(".special_cards")
var input=document.querySelector(".form-control")
var search=document.querySelector(".btn")
const drop_down=document.querySelector(".dropdown-content")
const price=document.querySelector(".price")
const category=document.querySelector(".category")
const category_items=document.querySelector(".category_items")
const added_items=document.querySelector(".add_items")
const add_item=document.querySelector(".add_item")
const add_item_name=document.querySelector(".add_item_name i")
const close=document.querySelector(".close")
const item_to_add=document.getElementById("item_to_add")
const item_ul=document.querySelector(".item_ul")
const item_ul_main=document.querySelector(".item_ul_main")
const cart=document.querySelector(".Cart_btn")
const badge=document.querySelector(".badge")
const total_amount=document.querySelector(".total_amount")
const count_in_box=document.querySelector(".count")


search.disabled=true
input.addEventListener("input",(e)=>{
    if(input.value.length!=0){
        search.disabled=false
    }else{
        search.disabled=true
    }
})

//Runs after hit the "search" box
search.addEventListener("click",(e)=>{
    e.preventDefault()
    var search_name=input.value.slice(0,1).toUpperCase()+ input.value.slice(1)
    input.value="";
    search.disabled=true
    fetch_url(search_name,0)

})




//To fetch the data...
function fetch_url(search_name){
var url=fetch("https://secret-shore-09422.herokuapp.com/https://restrajesh.herokuapp.com",{
  method: 'GET',
  headers: {
    "Content-type":"application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
})
.then(res=> res.json())
.then(data=>{
    if(data==null){
        cards.innerHTML=`<h1>No result found</h1>`
    }else{
        const arr=[]
        data.map(ele=>{
            if(ele.firstname.startsWith(`${search_name}`) || ele.Category.includes(`${search_name}`)){
                arr.push(ele)
            }
        })
        fetch_data(arr)
    }
  
})

}

// To display the fetched data...
function fetch_data(arr){
    let card="";
    arr.map(element=>{
        const {id,firstname,ItemImg,Rating,Category,Itemprice}=element
        card+=`
        <div class="popular_item">
        <div class="popular_item_data">
            <article class="images_middle popular_img">
                <div id=${id} onclick=order(this) class="popular_item-img"> <img src="${ItemImg}" alt=""></div>
            </article>
            <h2 class="popular_item-text">${firstname} <span>${Rating}<i class="fa-solid fa-star"></i></span></h2>
            <div class="rates">
              <p class="tags">${Category}</p>
              <div class="rate">₹${Itemprice} for one</div>
            </div>
        </div>
    </div>`
    })
    cards.innerHTML=card
}



//Price dropdown
price.addEventListener("click",()=>{
    drop_down.classList.toggle("show_price")
})

//category button
category.addEventListener("click",()=>{
    category_items.classList.toggle("showprice")
})

let initial_price;
let exact_price;
var count;
// popup
function order(ele){
    added_items.classList.add("show_add_items")
    let main_div=ele.parentElement.parentElement
    const item_=main_div.children[1].innerText;
    item_name=item_.split(/([0-9]+)/)
    item_to_add.innerHTML=item_name[0]

    target_one=main_div.children[2].children[1]
    total_amount.innerHTML=target_one.innerHTML

    run_loop()
}

function run_loop(){
    initial_price=Number(total_amount.innerHTML.split(" ")[0].slice(1));
    exact_price=initial_price;
    count=1;
    document.querySelector(".count").innerText=count;
}

// plus and minus for count'

function plus(){
    count++;
    document.querySelector(".count").innerText=count;

    exact_price+=initial_price;
    total_amount.innerHTML=`₹${Number(exact_price)}`
    
}
function minus(){
    if(count>0){
        count--;
    }
    if(exact_price-initial_price>=0){
        exact_price-=initial_price
        total_amount.innerHTML=`₹${Number(exact_price)}`
    }
   

    document.querySelector(".count").innerText=count;
}



// close 
close.addEventListener("click",()=>{
    added_items.classList.remove("show_add_items")
})

// add category automaticaly from api
const key="Category"
let urll=fetch("https://secret-shore-09422.herokuapp.com/https://restrajesh.herokuapp.com",{
  method: 'GET',
  headers: {
    "Content-type":"application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
})
.then(res=>res.json())
.then(data=>{
    const unique=[...new Map(data.map(item=>[item[key],item]))];
    render_list(unique)
})


function render_list(unique){
    unique.map(e=>{
        item_ul.innerHTML+=`<li class="item-1">${e[0]}</li>`
        item_ul_main.innerHTML+=`<li class="item-1">${e[0]}</li>`
    })
    const item=document.querySelectorAll(".item-1")
    //Apply onclick to all List_items
    item.forEach(e => {
        e.setAttribute("onclick","clicked(this)")
    });
}



//Runs after clicking the list items
function clicked(e){
   fetch_url(e.innerHTML)
}


//sort according to price
function sorted(ele){
    let initial=ele.id;
    let final=Number(initial)+100;
    let Url=fetch("https://secret-shore-09422.herokuapp.com/https://restrajesh.herokuapp.com",{
  method: 'GET',
  headers: {
    "Content-type":"application/json; charset=UTF-8",
    "Access-Control-Allow-Origin": "*",
  },
})
    .then(res=>res.json())
    .then(data=>{
        let arr3=[];
        data.map(ele=>{
            if(ele.Itemprice>=initial && ele.Itemprice<=final){
               arr3.push(ele)
            }
        })
        fetch_data(arr3)
    })
}

//Bouncing cart button
cart_value=Number(badge.innerText)
cart.style.animationPlayState=cart_value?'running':' paused'



add_item.addEventListener("click",()=>{
    add_item_name.click()
    cart_value=Number(badge.innerText)
    badge.innerText=cart_value+1
    cart.style.animationPlayState=Number(badge.innerText)?'running':' paused'
})



//jquery
$(document).ready(function(){
    $(".add_item").click(function(){
        $.ajax({
            url:'/add_item',
            data:{
                item:$(".count").text(),
                prices:$(".total_amount").text(),
                Item_Name:$(".item_to_add").text()
            },
            success:function(response){
                $(".count").text(response.seconds)
                
            }
        })
      
        
    })

})
