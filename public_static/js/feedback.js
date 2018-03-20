$(()=>{
    var textbox = $("#feedback");
    var btn = $("#book");

    btn.click(()=>{
        textbox.val("");
    })
})