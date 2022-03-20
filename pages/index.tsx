import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/Header'
import Main from '../components/Main'
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'
import Link from 'next/link'
interface Props {
  posts: [Post]
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  console.log(urlFor(posts[0].mainImage).url()!)
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Medium-Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Main />
      <div className="grid grid-cols-1 gap-3 p-2 sm:grid-cols-2 md:gap-6 md:p-6 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounded-lg border">
              <img
                className="h-60 w-full object-cover transition-transform duration-200 ease-in-out group-hover:scale-105"
                src={urlFor(post.mainImage).url()}
                alt="post image"
              />
              <div className="flex justify-between bg-white p-5 ">
                <div>
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-12 w-12 rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt="author image"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `*[_type == "post"] {
    _id,
    title,
    slug,
    mainImage,
    author -> {
    name,
    image,
    },
    description
  }`
  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts,
    },
  }
}
export default Home
