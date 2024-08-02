

import Link from 'next/link'

export default function Header () {
  return (
    <div className='flex flex-row gap-11 '>
      {/*logo*/}
      <section>
        {/*Icon*/}
        <input type="text" placeholder='Search' />
      </section>
      <p>
        <Link href='/login'>Login</Link>
      </p>
      <p>
        <Link href='/register'>Register</Link>
      </p>
    </div>
  )
}