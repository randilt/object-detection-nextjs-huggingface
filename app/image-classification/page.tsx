"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import axios from "axios";
import { ImageIcon, Link, Loader, Loader2, ScanSearch } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {};

const ImageClassificiaton = (props: Props) => {
  const uploadFiles = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setLoading(true);
    const files = await axios.post("/api/classify", formData);
    console.log(files);
    setLoading(false);
  };

  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center justify-start p-24 gap-2">
      <form onSubmit={uploadFiles} className="flex gap-2 items-center">
        <ImageIcon />
        <Input name="files" type="file" />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <ScanSearch size={20} />
          )}
        </Button>
      </form>
      {imageUrl && (
        <>
          <Image src={imageUrl} width={400} height={400} alt="uploaded image" />
          <Link
            href={imageUrl}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-xs text-muted-foreground"
            )}
          ></Link>
        </>
      )}
      {imageData && (
        <pre className="text-sm font-mono">
          {JSON.stringify(imageData, null, 2)}
        </pre>
      )}
    </main>
  );
};

export default ImageClassificiaton;
