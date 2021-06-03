const commentFormHandler = async function(event) {
    event.preventDefault();

    const id = document.getElementById('post-id');
    const postId = id.value;
    const commentContent = document.querySelector('textarea[name="commentContent"]').value;
    
  
    const response = await fetch('/api/comment', {
      method: 'POST',
      body: JSON.stringify({
        postId,
        commentContent
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    document.location.replace(`/post/${postId}`);
  };
  
  document
    .querySelector('#commentForm')
    .addEventListener('submit', commentFormHandler);
  