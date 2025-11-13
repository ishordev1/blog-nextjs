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
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const { user, loading } = useContext(UserContext);
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [user, loading]);

  if (loading) {
    return <div className="p-6 text-center">Loading...</div>;
  }

  const linkClasses = (path) =>
    `block p-2 rounded-md transition-colors ${
      pathname === path
        ? "bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white font-semibold"
        : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
    }`;

  return (
    <div className="flex container mx-auto border ">
      <div className="sidebar border">
        <div className="p-2  md:block hidden ">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <hr />

          <nav className="space-y-2 mt-4">
           
            <Link href="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
        Dashboard
      </Link>

      <Link href="/admin/blog" className={linkClasses("/admin/blog")}>
        Posts
      </Link>

      <Link href="/admin/add-blog" className={linkClasses("/admin/add-blog")}>
        Add Blog
      </Link>
      <Link href="/admin/contact" className={linkClasses("/admin/contact")}>
        Contacts
      </Link>
      <Link href="/admin/password" className={linkClasses("/admin/password")}>
        password
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
                   <Link href="/admin/dashboard" className={linkClasses("/admin/dashboard")}>
        Dashboard
      </Link>

      <Link href="/admin/blog" className={linkClasses("/admin/blog")}>
        Posts
      </Link>

      <Link href="/admin/add-blog" className={linkClasses("/admin/add-blog")}>
        Add Blog
      </Link>
      <Link href="/admin/contact" className={linkClasses("/admin/contact")}>
        Contacts
      </Link>
      <Link href="/admin/password" className={linkClasses("/admin/password")}>
        password
      </Link>
                  </nav>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
      <div className=" flex-1 w-[80%]  overflow-y-auto">
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}
