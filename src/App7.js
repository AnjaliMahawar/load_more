import logo from './logo.svg';
import './App.css';
import { Button, Form, Pagination , Table } from 'react-bootstrap';
import React, { useState } from 'react';
import swal from 'sweetalert';

const axios = require('axios');
const config = require('./config.json')

function App7() {
  //1. State
  const [student,setStudent] = useState({
    data:[]
  });
  const [paginationItem,setPaginationItem] = useState([])//  Array
  //2. Functions defination
  let handleDelete = (e)=>{
    

    
    var tr = e.target.closest('tr');
    console.log(e.target.closest('tr').querySelector('td:first-child').innerHTML);
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

       //axios third party we have to download it 
       try {
          let po = await axios.delete(`${config.dev_url}/api/siblings/`+delid); 
        
          tr.remove();
          swal("Good job!", "You friend is deleted successfully!", "success");
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
  let first = (e)=>{
    console.log('First');
    if(student.meta.pagination.page !== 1){
      getStudents(1); 
    }
    
    
  }
  let last = (e)=>{
    console.log('Last');
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.pageCount);
    }
  }
  let prev = (e)=>{
    console.log('Prev');
    if(student.meta.pagination.page !== 1){
      getStudents(student.meta.pagination.page - 1 );
    }
    
  }
  let next = (e)=>{
    console.log('Next');
    if(student.meta.pagination.page !== student.meta.pagination.pageCount){
      getStudents(student.meta.pagination.page + 1);
    }
    
  }
  
  let getStudents = (pageno=1)=>{
    console.log(config.base_url);
    console.log('good morning')
    
    try {
        
        fetch(`${config.dev_url}/api/siblings/?pagination[page]=${pageno}&pagination[pageSize]=10`)
        .then((data)=>{
          
          return data.json();//its make data readable
        }).then((data)=>{
          console.log(data);
          
          setStudent(data);
        
          var start = data.meta.pagination.page
          var arr = []; 
          for (let i = 1; i <= data.meta.pagination.pageCount; i++) {
            if(i == start){
              arr.push(<Pagination.Item active onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>); 
            }else{
              arr.push(<Pagination.Item onClick={(e)=>{ goToPage(e) }}>{i}</Pagination.Item>);
            }
            
          }
          setPaginationItem(arr)
          
        }).catch((err)=>{
          console.log(err);
        });
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <>
        <div className="d-flex justify-content-center">
          <h1>Read Operation</h1>
          
        </div>
        
    
        
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
                            <Button variant="primary" size="sm">Edit</Button>&nbsp;
                            <Button variant="danger" onClick={(e)=>{ handleDelete(e) }} size="sm">Delete</Button>
                          </td>
                        </tr>
                    )
                  })
                }
                
              </tbody>
            </Table>
            <Pagination className="d-flex justify-content-center">
              <Pagination.First onClick={(e)=>{ first(e); }} />
              <Pagination.Prev onClick={(e)=>{ prev(e); }} />
              {
              
                paginationItem.map(function(currentValue, index, arr){
                    return currentValue
                })
              }
              
              <Pagination.Next onClick={(e)=>{ next(e); }} />
              <Pagination.Last onClick={(e)=>{ last(e); }} />
            </Pagination>
          </React.Fragment>
        }
        <Button className='mt-3 offset-5' onClick={(e)=>{ getStudents() }}>Get_My_Student</Button>
    </>
  );
}
export default App7;