import { useAuth } from "../hooks/useAuth";
import { useSignOut } from "../hooks/useSignOut";

function Home() {
  const { data } = useAuth();
  const { mutate } = useSignOut();
  return (
    <div className="flex flex-col items-center justify-center">
      <p>{data?.data.data.userName}</p>
      <button onClick={() => mutate()}>sign-out</button>
    </div>
  );
}

export default Home;
