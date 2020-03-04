import React,{useState,useEffect} from 'react';
import { useForm } from 'react-hook-form';
import TaskInputField from './TaskInputField'
import NotFound from './NotFound'

const EditMentorForm = (props) => {
    const query  = new URLSearchParams(props.location.search);
    const id = query.get('id');
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const [mentors,setMentors] = useState({name:'',email:'',address:'',phone:''});
    useEffect(() => {
        // Update the mentors using the browser API
        fetch(`http://localhost:4000/mentor/getmentor?id=${id}`)
            .then(response => response.json())
            .then(mentors => {
                setMentors(mentors);
            })
            
    },[]);
    const onSubmit = data => {
        data.id = id;
        fetch('http://localhost:4000/mentor/editmentor',{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify(data) 
        }).then(data => {
            props.history.push('/');
        }).catch(err =>console.log(err))
        props.history.push('/');
    }

    return (
        <div className="row mt-2">
            <div className="row col-sm-12 center">
                <h2>Edit Mentor</h2>
            </div>
            {mentors.name === undefined && <NotFound/>}
            {mentors.name !==undefined &&
            <form onSubmit={handleSubmit(onSubmit)} className="col-sm-12">
                <div className="row">
                    <div className ="col form-group">
                        <label htmlFor="name">Name</label>
                        <input className="form-control" name="name" ref={register({ required: true, pattern: /^[A-Z a-z]+$/i })} defaultValue={mentors.name} /> {/* register an input */}
                        {errors.name && 'Enter valid Name.'}
                    </div>
                    <div className ="col form-group">
                        <label htmlFor="email">Email</label>
                        <input name="email" className="form-control" defaultValue={mentors.email} readOnly="readOnly"
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
                        <textarea name="address" className="form-control" ref={register({ required: true})} defaultValue={mentors.address} />
                        {errors.address && 'Address is required.'}
                    </div>
                    <div className ="col">
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" className="form-control" ref={register({required: true, pattern: /\d+/ })} defaultValue={mentors.phone} />
                        {errors.phone && 'Please enter valid phone number.'}
                    </div>
                </div>
               {mentors.name !== '' &&  <TaskInputField register={register} data={mentors.tasks}/>}
                <hr className="mb-4" />
                <button className="btn btn-primary btn-lg btn-block" type="submit">Submit</button>
            </form>
            }
        </div>
    );
}


export default EditMentorForm;
