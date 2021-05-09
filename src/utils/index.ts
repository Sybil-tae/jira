/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-26 10:44:27
 */

import {useEffect, useRef, useState} from 'react'

export const isFalsy = (value: number|string) => value === 0 ? false : !value

export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

export const cleanObject = (object:{[key:string]:unknown}) => {
  const result = { ...object }
  Object.keys(result).forEach(key => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useMount = (callback:() => void) => {
  useEffect(() => {
    callback()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

//防抖函数
export const useDebounce = (value:any, delay:number) => {
  const [deboundedValue, setDebouncedValue] = useState(value)
//!!!!!!!!之前错过，来看！！！！ setTimeout写成了setInterval return没有写成函数，useEffect没有初始化数组
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay)
    return () => clearTimeout(timeout)
  },[value,delay])
  return deboundedValue
}

export const useDocumentTitle = (title:string,keepOnUnmount:boolean=true) => {
  const oldTitle = document.title

  useEffect(() => {
    document.title = title
  },[title])
  useEffect(() => {
    return () => {
      if(!keepOnUnmount){
        document.title = oldTitle
      }
    }
  },[])
}

export const resetRoute = () => window.location.href = window.location.origin

export const useMountRef = () => {
  const mountedRef = useRef(false)
  
  useEffect(() => {
    mountedRef.current = true
    //被卸载的时候
    return () => {
      mountedRef.current = false
    }
  })

  return mountedRef
}