interface Props {
  children: React.ReactNode;
}
export default function ModelOverlay({ children }: Props) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen z-10 bg-black bg-opacity-70 flex justify-center items-center ">
      {children}
    </div>
  );
}
