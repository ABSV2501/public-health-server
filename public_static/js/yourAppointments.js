$(()=>{
    let appointments=$('#appointments');
    $.get('/api/user/appointment',(appointments)=>{
          for(let appointment of appointments)
          {
              let app=$(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">Appointment</h5>
                <small>with doctor ${appointment.doctorname}</small>
            </div>
            <p class="mb-1">AT ${appointment.time}</p>
        </a>`)
              appointments.prepend(app);
          }

    })
});