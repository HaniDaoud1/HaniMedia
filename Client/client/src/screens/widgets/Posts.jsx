import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Post from './Post';
import { setPosts } from '../../state';

function Posts({ userId, isProfile = false }) {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.auth.posts || []);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);
  const render = useSelector((state) => state.auth.render);

console.log(posts)
  const getPosts = async () => {
    const response = await fetch(`${render}/post`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    console.log(posts)
  };

  const getUserPosts = async () => {
    const response = await fetch(`${render}/post/${userId}/posts`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data)
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []);

  return (
    <>
      {Array.isArray(posts) && posts.length > 0 ? (
  [...posts].reverse().map((post) => (
    <Post
      key={post._id}
      postt={post._id}
      userId={post.userId}
      firstName={post.firstName}
      lastName={post.lastName}
      location={post.location}
      description={post.description}  // Fixed typo
      image={post.picturePath}
    />
  ))
) : (
  <p>No posts available.</p>  // Fallback if no posts
)}
    </>
  );
}

export default Posts;