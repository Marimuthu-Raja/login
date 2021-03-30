import React, { Component } from 'react'
import { Segment,Header,Grid, Form, Button,Card, Divider} from 'semantic-ui-react'
import {teacherForms,teachers,studentForms,students, departments} from '../FireBase/Firbase'
import { firebaseLooper } from '../FireBase/FirebaseLooper'
import {Doughnut, Pie} from 'react-chartjs-2'
import {CalculateChart} from '../Tools/Tools'
// import { StuDeptCalc } from '../Tools/FormsCalculator'
export default class Dashboard extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             from_date:'',
             to_date:'',
             category:'',
             student:'',
             teacher:'',
             dept:'',
             studentData:[],
             teacherData:[],
             studentForm:[],
             teacherForm:[],
             TotalTeacherForms:null,
             totalStudentForms:null,
             acceptedStudentFormsCount:null,
             acceptedTeacherFormsCount:null,
             ReportData:{},
             depts:[],
             StudentReportData:{},
        }
    }
    
    componentDidMount(){

        studentForms.get().then(res=>{
            const studentForm = firebaseLooper(res)
            const totalStudentForms = studentForm.length
            this.setState({studentForm,totalStudentForms})
        })

        departments.get().then(res=>{
            const depts = firebaseLooper(res)
            this.setState({depts})
        })

        teacherForms.get().then(res=>{
            const teacherForm = firebaseLooper(res)
            const TotalTeacherForms = teacherForm.length
            this.setState({teacherForm,TotalTeacherForms})
        })

        teacherForms.where('accepted','==',true).get().then(res=>{
            const acceptedTeacherFormsCount = firebaseLooper(res).length
            
            teacherForms.where('pending','==',true).get().then(res=>{
                const pendingTeacherFormsCount = firebaseLooper(res).length
        
            teacherForms.where('rejected','==',true).get().then(res=>{
                const rejectedTeacherFormsCount = firebaseLooper(res).length
                const ReportData = CalculateChart(this.state.TotalTeacherForms,acceptedTeacherFormsCount,rejectedTeacherFormsCount,pendingTeacherFormsCount)
                console.log(ReportData)
                this.setState({ReportData,acceptedTeacherFormsCount,pendingTeacherFormsCount})
                
            })
    
        })

    })
    studentForms.where('accepted','==',true).get().then(res=>{
        const acceptedStudentFormsCount = firebaseLooper(res).length
        
        studentForms.where('pending','==',true).get().then(res=>{
            const pendingStudentFormsCount = firebaseLooper(res).length
    
            studentForms.where('rejected','==',true).get().then(res=>{
            const rejectedStudentFormsCount = firebaseLooper(res).length
            const StudentReportData = CalculateChart(this.state.totalStudentForms,acceptedStudentFormsCount,rejectedStudentFormsCount,pendingStudentFormsCount)
            console.log(StudentReportData)
            this.setState({StudentReportData,acceptedStudentFormsCount,pendingStudentFormsCount})
            
        })

    })

})

        
    }


    onChange = (e) =>{
        if(e.target.name === 'dept'){
            students.where('Dept','==',e.target.value).get().then(res=>{
                const studentData = firebaseLooper(res)
                this.setState({studentData})
            })

            teachers.where('Dept','==',e.target.value).get().then(res=>{
                const teacherData = firebaseLooper(res)
                this.setState({teacherData})
            })
        }
        this.setState({[e.target.name]:e.target.value})
    }

    StuDeptCalc = (from,to,student,Dept) => {
        const from_date = new Date(from)
        const to_date = new Date(to)
        if(student === 'all'){
            studentForms.where('Dept','==',Dept).get().then(res=>{
                const allStudentForms = firebaseLooper(res)
                const filteredForms = allStudentForms.filter(form => from_date <= new Date(form.req_date) && to_date >= new Date(form.req_date))
                const total = filteredForms.length
                const accepted = filteredForms.filter(form=> form.accepted === true).length
                const rejected = filteredForms.filter(form=> form.reject === true).length
                const pending = filteredForms.filter(form=> form.pending === true).length
                const StudentReportData = CalculateChart(total,accepted,rejected,pending)
                this.setState({StudentReportData})
                
            })
        }
        else{
            studentForms.where('RegNo','==',student).get().then(res=>{
                const allStudentForms = firebaseLooper(res)
                const filteredForms = allStudentForms.filter(form => from_date <= new Date(form.req_date) && to_date >= new Date(form.req_date))
                const total = filteredForms.length
                const accepted = filteredForms.filter(form=> form.accepted === true).length
                const rejected = filteredForms.filter(form=> form.reject === true).length
                const pending = filteredForms.filter(form=> form.pending === true).length
                const StudentReportData = CalculateChart(total,accepted,rejected,pending)
                this.setState({StudentReportData})

            })
        }
}

    TeachDeptCalc = (from,to,teacher,Dept) => {
        const from_date = new Date(from)
        console.log(from_date)
        const to_date = new Date(to)
        if(teacher === 'all'){
            teacherForms.where('Dept','==',Dept).get().then(res=>{
                const allTeacherForms = firebaseLooper(res)
                const filteredForms = allTeacherForms.filter(form => from_date <= new Date(form.affected_date) && to_date >= new Date(form.affected_date))
                const total = filteredForms.length
                const accepted = filteredForms.filter(form=> form.accepted === true).length
                const rejected = filteredForms.filter(form=> form.rejected === true).length
                const pending = filteredForms.filter(form=> form.pending === true).length
                const ReportData = CalculateChart(total,accepted,rejected,pending)
                this.setState({ReportData})
                
            })
        }
        else{
            teacherForms.where('Email','==',teacher).get().then(res=>{
                const allTeacherForms = firebaseLooper(res)
                const filteredForms = allTeacherForms.filter(form => from_date <= new Date(form.affected_date) && to_date >= new Date(form.affected_date))
                const total = filteredForms.length
                const accepted = filteredForms.filter(form=> form.accepted === true).length
                const rejected = filteredForms.filter(form=> form.rejected === true).length
                const pending = filteredForms.filter(form=> form.pending === true).length
                const ReportData = CalculateChart(total,accepted,rejected,pending)
                this.setState({ReportData})
                
            })

        }
    }



    ViewReport =  () => {
        const {from_date,to_date,student,teacher,dept} = this.state
        this.StuDeptCalc(from_date,to_date,student,dept)
        this.TeachDeptCalc(from_date,to_date,teacher,dept)
    }



    render() {
        const {from_date,to_date,category,ReportData,studentData,teacherData,StudentReportData,totalStudentForms,TotalTeacherForms,acceptedTeacherFormsCount,acceptedStudentFormsCount,depts} = this.state
        return (
            <>
                
                    <Segment style={{height:'93vh',overflow:'auto'}}>
                        <Header as='h2' color='teal' textAlign='center'>Admin DashBoard</Header>
                    <Grid style={{padding:"30px"}} >
                    <Grid.Column mobile={8} largeScreen={4} tablet={8} computer={4}>
                                    
                                    <Card>
                                    <Card.Content>
                                        <Card.Header>No of OD Forms Requested</Card.Header>
                                            <Card.Meta>Teachers</Card.Meta>
                                                <Card.Description>
                                                     <h3>{TotalTeacherForms}</h3>
                                                </Card.Description>
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                            <Grid.Column  mobile={8} largeScreen={4} tablet={8} computer={4}>
                    
                                    <Card>
                                    <Card.Content>
                                        <Card.Header>No of OD Forms Requested</Card.Header>
                                            <Card.Meta>Students</Card.Meta>
                                                <Card.Description>
                                                     <h3>{totalStudentForms}</h3>
                                                </Card.Description>
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                            <Grid.Column  mobile={8} largeScreen={4} tablet={8} computer={4}>
                    
                                    <Card>
                                    <Card.Content>
                                        <Card.Header>No of OD Forms Accepted</Card.Header>
                                            <Card.Meta>Teachers</Card.Meta>
                                                <Card.Description>
                                                     <h3>{acceptedTeacherFormsCount}</h3>
                                                </Card.Description>
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                            <Grid.Column  mobile={8} largeScreen={4} tablet={8} computer={4}>
                    
                                    <Card>
                                    <Card.Content>
                                    
                                        <Card.Header>No of OD Forms Accepted</Card.Header>
                                            <Card.Meta>Students</Card.Meta>
                                                <Card.Description>
                                                     <h3>{acceptedStudentFormsCount}</h3>
                                                </Card.Description>
                                    </Card.Content>

                                </Card>
                            </Grid.Column>
                    </Grid>
                    <Divider/>

                    <Grid style={{marginTop:"30px"}}>
                        <Grid.Column mobile={16} largeScreen={5} tablet={16} computer={5}>
                            <Segment raised>
                            <Form>
                                   <Form.Field>
                                       <label>Select Category</label>
                                       <select className='form-control' name='category' onChange={this.onChange}>
                                           <option disabled selected>Category</option>
                                           <option value='student'>Student</option>
                                           <option value='teacher'>Teacher</option>
                                           <option value='dept'>Department</option>
                                       </select>
                                   </Form.Field>

                                   
                                   {category === 'student'?
                                   <>
                                   <Form.Field>
                                       <label>Select Department</label>
                                       <select className='form-control' name='dept' onChange={this.onChange}>
                                           <option disabled selected>Select Department</option>
                                           {depts.map(dept=> <option value={dept.Dept}>{dept.Dept}</option>)}
                                       </select>
                                   </Form.Field>
                                    <Form.Field>
                                        <label>Select Student</label>
                                        <select className='form-control' name='student' onChange={this.onChange}>
                                            <option disabled selected>Select Student</option>
                                            <option value='all'>All Students</option>
                                            {studentData.map(student=> <option value={student.RegNo}>{student.Name}</option>)}
                                        </select>
                                    </Form.Field>
                                    </>
                                    :category === 'teacher'?
                                    <>
                                    <Form.Field>
                                       <label>Select Department</label>
                                       <select className='form-control' name='dept' onChange={this.onChange}>
                                           <option disabled selected>Select Department</option>
                                            {depts.map(dept=> <option value={dept.Dept}>{dept.Dept}</option>)}
                                       </select>
                                   </Form.Field>
                                    <Form.Field>
                                        <label>Select Teacher</label>
                                        <select className='form-control' name='teacher' onChange={this.onChange}>
                                            <option disabled selected>Select Teacher</option>
                                            <option value='all'>All Teachers</option>
                                            {teacherData.map(teacher=> <option value={teacher.Email}>{teacher.Name}</option>)}
                                        </select>
                                    </Form.Field></>:
                                    <>
                                     <Form.Field>
                                     <label>Select Department</label>
                                     <select className='form-control' name='dept' onChange={this.onChange}>
                                         <option disabled selected>Select Department</option>
                                            {depts.map(dept=> <option value={dept.Dept}>{dept.Dept}</option>)}
                                     </select>
                                    </Form.Field>
                                    <Form.Group widths={2}>
                                    <Form.Field>
                                        <label>Select Teacher</label>
                                        <select className='form-control' name='teacher' onChange={this.onChange}>
                                            <option disabled selected>Select Teacher</option>
                                            <option value='all'>All Teachers</option>
                                            {teacherData.map(teacher=> <option value={teacher.Email}>{teacher.Name}</option>)}
                                        </select>
                                        </Form.Field>
                                        <Form.Field>
                                        <label>Select Student</label>
                                        <select className='form-control' name='student' onChange={this.onChange}>
                                            <option disabled selected>Select Student</option>
                                                <option value='all'>All Students</option>
                                            {studentData.map(student=> <option value={student.RegNo}>{student.Name}</option>)}
                                        </select>
                                    </Form.Field>
                                 </Form.Group></>}
                                   <Form.Group widths={2}>
                                        <Form.Input type="date" label='From' name='from_date' value={from_date} required onChange={this.onChange}/>
                                        <Form.Input type="date" label='To' name='to_date'value={to_date} required onChange={this.onChange}/>
                                    </Form.Group>

                                    <div style={{textAlign:'center',padding:'20px'}}>
                                        <Button color='teal' size="large" onClick={this.ViewReport} fluid>View Report</Button>
                                    </div>
                                </Form>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column mobile={16} largeScreen={5} tablet={16} computer={5}>
                            <Segment raised>
                            <Header as='h2' color='teal' textAlign='center'>Teacher Forms</Header>
                                <Doughnut data={ReportData.data} options={ReportData.options}/>
                            </Segment>
                        </Grid.Column>

                        <Grid.Column mobile={16} largeScreen={5} tablet={16} computer={5}>
                            <Segment raised>
                            <Header as='h2' color='teal' textAlign='center'>Student Forms</Header>
                                <Pie data={StudentReportData.data} options={StudentReportData.options}/>
                            </Segment>
                        </Grid.Column>

                    </Grid>
                    </Segment>

            </>
        )
    }
}
