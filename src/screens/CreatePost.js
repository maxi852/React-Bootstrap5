import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {API_BASE_URL} from '../config/constant'

function CreatePost() {

    const {postId, userId } = useParams(); 

    const [title, setTitle] = useState();
    const [body, setBody] = useState();
    const [loader, setLoader] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const populateData = () =>{
       //if true that means its a edit request
       if(postId){
        setIsEdit(true);
          let methodType = 'PUT';
          //fetch the details with postId
          setLoader(true)
          fetch(`${API_BASE_URL}/posts/${postId}`)
          .then((response) => response.json())
          .then((json) => {
              console.log(json);
              setTitle(json.title)
              setBody(json.body)
              setLoader(false); // when the page is loaded the spin will leave because of the condition we did below the div row
      });
      }
    }

    const createPost = (event) => {
        setLoader(true);
        event.preventDefault(); //stop the default behaviour of page reload
        
        let methodType = 'POST';
        let url = 'posts';
        if(postId){         //when its and edit post
            methodType = 'PUT'
            url = `posts/${postId}`;
        }
        let reqBody = JSON.stringify({
          title: title,
          body: body,
          userId: 1,
        })
       
        fetch(`${API_BASE_URL}/${url}`, {
        method: `${methodType}`,
        body: reqBody,
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        })
        .then((response) => response.json())
        .then((json) => {
            setLoader(false);
            console.log(json);
            if(isEdit){
              alertFunction('Post Edited Successfully!', 'success');
            }else{
              alertFunction('Post Created Successfully!', 'success');
            }       
        }).catch((err)=>{
            alertFunction('Some error ocurred', 'danger');
            console.log(err);
            setLoader(false);
        })
    } 

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

      useEffect(()=>{
          populateData();
      }, [])

  return (
    <div className='container'>
      {isEdit ? <h3 className='text-center text-uppercase pt-4'>Edit Post</h3>
      :<h3 className='text-center text-uppercase pt-4'>Create Post</h3> }
      <div id="alertMsg"></div>
      {
        loader? <div className='col-12 text-center'>
        <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
        </div>
        :
        <div className='mx-auto shadow-sm rounded p-3 lh-2 text-muted contact-form-container'>
          <form onSubmit={(event) => {createPost(event)}}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Post Title</label>
              <input value={title} onChange={(e)=>{setTitle(e.target.value)}} type="text" className="form-control" id="title" required/>
            </div>
            <div className='mb-3'>
              <label htmlFor="description" className="form-label">Post Description</label>
              <textarea value={body} onChange={(e)=>{setBody(e.target.value)}} className="form-control" id='description' required></textarea>
            </div>
            <div className='d-grid'>
              {isEdit ? <button type="submit" className="btn btn-primary">Edit</button>
              :<button type="submit" className="btn btn-primary">Create</button>}
            </div>
          </form>
      </div>
        }
    </div>
  )
}

export default CreatePost