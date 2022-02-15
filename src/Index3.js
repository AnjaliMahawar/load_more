import logo from './logo.svg';
import './App.css';
//  { Named Import }
import { Button, Form, Table } from 'react-bootstrap';
import { useState } from 'react';
const config = require('./config.json')
// Functional COmpoent

function Index3() {
  //1. State/ Hook Variables
  const [student,setStudent] = useState([]);//Empty Array
  const [student,setStudent] = useState({
    data:[]
  });//Empty Array

  //2. Functions defination
  let getStudents2 = (e)=>{
    console.log(student);
  }
  let getStudents = (e)=>{// e = event //ES6 Fat arrow functions
    console.log(config.base_url);
    console.log('good morning')
    //Alway wrap the api calling code inside trycatch block
    try {
        //Call the api
        // Fetch API
        //AXIOS

        //What is the api
        fetch(`${config.base_url}/api/students`).then((data)=>{
        //Fetch API with Promise Chain
        fetch(`${config.base_url}/api/friends`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          console.log(data.data);
          console.log(data);

          //Set karne se pahle
          //console.log('before set',student);
          //not set the student data in student hook variable
          setStudent(data.data);
          setStudent(data);
          //Set karne ke baad data kya hai
          //console.log('after set',student);


          //array.map(function(currentValue, index, arr));

        }).catch((err)=>{
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }
  }
  //3. Return statement JSX
  return (
    <>
      <h1>Read Operation</h1>
        <Button onClick={(e)=>{ getStudents(e) }}>Get My Students</Button>
        <Button onClick={(e)=>{ getStudents2(e) }}>Get My Students2</Button>
        <Button onClick={(e)=>{ getStudents(e) }}>Get My Friends</Button>
        <br />
        <br />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
              <th>Friend Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {}
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            {
              student.data.map(function(currentValue, index, arr){
                console.log(arr[index].id);
                console.log(arr[index].attributes.name);
                return (
                    <tr key={index}>
                      <td>{arr[index].id}</td>
                      <td>{arr[index].attributes.name}</td>
                      <td>
                        <Button variant="success" size="sm">View</Button>&nbsp;
                        <Button variant="primary" size="sm">Edit</Button>&nbsp;
                        <Button variant="danger" size="sm">Delete</Button>
                      </td>
                    </tr>
                )//JSX
              })
            }


          </tbody>
        </Table>
    </>
  );
}
export default Index3;