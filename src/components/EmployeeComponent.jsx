import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../service/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const navigator = useNavigate();

    const {id} = useParams();
    const[error,setError] = useState({
        firstName:'',
        lastName:'',
        email:''
    })

    useEffect(()=>{
        if(id){
            getEmployee(id).then((Response)=>{
                setFirstName(Response.data.firstName);
                setLastName(Response.data.lastName);
                setEmail(Response.data.email);
            }).catch(error => {
                console.error(error);
            })
        }
    }, [id])

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(validateForm()){
            const employee = {firstName, lastName, email};
            if(id){
                updateEmployee(id, employee).then((Response)=>{
                    console.log(Response.data);
                    navigator('/employees');
                }).catch(error=>{
                    console.log(error);
                })
            }else{
                createEmployee(employee).then((Response)=>{
                    console.log(Response.data);  
                    navigator('/employees'); 
                }).catch(error=>{
                    console.log(error);
                })
            }
        }
       
    }

    function validateForm(){
        let valid = true;

        const errorCopy = {... error}

        if(firstName.trim()){
            errorCopy.firstName = '';
        }else{
            errorCopy.firstName = 'First name is required';
            valid = false;
        }

        if(lastName.trim()){
            errorCopy.lastName = '';
        }else{
            errorCopy.lastName = 'Last name is required';
            valid = false;
        }

        if(email.trim()){
            errorCopy.email = '';
        }else{
            errorCopy.email = 'Email is required';
            valid = false;
        }

        setError(errorCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container'>
        <br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3'>
                {pageTitle()}
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input 
                            type='text' placeholder='Enter Employee first name' name='firstName' value={firstName}
                            className={`form-control ${error.firstName?'is-invalid':''}`} onChange={(e) => setFirstName(e.target.value)}
                            >
                                
                            </input>
                            {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                            type='text' placeholder='Enter Employee last name' name='lastName' value={lastName}
                            className={`form-control ${error.lastName?'is-invalid':''}`} onChange={(e) => setLastName(e.target.value)}
                            >
                                
                            </input>
                            {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email ID:</label>
                            <input 
                            type='text' placeholder='Enter Employee email' name='email' value={email}
                            className={`form-control ${error.lastName?'is-invalid':''}`} onChange={(e) => setEmail(e.target.value)}
                            >
                                
                            </input>
                            {error.email && <div className='invalid-feedback'>{error.email}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default EmployeeComponent