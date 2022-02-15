import React, { useState } from 'react'
import { Button, Table } from 'react-bootstrap'

export default function App3() {

    //state
    const [student,setStudent] = useState({
        data:[]
    
      });//empty

    //function 
   let is_loading=(e)=>{
        console.log("oook");
        if(student.meta.pagination.pageSize !==5){

            get_my_sdtudent()
           // console.clear();
      
           // console.timeEnd('your code took')
           
            
            }

      else  if(student.meta.pagination.pageSize ==5)
         {
            get_my_sdtudent(student.meta.pagination.pageSize +5)
           }
          if(student.meta.pagination.pageSize ==10)
           {
              get_my_sdtudent(student.meta.pagination.pageSize+5)
             }
          if(student.meta.pagination.pageSize ==15)
             {
                get_my_sdtudent( student.meta.pagination.pageSize +5)
               }
               if(student.meta.pagination.pageSize ==20)
             {
                get_my_sdtudent( student.meta.pagination.pageSize +5)
               }

        
        
    }
   let get_my_sdtudent=(pageSize=5)=>{
        console.log("hello");

        try {
            fetch(`http://localhost:1337/api/siblings?pagination[page]=1 &pagination[pageSize]=${pageSize}`)
             
             .then((data)=>{
                 return data.json()

            }).then((data)=>{
                console.log(data);
                setStudent(data);

            }).catch((err)=>{
                console.log(err);

            })
            
        } catch (error) {
            console.log(error);
            
        }
    }


    //retrun
  return (
      <>
      <h1 className='mt-5 offset-5'>LOAD MORE PAGE</h1>
     { student.data.length > 0 &&
    <>

    <Table striped bordered hover>
    <thead>
      <tr className='mt-3'>
        <th>#</th>
        <th>First Name</th>
        <th>Last Name</th>
        
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
                        <Button variant="outline-danger" >Delete</Button>{' '}&nbsp;
                        </td>
                        
                      </tr>
                      )         

                    })
                  }
                 
  
                  
      </tbody>

  </Table>
     
       <Button className='mt-3 offset-4' onClick={()=>{is_loading()}}>load More
     
    </Button>
  </>
}
  <Button onClick={()=>{get_my_sdtudent()}} className='mt-3 offset-3' > GET_MY_STUDENTS   </Button>
  </>
  )
    }
