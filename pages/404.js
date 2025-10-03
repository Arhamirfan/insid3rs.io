import { useEffect } from "react";
import { useRouter } from "next/router";
let Errorpage = () => {
  let router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
};

export default Errorpage;
