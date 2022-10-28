var i=document.querySelectorAll(".Plus_")
i.forEach(element => {
    element.addEventListener("click",()=>{
        console.log("hii")
    })
});
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