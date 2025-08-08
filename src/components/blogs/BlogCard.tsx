import { textSlicer } from "../../helpers/text-slice";
import defaultImage from "../../assets/default-image.jpg";
import BlogActionButtons from "./BlogActionButtons";

type BlogCardType = {
  media: string;
  title: string;
  excerpt: string;
  blogId: number;
};

function BlogCard({ media, title, excerpt, blogId }: BlogCardType) {
  return (
    <li className="bg-[#11141D]  flex  flex-col gap-6 p-6 border border-[#3B3A3F] rounded-2xl h-[363px] w-full max-w-[394px]">
      <div className="relative group cursor-pointer flex justify-center items-center">
        <img
          src={media || defaultImage}
          alt={title}
          className="object-cover rounded-xl h-[207px] w-[326px]"
        />
        <div className="absolute opacity-0 transition-all group-hover:opacity-100">
          <BlogActionButtons blogId={blogId} />
        </div>
      </div>
      <div>
        <h3 className="text-[#FF4DC3] font-semibold text-lg pb-2">
          {textSlicer(title, 20)}
        </h3>
        <p className="text-sm font-semibold text-white/50">
          {textSlicer(excerpt, 45)}
        </p>
      </div>
    </li>
  );
}

export default BlogCard;
