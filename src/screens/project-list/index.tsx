import { useDebounce, useDocumentTitle } from 'utils'

import { List } from './list'
import React from 'react'
import { SearchPanel } from './search-panel'
import { Button, Typography } from 'antd'
import styled from '@emotion/styled'
import { useProject } from 'utils/project'
import { useProjectsSearchParams } from './util'
import { useUsers } from 'utils/user'
import { Row } from 'components/lib'

export const ProjectListScreen = (props: { projectButton:JSX.Element }) => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()

  const { isLoading, error, data: list, retry } = useProject(useDebounce(param, 200))

  const { data: users } = useUsers()

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      {props.projectButton}
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type={'danger'}>{error.message}</Typography.Text> : null}
    <List
      projectButton={props.projectButton}
      refresh={retry}
      users={users || []}
      dataSource={list || []}
      loading={isLoading} />
  </Container>
}

ProjectListScreen.whyDidYouRender = false

// class Test extends React.Component<any, any>{
//   static whyDidYouRender=true
// }

const Container = styled.div`
padding:3.2rem;
`