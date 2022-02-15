//import './App.css';
import { Button, Table } from 'react-bootstrap';
import { useState } from 'react';

function Anjali() {

    //state
    const [student,setStudent] = useState({
      data:[]
    });//empty


    //function
   let  get_my_sdtudent=(e)=>{
           console.log("GOOD JOB");
      try {
          fetch('http://localhost:1337/api/siblings').then((data)=>{


           return data.json()

          }).then((data)=>{
              console.log(data);
               //befor set 
              // console.log('before set',student);
              //set the value in hook variable
              setStudent(data);
              //after set
             // console.log('after set',student);


          }).catch((err)=>{
            console.log(err);

          }).finally()
        
      } catch (error) {
        console.log(error)
        
      }
    }


    //return
  return (
             <>
              <h1 className='mt-5 offset-5'>READ OPRATION</h1>
              <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>#</th>
                                  <th>First Name</th>
                                  <th>action</th>
                                  
                                </tr>
                              </thead>
                              <tbody>
                                {
                                  student.data.map(function(currentValue, index, arr){
                                    console.log(arr[index].id)
                                   console.log(arr[index].attributes.name)
                                    return(
                                      <tr key={index}>
                                      <td>{arr[index].id}</td>
                                      <td>{arr[index].attributes.name}</td>
                                      <td>
                                      <Button variant="outline-success">view</Button>{' '}&nbsp;
                                      
                                      <Button variant="outline-info">Edit</Button>{' '}&nbsp;
                                      <Button variant="outline-danger">Delete</Button>{' '}&nbsp;
                                      </td>
                                      
                                    </tr>
                                    )         

                                  })
                                 }
                               
                
                                
                              </tbody>
                         </Table>
                      <Button onClick={(e)=>{get_my_sdtudent(e)}} className='mt-4 offset-5' > GET_MY_STUDENTS   </Button>
                         
        </>       
     );
   }

 export default App;
