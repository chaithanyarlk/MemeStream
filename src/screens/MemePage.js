import React, {useState} from 'react';
import { Col, Row, Form, Button, InputGroup, FormControl, Alert} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Ellipsis } from 'react-bootstrap/esm/PageItem';
import './MemePage.css';

class MemePage extends React.Component{
     state = {
          name:"None",
          url:"None",
          caption:"None",
          response:"None",
          list:[]
     }
     componentDidMount(){
          console.log(this.state.name);
               fetch('https://chaithanyarlk115.pythonanywhere.com/memes/?format=json')
               .then(res => res.json())
               .then((data)=>{
                    console.log(data)
                    this.setState(
                         {
                              list:data
                         }
                    );
               }).catch(console.log)
          
     }
     
     searchHandler = (event)=>{
          event.preventDefault();
          var id = event.target.id.value;
          console.log(id);
          fetch('https://chaithanyarlk115.pythonanywhere.com/memes/'+id+'/?format=json')
          .then(res => res.json())
          .then((data)=>{
               console.log("This is data");
               console.log(data);
               this.setState({
                    response:data
               });
          try{
               console.log(this.state.response[0].id);
               if(this.state.response[0].id == id){
                    alert("ID is present Check json for details!");
                    window.location.reload();
               }
          }
          catch(ex){
               alert("User with ID is not present!");
               window.location.reload();
          }
          }).catch(console.log)
          
     }
     nameHandler= (event)=>{
          this.setState({
               name:event.target.value
          });
     }
     urlHandler= (event)=>{
          this.setState({
               url:event.target.value
          });
     }
     captionHandler= (event)=>{
          this.setState({
               caption:event.target.value
          });
     }
     submitHandler = (event)=>{
          event.preventDefault();
          const requestOptions ={
               method:'POST',
               headers: { 'Content-Type': 'application/json' },
          }
          console.log('https://chaithanyarlk115.pythonanywhere.com/memes/?name='+this.state.name+'&url='+this.state.url+'&caption='+this.state.caption)
          fetch('https://chaithanyarlk115.pythonanywhere.com/memes/?name='+this.state.name+'&url='+this.state.url+'&caption='+this.state.caption,requestOptions)
          .then((res) => {
               if(res.ok){
                    alert("The Meme was uploaded to Meme Stream!");
                    window.location.reload();
               }
               else{
                    alert("Failed and status code is "+res.status);
                    window.location.reload();
               }
          })
          
     }
     patchHandler = (event)=>
     {    event.preventDefault();
          const requestOptions ={
               method:'PATCH',
               headers: { 'Content-Type': 'application/json' },
          }
          if (event.target.id.value == "")
               alert("Id is not provided!");
          else{
               var id = event.target.id.value;
               var caption = event.target.caption.value;
               var url = event.target.url.value;
               console.log(id)
               console.log(caption)
               console.log(url)
               if(caption=="" && url!=""){
                    fetch('https://chaithanyarlk115.pythonanywhere.com/memes/'+id+'/?&url='+url,requestOptions).then(
                         (response)=>{
                              if(response.ok){
                                   alert("Accepted!");
                                   window.location.reload();
                              }
                         }
                    ).catch(console.log)
               }
               if(caption!="" && url=="")
               {
                    fetch('https://chaithanyarlk115.pythonanywhere.com/memes/'+id+'/?&caption='+caption,requestOptions).then(
                         (response)=>{
                              if(response.ok){
                                   alert("Accepted!");
                                   window.location.reload();
                              }
                              else{
                                  alert("Failed and status Code is "+response.status);
                                  window.location.reload();
                              }
                         }
                    ).catch(console.log)
               }
               if(caption!=""&&url!=""){
                    fetch('https://chaithanyarlk115.pythonanywhere.com/memes/'+id+'/?caption='+caption+'&url='+url,requestOptions).then(
                         (response)=>{
                              if(response.ok){
                                   alert("Accepted!");
                                   window.location.reload();
                              }
                              else{
                                  alert("Failed and status Code is "+response.status);
                                  window.location.reload();
                              }
                         }
                    ).catch(console.log)
               }

          }

     }
     render(){
          return(
               <Container className='mt-3 mb-5 pl-5 mx-auto shadow container'>
                    <Container className='mx-auto col-10'>
                    <h1>Meme Stream</h1>
                    <Form className='mt-5  center' onSubmit={this.submitHandler}>
                         <Form.Group >
                              <Form.Label>Meme Owner</Form.Label>
                              <Form.Control  type='text' required={true} placeholder='Enter your full name' onChange={this.nameHandler}></Form.Control>
                         </Form.Group>
                         <Form.Group >
                              <Form.Label>Caption</Form.Label>
                              <Form.Control  type='text' placeholder='Be creative with caption' required={true} onChange={this.captionHandler}></Form.Control>
                         </Form.Group>
                         <Form.Group className='mx-auto'>
                              <Form.Label>Meme URL</Form.Label>
                         <InputGroup >
                              <FormControl
                                   className='input'
                                   placeholder="Enter URL of your meme here"
                                   onChange={this.urlHandler}
                                   required={true}
                              />
                              <InputGroup.Append>
                                   <Button variant="outline-secondary" className='submit' type='submit'>Submit Meme</Button>
                              </InputGroup.Append>
                         </InputGroup>
                         </Form.Group>
                    </Form>
                    </Container>
                    <Container className='vertical-scroll'>
                         <ul>
                              {this.state.list.map((meme)=>(
                                   <li key = {meme.id}>
                                        <Container className = 'mt-5 mb-5 shadow-lg col-8'>
                                             <Col>
                                                  <Row>
                                                       <h3 className='col-5'>{meme.name}</h3>
                                                       <p className='col-3 time' style={{textOverflow:Ellipsis}}>{meme.timestamp}</p>
                                                  </Row>
                                                  <Row>
                                                       <p className='ml-3'>{meme.caption}</p>
                                                  </Row>
                                                  <Container>
                                                       <img src={meme.url} className='image' alt= 'Image'/>
                                                  </Container>
                                             </Col>

                                        </Container>
                                   </li>
                              ))}
                         </ul>
                    </Container>
                    <Container className='mx-auto col-10'>
                    <h4>PATCH Request Can be sent here ...</h4>
                    <Form className='mt-5  center' onSubmit={this.patchHandler}>
                         <Form.Group >
                              <Form.Label>ID</Form.Label>
                              <Form.Control  type='text' required={true} placeholder='Enter your id' name='id'></Form.Control>
                         </Form.Group>
                         <Form.Group >
                              <Form.Label>Caption</Form.Label>
                              <Form.Control  type='text' placeholder='Be creative with caption' name='caption'></Form.Control>
                         </Form.Group>
                         <Form.Group className='mx-auto'>
                              <Form.Label>Meme URL</Form.Label>
                         <InputGroup >
                              <FormControl
                                   className='input'
                                   placeholder="Enter URL of your meme here"
                                   name = 'url'
                              />
                              <InputGroup.Append>
                                   <Button variant="outline-secondary" className='submit' type='submit'>Patch</Button>
                              </InputGroup.Append>
                         </InputGroup>
                         </Form.Group>
                    </Form>
                    </Container>
                    <Container className='mx-auto col-10'>
                    <h4>Search here ...</h4>
                    <Form className='mt-5  center' onSubmit={this.searchHandler}>
                         <Form.Group className='mx-auto'>
                              <Form.Label>ID</Form.Label>
                         <InputGroup >
                              <FormControl
                                   className='input'
                                   placeholder="Enter ID here"
                                   name = 'id'
                                   required={true}
                              />
                              <InputGroup.Append>
                                   <Button variant="outline-secondary" className='submit' type='submit'>Search</Button>
                              </InputGroup.Append>
                         </InputGroup>
                         </Form.Group>
                    </Form>
                    </Container>
                    <Container>
                    
                    </Container>
               </Container>
          );
     }
}
export default MemePage;