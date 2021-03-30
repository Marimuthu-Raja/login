import React, { Component } from 'react'
import { Card , Container, Segment, Image, Button, Header } from 'semantic-ui-react'
import SingleStudentForm from './SingleStudentForm'
import {studentForms} from '../FireBase/Firbase'
import { firebaseLooper } from '../FireBase/FirebaseLooper'
export default class StudenForm extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             renderform:false,
             form:[],
             allforms:[],
        }
    }
    
    componentDidMount(){
        studentForms.get().then(res=>{
            const allforms = firebaseLooper(res)
            this.setState({allforms})
        })

        
    }

    renderform = (form) =>{
       this.setState({renderform:!this.state.renderform,form})
       this.componentDidMount()
    }


    render() {
        const {renderform,form,allforms} = this.state
        return (
            <>
                {
                renderform ?
                <SingleStudentForm formload={this.renderform} form={form} />
                :
                <>
                    <Segment style={{height:'93vh',overflow:'auto'}}>
                        <Header as='h2' color='teal' textAlign='center'>Requested OD Forms - Students</Header>

                            <Container style={{marginTop:"30px"}}>
                                <Segment raised style={{minHeight:"700px"}}>
                                <Card.Group>
                                    {allforms.map(form=> (form.accepted === false && form.rejected === false) &&
                                    <Card>
                                    <Card.Content style={{padding:"30px"}}>
                                        <Image
                                        floated='right'
                                        size='mini'
                                        src='https://react.semantic-ui.com/images/wireframe/square-image.png'
                                        />
                                        <Card.Header>{form.Name}</Card.Header>
                                            <Card.Meta>Request of OD</Card.Meta>
                                                <Card.Description>
                                                    {form.Name} wants On Duty for {form.purpose}
                                                </Card.Description>
                                    </Card.Content>

                                    <Card.Content extra >
                                        <Button inverted fluid color='violet' onClick={()=>this.renderform(form)} >
                                            View Form
                                        </Button>
                                    </Card.Content>
                                </Card>
                                )}
                            </Card.Group>
                            </Segment>
                        </Container>
                    </Segment>
                    </>
                }
            </>
        )
    }
}
