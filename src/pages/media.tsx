import MediaHeader from "../components/media/MediaHeader";
import MediaStats from "../components/media/MediaStats";

import ImageList from "../components/media/ImageList";
import { useLocation } from "react-router";
import { useState } from "react";
import { useFetchEntityImages } from "../hooks/useFetchEntityImages";
import ImageSort from "../components/media/ImageSort";
import ImageUpload from "../components/media/ImageUpload";
import { Pagination } from "antd";

function Media() {
  const location = useLocation();
  const queryParams = Object.fromEntries(
    new URLSearchParams(location.search).entries()
  );

  const [currentPage, setCurrentPage] = useState(Number(queryParams.page) || 1);

  const { data, isPending, isError, error } = useFetchEntityImages({
    limit: 6,
    page: currentPage,
    ...queryParams,
  });

  const images = data?.data?.data;
  const pagination = data?.data.meta;

  return (
    <div className="w-full flex flex-col gap-8">
      <MediaHeader />
      {!isPending && !isError && <MediaStats />}

      <ImageSort />
      <ImageUpload />
      <ImageList
        images={images}
        isPending={isPending}
        isError={isError}
        error={error?.message || "Oops...something went wrong!"}
      />
      {!isPending && !isError && images?.length === 0 && (
        <div className="flex justify-center">
          <Pagination
            current={pagination?.currentPage || 1}
            total={pagination?.totalItems || 0}
            pageSize={pagination?.itemsPerPage || 6}
            onChange={(page) => setCurrentPage(page)}
            showSizeChanger={false}
          />
        </div>
      )}
    </div>
  );
}

export default Media;
