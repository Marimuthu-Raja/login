import Swal from 'sweetalert2'


export const Alert = (icon,title,text) =>{
    Swal.fire({
        icon,
        title,
        text,
    })
}

export const teachersidebar = [
    {
        name:'Profile',
        icon:'user',
        to:'/teacherprofile'
    },
    {
        name:'Form',
        icon:'wpforms',
        to:'/od-form'
    },
    {
        name:'Records',
        icon:'unordered list',
        to:'/Records'
    },
    {
        name:'Log Out',
        icon:'log out',
        to:'/teacherlogout'
    }
]

export const studentsidebar = [
    {
        name:'Profile',
        icon:'user',
        to:'/studentprofile'
    },
    {
        name:'Form',
        icon:'wpforms',
        to:'/student-od-form'
    },
    {
        name:'Records',
        icon:'unordered list',
        to:'/studentRecords'
    },
    {
        name:'Log Out',
        icon:'log out',
        to:'/studentlogout'
    }
]

export const principalsidebar = [
    {
        name:'Dashboard',
        icon:'tv',
        to:'/dashboard'
    },
    {
        name:'Student Forms',
        icon:'student',
        to:'/student-forms'
    },
    {
        name:'Teacher Forms',
        icon:'user',
        to:'/teacher-forms'
    },
    {
        name:'Log Out',
        icon:'log out',
        to:'/studentlogout'
    }
]
export const adminsidebar = [
    {
        name:'Add Student',
        icon:'student',
        to:'/add-students'
    },
    {
        name:'Add Teacher',
        icon:'user',
        to:'/add-teachers'
    },
    {
        name:'Manage',
        icon:'dashboard',
        to:'/add-dept'
    },
    {
        name:'Log Out',
        icon:'log out',
        to:'/studentlogout'
    }
]


export const CalculateChart = (total,accepted,rejected,pending) => {
    const data= { 
        labels: [
            "Total",
           "Accepted",
           "Rejected",
           "Pending",

       ],
       datasets: [
           {
               data: [total,accepted,rejected,pending],
               borderWidth: 1,
               backgroundColor: [
                   'rgb(255,165,0,0.5)',
                   'rgba(38, 211, 211,0.5)',
                   'rgba(247, 7, 55, 0.5)',
                   'rgba(236,242,63,0.5)',

               ],
               borderColor:  [
                   'rgb(255,165,0,0.80)',
                   'rgba(38, 211, 211,0.80)',
                   'rgba(247, 7, 55, 0.80)',
                   'rgba(236,242,63,0.80)',

               ],
               hoverBackgroundColor: [
                   'rgb(255,165,0,0.80)',
                   'rgba(38, 211, 211,0.80)',
                   'rgba(247, 7, 55, 0.80)',
                   'rgba(236,242,63,0.80)',

               ],
       
           }],
           
   }

   const options = {
    legend: {
        position:'right',
        padding:20,
        labels: {
            fontSize:15,
            fontColor:"black",
            fontWeight:'bold'
        }
    }
   }
   return {data,options}
}