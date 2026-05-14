import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogNotification from './components/Notification'
import './index.css'
import NewBlogForm from './components/newBlogForm'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
const [okMessage, setOkMessage] = useState(null)
const [blogFormShown, setBlogFormShown] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem('loggedUser', JSON.stringify(user))
    blogService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  }  catch (exception) {
    setErrorMessage('Wrong username or password')
    setTimeout(() =>
      setErrorMessage(null), 5000)
  }
}

const handleLogout = () => {
  window.localStorage.removeItem('loggedUser')
  setUser(null)
}

const handleAddBlog = async (blogObject) => {
  try {
    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    setOkMessage(`a new blog ${blogObject.title} added`)
    setTimeout(() => setOkMessage(null), 5000)
   } catch (exception) {
      setErrorMessage('couldnt add blog')
      setTimeout(() =>
        setErrorMessage(null), 5000)
    }
}

const handleLike = async (blog) => {
  const updatedBlog = {
    user: blog.user._id,
    likes: blog.likes +1,
    title: blog.title,
    author: blog.author,
    url: blog.url
  }
  const got = await blogService.update(blog.id, updatedBlog)
  setBlogs(blogs.map(r => r.id === blog.id ? { ...got, user: blog.user } : r))
}

const handleRemove = async (blog) => {
  if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await blogService.remove(blog.id)
      setBlogs(blogs.filter(r => r.id !== blog.id))
  }
}

const newBlogForm = () => {
  const hideWhenVisible = { display: blogFormShown ? 'none' : '' }
    const showWhenVisible = { display: blogFormShown ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogFormShown(true)}>create new blog</button>
        </div>
        <div style={showWhenVisible}>
        <NewBlogForm createBlog={handleAddBlog}/>
          <button onClick={() => setBlogFormShown(false)}>cancel</button>
        </div>
      </div>
    )
}


  if (user === null) {
    return (
      <div>
         <BlogNotification message={errorMessage} type="error" />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username{' '}
            <input
              type="text"
              value={username}
              onChange={({ target }) =>
            setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              value={password}
              onChange={({ target }) =>
            setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <BlogNotification message={okMessage} type="ok" />
      <BlogNotification message={errorMessage} type="error" />
      <h2>blogs</h2>
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>
       {newBlogForm()}
       {blogs.sort((a,b) => b.likes - a.likes)
       .map(blog =>
  <Blog key={blog.id} blog={blog} handleLike={handleLike} handleRemove={handleRemove} user={user} />
)}
    </div>

  )
  }



export default App