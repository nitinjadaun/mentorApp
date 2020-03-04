import React,{useEffect,useState} from 'react';
import { Link, withRouter } from 'react-router-dom'
import Pagination from "react-js-pagination";
import NotFound from './NotFound'
const ListMentorForm = () => {
    const [count,setCount] = useState(1);
    const [page,setPage] = useState(1);
    const [mentors,setMentors] = useState([]);
    useEffect(() => {
        // Getting total mentors
        fetch('http://localhost:4000/mentor/countmentors')
            .then(response => response.json())
            .then(total => {
                setCount(total);
            })
            .catch(err => console.log(err));
        // get the mentors using the browser API
        fetch('http://localhost:4000/mentor/?page='+page)
            .then(response => response.json())
            .then(mentors => {
                setMentors(mentors);
            })
            .catch(err => console.log(err));
    },[page]);

    const deleteMentor = (id) =>{
        fetch('http://localhost:4000/mentor/deletementor',{
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body:JSON.stringify({id}) 
        }).then(() => {
            const newdata = [];
            mentors.map((data)=>{
                return data.id !== id && newdata.push(data)
            });
            setMentors(newdata);
        }).catch(err =>console.log(err))
    }
    let response= mentors.map ((data,index) =>{
        return <MentorRow key={index} data={data} deleteMentor={deleteMentor} num={index+1}/>
     });
     const handlePageChange =(pageNumber)=>{
        if(page !==pageNumber){
            setPage(pageNumber);
        }
     }
     
    return (
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
						<h2>Manage <b>Mentors</b></h2>
					</div>
					<div className="col-sm-6">
						<Link to="/addmentor" className="btn btn-success mr-2" data-toggle="modal"><i className="fa fa-plus-circle"></i> <span>Add New Mentor</span></Link>
                    </div>
                </div>
            </div>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
						<th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { response }
                </tbody>
            </table>
            { mentors.length < 1 && <NotFound /> }
			<div className="clearfix">
                <Pagination
                    activePage={page}
                    itemsCountPerPage={10}
                    totalItemsCount={count}
                    pageRangeDisplayed={5}
                    itemClass={'page-item'}
                    linkClass={'page-link'}
                    onChange={(e)=>handlePageChange(e)}
                />
            </div>
        </div>
    );
}

const MentorRow = ({data,deleteMentor,num}) =>{
    return (
            <tr>
                <td>{num} </td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                    <Link to={`/editmentor?id=${data.id}`} className="edit mr-4" data-toggle="modal"><i className="fa fa-pencil" data-toggle="tooltip" title="" data-original-title="Edit"></i></Link>
                    <Link to="#" onClick={()=>deleteMentor(data.id)} className="delete" data-toggle="modal"><i className="fa fa-trash-o" data-toggle="tooltip" title="" data-original-title="Delete"></i></Link>
                </td>
            </tr>
        )
}

export default withRouter(ListMentorForm);
