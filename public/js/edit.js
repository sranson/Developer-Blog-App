const id = document.querySelector('input[name="postId"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();


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

const deleteClickHandler = async function() {
  await fetch(`/api/post/${id}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');
};

document
  .querySelector('#editPostForm')
  .addEventListener('submit', editFormHandler);


  document
  .querySelector('#deletePostBtn')
  .addEventListener('click', deleteClickHandler);
