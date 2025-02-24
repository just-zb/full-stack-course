const Person = (props) => {
    const { person,deletePerson } = props
    return <li key={person.id}>{person.name} {person.number} {<button type="text" onClick={()=>deletePerson(person.id)}>delete</button>}</li>
}
const Persons = (props)=>{
    const {persons,personFilter,deletePerson} = props
    return (
        <ul>
        {persons.filter(person => person.name.toLowerCase().includes(personFilter.toLowerCase())).map((person) => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
      </ul>
    )
}
export default Persons