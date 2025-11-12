"use client";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@radix-ui/react-dropdown-menu";
import { saveBlog } from "@/service/BlogService";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";


const Page = () => {
  const editor = useRef(null);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState({
    title: "",
    visiblity: "",
  });

  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      placeholder: "Start typing...",
      style: {
        color: "black",
      },
    }),
    []
  );

  const handlerSubmit=async(e)=>{
    e.preventDefault()
    if(!data.title || !description || !data.visiblity){
      toast.error("Title, Description and Visibility are required");
      return;
    }
    try{
      const imgUrl="https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=500&h=300&fit=crop"
      const blog=await saveBlog({ ...data, description, imgUrl });
      toast.success("Blog saved successfully");
      setData({title:"", visiblity:""});
      setDescription("");
      setImage("");
    }
  

    catch(err){
      console.log("error in saving blog", err);
      toast.error("Error in saving blog");
    }
  }

  return (
    <div className="container mx-auto">
      {JSON.stringify(data)}
      {JSON.stringify(description)}
      <form onSubmit={handlerSubmit}>
      <Card>
        <CardHeader >
          <CardTitle className="text-2xl text-center -m-3">Add Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title || ""}
            placeholder="title"
            className="mb-3"
          />

          <div className="jodit-editor-container text-black h-[400px]">
            <JoditEditor
              ref={editor}
              value={description}
              config={{
                readonly: false,
                placeholder: 'Start typing...',

                height: 400,
                // style: {
                //   fontFamily: 'inherit',
                //   fontSize: '14px'
                // },
                // disablePlugins: ['paste', 'stat']
              }}
              onBlur={(newContent) => {
                setDescription(newContent);
              }}
            />
          </div>
          <div className="flex items-center mt-3 justify-center">
            {
            image && (
         <>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="m-2 h-48 w-[200px] object-cover rounded-lg"
            />
          <Button variant="destructive" onClick={() => setImage("")}>
              Remove
            </Button>
         </>
          )
          }
          </div>
          <div className="grid w-full my-3 items-center">
            <Label htmlFor="picture">Post Thumbnail</Label>
            <Input id="picture" onChange={(e) => setImage(e.target.files[0])} type="file"  />
          </div>
          

          <Select
            className="mt-3"
            onValueChange={(value) => setData({ ...data, visiblity: value })}
            value={data.visiblity || ""}
          >
            <SelectTrigger >
              <SelectValue placeholder="Post visibility" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>

        <CardFooter>
          <Button variant="outline" className="w-full">
            Publish
          </Button>
        </CardFooter>
      </Card>
      </form>
    </div>
  );
};

export default Page;
