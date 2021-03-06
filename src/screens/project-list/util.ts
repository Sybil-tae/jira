import { useMemo } from 'react';
import { useUrlQueryParam } from "utils/url"

/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-29 15:50:48
 */


//项目列表搜索的参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])

  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam
  ] as const
}

//全局的状态管理器
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalOpen] = useUrlQueryParam([
    'projectCreate'
  ])

  const open = () => setProjectModalOpen({ projectCreate: true })
  const close = () => setProjectModalOpen({ projectCreate: undefined })

  // return [
  //   projectCreate === 'true',
  //   open,
  //   close
  // ] as const

  return {
    projectModalOpen: projectCreate === 'true',
    open,
    close
  }
}