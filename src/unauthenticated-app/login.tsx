/*
 * @description:
 * @author:
 * @lastEditors:
 * @Date: 2021-04-26 13:39:34
 */

import { Form, Input } from 'antd';
import React from 'react';

import { useAuth } from 'context/auth-context';
import { LongButton } from 'unauthenticated-app';
import { useAsync } from 'utils/use-async';

export const LoginScreen = ({onError}:{onError:(error:Error) => void}) => {
  const { login, user } = useAuth()
  const {run,isLoading} = useAsync(undefined,{throwOnError:true})

    const handleSubmit = async (values: { username: string, password: string }) => {
      try{
      //由于login是异步函数，所以try执行的时候catch取不到结果，故加上async await
        await run(login(values))
      }catch(e){
        onError(e)
      }
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type='text' id='username'></Input>
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type='password' id='password'></Input>
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'} >登录</LongButton>
      </Form.Item>
    </Form>
  );
};
