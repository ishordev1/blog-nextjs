import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'

const Blog = () => {
    return (
        <div>
            <div className="container mx-auto mt-3 mb-10 border-2 ">
                <div className=" p-4 border-b-2">
                    <h2 className='text-4xl font-bold'>Blogs Posts</h2>
                </div>

                <div className=" flex flex-wrap gap-2 mt-2 items-center justify-center ">
                    {/* card start */}
                    <div className=" bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Exploring the Beauty of Nature
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                Nature has an incredible way of calming the human spirit and inspiring creativity.
                                In this blog..
                            </p>
                            <Button variant="outline" className="mt-4 inline-block bg-primary text-white hover:bg-primary/90 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                                Read More →
                            </Button>
                        </div>
                    </div>
                    {/* card end */}

                    <div className="  bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Exploring the Beauty of Nature
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                Nature has an incredible way of calming the human spirit and inspiring creativity.
                                In this blog..
                            </p>
                            <Button variant="outline" className="mt-4 inline-block bg-primary text-white hover:bg-primary/90 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                                Read More →
                            </Button>
                        </div>
                    </div>
                    {/* card end */}

                     <div className="  bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Exploring the Beauty of Nature
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                Nature has an incredible way of calming the human spirit and inspiring creativity.
                                In this blog..
                            </p>
                            <Button variant="outline" className="mt-4 inline-block bg-primary text-white hover:bg-primary/90 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                                Read More →
                            </Button>
                        </div>
                    </div>
                    {/* card end */}
                    <div className="  bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Exploring the Beauty of Nature
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                Nature has an incredible way of calming the human spirit and inspiring creativity.
                                In this blog..
                            </p>
                            <Button variant="outline" className="mt-4 inline-block bg-primary text-white hover:bg-primary/90 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                                Read More →
                            </Button>
                        </div>
                    </div>
                    {/* card end */}

   {/* card end */}
                    <div className="  bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                        <img
                            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                            alt="Blog Cover"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                                Exploring the Beauty of Nature
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                                Nature has an incredible way of calming the human spirit and inspiring creativity.
                                In this blog..
                            </p>
                            <Button variant="outline" className="mt-4 inline-block bg-primary text-white hover:bg-primary/90 text-sm font-medium px-4 py-2 rounded-lg transition-colors duration-200">
                                Read More →
                            </Button>
                        </div>
                    </div>
                    {/* card end */}
                    <div className="w-full mt-2">
                        <hr />
                    </div>
<div className=" w-full mb-2 flex items-center justify-center">
     <Button variant="outline" size="lg" className="mt-2">
                                See More Posts
                            </Button>
</div>
                </div>


            </div>
        </div>
    )
}

export default Blog