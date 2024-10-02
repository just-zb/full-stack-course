const App = ()=>{
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <Header course={course}/>
      <Content part1={parts[0]} part2={parts[1]} part3={parts[2]}/>
      <Total part1={parts[0]} part2={parts[1]} part3={parts[2]}/>
    </div>
  )
}
const Header=(props)=>{
  return (
      <h1>{props.course}</h1>
  )
}
const Content=(props)=>{
  return (
      <div>
      <Part name={props.part1.name} exercises={props.part1.exercises}/>
      <Part name={props.part2.name} exercises={props.part2.exercises}/>
      <Part name={props.part3.name} exercises={props.part3.exercises}/>
      </div>
  )
}
const Part = (props)=>{
  return (
    <p>{props.name} {props.exercises}</p>
  )
}
const Total=(props)=>{
  return (
      <p>Number of exercises {props.part1.exercises+props.part2.exercises+props.part3.exercises}</p>
  )
}
export default App