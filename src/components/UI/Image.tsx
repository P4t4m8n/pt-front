interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  styleMode?: "regular" | "avatar";
  styleSize?: "small" | "medium" | "large" | "none"|"responsive";
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
  const src = srcProp || import.meta.env.VITE_DEFAULT_AVATAR_URL;
  const style = `${STYLE_MODE[styleMode || "regular"]} ${
    STYLE_SIZE[styleSize || "none"]
  } ${className} object-cover`;
  return <img {...props} className={style} src={src} />;
}
