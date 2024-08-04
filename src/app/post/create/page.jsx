
import PostEditForm from "@/components/postEditForm";


export default function CreatePostPage () {

  return (
    <main className='flex justify-center items-center flex-col gap-4 w-full min-h-dvh'>
      <h1 className='text-4x1 font-bold text-center'>Create Post</h1>
      <PostEditForm/>
    </main>
  )
}