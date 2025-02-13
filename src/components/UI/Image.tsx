import { icons } from "./Icons/App.icons";

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  styleMode?: "regular" | "avatar";
  styleSize?: "small" | "medium" | "large" | "none" | "responsive";
  srcProp?: string;
}

const STYLE_MODE = {
  regular: "rounded-md",
  avatar: "rounded-full",
};

const STYLE_SIZE = {
  small: "w-12 h-12",
  medium: "w-24 h-24",
  large: "w-48 h-48",
  none: "",
  responsive: "w-full h-full",
};

export default function Image({
  className,
  styleMode,
  styleSize,
  srcProp,
  ...props
}: Props) {
  const style = `${STYLE_MODE[styleMode || "regular"]} ${
    STYLE_SIZE[styleSize || "none"]
  } ${className} object-cover`;

  return (
    <>
      {srcProp ? (
        <img {...props} className={style} src={srcProp} />
      ) : (
        <>{icons.NoImageSvg({ className: "fill-white" })}</>
      )}
    </>
  );
}
