/* eslint-disable react/prop-types */
import {useEffect} from 'react'
import { useAuth } from '../context/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    const {isAuthenticated} = useAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/')
        }
    }, [isAuthenticated, navigate])

  return isAuthenticated ? children : null

  
}

export default ProtectedRoute
