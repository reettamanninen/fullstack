const Course = ({course}) => {
    const Header = ({course}) => 
      <h2>{course}</h2>
   

    const Content = ({parts}) => (
    <div>
      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
    </div>
   )
    const Part = ({part}) => (
      <div>{part.name} {part.exercises}</div>
    )

    const total = 
    course.parts.reduce( (sum, part)=> sum + part.exercises, 0)


  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <p> total of {total} exercises</p>
    </div>
  )
  }

  export default Course