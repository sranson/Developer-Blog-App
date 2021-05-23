const commentFormHandler = async function(event) {
    event.preventDefault();

    const postId = document.querySelector('input[name="post-id"]').value;
    const commentContent = document.querySelector('textarea[name="commentContent"]').value;
    
  
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentContent
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    console.log(postId);
    console.log(commentContent);
    document.location.reload();
  };
  
  document
    .querySelector('#commentForm')
    .addEventListener('submit', commentFormHandler);
  