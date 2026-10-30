function PostDiv({post}) {

    return(

    <div className="postContainer"> 

        <h3>{post.title}</h3>

        <div>{post.content}</div>
        
        <div>By {post.authorName}</div>
        
    </div>

    )

}

export default PostDiv