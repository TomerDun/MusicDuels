export default function NotificationBox({notification} :{notification: any}) {

    function notificationContent() {
        switch(notification.type) {
            case 'PENDING': {
                return (
                    <div>
                        PENDING
                    </div>
                )
            }
        }
    }

    return (
        <div className="glass-container">
            {notificationContent()}
        </div>
    )
}