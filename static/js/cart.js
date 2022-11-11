$(document).ready(function(){
    $(".Plus_").click(function() {
         $(this).parent().children().eq(1).html(function(i, val) {
            let _qty=parseInt($(this).parent().children().eq(1).text())+1
            $.ajax({
                url: '/changes',
                type: 'GET',
                data: {
                    changed_qty:parseInt($(this).parent().children().eq(1).text())+1,
                    changed_name:$(this).parent().parent().prevAll().first().children().eq(1).children().eq(0).text()
                },
               
            });
            $.ajax({
                url: '/search',
                type: 'GET',
                
               
            });
            return +val+1;
          });
    })
    $(".Minus_").click(function() {
         $(this).parent().children().eq(1).html(function(i, val) { 
            $.ajax({
                url: '/changes',
                type: 'GET',
                data: {
                    changed_qty:parseInt($(this).parent().children().eq(1).text())-1,
                    changed_name:$(this).parent().parent().prevAll().first().children().eq(1).children().eq(0).text()
                },
            });
            return val-1;
         });
    })
})

const a=document.querySelectorAll(".Plus_")
a.forEach(e => {
    e.addEventListener("click",()=>{
       setTimeout(() => {
            window.location.href="/cart"
       }, 100);
    })
});

const b=document.querySelectorAll(".Minus_")
b.forEach(e => {
    e.addEventListener("click",()=>{
        setTimeout(() => {
             window.location.href="/cart"
        }, 100);
     })
});