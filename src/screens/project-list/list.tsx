import { Dropdown, Menu, Table, TableProps } from "antd";

import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import React from "react";
import { User } from "./search-panel";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./util";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

const dayjs = require("dayjs");

export const List = ({ users, ...props }: ListProps) => {
  const {open} = useProjectModal()
  const { mutate } = useEditProject()
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh)
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return <Pin checked={project.pin} onCheckedChange={pinProject(project.id)} />
          }
        },
        {
          title: "名称",
          // dataIndex:'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <Dropdown overlay={<Menu>
              <Menu.Item key={'edit'}>
              <ButtonNoPadding
                      type={'link'}
                      onClick={open}
                    >
                      创建项目
                    </ButtonNoPadding>
              </Menu.Item>
              {/* <Menu.Item key={'edit'}>
                <ButtonNoPadding>编辑</ButtonNoPadding>
              </Menu.Item> */}
            </Menu>}>
              <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
            </Dropdown>
          }
        }
      ]}
      {...props}
    />
  );
};
