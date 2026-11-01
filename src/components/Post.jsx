import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import PostDiv from "./PostDiv";
import CommentDiv from "./CommentDiv";
import NewComment from "./NewComment";

async function changeStatus(postId, status, handleClick) {

  let newStatus;

  if (status == true) newStatus = false;
  if (status == false) newStatus = true;

  console.log(status);
  console.log(postId);  
  console.log(newStatus);  

  try {

  const response = await fetch("https://blog-api-iv3t.onrender.com/postStatus", {
    method: "POST",
    body: JSON.stringify({ postId, newStatus }),
    headers: {
      'Content-type': 'application/json', 
      'authorization': 'Bearer '+localStorage.getItem('token')
    },
  });

  let data = await response.json();

  console.log(data);

  handleClick();

  } catch (error) {

    console.log(error);

  }

}

async function fetchComments(postId) {

  try {

  const response = await fetch(`https://blog-api-iv3t.onrender.com/posts/${postId}`)

  let commentsData = await response.json();

  return commentsData;

  } catch (error) {

    console.log(error);

  }

};

function Post() {
  const [comments, setComments] = useState(null);
  const [remount, setRemount] = useState(false);

  const post = useLocation().state;

  const [status, setStatus] = useState(post.published);

  console.log(post);
  console.log(status);
  
  

  let handleClick = () => {
    setRemount(!remount);
  }

  useEffect(() => {
      
    async function fetchCommentsWrapper() {

      try {        

        const data = await fetchComments(post.id);
        console.log(data);
        setComments([]);
        setComments(data);        
        
      } catch (error) {
        console.error(error);
      }

    }

    fetchCommentsWrapper();
      
  }, [post.id, remount])
  
  return(
  <>

    <h1> Post </h1>

    <PostDiv post={post}></PostDiv>

    <button onClick={() => {
      changeStatus(post.id, status, () => (setStatus(!status)))
    }}>{status == true ? 'Unpublish' : 'Publish'}</button>

    <h2> Comments </h2>

    <NewComment postId={post.id} handleClick={handleClick}></NewComment> 

    {/* {console.log(comments)} */}

    {comments && comments.map(comment => {

      return (
        <div key={comment.id}>

          <CommentDiv comment={comment} handleClick={handleClick}></CommentDiv>

        </div>  
      )
    })}
    
  </>
  )

}

export default Post;