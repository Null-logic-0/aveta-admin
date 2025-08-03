import BlogForm from "../components/blogs/BlogForm";
import Heading from "../components/UI/Heading";
import { useCreateBlog } from "../hooks/useCreateBlog";

function CreateBlog() {
  const { mutate, isPending, formErrors } = useCreateBlog();

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const file = formData.get("media") as File;
    const title = formData.get("title") as string;
    const excerpt = formData.get("excerpt") as string;

    const data = {
      title,
      excerpt,
      media: file,
    };

    mutate(data);
  }

  return (
    <main className="flex flex-col items-center justify-center gap-8 w-full">
      <Heading title="Create new blog" isTitle />
      <BlogForm
        onSubmit={submitHandler}
        isPending={isPending}
        error={formErrors}
      />
    </main>
  );
}

export default CreateBlog;
