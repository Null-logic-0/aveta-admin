import { Form, Select } from "antd";
import type { Role } from "../../enums/role.enum";
import { useUpdateUserRole } from "../../hooks/useUpdateUserRole";

type RoleTypes = {
  id: number;
  defaultValue: Role;
};

function UpdateUserRole({ defaultValue, id }: RoleTypes) {
  const { mutate, isPending } = useUpdateUserRole({ id });

  const handleChange = (newRole: Role) => {
    mutate({ role: newRole });
  };
  return (
    <Form>
      <Form.Item className="w-24">
        <Select
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={isPending}
        >
          <Select.Option value="user">User</Select.Option>
          <Select.Option value="admin">Admin</Select.Option>
          <Select.Option value="creator">Creator</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}

export default UpdateUserRole;
