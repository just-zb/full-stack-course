import {useMutation} from '@apollo/client'
import { useState, useEffect} from 'react'
import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setError }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const [login,res] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message)
        },
    })

    useEffect(() => {
        if( res.data ){
            const token = res.data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
        }
    }, [res.data])

    if (!show) {
        return null
    }

    const submit = async (event) => {
        event.preventDefault()

        console.log('logging in...')
        await login({variables: {username, password}})
        setUsername('')
        setPassword('')
    }

    return (
        <div>
        <form onSubmit={submit}>
            <div>
            username
            <input
                type="text"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
        </div>
    )
}
export default LoginForm