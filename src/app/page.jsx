import Link from 'next/link';

const Home = async () => {
  const data = await fetch('https://api.thechainlair.com/posts')
  const posts = await data.json()
  
  return (
    <div>
      
      <p>
        {posts.data.post.map(element => {
          return (
            <Link key={element._id} href={`/Post/${element._id}`}>{element.title}</Link>
          )
        })}
      </p>

    </div>
  )
}

export default Home