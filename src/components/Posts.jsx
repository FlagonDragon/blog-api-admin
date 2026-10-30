import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import PostDiv from "./PostDiv";


async function fetchPosts() {

    try {

    const response = await fetch(`https://blog-api-iv3t.onrender.com/posts`)

    let postsData = await response.json();

    // console.log(postsData);
    // console.log(response.headers);
    // console.log(response.headers.map);
    // console.log(...response.headers);

    return postsData;

    } catch (error) {

        console.log(error);

    }

};

function Posts() {
    const [posts, setPosts] = useState(null);

    const navigate = useNavigate();

    const handleClick = (postId , state) => {
      navigate(`/posts/${postId}`, { state });
    }

    useEffect(() => {
    
        async function fetchPostsWrapper() {
    
          try {        
    
            const data = await fetchPosts();
            // console.log(data);
            setPosts(data);
            
          } catch (error) {
            console.error(error);
          }
    
        }
    
        fetchPostsWrapper();
    
    }, [])

    console.log('pre');
    console.log(posts);
    // console.log(Array.isArray(posts));
    console.log('post');

    // let myArr = [{id: 1, title: 'title1', content: 'content1'}, {id: 2, title: 'title2', content: 'content2'}]

    return(
    <>

      <h1> Posts </h1>

      {posts && posts.map(post => {

        return (
        <>
        
          <div onClick={() => {handleClick(post.id, post)}}>
            <PostDiv post={post}></PostDiv>
          </div>

        </>
        )

      })}

    </>
    )
    
}

export default Posts;