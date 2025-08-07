import { Table } from "antd";
import Heading from "../UI/Heading";
import AppResult from "../UI/Result";

import Empty from "../UI/Empty";
import { columns } from "./user-table-columns";
import { useFetchAllUsers } from "../../hooks/useFetchAllUsers";

function UserTable() {
  const { data: users, isPending, error, isError } = useFetchAllUsers();

  if (isError && !isPending)
    return (
      <div className="h-screen text-center flex justify-center items-center">
        <AppResult
          status="error"
          title={error?.message || "Failed to fetch users!"}
        />
      </div>
    );

  if (users?.length === 0) {
    return <Empty description={"No Registered Users!"} />;
  }

  const userDataArray = Array.isArray(users?.data) ? users.data : [];
  return (
    <div className="flex flex-col gap-6  items-center justify-center w-full">
      <Heading title="All Users" isTitle />

      <Table
        columns={columns}
        dataSource={userDataArray}
        rowKey="id"
        loading={isPending}
        className="w-full"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}

export default UserTable;
