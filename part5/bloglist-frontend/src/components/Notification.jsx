
const Notification = ({ message }) => {
    if(!message){
        return
    }
    return (
        <h1>{message}</h1>
    )
}
export default Notification