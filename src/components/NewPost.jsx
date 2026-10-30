import { useState } from "react";

async function postPost(title, content, published) {

  let authorName = 'hey';

  console.log(title);  
  console.log(content);  
  console.log('published: '+published);  
  console.log(authorName);  

  try {

  const response = await fetch("https://blog-api-iv3t.onrender.com/createPost", {
    method: "POST",
    body: JSON.stringify({ title: title, content: content, published: published, authorName: authorName }),
    headers: {'Content-type': 'application/json'},
  });

  let data = await response.json();

  console.log(data);

  } catch (error) {

    console.log(error);

  }

}

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(true);

  return(

  <div className="NewPostContainer"> 

    <div>Make a post: </div>

    <form onSubmit={e => e.preventDefault()}>

      <label>Title:
        <input 
          name="title" 
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <label>Content:
        <input 
          name="content" 
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </label>
    
      <label>Published:
        <input 
          name="title" 
          type="checkbox"
          checked={published}
          onChange={() => {
            setPublished(!published)
            console.log(published);
          }}
        />
      </label>

      <button
        type='submit'
        onClick={() => {
          postPost(title, content, published)
          setTitle("")
          setContent("")
          setPublished(true)
        }}
      >Submit</button>

    </form>
      
  </div>

  )

}

export default NewPost;