import { useCallback, useReducer, useState } from 'react'

import { useMountRef } from './index';

interface State<D> {
    error: Error | null,
    data: D | null,
    stat: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
    stat: 'idle',
    data: null,
    error: null
}

const defaultConfig = {
    throwOnError: false
}

const useSafeDispatch = <T>(dispatch:(...args:T[]) => void) => {
    const mountedRef = useMountRef()

    return useCallback((...args:T[]) => (mountedRef.current?dispatch(...args):void 0),[dispatch,mountedRef])
}

export const useAsync = <D>(initialState?: State<D>, initialConfig?: typeof defaultConfig) => {
    const config = { ...defaultConfig, initialConfig }
    const [state, dispatch] = useReducer(
        (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
        {
            ...defaultInitialState,
            ...initialState
        })
    //为了给retry赋初始值函数
    const [retry, setRetry] = useState(() => () => { })

    const safeDispatch = useSafeDispatch(dispatch)

    const setData = useCallback((data: D) => safeDispatch({
        data,
        stat: 'success',
        error: null
    }), [safeDispatch])

    const setError = useCallback((error: Error) => safeDispatch({
        error,
        stat: 'error',
        data: null
    }), [safeDispatch])

    //用来触发异步请求
    const run = useCallback(
        (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
            if (!promise || !promise.then) {
                throw new Error('请传入Promise类型数据')
            }
            safeDispatch({stat: 'loading' })
            setRetry(() => () => {
                if (runConfig?.retry) {
                    //重新请求页面
                    run(runConfig?.retry(), runConfig)
                }
            })
            return promise
                .then(data => {
                    //阻止在已卸载的组件上赋值
                    setData(data)
                    return data
                })//会自动捕获异常，如果不主动抛出，外面是接收不到异常的
                .catch(error => {
                    setError(error)
                    if (config.throwOnError) return Promise.reject(error)
                    return error
                })
        },
        [config.throwOnError, setData, setError]
    )

    return {
        isIdle: state.stat === 'idle',
        isLoading: state.stat === 'loading',
        isError: state.stat === 'error',
        isSuccess: state.stat === 'success',
        run,
        setData,
        setError,
        //retry被调用时重新跑一遍run，使得state被刷新
        retry,
        ...state
    }
}