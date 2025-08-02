import { Result } from "antd";

type ResultProps = {
  title: string;
  status: "error" | "success";
};

function AppResult({ title, status }: ResultProps) {
  return <Result status={status} title={title}></Result>;
}

export default AppResult;
