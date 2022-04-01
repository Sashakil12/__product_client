
import { Box } from '@chakra-ui/react';
import React,{useContext} from 'react';
import { AuthContext } from './../../context/authContext';

function LogOut() {
  const { setauthenticated } = useContext(AuthContext);
  return (
    <Box onClick={()=>setauthenticated(false)} color="white"> log out</Box>
  )
}

export default LogOut