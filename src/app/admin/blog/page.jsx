"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { deleteBlog, getAllBlogs, getAllBlogsByOwner } from "@/service/BlogService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import Loading from "@/app/loading";

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    async function fetchBlogs() {
      setShowLoading(true);
      try {
        const response = await getAllBlogsByOwner();
        setBlogs(response.blogs);
        setShowLoading(false);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setShowLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  const deleteHandler = async (id) => {
    // console.log("Delete blog with id:", id);
    try {
      const res = await deleteBlog(id);
      
      if (res.success) {
        setBlogs(blogs.filter((blog) => blog._id !== id));
        toast.success("delete post successfully");
      } 
    } catch (error) {
        toast.error(error.message );
        // console.log(error);
        
        

    }
  };

  if (showLoading) {
    return <Loading />;
  }
  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
      </div>

      {/* Blog List */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>

        {/* 👇 Make table scrollable on mobile */}
        <CardContent className="overflow-x-auto">
         {
          blogs.length > 0 ? 
          <>
           <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs &&
                blogs.map((blog) => (
                  <TableRow key={blog._id}>
                    <TableCell>
                      {
                        <img
                          src={blog.imgUrl}
                          className="h-[50px] w-[100px]"
                          alt={blog.title}
                        />
                      }
                    </TableCell>
                    <TableCell>{blog.title}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          blog.visibility === "public"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {blog.visibility}
                      </span>
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                      <Link href={`/admin/blog/${blog._id}`}>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </Link>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="sm">
                            Delete
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your account and remove your
                              data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteHandler(blog._id)}
                            >
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          </>
:
          <div className="text-center my-4">No blogs found.</div>
         }
        </CardContent>
      </Card>
    </div>
  );
}
