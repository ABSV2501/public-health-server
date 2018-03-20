$(()=>{
    $(".form_datetime").datetimepicker({
        format: "dd MM yyyy - hh:ii"
    });
    $('#invalid').css('display','none');
    $('#book').click(()=>{
        $.post('/api/user/appointment/new',{
            doctorname:$('#nameOfDoctor').val(),
            name:$('#nameOfPatient').val(),
            time:$('#time').val(),
        },(data)=>{
            if(data.message==="invalid")
            {
                $('#invalid').css('display','block');
            }
            else if(data.message === "valid"){
                window.location = "/yourAppointments.html"
            }
        })
    })
})