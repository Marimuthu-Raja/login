import React, { Component } from 'react'
import {Button,Container,Segment,Header,Grid} from 'semantic-ui-react'
import Record from '../Teacher/Records'
import {Alert} from '../Tools/Tools'
import {teacherForms,teachers} from '../FireBase/Firbase'
import { firebaseLooper } from '../FireBase/FirebaseLooper'

export default class SingleTeacherForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             teacherData:'',
        }
    }
    



    componentDidMount(){
        teachers.where('Email','==',`${this.props.form.Email}`).get().then(res=>{
            const teacherData = firebaseLooper(res)
            this.setState({teacherData:teacherData[0]})
        })
    }


    HandleSuccess = (form) =>{
        const odavailed = this.state.teacherData.odavailed+parseInt(form.req_days)
        teacherForms.doc(form.id).update({accepted:true,pending:false,odavailed})
        Alert("success","Success!","OD Form Accepted")
        this.props.formload()
    }

    HandleReject = (form) =>{
        teacherForms.doc(form.id).update({rejected:true,pending:false})
        Alert("warning","Form Rejected!")
        this.props.formload()
    }

    render() {
        const {form} = this.props
        return (
            <div>
                <Segment style={{height:'93vh',overflow:'auto'}}>
                            <Header as='h2' textAlign='center' color='teal'>
                               Application for On Duty 
                            </Header>
                    <Record form={form} availed={this.state.teacherData.odavailed}/>
                   
                        <Container>
                            <Segment raised>
                            <Grid columns={2}>
                                <Grid.Column>
                                    <Button color='teal' size="large" fluid onClick={()=>this.HandleSuccess(form)}>Accept</Button>
                                </Grid.Column>
                                <Grid.Column>
                                    <Button color='red' size="large" fluid onClick={()=>this.HandleReject(form)}>Reject</Button>
                                </Grid.Column>

                            </Grid>
                            </Segment>
                        </Container>
                    
                </Segment>
            </div>
        )
    }
}
