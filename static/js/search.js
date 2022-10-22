const cards=document.querySelector(".special_cards")
var input=document.querySelector(".form-control")
var search=document.querySelector(".btn")
const drop_down=document.querySelector(".dropdown-content")
const price=document.querySelector(".price")
const category=document.querySelector(".category")
const category_items=document.querySelector(".category_items")
const added_items=document.querySelector(".add_items")
const close=document.querySelector(".close")
const item_to_add=document.getElementById("item_to_add")
const item_ul=document.querySelector(".item_ul")
const item_ul_main=document.querySelector(".item_ul_main")

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
    console.log("hoo")
    e.preventDefault()
    var search_name=input.value.slice(0,1).toUpperCase()+ input.value.slice(1)
    input.value="";
    search.disabled=true
    fetch_url(search_name,0)

})




//To fetch the data...
function fetch_url(search_name){
var url=fetch(`https://restrajesh.herokuapp.com/?format=json`)
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

// plus and minus for count '
var count=0;
function plus(){
    count++;
    document.querySelector(".count").innerText=count;
}
function minus(){
    if(count>0){
        count--;
    }
 
    document.querySelector(".count").innerText=count;
}

// popup
function order(ele){
    added_items.classList.add("show_add_items")
    const item_=ele.parentElement.parentElement.children[1].innerText;
    item_name=item_.split(/([0-9]+)/)
    item_to_add.innerHTML=item_name[0]
}

// close 
close.addEventListener("click",()=>{
    added_items.classList.remove("show_add_items")
})

// add category automaticaly from api
const key="Category"
var url=fetch(`https://restrajesh.herokuapp.com/?format=json`)
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
    const Url=fetch("https://restrajesh.herokuapp.com")
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