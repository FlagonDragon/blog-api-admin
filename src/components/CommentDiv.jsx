function CommentDiv({comment}) {

  return(

  <div className="commentContainer"> 

    <div>{comment.content}</div>
    
    <div>By {comment.authorName}</div>
      
  </div>

  )

}

export default CommentDiv;