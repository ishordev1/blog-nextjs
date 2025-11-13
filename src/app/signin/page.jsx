"use client"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { getCurrentUser, signin } from "@/service/Auth"
import { useRouter } from "next/navigation"

import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { UserContext } from "../context/UserProvider"
const page = () => {
  const {setUser}=useContext(UserContext)
  const[loadingBtn,setLoadingBtn]=useState(false)
  const route=useRouter()
  const [formData,setFormData]=useState({
    email:"",
    password:""
  })
  const resetData=()=>{
    setFormData({
       email:"",
    password:""
    })
  }

  const handlerSubmit=async (e)=>{
    e.preventDefault();
try {
  setLoadingBtn(true)
  const res=await signin(formData)
  // console.log(res);
  
 if(res.success){
    toast.success("signin successfully")
 const user = await getCurrentUser();
    setUser(user);
    route.push('/admin/dashboard')
  }
  else{
    toast.error(res.message)
  }
} catch (error) {
  console.log(error);
  toast.error("signin fail...")
  
}
finally{
   setLoadingBtn(false)
}
    
  }

  return (
  
     <form onSubmit={e=>handlerSubmit(e)}>
  <div className="flex items-center justify-center m-5">
     <div className="w-full max-w-md">
  {JSON.stringify(formData)}
      <FieldSet className="border-2  rounded-lg p-3">
     <div className="">
       <h1 className="text-2xl text-center mb-3 font-bold">SignIn Here</h1>
      <hr/>
     </div>
        <FieldGroup className="">
         <Field className="-my-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
           <Input type="email" placeholder="Email" onChange={e=>setFormData({...formData,email:e.target.value})} value={formData.email} />
          </Field>
          <Field className="-my-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" placeholder="••••••••" onChange={e=>setFormData({...formData, password:e.target.value})} value={formData.password} />
          </Field>
        </FieldGroup>
         <Button variant="outline" disabled={loadingBtn} type="submit">
          {
            loadingBtn? "signing...":"submit"
          }

          
          
          
          
          
          </Button>
         
      </FieldSet>
    </div>
   </div>
      </form>
  )
}

export default page