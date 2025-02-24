const PersonForm = (props)=>{
    const {name,number,handlePersonChange, handleNumberChange, handlePersonLogic} = props
    return (
        <form>
        <div>
          name: <input onChange={handlePersonChange} type="text" value={name}/>
        </div>
        <div>number: <input onChange={handleNumberChange} type="text" value={number}/></div>
        <div>
          <button type="submit" onClick={handlePersonLogic}>add</button>
        </div>
      </form>
    )
}
export default PersonForm