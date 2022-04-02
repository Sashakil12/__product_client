
import { Box } from '@chakra-ui/react';
import React,{useContext} from 'react';
import { AuthContext } from './../../context/authContext';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

function LogOut() {
const navigate= useNavigate()
const qC = useQueryClient()
  const { setauthenticated } = useContext(AuthContext);
  const handleClick=()=>{
    setauthenticated(false)
    navigate('/auth')
    localStorage.removeItem("token")
    qC.clear()
  }
  return (
    <Box cursor={"pointer"} onClick={handleClick} color="white"> log out</Box>
  )
}

export default LogOut