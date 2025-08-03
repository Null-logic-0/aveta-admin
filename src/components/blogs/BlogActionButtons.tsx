import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { open } from "../../store/UI-slice";
import DeleteBlog from "./DeleteBlog";

function BlogActionButtons({ blogId }: { blogId: number }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buttonStyles =
    "p-2 cursor-pointer hover:bg-white/30 transition-all transform text-lg rounded-lg bg-white/20 backdrop-blur-md shadow-md";
  return (
    <>
      <div className=" flex justify-center items-center gap-4">
        <button
          className={buttonStyles}
          onClick={() => navigate(`/edit-blog/${blogId}`)}
        >
          <FaEdit />
        </button>

        <button
          onClick={() => dispatch(open(blogId))}
          className="p-2 cursor-pointer hover:bg-red-500/70 transition-all transform text-lg rounded-lg bg-red-500/50 backdrop-blur-md shadow-md"
        >
          <MdDelete />
        </button>
      </div>
      <DeleteBlog blogId={blogId} />
    </>
  );
}

export default BlogActionButtons;
