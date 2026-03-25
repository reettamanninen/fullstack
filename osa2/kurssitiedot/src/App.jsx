const App = () => {
  const course = {
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
    
    ]
  }


  const Course = ({course}) => {
    const Header = ({course}) => 
      <h1>{course}</h1>
   

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

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
    </div>
  )
  }

  const total = 
    course.parts.reduce( (sum, part)=> sum + part.exercises, 0)

  return (
    <div>
      <Course course={course} />
      <p> total of {total} exercises</p>
    </div>
  )
  }
export default App