import * as auth from 'auth-provider'

import qs from "qs"
import { useAuth } from '../context/auth-context'
import { useCallback } from 'react';

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    data?: object,
    token?: string
}

export const http = async (endpoint: string, { data, token, headers, ...customConfig }: Config = {}) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig
    }
    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    return window.fetch(`${apiUrl}/${endpoint}`, config).then(async response => {
        if (response.status === 401) {
            await auth.logout()
            window.location.reload()
            return Promise.reject({ message: '请重新登录' })
        }
        const data = await response.json()
        if (response.ok) {
            return data
        } else {
            return Promise.reject(data)
        }
    })
}

export const useHttp = () => {
    const { user } = useAuth()
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    )
}

//js中的typeof是在runtime时运行的
//ts中的typeof是在静态环境运行的
//Partial<>传入参数个数随机（0-n）
//Omit<one,two>把one中的two类型删除