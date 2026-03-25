const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]


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

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => 
      <Course key={course.id} course={course} />
      )}
    </div>
  )
  }
export default App