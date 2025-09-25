import { observer } from "mobx-react-lite";
import { type ReactNode } from "react";
import { Navigate } from "react-router";
import { userStore } from "../../stores/UserStore";
import { Loader } from "@mantine/core";

type ProtectedRouteProps = {
    children: ReactNode,
}

function ProtectedRoute({ children }: ProtectedRouteProps) {

    // Show loading while checking authentication
    if (userStore.activeUser === undefined) {
        return (
            <div className="flex justify-center items-center background-gradient min-h-screen ">
                <Loader color="indigo" size="xl" type="dots" />
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (userStore.activeUser === null) {
        return <Navigate to="/login" replace />;
    }

    // Render protected content
    return <>{children}</>;
};

export default observer(ProtectedRoute)