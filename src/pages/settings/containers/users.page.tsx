import { Box, CircularProgress, Typography } from "@mui/material"
import { UserDialog, UsersTableComponent } from "../components";
import { useEffect, useState } from "react";
import { User } from "models";
import { UsersClient } from "clients";
import { useNotification } from "context";
import { useSelector } from "react-redux";
import { selectUser } from "store/selectors";
import { ConfirmDlg } from "components";

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isOpenUserDlg, setIsOpenUserDlg] = useState<boolean>(false);
    const [userEdit, setUserEdit] = useState<User | null>(null);
    const [isOpenUserRm, setIsOpenUserRm] = useState<boolean>(false);
    const [userRm, setUserRm] = useState<User | null>(null);

    const user = useSelector(selectUser);
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

    const closeUserDlg = (): void => {
        setIsOpenUserDlg(false);
    };

    const openNewUserDlg = (): void => {
        setUserEdit(null);
        setIsOpenUserDlg(true);
    };

    const openUserDlg = (user: User): void => {
        setUserEdit(user);
        setIsOpenUserDlg(true);
    }

    const closeUserRm = (): void => {
        setIsOpenUserRm(false);
    }

    const openUserRm = (user: User): void => {
        setUserRm(user);
        setIsOpenUserRm(true);
    };

    const addUser = (user: User): void => {
        UsersClient.add(user)
            .then((u: User) => {
                setUsers([...users, u]);
                notify("Usuario creado correctamente", "success");
            })
            .catch((err) => {
                console.error("Error al crear usuario", err);
                notify("No se ha podido crear el usuario. Intentalo de nuevo", "error");
            });
    };

    const updateUser = (user: User): void => {
        UsersClient.update(user)
            .then((u: User) => {
                setUsers(users.map((us: User) => {
                    return us.id === u.id ? u : us;
                }));
                notify("Usuario actualizado correctamente", "success");
            })
            .catch((err) => {
                console.error("Error al actualizar usuario", err);
                notify("No se ha podido actualizar el usuario. Intentalo de nuevo", "error");
            });
    };

    const removeUser = (user: User): void => {
        UsersClient.remove(user.id)
            .then(() => {
                setUsers(users.filter((us: User) => {
                    return us.id !== user.id;
                }));
                notify("Usuario eliminado correctamente", "success");
            })
            .catch((err) => {
                console.error("Error al eliminar usuario", err);
                notify("No se ha podido eliminar el usuario. Intentalo de nuevo", "error");
            });
    };

    const saveUser = (user: User): void => {
        if (userEdit)
            updateUser(user);
        else
            addUser(user);
        setUserEdit(null);
        setIsOpenUserDlg(false);
    };

    const confirmUserRm = (): void => {
        if (userRm)
            removeUser(userRm);
        closeUserRm();
    };

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
        <Box>
            <UsersTableComponent myUser={user ? user.id : -1} users={users} onSelectUser={() => {}} onCreate={openNewUserDlg} onUpdate={openUserDlg} onDelete={openUserRm} />
            
            <UserDialog open={isOpenUserDlg} user={userEdit} onSave={saveUser} onClose={closeUserDlg} />
            <ConfirmDlg open={isOpenUserRm} title="Eliminar usuario" onConfirm={confirmUserRm} onCancel={closeUserRm} >
                <Typography sx={{ mb: 2 }}>
                    ¿Estás seguro de querer eliminar a{" "}
                    <Typography component="span" color="secondary">
                        { userRm ? userRm.name : "-" }
                    </Typography>
                    ?
                </Typography>
            </ConfirmDlg>
        </Box>
    );
};