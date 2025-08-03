import { useParams } from "react-router";
import BlogForm from "../components/blogs/BlogForm";
import { toNumericId } from "../helpers/toNumericId";
import { useUpdateBlog } from "../hooks/useUpdateBlog";
import DeleteBlog from "../components/blogs/DeleteBlog";
import { useFetchSingleBlog } from "../hooks/useFetchSingleBlog";
import type { BlogInterface } from "../interfaces/blog.interface";
import Spinner from "../components/UI/spinner/Spinner";
import AppResult from "../components/UI/Result";
import Heading from "../components/UI/Heading";
import Button from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { open } from "../store/UI-slice";

function EditBlog() {
  const { blogId } = useParams();
  const dispatch = useDispatch();

  const numericId = toNumericId(blogId);
  const { mutate, isPending, formErrors } = useUpdateBlog({
    id: numericId as number,
  });
  const {
    data,
    isPending: isLoading,
    isError,
    error,
  } = useFetchSingleBlog({
    id: numericId as number,
  });

  const blog: BlogInterface = data?.data;

  if (isLoading && !isError) {
    return (
      <div className="mt-20 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (isError && !isPending) {
    return (
      <AppResult
        title={error?.message || "Oops...something went wrong!"}
        status={"error"}
      />
    );
  }

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
    <main className="flex flex-col gap-8">
      <Heading isTitle title="Edit blog" />
      <BlogForm
        onSubmit={submitHandler}
        isPending={isPending}
        error={formErrors}
        blog={blog}
      />
      <div className="flex justify-end">
        <Button
          type="button"
          buttonType="outline"
          className="w-[30%] text-red-700"
          onClick={() => dispatch(open(numericId))}
        >
          Delete
        </Button>
      </div>
      <DeleteBlog blogId={numericId!} />
    </main>
  );
}

export default EditBlog;
