/*
 * @description:
 * @author:
 * @lastEditors:
 * @Date: 2021-04-26 13:39:34
 */

import { Form, Input } from "antd";
import React from "react";

import { useAuth } from "context/auth-context";
import { LongButton } from "unauthenticated-app";
import { useAsync } from "utils/use-async";

export const RegisterScreen = ({onError}:{onError:(error:Error) => void}) => {
  const { register, user } = useAuth();
  const {run,isLoading} = useAsync(undefined,{throwOnError:true})

  const handleSubmit = async ({cpassword, ...values}: { username: string; password: string; cpassword:string }) => {
    if(cpassword!==values.password){
      onError(new Error('请确认两次输入的密码相同'))
      return
    }
    try{
      //由于register是异步函数，所以try执行的时候catch取不到结果，故加上async await
      await run(register(values));
    }catch(e){
      onError(e)
    }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"username"} type="text" id="username"></Input>
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"password"} type="password" id="password"></Input>
      </Form.Item>
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "请确认密码" }]}
      >
        <Input placeholder={"confirm password"} type="password" id="cpassword"></Input>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={"submit"} type={"primary"}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  );
};
