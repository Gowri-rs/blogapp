import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';

const Login = () => {

const navigate= useNavigate();
const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
})

const handleChange= (e)=>{
    setInputs((prevState) =>({
        ...prevState, [e.target.name]: e.target.value,
    }))
}

const handleSubmit=async(e)=> {
    e.preventDefault();
    try {
        const {data} = await axios.post('http://localhost:3000/user/login', {username:inputs.username, email:inputs.email, password:inputs.password})
        if(data.success){
            alert('User login successfull')
            navigate("/")
        }
    }
    
    catch (error) {
       console.log(error) 
       alert('login failed')
    }
}

  return (
    
    <Box
     maxWidth={450}
      component="form"
      onSubmit={handleSubmit}
      display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      boxShadow={"10px 10px 20px grey"}
      margin={"auto"}
      marginTop={5}
      padding={3}
      borderRadius={5}
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off"
    >
      <Typography variant='h5' padding={3} textAlign={'center'}>LOGIN</Typography>
      <TextField id="outlined-basic" label="username" variant="outlined" name='username' value={inputs.username} onChange={handleChange}/>
      <TextField id="outlined-basic" label="email" variant="outlined" name="email" value={inputs.email} onChange={handleChange}/>
      <TextField id="outlined-basic" label="Password" variant="outlined" name='password' value={inputs.password} onChange={handleChange}/>
      <Button variant="contained" type="submit" >LOGIN</Button>
      {/* <Button>Already Registerd? Please Login</Button> */}
    </Box>
    
  )
}

export default Login;