import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { useMemo, useState } from 'react';

import { cleanObject } from './index';
import { useAsync } from './use-async';

/*
 * @description: 
 * @author: 
 * @lastEditors: 
 * @Date: 2021-04-29 10:52:56
 */

//返回页面url中指定键的参数值
//???????没看懂，再研究下吧
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParam] = useSearchParams()

  // const [stateKeys] = useState(keys)

  return [
    useMemo(
      () => keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || '' }
    }, {} as { [key in K]: string }), [searchParams]),
    (params: Partial<{ [key in K]: unknown }>) => {
      //iterator  定义了iterator的数据都可以用for of 遍历
      //Object.fromEntries将键值对转换为对象
      const o = cleanObject({ ...Object.fromEntries(searchParams), ...params }) as URLSearchParamsInit
      return setSearchParam(o)
    }
  ] as const
}