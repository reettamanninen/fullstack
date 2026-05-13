const BlogNotification = ({message, type }) => {
    if ( message === null) 
    return null
  return <div class={type}>{message}</div>
  }
  export default BlogNotification