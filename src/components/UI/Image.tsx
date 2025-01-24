interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
}

export default function Image({ className, ...props }: Props) {
  return <img {...props} className={className} />;
}
