import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {API_BASE_URL} from '../config/constant'

function Allposts() {

    const navigate = useNavigate();
    //create a variable to store all posts and a set a method to update the value
    //of posts, useState hook help us create this variable with empty array
    const [posts, setPosts] = useState([]);
    const [loader, setLoader] = useState(false);
    //ES6 function to get all posts from REST API
    const getAllPosts = () => {
        setLoader(true)
        fetch(`${API_BASE_URL}/posts`)
        .then((response) => response.json())
        .then((json) => {
            setPosts(json);
            setLoader(false); // when the page is loaded the spin will leave because of the condition we did below the div row
        });
    }
    useEffect(() => {
        getAllPosts();
    }, [ ]); //empty array means execute only once component loads


    return (
    <div>
        <section className='container pt-3'>
        <h3 className='text-center text-uppercase py-4'>All Posts</h3>
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
                        <div className='d-grid'>
                            <Link to={`/posts/${post.id}/${post.userId}`} className="btn btn-primary text-uppercase">
                                Details
                            </Link>
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

export default Allposts