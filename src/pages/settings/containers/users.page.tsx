import { Box, CircularProgress } from "@mui/material"
import { UsersTableComponent } from "../components";
import { useEffect, useState } from "react";
import { User } from "models";
import { UsersClient } from "clients";
import { useNotification } from "context";

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { notify } = useNotification();

    useEffect(() => {
        UsersClient.getAll()
            .then((users: User[]) => {
                setUsers(users);
            })
            .catch((err) => {
                console.error("Error al cargar usuarios", err);
                notify("Error al cargar usuarios", "error");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <Box 
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "80vh"
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <UsersTableComponent users={users} onSelectUser={() => {}} onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />
    );
};