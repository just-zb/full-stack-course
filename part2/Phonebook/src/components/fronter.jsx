const Fronter = ({message})=>{
    const errStyle = {
        color: 'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }
    const notiStyle = {
        color: 'green',
        background: 'lightgrey',
        fontStyle: 'italic',
        fontSize: 16
      }
    if(message === null){
        return null
    }
    if(message.includes('Error')){
        return(
            <div style={errStyle}>
                {message}
            </div>
        )
    }
    return (
        <div style={notiStyle}>
            {message}
        </div>
    )
}
export default Fronter