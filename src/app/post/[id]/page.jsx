'use client'; 
import { useEffect, useState } from 'react';
import { useAuth } from "../../../hooks/useAuth";
import PostDetail from '../../../components/postDetail';
import { useRouter } from 'next/navigation';

export default function PostDetailPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [post, setPost] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const { token } = useAuth();

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await fetch(`https://api.thechainlair.com/posts/${id}`);

        if (!response.ok) {
          throw new Error('Failed to fetch post details');
        }

        const data = await response.json();
        setPost(data.data.post);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPostDetails(); 
    }
  }, [id]); 

  const handleCreate = () => {
    console.log('Redirecting to create post page...');
    // router.push('/post/create'); 
  };

  const handleUpdate = () => {
    console.log('Redirecting to update post page:', id);
    // router.push(`/post/update/${id}`); 
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      try {
        const response = await fetch(`https://api.thechainlair.com/posts/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to delete the post');
        }

        console.log('Post deleted successfully');
        router.push('/');
      } catch (error) {
        alert(error.message);
      }
    }
  };

  return (
    <main>
      {loading ? ( 
        <p>Loading post details...</p>
      ) : error ? ( 
        <p>Error: {error}</p>
      ) : post ? ( 
        <div>
          <PostDetail post={post} />
          {token && ( 
            <div className="flex gap-4 mt-4">
              <button 
                onClick={handleCreate} 
                className="bg-green-500 text-white p-2 rounded hover:bg-green-400"
              >
                Create Post
              </button>
              <button 
                onClick={handleUpdate} 
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-400"
              >
                Update Post
              </button>
              <button 
                onClick={handleDelete} 
                className="bg-red-500 text-white p-2 rounded hover:bg-red-400"
              >
                Delete Post
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No post found.</p>
      )}
    </main>
  );
}
