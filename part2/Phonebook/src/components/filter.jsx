const Filter = (props)=>{
    const {handleFilterChange} = props
    return (
        <div>
        filter shown with <input onChange={handleFilterChange}/>
      </div>
    )
}
export default Filter