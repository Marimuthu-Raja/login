import React, { Component } from 'react'
import './Login.css'
import {  Button, Form, Grid, Header, Segment, Image } from 'semantic-ui-react';
// import Logo from '../logo.png'
import {Alert} from '../Tools/Tools'
import {students,teachers} from '../FireBase/Firbase'
import {firebaseLooper} from '../FireBase/FirebaseLooper'

export default class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             admin:'admin',
             apassword:'password',
             principal:'principal',
             ppassword:'principal#123',
             username:'',
             password:'',
             studentData:[],
             teacherData:[],
        }
    }

    componentDidMount(){
        students.get().then(res=>{
            const studentData = firebaseLooper(res)
            this.setState({studentData})
        })

        teachers.get().then(res=>{
            const teacherData = firebaseLooper(res)
            this.setState({teacherData})
        })

    }
    
    HandleInput = (e) => {
        this.setState({[e.target.name]:e.target.value})
    }

    login = () =>{
        const {username,password,admin,apassword,studentData,teacherData,principal,ppassword} = this.state

        const isStudent = studentData.find(student=> student.RegNo === username && student.DOB === password)

        const isTeacher = teacherData.find(teacher=> teacher.Email === username && teacher.password === password)

        if(username === '' || password === ''){
            Alert('error','Oops!','Please Fill out All Fields')
        }
        else if(isStudent !== undefined){
            localStorage.setItem('studentid',isStudent.id)
            this.props.history.push('/student-od-form')
        }
        
        else if(isTeacher !== undefined){
            localStorage.setItem('teacherid',isTeacher.id)
            this.props.history.push('/od-form')
        }

        else if(username === principal && password === ppassword){
            this.props.history.push('/dashboard')
        }
        else if(username === admin && password === apassword){
            this.props.history.push('/add-students')
        }
        else{
            Alert('error','Oops!','Check Username and Password')
        }

    }
    render() {
        return (
            <div className="background">
                <Grid textAlign='center' style={{ height: '101.5vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                {/* <Image src={Logo}/> */}
                
                <Form size='large'>
                    <Segment raised>
                    <Header as='h2' color='teal' textAlign='center'>
                   Log-in 
               </Header>
                    <Form.Input fluid icon='user' iconPosition='left' name='username' placeholder='E-mail address' onChange={this.HandleInput} />
                    <Form.Input
                        fluid
                        icon='lock'
                        iconPosition='left'
                        placeholder='Password'
                        type='text'
                        name='password'
                        onChange={this.HandleInput}
                    />

                    <Button color='teal' fluid size='large' onClick={this.login}>
                        Login
                    </Button>
                    </Segment>
                </Form>
                </Grid.Column>
            </Grid>
            </div>
        )
    }
}
