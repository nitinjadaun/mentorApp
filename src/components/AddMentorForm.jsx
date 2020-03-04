import React from 'react';
import { useForm  } from 'react-hook-form';
import { withRouter } from 'react-router-dom'
import TaskInputField from './TaskInputField'
const AddMentorForm = (props) => {
    
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => {
       fetch('http://localhost:4000/mentor/addmentor',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(data) 
        }).then(data => {
            props.history.push('/');
        }).catch(err =>console.log(err))
    }
    return (
        <div className="row mt-2">
            <div className="row col-sm-12 center">
                <h2>Add Mentor</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="col-sm-12">
                <div className="row">
                    <div className ="col form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" name="name" ref={register({ required: true, pattern: /^[A-Z a-z]+$/i })} /> {/* register an input */}
                        {errors.name && 'Enter valid Name.'}
                    </div>
                    <div className ="col form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" className="form-control"
                            ref={register({required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            />
                            {errors.email && 'Invalid email address'}
                    </div>
                </div>
                <div className="row">
                    <div className ="col">
                        <label htmlFor="address">Address</label>
                        <textarea name="address" className="form-control" ref={register({ required: true})} />
                        {errors.address && 'Address is required.'}
                    </div>
                    <div className ="col">
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" className="form-control" ref={register({ required: true,pattern: /\d+/ })} />
                        {errors.phone && 'Please enter valid phone number.'}
                    </div>
                </div>
                <TaskInputField register={register} data={null}/>
                <hr className="mb-4" />
                <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
            </form>
        </div>
    );
}


export default withRouter(AddMentorForm);
