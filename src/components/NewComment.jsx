import { useState } from "react";
import { useNavigate } from "react-router";

async function postComment(content, postId, handleClick, navigate) {

  let authorName = localStorage.getItem('user');

  console.log(content);  
  console.log(authorName);  
  console.log(postId);  

  try {

  const response = await fetch("https://blog-api-iv3t.onrender.com/createComment", {
    method: "POST",
    body: JSON.stringify({ content: content, authorName: authorName, postId: postId }),
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

    navigate(`/log-in`);

  }

}

function NewComment({ postId, handleClick }) {
  const [value, setValue] = useState("");

  const navigate = useNavigate();

  return(

  <div className="NewCommentContainer"> 

    <div>Make a comment: </div>

    <form onSubmit={e => e.preventDefault()}>
    
      <textarea 
        name="commentContent"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <button
        type='submit'
        onClick={() => {
          postComment(value, postId, handleClick, navigate)
          setValue("")
        }}
      >Submit</button>

    </form>
      
  </div>

  )

}

export default NewComment;