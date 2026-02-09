import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Grid, Box } from "@mui/material";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // FETCH BLOGS
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:3000/blog");
      setBlogs(res.data.blogs);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/blog/deletion/${id}`);
      setBlogs(blogs.filter(blog => blog._id !== id));
    } catch (error) {
      console.log("Delete failed", error);
    }
  };

  return (
    <>
      {/* ADD BLOG BUTTON */}
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <Button
          variant="contained"
          onClick={() => navigate("/add")}
        >
          ADD BLOG
        </Button>
      </Box>

      {/* BLOG CARDS */}
      <Grid container spacing={3} padding={3}>
        {blogs.map((blog) => (
          <Grid item xs={12} sm={6} md={4} key={blog._id}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image={blog.imageUrl || "https://via.placeholder.com/300x200"}
                alt={blog.title}
              />

              <CardContent>
                <Typography variant="h6">
                  {blog.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {blog.description}
                </Typography>
              </CardContent>

              <CardActions>
                <Button
                  size="small"
                  onClick={() => navigate("/add", { state: blog })}
                >
                  EDIT
                </Button>

                <Button
                  size="small"
                  color="error"
                  onClick={() => deleteBlog(blog._id)}
                >
                  DELETE
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Home;