"use client";
import * as React from "react";
import { useEdgeStore } from "../../lib/edgestore";
import { Progress } from "@/components/ui/progress";
import { pipeline } from "@xenova/transformers";
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
  const [isDetected, setIsDetected] = React.useState<string>("");
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
      {progress > 0 && <Progress value={progress} className="w-[50%]" />}
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
            target="_blank"
          >
            View image
          </Link>
        </>
      )}
      {isDetected === "detecting" ? (
        <p>Detecting objects please wait a moment...</p>
      ) : label ? (
        <p className="text-lg">{label}</p>
      ) : (
        <p>Please upload a clear image to detect objects!</p>
      )}
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
    //dtect objects using onnx local model
    setIsDetected("detecting");

    const detector = await pipeline(
      "object-detection",
      "Xenova/detr-resnet-50"
    );
    const output = await detector(res.url);
    console.log(output);
    const countObj: { [key: string]: number } = {};
    output.forEach(({ score, label }: any) => {
      if (score > 0.85) {
        if (countObj[label]) {
          countObj[label]++;
        } else {
          countObj[label] = 1;
        }
      }
    });
    setlabel(
      Object.keys(countObj)
        .map((key) => `${key} (${countObj[key]})`)
        .join(", ")
    );
    setIsDetected("detected");
    console.log(label);
  }
}
