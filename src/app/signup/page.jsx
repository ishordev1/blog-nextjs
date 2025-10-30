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
import { signup } from "@/service/Auth"
import { useState } from "react"
import toast from "react-hot-toast"

const page = () => {
const [formData,setFormData]=useState({
  name:"",
  email:"",
  password:""
})

const handlerSubmit=async(e)=>{
  e.preventDefault();
  try {
    if(!name || !email|| !password){
toast.error("fill all fields..")
return
  }
  const user=await signup(formData);
  console.log(user);
  toast.success("User successfully saved")
  } catch (error) {
    console.log(error);
toast.error("somethings is wrong, User is not Saved..")
  }
}

  return (
   <>
   <div className="flex items-center justify-center m-5">
     <div className="w-full max-w-md">
     {/* {JSON.stringify(formData)} */}
       <form onSubmit={e=>handlerSubmit(e)}>
      <FieldSet className="border-2  rounded-lg p-3">
     <div className="">
       <h1 className="text-2xl text-center mb-3 font-bold">Signup Here</h1>
      <hr/>
     </div>
    
        <FieldGroup className="">
          <Field className="-my-2">
            <FieldLabel htmlFor="name">Name</FieldLabel>
           <Input onChange={(e)=>setFormData({...formData,name:e.target.value})} type="text"  value={formData.name || ""} placeholder="Name" />
          </Field>
         <Field className="-my-2">
            <FieldLabel htmlFor="email">Email</FieldLabel>
           <Input type="email" onChange={(e)=> setFormData({...formData,email:e.target.value})}  value={formData.email || ""} placeholder="Email" />
          </Field>
          <Field className="-my-2">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input id="password" type="password" onChange={(e)=> setFormData({...formData,password:e.target.value})}  value={formData.password || ""}  />
          </Field>
        </FieldGroup>
         <Button type="submit" variant="outline">Sign Up</Button>

      </FieldSet>
     </form>
    </div>
   </div>
   </>
  )
}


export default page