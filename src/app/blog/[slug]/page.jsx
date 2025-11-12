"use client";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { getBlogById } from "@/service/BlogService";
import { useParams } from "next/navigation";

const formatDate = (dateString) => {
  if (!dateString) return "Unknown Date";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const Page = () => {
  const { slug } = useParams();

  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBlog() {
      if (!slug) return;

      try {
        const response = await getBlogById(slug);
        if (response && response.blog) {
          setBlog(response.blog);
        } else {
          setError("Blog post not found.");
        }
      } catch (error) {
        console.error("Failed to fetch blog:", error);
        setError("An error occurred while fetching the blog.");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <Loading />;
  }

  if (error || !blog) {
    return (
      <div className="container mx-auto mt-10 p-6 bg-red-50 dark:bg-gray-800 rounded-xl shadow-lg text-center">
        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400">
          {error || "Could not load blog details."}
        </h1>
      </div>
    );
  }

  const { title, description, imgUrl, createdAt, userId } = blog;
  const authorName = userId?.name || "Anonymous Author";

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto p-4 lg:p-8">
        <article className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
          {/* Featured Image */}
          <div className="h-64 sm:h-50 lg:h-[200px] overflow-hidden">
            <img
              src={
                imgUrl ||
                "https://placehold.co/1200x450/eeeeee/333333?text=Featured+Image"
              }
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="p-6 sm:p-8 lg:p-12">
           
            <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500 dark:text-gray-400">
              <span>
                By{" "}
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                  {authorName}
                </span>
              </span>
              <span>•</span>
              <span>Published on {formatDate(createdAt)}</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              {title}
            </h1>

            <div
              className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300"
              dangerouslySetInnerHTML={{ __html: description }}
            />

          </div>
        </article>
      </div>
    </div>
  );
};

export default Page;
