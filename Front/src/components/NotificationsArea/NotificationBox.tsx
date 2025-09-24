import { observer } from "mobx-react-lite"
import { userStore } from "../../stores/UserStore"
import type { Notification } from "../../types/NotificationTypes";

interface NotificationBoxProps{
    notification:Notification,
    handleDismiss:(event: React.MouseEvent<HTMLButtonElement>) => void,
    handleShowResults:(event: React.MouseEvent<HTMLButtonElement>) => void,
    handleGameAccept:(event: React.MouseEvent<HTMLButtonElement>) => void,
    handleGameDecline:(event: React.MouseEvent<HTMLButtonElement>) => void
}

function NotificationBox({notification,handleDismiss,handleShowResults,handleGameAccept,handleGameDecline} :NotificationBoxProps) {

    const activeUserId = userStore?.activeUser?.id;

    function notificationContent() {
        if(activeUserId === notification.senderId){
            switch(notification.status) {
                case 'PENDING': {
                    return (
                        <div>
                            Waiting for {notification.recieverUsername} to respond.
                        </div>
                    )
                }
                case 'ACCEPTED': {
                    return(
                        <div>
                            {notification.recieverUsername} has accepted the challenge!
                        </div>
                    )
                }
                case 'DECLINED': {
                    return(
                        <>
                            <div>
                                {notification.recieverUsername} has declined the challange.
                            </div>
                            <div id="button-section">
                                <button onClick={handleDismiss}>
                                    Dismiss
                                </button>
                            </div>
                        </>
                    )
                }
                case 'FINISHED': {
                    return(
                        <>
                            <div>
                                your challange with {notification.recieverUsername} has reached its conclusion!
                            </div>
                            <div id="button-section">
                                <button onClick={handleShowResults}>
                                    Show Game Results
                                </button>
                            </div>
                        </>
                    )
                }
            }
        }
        else{
            switch(notification.status){
                case 'PENDING':
                    return(
                        <>
                            <div>
                                {notification.senderUsername} challanged you to a game of {notification.gameType}!
                            </div>
                            <div id="button-section">
                                <button onClick={handleGameAccept}>
                                    ACCEPT
                                </button>
                                <button onClick={handleGameDecline}>
                                    Decline
                                </button>
                            </div>
                        </>
                    )
                case 'ACCEPTED':
                    return(
                        <div>
                            Challange accepted!
                        </div>
                    )
                case 'FINISHED':
                    return(
                        <>
                            <div>
                                your challange with {notification.senderUsername} has reached its conclusion!
                            </div>
                            <div id="button-section">
                                <button onClick={handleShowResults}>
                                    Show Game Results
                                </button>
                            </div>
                        </>
                    )
            }
        }
    }

    return (
        <div className="glass-container">
            <div id="top-section" className="glass-container">
                <div id="game-type-container">
                    {notification.gameType}
                </div>
                <div id="status-container">
                    {notification.status}
                </div>
            </div>
            <div id="content-container">
                {notificationContent()}
            </div>
        </div>
    )
}

export default observer(NotificationBox)