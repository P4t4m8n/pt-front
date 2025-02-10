import { useNavigate } from "react-router";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import Calendar from "../components/Calendar/Calendar";
import Image from "../components/UI/Image";

export default function Home() {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null) {
      navigate("/auth");
    }
  }, [user, navigate]);

  return (
    <section className="h-full">
      <header className=" flex items-center gap-4 p-4">
        <Image
          srcProp={user?.imgUrl || ""}
          styleMode="avatar"
          styleSize="medium"
        ></Image>
        <span className="text-5xl flex gap-2">
          <p>Welcome</p>
          <p className="font-semibold">{user?.firstName}</p>
        </span>
      </header>

      <Calendar />
    </section>
  );
}
