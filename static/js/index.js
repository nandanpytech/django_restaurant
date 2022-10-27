const bar=document.querySelector(".Bars")
const navList=document.querySelector(".nav_list")
const special_cards=document.querySelector(".food_container")
bar.addEventListener("click",()=>{
    navList.classList.toggle("show_list")
})

const nav=document.querySelector(".nav")
const sticky=nav.offsetTop

window.onscroll = function() {myFunction()};

function myFunction(){
    if(window.pageYOffset>sticky){
        console.log(window.pageYOffset)
        console.log(sticky)
        nav.classList.add("sticky")
    }else{
        nav.classList.remove("sticky")
    }
}

let url_=fetch("https://restrajesh.herokuapp.com/")
.then(res=>res.json())
.then(data=>{
    const arr=[]
    data.map((ele)=>{
        if(ele.Best==true){
            arr.push(ele)
        }
    })
    fetch_the_data(arr)
})

function fetch_the_data(data){
    data.map(ele=>{
        const {id,firstname,ItemImg,Rating,Category,Itemprice}=ele
        special_cards.innerHTML+=`
        <div class="popular_item">
        <div class="popular_item_data">
            <article class="images_middle popular_img">
                <div id=${id}  class="popular_item-img"><a href="/search"> <img href="search" src=${ItemImg} alt=""></a></div>
            </article>
            <h2 class="popular_item-text">${firstname} <span>${Rating}<i class="fa-solid fa-star"></i></span></h2>
            <div class="rates">
              <p class="tags">${Category}</p>
              <div class="rate">₹${Itemprice} for one</div>
            </div>
        </div>
    </div>`
    })
}
