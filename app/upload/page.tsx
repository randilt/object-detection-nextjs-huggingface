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
  ScanSearch,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function Page() {
  const [file, setFile] = React.useState<File>();
  const [imgData, setImgData] = React.useState<string>("" as string);
  const [progress, setProgress] = React.useState<number>(0);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showProgress, setShowProgress] = React.useState<boolean>(false);
  const [showProgressButton, setShowProgressButton] =
    React.useState<boolean>(false);
  const { edgestore } = useEdgeStore();
  return (
    <main className="flex flex-col items-center justify-start p-24 gap-2">
      <div className="flex gap-2 items-center">
        <ImageIcon />
        <Input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <Button
          onClick={async () => {
            if (file) {
              setLoading(true);
              setShowProgressButton(true);
              const res = await edgestore.publicFiles.upload({
                file,
                onProgressChange: (progress) => {
                  // you can use this to show a progress bar
                  setProgress(progress);
                },
              });
              setLoading(false);
              // you can run some server action or api here
              // to add the necessary data to your database
              // set the imgData to the url of the uploaded image file
              setImgData(res.url);
            }
          }}
        >
          {loading ? (
            <Loader className="animate-spin" />
          ) : (
            <ScanSearch size={20} />
          )}
        </Button>
      </div>

      {showProgressButton && (
        <Button
          variant="ghost"
          className="m-4"
          onClick={() => setShowProgress(!showProgress)}
        >
          Show Progress {showProgress ? <ChevronDown /> : <ChevronRight />}
        </Button>
      )}
      {showProgress && <Progress value={progress} className="w-[50%]" />}

      {imgData && (
        <>
          <Image src={imgData} width={400} height={400} alt="uploaded image" />
          <Link
            href={imgData}
            target="_blank"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "text-xs text-muted-foreground"
            )}
          >
            View image
          </Link>
        </>
      )}
    </main>
  );
}
