import Input from "../UI/Input";
import Button from "../UI/Button";
import type { FormEvent } from "react";
import { useNavigate } from "react-router";
import ImagePicker from "../UI/ImagePicker";
import defaultImage from "../../assets/default-image.jpg";
import type { BlogFieldsInterface } from "../../interfaces/blog.interface";

type BlogFormProps = {
  blog?: BlogFieldsInterface;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isPending: boolean;
  error: BlogFieldsInterface;
};

function BlogForm({ onSubmit, isPending, error, blog }: BlogFormProps) {
  const navigate = useNavigate();
  return (
    <form
      className="flex flex-col gap-4 max-w-[660px] w-full max-md:mt-6"
      onSubmit={onSubmit}
    >
      <ImagePicker
        name="media"
        error={typeof error?.media === "string" ? error?.media : ""}
        defaultImage={
          typeof blog?.media === "string" ? blog?.media : defaultImage
        }
      />

      <Input
        error={error?.title}
        defaultValue={blog?.title || ""}
        disabled={isPending}
        isLabel
        label="Title"
        name="title"
      />

      <Input
        isLabel
        error={error?.excerpt}
        defaultValue={blog?.excerpt || ""}
        disabled={isPending}
        label="Excerpt"
        className="h-40 resize-y p-3 leading-6 text-base"
        name="excerpt"
        rows={10}
        isTextArea
      />

      <div className="flex items-center max-md:justify-center gap-4 justify-end  w-full">
        <Button
          buttonType="outline"
          type="button"
          onClick={() => navigate("/")}
          className="w-[14%] max-md:w-full"
        >
          Cancel
        </Button>
        <Button
          className="w-[14%] max-md:w-full"
          disabled={isPending}
          isPending={isPending}
        >
          {isPending ? "Saving" : "save"}
        </Button>
      </div>
    </form>
  );
}

export default BlogForm;
