/*
 * @description:
 * @author:
 * @lastEditors:
 * @Date: 2021-04-29 14:20:05
 */

import { Raw } from "types";
import React from "react";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>

//Omit继承第一个参数上的所有类型但是删除第二个参数上包含的类型
interface IdSelectProps extends Omit<SelectProps,'value'|'onChange'|'options'> {
  value: Raw | null | undefined,
  //当把值往外传的时候，统一成number
  onChange: (value?: number) => void,
  //作为默认值或空值存在
  defaultOptionName?: string,
  options?: { name: string; id: number }[]
}

//value可以传入多种类型的值，onChange只会回调number|undefined类型的值
//当isNaN(Number(value))为true的时候，代表选择默认类型
//当选择默认类型的时候，onChange会回调Undefined
export const IdSelect = (props: IdSelectProps) => {
  const { value, onChange, defaultOptionName, options, ...restProps } = props
  return (
    <Select
      //处理加载期间没有匹配完成时不显示数字
      value={options?.length? toNumber(value):0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {
        defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option>:null
      }
      {
        options?.map(option => <Select.Option key={option.id} value={option.id}>{option.name}</Select.Option>)
      }
    </Select>
  );
};

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
