import React, { useEffect } from 'react'

import { User } from 'screens/project-list/search-panel'
import { cleanObject } from 'utils'
import { useAsync } from 'utils/use-async'
import { useHttp } from 'utils/http'

export const useUsers = (param?:Partial<User>) => {
    const client = useHttp()

    const { run, ...result } = useAsync<User[]>()

    useEffect(() => {
        run(client('users', { data: cleanObject(param||{}) }))

        //eslint-disable-next-line react-hooks/exhaustive-deps

        // fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(async response => {
        //   if (response.ok) {
        //     setList(await response.json())
        //   }
        // })
    }, [param,run,client])
    

    return result
}