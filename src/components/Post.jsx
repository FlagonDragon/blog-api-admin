import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import PostDiv from "./PostDiv";
import CommentDiv from "./CommentDiv";
import NewComment from "./NewComment";

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

    <h2> Comments </h2>

    <NewComment postId={post.id} handleClick={() => setRemount(!remount)}></NewComment> 

    {/* {console.log(comments)} */}

    {comments && comments.map(comment => {

      return (
      <CommentDiv key={comment.id} comment={comment}></CommentDiv>
      )

    })}
    
  </>
  )

}

export default Post;