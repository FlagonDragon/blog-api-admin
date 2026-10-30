import { useState } from "react";

async function postComment(content, postId, handleClick) {

  let authorName = 'hey';

  console.log(content);  
  console.log(authorName);  
  console.log(postId);  

  try {

  const response = await fetch("https://blog-api-iv3t.onrender.com/createComment", {
    method: "POST",
    body: JSON.stringify({ content: content, authorName: authorName, postId: postId }),
    headers: {'Content-type': 'application/json'},
  });

  let data = await response.json();

  console.log(data);

  handleClick();

  } catch (error) {

    console.log(error);

  }

}

function CommentDiv({ postId, handleClick }) {
  const [value, setValue] = useState("");

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
          postComment(value, postId, handleClick)
          setValue("")
        }}
      >Submit</button>

    </form>
      
  </div>

  )

}

export default CommentDiv;