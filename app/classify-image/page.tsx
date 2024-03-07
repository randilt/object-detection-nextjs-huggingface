"use client";
import * as React from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { Progress } from "@/components/ui/progress";
import { set } from "zod";
import {
  ChevronDown,
  ChevronRight,
  ImageIcon,
  Loader,
  Loader2,
  ScanSearch,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import axios from "axios";
export default function Page() {
  const [url, seturl] = React.useState<string>("");
  const [label, setlabel] = React.useState<string>("");
  const [progress, setProgress] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);

  React.useState<boolean>(false);
  const { edgestore } = useEdgeStore();

  return (
    <main className="flex flex-col items-center justify-start p-24 gap-2">
      <form onSubmit={uploadFiles} className="flex gap-2 items-center">
        <ImageIcon />
        <Input name="files" type="file"></Input>
        <Button disabled={loading} type="submit">
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ScanSearch size={20} />
          )}
        </Button>
      </form>
      {url && (
        <>
          <Image
            src={url}
            width={400}
            height={400}
            alt={"uploaded image"}
          ></Image>
          <Link
            href={url}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-xs text-muted-foreground"
            )}
          >
            View image
          </Link>
        </>
      )}
      {label && <p className="font-bold text-l">Detected: {label}</p>}
    </main>
  );
  async function uploadFiles(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);
    setLoading(true);
    const file = formData.get("files");
    if (file === null) {
      return;
    }
    const res = await edgestore.publicFiles.upload({
      file: file as File,
      onProgressChange: (progress) => {
        // you can use this to show a progress bar
        setProgress(progress);
        console.log(progress);
      },
    });
    console.log(res);
    seturl(res.url);

    setLoading(false);
  }
}
