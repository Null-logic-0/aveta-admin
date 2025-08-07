import { Pagination } from "antd";
import { useState } from "react";
import Empty from "../components/UI/Empty";
import AppResult from "../components/UI/Result";
import BlogCard from "../components/blogs/BlogCard";
import Spinner from "../components/UI/spinner/Spinner";
import { useFetchBlogs } from "../hooks/useFetchBlogs";
import type { BlogInterface } from "../interfaces/blog.interface";
import Heading from "../components/UI/Heading";

function Blogs() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isPending, isError, error } = useFetchBlogs({
    limit: 10,
    page: currentPage,
  });

  const blogs: BlogInterface[] = data?.data?.data || [];
  const pagination = data?.data?.meta;

  if (isPending && !isError) return <Spinner />;
  if (isError && !isPending) {
    return (
      <AppResult
        title={error?.message || "Oops...Something went wrong!"}
        status={"error"}
      />
    );
  }

  if (!isPending && !isError && blogs.length === 0) {
    return <Empty description={"No Blogs!"} />;
  }

  return (
    <main className="flex flex-col items-center justify-center gap-8 w-full">
      <Heading title="Blogs" isTitle />
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center w-full">
        {!isError &&
          !isPending &&
          blogs?.map((blog) => (
            <BlogCard
              key={blog.id}
              title={blog.title}
              excerpt={blog.excerpt}
              media={blog?.media || ""}
              blogId={blog.id}
            />
          ))}
      </ul>
      {!isError && !isPending && !blogs && (
        <Pagination
          current={pagination?.currentPage || 1}
          total={pagination?.totalItems || 0}
          pageSize={pagination?.itemsPerPage || 6}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      )}
    </main>
  );
}

export default Blogs;
