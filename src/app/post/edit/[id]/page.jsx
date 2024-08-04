
import PostEditForm from "@/components/postEditForm";


export default async function CreatePostPage ({params}) {
  const token = localStorage.getItem('token')
  if (token) {
    const id = params.id
    if (id) {
      const data = await fetch('https://api.thechainlair.com/posts')
      const posts = await data.json()
    }

    return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4x1 font-bold text-center'>Edit Post</h1>
      <PostEditForm/>
    </main>
    )
  }
}