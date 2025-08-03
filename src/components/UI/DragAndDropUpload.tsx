import { Upload } from "antd";
import type { UploadProps as AntUploadProps } from "antd";

const { Dragger } = Upload;

type UploadProps = {
  title: string;
  icon: React.ReactNode;
  isPending: boolean;
  onUpload: (file: File) => void;
};

function DragAndDropUpload({ title, icon, onUpload, isPending }: UploadProps) {
  const props: AntUploadProps = {
    beforeUpload: (file) => {
      onUpload(file);
      return false;
    },
    showUploadList: false,
    maxCount: 1,
  };
  return (
    <Dragger {...props} className="w-full" disabled={isPending}>
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="rounded-full p-2 bg-[#8a38f5]/30 text-3xl text-[#8a38f5] w-15 h-15 flex justify-center items-center">
          {icon}
        </div>
        <p className="text-xl font-bold text-white">{title}</p>
        <p className="text-lg font-semibold text-white">
          Drag and drop an Image here,or click browse
        </p>
        <span className="text-sm text-white/50">
          Supports JPG,PNG,(MAX 5MB)
        </span>
      </div>
    </Dragger>
  );
}

export default DragAndDropUpload;
