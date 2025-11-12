"use client"
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getAllBlogs } from '@/service/BlogService'
import Loading from '@/app/loading'

const Blog = () => {
 const [blogPosts, setBlogPosts] = useState([]);
const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await getAllBlogs();
        // console.log("data",response);
        setBlogPosts(response.blogs);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    }
    fetchBlogs();
  }, []);

  if (loading) {
    return <Loading />;
  }

    return (
        <div>
            <div className="container mx-auto mt-3 mb-5 border-2 ">
                <div className=" p-2 px-4 border-b-2">
                    <h2 className='text-2xl font-bold'>Blogs Posts</h2>
                </div>

                <div className=" flex flex-wrap gap-2 mt-2 items-center justify-center ">
                    {blogPosts && blogPosts.length > 0 ? (
                        blogPosts.map((post) => (
                            <div key={post._id} className="w-1/5 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ">
                                <img
                                    src={post.imgUrl}
                                    alt="Blog Cover"
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-5">
                                    <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2">
                                        {post.title.slice(0,60)}
                                    </h4>
                                   <div dangerouslySetInnerHTML={{ __html: post.description.split(' ').slice(0, 10).join(' ') + '...' }} />
                                    <Button variant="outline" className="mt-4">
                                        <Link href={`/blog/${post._id}`}>Read more</Link>
                                    </Button>
                                </div>
                            </div>


                        ))
                    )
                    : (
                        <div className="w-full text-center py-4">
                            <p className="text-gray-600 dark:text-gray-300">No blog posts available.</p>
                        </div>
                    )}

                    <div className="w-full mt-2">
                        <hr />
                    </div>
            {   blogPosts && blogPosts.length > 8 ? (
                    <div className=" w-full mb-2 flex items-center justify-center">
                        <Button variant="outline" size="lg" className="">
                            See More Posts
                        </Button>
                    </div>
                ) : null}
                </div>


            </div>
        </div>
    )
}

export default Blog