"use client";
import React from "react";
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

export default function BlogsPage() {
  const blogs = [
    {
      id: 1,
      title: "Next.js Tips for Beginners",
      author: "Ishor",
      status: "Published",
    },
    {
      id: 2,
      title: "Understanding React Hooks",
      author: "Admin",
      status: "Draft",
    },
    {
      id: 3,
      title: "How to Use Shadcn UI",
      author: "Guest",
      status: "Published",
    },
  ];

  return (
    <div className="">
      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="text-2xl font-bold">Manage Blogs</h1>
        <Link href="/admin/blogs/create">
          <Button>Add New Blog</Button>
        </Link>
      </div>

      {/* Blog List */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>All Blogs</CardTitle>
        </CardHeader>

        {/* 👇 Make table scrollable on mobile */}
        <CardContent className="overflow-x-auto">
          <Table className="min-w-[600px]">
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>{blog.title}</TableCell>
                  <TableCell>{blog.author}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        blog.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {blog.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
