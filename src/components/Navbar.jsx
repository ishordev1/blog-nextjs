"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ModeToggle } from "./Theme-Btn";
import { useContext } from "react";
import { UserContext } from "@/app/context/UserProvider";
import { logout, logoutUser } from "@/service/Auth";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const route = useRouter();
  const { user, setUser } = useContext(UserContext);
  // console.log(user.email);
  const handlerLogout = async () => {
    const res = await logoutUser();
    setUser(undefined);
    toast.success(res.message);
  };
  return (
    <>
      <nav className=" p-2 bg-background/50 sticky top-0 backdrop-blur border-b z-10 ">
        <div className="container mx-auto flex items-center justify-between">
          <div className="font-bold text-2xl">MyBlog</div>
          <div className="md:flex space-x-4 hidden">
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/blog">Blog</Link>
            {user && <Link href="/admin/dashboard">Dashboard</Link>}
          </div>
          <div className="md:flex hidden items-center ">
            <ModeToggle />
            {user ? (
              <>
                <span className="mx-3">{user.email}</span>
                <Button
                  onClick={handlerLogout}
                  variant="outline"
                  className="mx-1"
                >
                  logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" className="mx-1">
                  <Link href="/signin">Login</Link>
                </Button>
                <Button variant="outline" className="mx-1">
                  <Link href="/signup">Signup</Link>
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden flex items-center" variant="outline">
            <ModeToggle />
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
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="font-bold mt-4">
                    Construction
                  </SheetTitle>
                  <SheetDescription>
                    <div className="flex flex-col gap-1">
                      <Link href="/">Home</Link>
                      <Link href="/about">About</Link>
                      <Link href="/contact">Contact</Link>
                      <Link href="/blog">Blog</Link>

                      {user && user.email ? (
                        <>
                          <span className="mx-3">{user.email}</span>
                          <Button
                            onClick={handlerLogout}
                            variant="outline"
                            className="mx-1"
                          >
                            logout
                          </Button>
                        </>
                      ) : (
                        <div className="flex items-center mt-3">
                          <Button variant="outline" className="text-xs">
                            <Link href="/signin">Login</Link>
                          </Button>
                          <Button variant="outline" className="mx-1 text-xs">
                            <Link href="/signup">Signup</Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
