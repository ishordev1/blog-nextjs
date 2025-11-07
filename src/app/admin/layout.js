"use client";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserProvider";
import { useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, [user]);

  return (
    <div className="flex container mx-auto border ">
      <div className="sidebar border">
        <div className="p-2  md:block hidden ">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <hr />

          <nav className="space-y-2 mt-4">
            <Link href="/admin/dashboard" className="block p-2 rounded ">
              Dashboard
            </Link>
            <Link
              href="/admin/blog"
              className="block p-2 rounded hover:bg-gray-100"
            >
              Posts
            </Link>
            <Link
              href="/admin/users"
              className="block p-2 rounded hover:bg-gray-100"
            >
              Users
            </Link>
            <Link
              href="/admin/add-blog"
              className="block p-2 rounded hover:bg-gray-100"
            >
              Add Blog
            </Link>
          </nav>
        </div>
        <div className="relative md:hidden">
          <div className="absoulate">
            <Sheet>
              <SheetTrigger className=" p-2 rounded">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  ></path>
                </svg>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Admin Pannel</SheetTitle>
                  <hr />

                  <nav className="space-y-2 mt-4">
                    <Link
                      href="/admin/dashboard"
                      className="block p-2 rounded hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin/blog"
                      className="block p-2 rounded hover:bg-gray-100"
                    >
                      Posts
                    </Link>
                    <Link
                      href="/admin/users"
                      className="block p-2 rounded hover:bg-gray-100"
                    >
                      Users
                    </Link>
                    <Link
                      href="/admin/add-blog"
                      className="block p-2 rounded hover:bg-gray-100"
                    >
                      Add Blog
                    </Link>
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className=" flex-1 w-[80%]">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
