"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, Loader, Loader2, ScanSearch } from "lucide-react";
import { useState } from "react";

type Props = {};

const ImageClassificiaton = (props: Props) => {
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imageData, setImageData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <main className="flex flex-col items-center justify-start p-24 gap-2">
      <form onSubmit={() => {}} className="flex gap-2 items-center">
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
    </main>
  );
};

export default ImageClassificiaton;
