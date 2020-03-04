import React from "react";
import { useForm ,useFieldArray } from 'react-hook-form';

const TaskInputField = ({register,data})=>{
        data = (data !== null && data.length) ? data : [null];
    const newdata = [];
    data.map((data)=>{
        return newdata.push({value:data})
    });
    const defaultValues = {
        tasks: newdata  
    }
    const { control } = useForm({ defaultValues }); // initialise the hook
    const { fields, append,remove } = useFieldArray( {
        control,
        name: "tasks"
    });
    
    return(
        <div className="row">
            <div className ="col-6 ">
                <label htmlFor="task" className="d-block">Tasks</label>
                {fields.map((item, index) => {
                    return (
                    <div key={item.id}  className="col-12">
                        <input name={`tasks[${index}]`} placeholder="Enter task name" defaultValue={item.value}  ref={register} className="form-control col-8 d-inline" />
                        {fields.length > 1 &&<button type="button" onClick={() => remove(index)} className="col-1 p-2 bg-danger ml-2 text-white d-inline"> X </button>}
                    </div>
                    );
                })}
            </div>
            <div className ="col-4 d-flex align-items-end">
                <button className="btn btn-primary d-flex align-items-end mr-4" type="button" onClick={() => { append({ name: "append" }); }}> Add More Task </button>
            </div>
        </div>
    )
}
export default TaskInputField;