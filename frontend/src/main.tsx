import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Signin from './Signin.tsx'
import {Routes, Route, HashRouter } from 'react-router-dom'
import Signup from './Signup.tsx'
import Blog from './Blog.tsx'
import Post from './Post.tsx'
import NewPost from './newPost.tsx'
import './App.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <HashRouter>
      <Routes>
        <Route path = "/login" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/" element = {<App />} />
        <Route path = "/blogs/:id" element = {<Blog />} />
        <Route path = "/blog/:id" element = {<Post />} />
        <Route path = "/newPost" element = {<NewPost />} />
      </Routes>
    </HashRouter>
)
