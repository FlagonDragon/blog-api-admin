async function deleteComment(commentId, handleClick) {

  console.log(commentId);  

  try {

  const response = await fetch("https://blog-api-iv3t.onrender.com/deleteComment", {
    method: "POST",
    body: JSON.stringify({ commentId }),
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

function CommentDiv({ comment, handleClick}) {

  return(

  <div>

    <div className="commentContainer"> 

      <div>{comment.content}</div>
      
      <div>By {comment.authorName}</div>
        
    </div>

    <button onClick={() => {
      deleteComment(comment.id, handleClick)
    }}>Del</button>

  </div>  

  )

}

export default CommentDiv;