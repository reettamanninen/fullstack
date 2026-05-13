import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogNotification from './components/Notification'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
const [okMessage, setOkMessage] = useState(null)

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
    const user = await loginService.login({ username, password})
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

const handleAddBlog = async (event) => {
  event.preventDefault()
  try {
    const newBlog = await blogService.create({ title, author, url})
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setOkMessage(`a new blog ${title} added`)
    setTimeout(() => setOkMessage(null), 5000)
   } catch (exception) {
      setErrorMessage('couldnt add blog')
      setTimeout(() =>
        setErrorMessage(null), 5000)
      
    }
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
              onChange={({ target}) =>
            setUsername(target.value)}
            />
          </div>
          <div>
            password{' '}
            <input
              type="password"
              value={password}
              onChange={({ target}) =>
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
      <h2>create new</h2>
      <form onSubmit={handleAddBlog}>
          <div>
            title:{' '}
            <input
              type="text"
              value={title}
              onChange={({ target}) =>
            setTitle(target.value)}
            />
          </div>
          <div>
            author:{' '}
            <input
              type="text"
              value={author}
              onChange={({ target}) =>
            setAuthor(target.value)}
            />
          </div>
          <div>
            url:{' '}
            <input
              type="text"
              value={url}
              onChange={({ target}) =>
            setUrl(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>

        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
    
  )
      }

export default App