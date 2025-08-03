import { imageTags } from "../../constants/tag.constants";
import Tab from "../UI/Tab";
import { useSearchParams } from "react-router";

function ImageSort() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("type") || "all";

  const handleTabClick = (type: string) => {
    if (type === "all") {
      searchParams.delete("type");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ type });
    }
  };
  return (
    <div className="flex gap-2 items-center max-lg:justify-center flex-wrap">
      <Tab
        label="All"
        isActive={activeTab === "all"}
        onClick={() => handleTabClick("all")}
      />
      {imageTags.map((tag) => (
        <Tab
          key={tag.id}
          label={tag.title}
          isActive={activeTab === tag.title}
          onClick={() => handleTabClick(tag.title)}
        />
      ))}
    </div>
  );
}

export default ImageSort;
