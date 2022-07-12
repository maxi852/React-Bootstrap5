import React, {useEffect, createContext, useReducer, useContext} from 'react';
import './App.css';
import NavBar from './components/NavBar';
import About from './screens/About';
import Contact from './screens/Contact';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import Home from './screens/Home';
import Footer from './components/Footer';
import Allposts from './screens/Allposts';
import PostDetail from './screens/PostDetail';
import CreatePost from './screens/CreatePost';
import SignUp from './screens/SignUp';
import Login from './screens/Login';
import { initialUserState, userReducer } from './reducers/userReducer';
import MyAllposts from './screens/MyAllposts';

export const UserContext = createContext(); 

function DynamicRoutes(){

    const navigate = useNavigate();
    const {state, dispatch} = useContext(UserContext);

    useEffect(()=>{

      const token = localStorage.getItem('token');
      if(token){//user is already logged in
        const user = JSON.parse(localStorage.getItem('user'));
        const userState = {'token': token, 'user': user};
        const action = {type:'LOGIN', payload: userState};
        dispatch(action);
        navigate('/posts');
      } else {
        navigate('/login');
      }

    }, [])

    return(
      <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/signup' element={<SignUp />}></Route>
          <Route exact path='/login' element={<Login />}></Route>
          <Route exact path='/posts' element={<Allposts />}></Route>
          <Route exact path='/myposts' element={<MyAllposts />}></Route>
          <Route exact path='/create' element={<CreatePost />}></Route>
          <Route exact path='/create/:postId/:userId' element={<CreatePost />}></Route>
          <Route exact path='/posts/:postId/:userId' element={<PostDetail />}></Route>
          <Route exact path='/about' element={<About />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route> 
      </Routes>
    );
}

function App() {

  const [state, dispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider value={{state: state, dispatch: dispatch}}>
    <Router basename={process.env.PUBLIC_URL}>
      <div>
        <NavBar></NavBar>
        <DynamicRoutes /> 
        <Footer></Footer>
      </div>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
