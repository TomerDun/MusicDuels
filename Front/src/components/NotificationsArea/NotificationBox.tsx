import { observer } from "mobx-react-lite"
import { userStore } from "../../stores/UserStore"
import type { Notification } from "../../types/NotificationTypes";

interface NotificationBoxProps{
    notification:Notification,
    handleDismiss:(event: React.MouseEvent<HTMLButtonElement>) => void,    handleGameAccept:(event: React.MouseEvent<HTMLButtonElement>) => void,
    handleGameDecline:(event: React.MouseEvent<HTMLButtonElement>) => void
}

function NotificationBox({notification,handleDismiss,handleGameAccept,handleGameDecline} :NotificationBoxProps) {

    const activeUserId = userStore?.activeUser?.id;
    const statusColors = {
        'pending': 'bg-yellow-400',
        'accepted':'bg-blue-400',
        'declined':'bg-red-400',
        'completed':'bg-green-400'
    }
    function notificationContent() {
        if(activeUserId === notification.senderId){
            switch(notification.status) {
                case 'pending': {
                    return (
                        <div>
                            Waiting for {notification.recieverUsername} to respond.
                        </div>
                    )
                }
                case 'accepted': {
                    return(
                        <div>
                            {notification.recieverUsername} has accepted the challenge!
                        </div>
                    )
                }
                case 'declined': {
                    return(
                        <>
                            <div>
                                {notification.recieverUsername} has declined the challange.
                            </div>
                            <div id="button-section" className="flex max-h-10 mt-4">
                                <button onClick={handleDismiss} className="decline-invite-button interactive w-full">
                                    Dismiss
                                </button>
                            </div>
                        </>
                    )
                }                
            }
        }
        else{
            switch(notification.status){
                case 'pending':
                    return(
                        <>
                            <div>
                                {notification.senderUsername} challanged you to a game of {notification.gameType}!
                            </div>
                            <div id="button-section" className="flex justify-between gap-2 max-h-10 mt-4">
                                <button 
                                    onClick={handleGameAccept} 
                                    className="accept-invite-button action-button interactive">
                                    Accept
                                </button>
                                <button
                                    onClick={handleGameDecline}
                                    className="decline-invite-button interactive">
                                    Decline
                                </button>
                            </div>
                        </>
                    )
                case 'accepted':
                    return(
                        <div>
                            Challange accepted!
                        </div>
                    )                
            }
        }
    }

    return (
        <div className="glass-container border flex flex-col !flex-[45%] w-[50%]">
            <div id="top-section" className="flex justify-between mb-4">
                <div id="game-type-container">
                    {notification.gameType}
                </div>
                <div id="status-container" className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${statusColors[notification.status as keyof typeof statusColors]}`}></div>
                    <div>
                        {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                    </div>
                </div>
            </div>
            <div id="content-container">
                {notificationContent()}
            </div>
        </div>
    )
}

export default observer(NotificationBox)