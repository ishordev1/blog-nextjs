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

const JoditEditor = dynamic(() => import("jodit-react"), { ssr: false });

const Page = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
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

  return (
    <div className="container mx-auto">
      {JSON.stringify(description)}
      {JSON.stringify(data)}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add Blog</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            type="text"
            onChange={(e) => setData({ ...data, title: e.target.value })}
            value={data.title || ""}
            placeholder="title"
            className="mb-3"
          />

          <JoditEditor
            ref={editor}
            value={description || ""}
            config={config}
            onChange={(e) =>
              setDescription({ ...description, description: e.target.value })
            }
          />

          <div className="grid w-full my-3 items-center">
            <Label htmlFor="picture">Picture</Label>
            <Input id="picture" type="file" />
          </div>

          <Select
            className="mt-3"
            onValueChange={(value) => setData({ ...data, visiblity: value })}
          >
            <SelectTrigger>
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
    </div>
  );
};

export default Page;
