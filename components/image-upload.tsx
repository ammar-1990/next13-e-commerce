"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ImagePlus,Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from 'next-cloudinary';

type Props = {
  disabled: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
};

const ImageUpload = ({ disabled, onChange, onRemove, value }: Props) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!mounted) return null;

  return <div>
    <div className="flex items-center mb-4 gap-5">
        {value.map((url)=><div key={url} className="relative w-[200px] aspect-square overflow-hidden ">

            <Button className="absolute top-1 right-1 z-20"
            variant={'destructive'}
            size={'icon'}
            onClick={()=>onRemove(url)}
            >
                <Trash className="w-4 h-4" />
            </Button>
            <Image 
            alt="uploaded-image"
            src={url}
            fill
            className="object-contain rounded-md"
            />
        </div>)}



    </div>

    <CldUploadWidget uploadPreset="yejq6bpn" onUpload={onUpload}>
{({open})=>{
const onClick = ()=>{open()}

return <Button type="button"
disabled={disabled}
variant={'secondary'}
onClick={onClick}
>
    <ImagePlus className="w-4 h-4 mr-3" />
    Upload an image
</Button>
}}
    </CldUploadWidget>
  </div>;
};

export default ImageUpload;
