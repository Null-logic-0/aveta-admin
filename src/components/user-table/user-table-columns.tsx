import type { ColumnsType } from "antd/es/table";
import type { Role } from "../../enums/role.enum";
import DeleteUser from "../admin-actions/DeleteUser";
import UpdateUserRole from "../admin-actions/UpdateUserRole";
import ToggleBlockUser from "../admin-actions/ToggleBlockUser";
import type { UserInterface } from "../../interfaces/user.interface";

export const columns: ColumnsType<UserInterface> = [
  {
    title: "Name",
    key: "name",
    render: (_, record) => (
      <p
        className={`${
          record.isBlocked ? "opacity-50 line-through" : "opacity-100"
        }`}
      >
        {record?.userName || ""}
      </p>
    ),
  },
  {
    title: "Email",
    key: "email",
    render: (_, record) => (
      <p
        className={`${
          record.isBlocked ? "opacity-50 line-through" : "opacity-100"
        }`}
      >
        {record?.email || ""}
      </p>
    ),
  },
  {
    title: "Role",
    key: "role",

    render: (_, record) => (
      <>
        {record.isBlocked ? (
          <p
            className={`px-4 font-medium ${
              record.isBlocked ? "opacity-50" : "opacity-100"
            }`}
          >
            {record?.role
              ? record.role.charAt(0).toUpperCase() +
                record.role.slice(1).toLowerCase()
              : ""}
          </p>
        ) : (
          <UpdateUserRole
            defaultValue={(record?.role as Role) || ""}
            id={record.id}
          />
        )}
      </>
    ),
  },
  {
    title: "Actions",
    key: "actions",
    render: (_, record) => (
      <div className="flex gap-2">
        <ToggleBlockUser id={record.id} isBlocked={record.isBlocked} />
        <DeleteUser id={record.id} />
      </div>
    ),
  },
];
