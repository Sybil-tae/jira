import React from 'react'
import styled from "@emotion/styled";
import {Button, Spin, Typography} from 'antd'
import { DevTools } from 'jira-dev-tool';
/*
 * @description:
 * @author:
 * @lastEditors:
 * @Date: 2021-04-27 15:55:17
 */
export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
height:100vh;
display:flex;
justify-content:center;
align-items:center;
`

export const FullPageLoading = () => <FullPage>
  <Spin size={'large'} />
</FullPage>

export const FullPageErrorFallBack = ({error}:{error:Error|null}) => <FullPage>
  <DevTools/>
  <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
</FullPage>

export const ButtonNoPadding = styled(Button)`
padding:0;
`