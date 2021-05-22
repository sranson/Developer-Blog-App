
const editFormHandler = async function(event) {
  event.preventDefault();

const id = document.querySelector('input[name="postId"]').value;
const title = document.querySelector('input[name="postTitle"]').value;
const content = document.querySelector('textarea[name="postContent"]').value;

  await fetch(`/api/post/${id}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/dashboard');
};


document
  .querySelector('#editPostForm')
  .addEventListener('submit', editFormHandler);

