import { Link } from "react-router";
import Heading from "../components/UI/Heading";
import { IoWarning } from "react-icons/io5";

function NotAllowedWarningPage() {
  return (
    <main className="h-screen flex justify-center items-center p-4">
      <div className="flex items-center flex-col gap-4 bg-[#11141D] border border-[#3B3A3F] p-6  max-w-[462px] w-full rounded-xl">
        <Heading isTitle title="Aveta.app" />
        <div className="rounded-full text-white flex items-center justify-center relative border border-[#FF4DC3]  p-4">
          <IoWarning className="text-5xl " />
        </div>
        <h2 className=" font-semibold text-xl text-center">
          You are not allowed to visit this page!
        </h2>
        <p className="text-white/50 font-medium tex-sm text-center">
          Please,leave it immediately!
        </p>
        <Link
          to={"/sign-in"}
          className="text-[#FF4DC3] font-semibold underline underline-offset-4"
        >
          Leave App
        </Link>
      </div>
    </main>
  );
}

export default NotAllowedWarningPage;
