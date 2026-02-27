import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Button, TextField, Typography } from '@mui/material';

const Login1 = () => {

const navigate= useNavigate();
const [inputs, setInputs] = useState({
    username:"",
    // email:"",
    password:""
})

const handleChange= (e)=>{
    setInputs((prevState) =>({
        ...prevState, [e.target.name]: e.target.value,
    }))
}

// const handleSubmit=async(e)=> {
//     e.preventDefault();
//     try {
//         const {data} = await axios.post('http://localhost:3000/user/login', {username:inputs.username, password:inputs.password})
//         if(data.success){
//             // alert('User login successfull')
//              alert(res.data.message);

//             // FETCH TOKEN
//             if (data.usertoken) {
//                 localStorage.setItem("token", data.usertoken);
//             }

//             navigate("/");
            
//             // if(res.data.usertoken){
//             //     localStorage.setItem("token",res.data.usertoken)
//             // }

//             // navigate("/")
//         }
//     }
    
//     catch (error) {
//        console.log(error) 
//        alert('login failed')
//     }
// }


const handleSubmit = (e) => {
  e.preventDefault();

  axios
    .post("http://localhost:3000/user/login", inputs)
    .then((response) => {
      alert(response.data.message);

      if (response.data.usertoken) {
        localStorage.setItem("token", response.data.usertoken);
        navigate("/");
      }
    })
    .catch((error) => {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    });
};

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
      {/* <TextField id="outlined-basic" label="email" variant="outlined" name="email" value={inputs.email} onChange={handleChange}/> */}
      <TextField id="outlined-basic" label="Password" variant="outlined" name='password' value={inputs.password} onChange={handleChange}/>
      <Button variant="contained" type="submit" >LOGIN</Button>
      {/* <Button>Already Registerd? Please Login</Button> */}
    </Box>
    
  )
}

export default Login1;