import logo from './logo.svg';
import './App.css';
//  { Named Import }
import { Button, Form, Pagination, Table } from 'react-bootstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';
const axios = require('axios');

// Functional COmpoent
function App5() {
  //1. State/ Hook Variables
  const [student,setStudent] = useState({
    data:[], //array
    meta:{
        pagination:{
            page: '',
            pageCount: '',
            pageSize: '',
            total: ''
        }
    } //js object
  });//Empty Array
  const [paginationItem,setPaginationItem] = useState([])// Empty Array
  //2. Functions defination

  let LoadMore=()=>{
   // alert('ooooo');
    getStudents(student.meta.pagination.page +1)
  }
  
  
  

  let handleDelete = (e)=>{
    //function chaining
    var tr = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML); //e is a event object
    var delid = parseInt(e.target.closest('tr').querySelector('td:first-child').innerHTML);
    console.log(delid);
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then( async (willDelete) => {
      if (willDelete) {

       //API Call
       try {
          //let po = await axios(); 
          let po = await axios.delete('http://localhost:1337/api/siblings/'+delid)
             tr.remove();
          
          swal("Record Delete Successfully");
        
          
       } catch (error) {
          console.log(error)
       }
      } else {
        //swal("Your imaginary file is safe!");
      }
    });
  }

  let goToPage = (e)=>{
    console.log(e.target.innerHTML);
    var pageno = parseInt(e.target.innerHTML);
    getStudents(pageno);
  }

  

  let getStudents2 = (e)=>{
    console.log(student);

  }
  let getStudents = (pageno=1)=>{// e = event //ES6 Fat arrow functions // default argument

    console.log('good morning')
    //Alway wrap the api calling code inside trycatch block
    try {
        //Call the api
        // Fetch API
        //AXIOS
        //What is the api
        //Fetch API with Promise Chain
        fetch(`http://localhost:1337/api/siblings?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
          //let make data json readable
          return data.json();
        }).then((data)=>{
          console.log(data);
          //Set karne se pahle
          //console.log('before set',student);
          //not set the student data in student hook variable
          setStudent({
            ...student,
            data: student.data.concat(data.data), //1. Array student.data  //2. data.data
            meta:data.meta
          });
          //Set karne ke baad data kya hai
          
          
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
        <div className="d-flex justify-content-center">
          <h1 className='offset-1'>Load More Operation</h1>
         
          <Button  onClick={(e)=>{ getStudents() }}>Get_My_Student</Button> 
        </div>
        
        <br />
        <br />
        {
          student.data.length > 0 &&
          <React.Fragment>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Friend Name</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
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
                            <Button variant="primary"  size="sm">Edit</Button>&nbsp;
                            <Button variant="danger" onClick={(e)=>{ handleDelete(e) }} size="sm">Delete</Button>
                          </td>
                        </tr>
                    )//JSX
                  })
                }
                
              </tbody>
            </Table>
            { (student.meta.pagination.page !== student.meta.pagination.pageCount)&&
                  <Button className='mt-3 offset-5' onClick={(e)=>{LoadMore(e)}}>load More
     
                  </Button>

            }
            
          </React.Fragment>
          
        }
       
    </>
  );
}
export default App5;
