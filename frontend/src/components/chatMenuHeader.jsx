import {ChatMenuActions} from './chatMenuActions'
import{UserMenu} from './userMenu'

export function ChatMenuHeader({setMod}){

    return <div className="chatMenuHeader">
        <UserMenu />
        <ChatMenuActions setMod={setMod} />
    </div>
}