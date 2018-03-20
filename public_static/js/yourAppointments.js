$(()=>{
    let appointments=$('#appointments');
    $.get('/api/user/appointment',(appointArr)=>{
          for(let appointment of appointArr)
          {
              let app=$(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${appointment.name_of_patient}</h5>
                <small>with doctor ${appointment.doctorname}</small>
            </div>
            <p class="mb-1">AT ${appointment.time}</p>
        </a>`)
              appointments.prepend(app);
          }

    })
});