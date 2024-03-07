import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <Link
        href={"/image-classification"}
        className={cn(buttonVariants({ variant: "outline" }))}
      >
        Upload Image &nbsp;
        <Upload />
      </Link>
    </main>
  );
}
