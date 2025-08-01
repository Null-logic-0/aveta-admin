import SignInForm from "../components/authentication/SignInForm";

function SignIn() {
  return (
    <main className="flex flex-col items-center gap-4 justify-center lg:h-screen max-md:p-2  p-4">
      <SignInForm />
    </main>
  );
}

export default SignIn;
