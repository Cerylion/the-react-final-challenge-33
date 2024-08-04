import React from 'react';

const Post = ({ post }) => {
  if (!post) {
    return <p>Loading...</p>;
  }

  const { title, image, body, createdAt, updatedAt } = post;

  return (
    <div className="post">
      <h1 className="post-title">{title}</h1>
      {image && <img src={image} alt={title} className="post-image" />}
      <p className="post-body">{body}</p>
      <div className="post-dates">
        <p>Created At: {new Date(createdAt).toLocaleDateString()}</p>
        <p>Updated At: {new Date(updatedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default Post;
