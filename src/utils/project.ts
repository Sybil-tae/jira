import React, { useCallback, useEffect, useState } from 'react'

import { Project } from 'screens/project-list/list'
import { cleanObject } from 'utils'
import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'

export const useProject = (param?: Partial<Project>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<Project[]>()

    const fetchProjects = useCallback(
        () => client('projects', { data: cleanObject(param || {}) }),
        [param, client]
    )
    //非状态、非基本类型不能放在依赖项里
    useEffect(() => {
        run(fetchProjects(), {
            retry: fetchProjects
        })
    }, [param, run, fetchProjects])

    return result
}

export const useEditProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(
            client(`projects/${params.id}`, {
                data: params,
                method: 'PATCH'
            })
        )
    }
    return {
        mutate,
        ...asyncResult
    }
}

export const useAddProject = () => {
    const { run, ...asyncResult } = useAsync()
    const client = useHttp()
    const mutate = (params: Partial<Project>) => {
        return run(client(`projects/${params.id}`, {
            data: params,
            method: 'POST'
        }))
    }
    return {
        mutate,
        ...asyncResult
    }
}