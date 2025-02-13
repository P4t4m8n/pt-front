import { useState } from "react";
import Input from "../UI/Form/Input";
import Label from "../UI/Form/Label";
import Image from "../UI/Image";

interface ImageUploadProps {
  imgUrl?: string;
}
export default function ImageUpload({ imgUrl }: ImageUploadProps) {
  const [imgPreview, setImgPreview] = useState<string | undefined>(imgUrl);

  const handleImagePreview = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files || !ev.target.files[0]) return;
    const file = ev.target.files[0];
    const imgUrl = URL.createObjectURL(file);
    setImgPreview(imgUrl);
  };
  return (
    <Input
      type="file"
      id={`img-upload`}
      name="imgUrl"
      hidden
      onChange={(ev) => {
        ev.stopPropagation();
        handleImagePreview(ev);
      }}
    >
      <Label
        className="h-12 aspect-square block hover:cursor-pointer"
        htmlFor={`img-upload`}
        onClick={(ev) => ev.stopPropagation()}
      >
        <Image
          className="w-full h-full "
          srcProp={imgPreview}
          alt={"image"}
        ></Image>
      </Label>
    </Input>
  );
}
