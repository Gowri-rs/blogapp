import React, { useEffect, useState } from "react";
// import axios from "axios";
import { Box, TextField, Button, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import axiosInstance from "../../axiosinterceptor";

const Add = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const blog = location.state; // comes from EDIT click

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageUrl: ""
  });

  // PREFILL DATA WHEN EDITING
  useEffect(() => {
    if (blog) {
      setInputs({
        title: blog.title,
        description: blog.description,
        imageUrl: blog.imageUrl
      });
    }
  }, [blog]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (blog) {
        //  UPDATE
        await axiosInstance.put(
          `/api/blog/updation/${blog._id}`,
          inputs
        );
        alert("Blog updated successfully");
      } else {
        //  ADD
        await axiosInstance.post(
          "/api/blog/add",
          inputs
        );
        alert("Blog added successfully");
      }

      navigate("/"); // BACK TO HOME
    } catch (error) {
      console.log(error);
      alert("Operation failed");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      maxWidth={450}
      display="flex"
      flexDirection="column"
      margin="auto"
      mt={5}
      p={3}
      boxShadow="10px 10px 20px grey"
      borderRadius={5}
    >
      <Typography variant="h5" textAlign="center" mb={2}>
        {blog ? "EDIT BLOG" : "ADD BLOG"}
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={inputs.title}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Description"
        name="description"
        value={inputs.description}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Image URL"
        name="imageUrl"
        value={inputs.imageUrl}
        onChange={handleChange}
        required
        sx={{ mb: 2 }}
      />

      <Button type="submit" variant="contained">
        {blog ? "UPDATE" : "SUBMIT"}
      </Button>
    </Box>
  );
};

export default Add;