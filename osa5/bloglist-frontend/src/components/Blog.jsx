import { useState } from 'react'

const Blog = ({ blog, handleLike, handleRemove, user }) => {
  const [showInfo, setShowInfo] = useState(false)


  return (
    <div>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? 'hide' : 'view'}
        </button>
      </div>
      {showInfo && (
        <div>
          <div>{blog.url}</div>
          <div>
            likes {blog.likes}
            <button onClick={() => handleLike(blog)}>like</button>
          </div>
          <div>{blog.user.name}</div>
          {blog.user.username === user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div> 
  )
 }
  
  export default Blog