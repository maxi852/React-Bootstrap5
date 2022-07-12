import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../config/constant'
import axios from 'axios';
import { UserContext } from '../App';

function MyAllposts() {

    const navigate = useNavigate();
    //create a variable to store all posts and a set a method to update the value
    //of posts, useState hook help us create this variable with empty array
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(false);
    const {state, dispatch} = useContext(UserContext);

    const alertFunction = (message, type) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
        const alertPlaceholder = document.getElementById('alertMsg')
        alertPlaceholder.append(wrapper)
      }



    const deletePost = (postId)=>{
            let action =window.confirm("Are you sure yo want to proceed?");
            if(action){
                axios.delete(`${API_BASE_URL}/posts/${postId}`)
                .then((resp)=>{
                    console.log(resp)
                    alertFunction(`Post with Id ${postId} has been deleted`, 'success')
                    navigate('/myposts'); //redirect when deleted the post
                })
                .catch((err)=>{
                    console.log(err)
                    alertFunction('Error ocurred while deleting the post', 'warning')
                });
            };
    }

    //ES6 function to get all posts from REST API
    const getAllPosts = () => {
        if(state){
        setLoader(true)
        fetch(`${API_BASE_URL}/posts?userId=${state.user.id}`)
        .then((response) => response.json())
        .then((json) => {
            setPosts(json);
            setLoader(false); // when the page is loaded the spin will leave because of the condition we did below the div row
        });
    }
    }
    useEffect(() => {
        getAllPosts();
    }, [ ]); //empty array means execute only once component loads


    return (
    <div>
        <section className='container pt-3'>
        <h3 className='text-center text-uppercase py-4'>My Posts</h3>
        <div id="alertMsg"></div>
        <div className='row'>
            { 
                loader ? 
                    <div className='col-12 text-center'>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
            :posts.map((post, index) => { 
            return <div key={index} className='col-lg-4 col-md-4 col-sm-12'>
                <div className="card" >
                    <img style={{height:"280px"}} src="https://source.unsplash.com/random/800*400/?city,night" className="card-img-top" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <p className="card-text">{post.body}</p>
                        <div className='d-flex justify-content-between'>
                            <Link to={`/posts/${post.id}/${post.userId}`} className="btn btn-primary text-uppercase">
                                Details
                            </Link>
                            <Link to={`/create/${post.id}/${post.userId}`} className="btn btn-warning text-uppercase">
                                <i className="fa-solid fa-pen-to-square me-1"></i>Edit
                            </Link>
                            <button onClick={()=>{deletePost(post.id)}} className="btn btn-danger text-uppercase">
                                <i className="fa-solid fa-trash me-1"></i>Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            })
            }
        </div>
      </section>
    </div>
  )
}

export default MyAllposts