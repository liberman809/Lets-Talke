import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'


export function UserMenu(){
    const user = useSelector(state => state.userModule)

    console.log('adafs')
    return <div className= "userMenu">
        {
            user.userName
        }
        dfs
    </div>

}