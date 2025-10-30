import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Blog = () => {
     const blogPosts=[
    {
        "id":"1",
        "imgURL":"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&h=300&fit=crop",
        "title":"Exploring the Beauty of Nature",
        "desc":"Nature has an incredible way of calming the human spirit and inspiring creativity. Discover hidden trails and  lorem testing tesis"
    },
    {
        "id":"2",
        "imgURL":"https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=500&h=300&fit=crop",
        "title":"The Future of Web Development",
        "desc":"Dive into the latest trends in web development, from AI integration to modern frameworks. Learn how technology is"
    },
    {
        "id":"3",
        "imgURL":"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop",
        "title":"Sustainable Living in 2024",
        "desc":"Simple steps to reduce your carbon footprint and live more sustainably. Discover eco-friendly practices that make a real difference for our planet."
    },
    {
        "id":"4",
        "imgURL":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop",
        "title":"The Art of Coffee Culture",
        "desc":"From bean to cup, explore the rich history and cultural significance of coffee around the world. Learn about brewing techniques and cafe traditions."
    },
    {
        "id":"5",
        "imgURL":"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=300&fit=crop",
        "title":"Minimalist Design Principles",
        "desc":"Less is more in modern design. Discover how minimalist principles can create powerful, clean, and user-friendly interfaces that truly connect with users."
    },
    {
        "id":"6",
        "imgURL":"https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500&h=300&fit=crop",
        "title":"Sustainable Living in 2024",
        "desc":"Simple steps to reduce your carbon footprint and live more sustainably. Discover eco-friendly practices that make a real difference for our planet."
    },
    {
        "id":"7",
        "imgURL":"https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=300&fit=crop",
        "title":"The Art of Coffee Culture",
        "desc":"From bean to cup, explore the rich history and cultural significance of coffee around the world. Learn about brewing techniques and cafe traditions."
    },
    {
        "id":"8",
        "imgURL":"https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=300&fit=crop",
        "title":"Minimalist Design Principles",
        "desc":"Less is more in modern design. Discover how minimalist principles can create powerful, clean, and user-friendly interfaces that truly connect with users."
    }
]
    return (
        <div>
            <div className="container mx-auto mt-3 mb-5 border-2 ">
                <div className=" p-2 px-4 border-b-2">
                    <h2 className='text-2xl font-bold'>Blogs Posts</h2>
                </div>

                <div className=" flex flex-wrap gap-2 mt-2 items-center justify-center ">
                  {
                    blogPosts.map((post)=>(
                    <div className="w-1/5 bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 " key={post.id}>
                        <img
                            src={post.imgURL}
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                               {post.desc}
                            </p>
                            <Button variant="outline" className="mt-4">
                             <Link href={`/blog/${post.id}`}>Read more</Link>
                            </Button>
                        </div>
                    </div>
                   

                    ))
                  }

                  
                    <div className="w-full mt-2">
                        <hr />
                    </div>
<div className=" w-full mb-2 flex items-center justify-center">
     <Button variant="outline" size="lg" className="">
                                See More Posts
                            </Button>
</div>
                </div>


            </div>
        </div>
    )
}

export default Blog