$(()=>{
    let doctors=$('#doctors');
    $.get('/api/doctor/all',(doctors)=>{
        for(let doctor of doctors)
        {
            let dc=$(`<a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
            <div class="d-flex w-100 justify-content-between">
                <h5 class="mb-1">${doctor.name}</h5>
                <small>${doctor.qualification}, ${doctor.specialisation}</small>
            </div>
            <p class="mb-1">fees: ${doctor.fees}<br> experience:${doctor.experience} </p>
           
        </a>`);
            doctors.prepend(dc);
        }

    })
});