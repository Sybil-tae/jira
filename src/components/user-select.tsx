/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-29 15:58:32
 */
import React from 'react'
import { useUsers } from 'utils/user'
import { IdSelect } from './id-select'

export const UserSelect = (props:React.ComponentProps<typeof IdSelect>) => {
  const { data: users } = useUsers()
  return <IdSelect options={ users || [] } {...props} />
}