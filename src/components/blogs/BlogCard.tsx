import { Link } from "react-router";
import { textSlicer } from "../../helpers/text-slice";
import defaultImage from "../../assets/default-image.jpg";

type BlogCardType = {
  media: string;
  title: string;
  excerpt: string;
  link: string;
};

function BlogCard({ media, title, excerpt, link }: BlogCardType) {
  return (
    <li className="bg-[#11141D] flex  flex-col gap-6 p-6 border border-[#3B3A3F] rounded-2xl h-[363px] w-full max-w-[394px]">
      <Link to={link}>
        <img
          src={media || defaultImage}
          alt={title}
          className="object-cover rounded-xl"
        />
      </Link>
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
