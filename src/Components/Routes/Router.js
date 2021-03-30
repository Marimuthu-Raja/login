import React, { Component } from 'react'
import {Route} from 'react-router-dom'
import Login from '../Auth/Login'
// import Odform from '../Form/Odform'
// import TeacherProfile from '../Teacher/Profile'
// import TeacherEditProfile from '../Teacher/EditProfile'
// import Records from '../Teacher/RecordList'
// import TeacherLogout from '../Teacher/Logout'
// import { teachersidebar,studentsidebar,adminsidebar,principalsidebar } from '../Tools/Tools'
// import Sidebar from '../Sidebar/Sidebar'
// import StudentProfile from '../Student/Profile'
// import StudentEditProfile from '../Student/EditProfile'
// import StudentRecords from '../Student/RecordList'
// import Studentodform from '../Student/Form'
// import StudentLogout from '../Student/Logout'
import Dashboard from '../Principal/Dashboard'
// import TeacherForms from '../Principal/Teacherforms'
// import StudentForms from '../Principal/StudenForm'
// import AddStudents from '../Admin/AddStudents'
// import AddTeachers from '../Admin/AddTeacher'
// import Manage from '../Admin/Manage'
export default class Router extends Component {
    render() {
        return (
            <div>
                <Route exact path='/' component={Login}/>
               
                <Route exact path='/dashboard'>
                        <Dashboard/>
                </Route>
            </div>
        )
    }
}
