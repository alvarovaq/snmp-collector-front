import { Paper } from "@mui/material";
import { UsersTableComponent } from "../components";
import { useState } from "react";
import { User } from "models";

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <Paper sx={{ p: 2, width: "100%" }}>
            <UsersTableComponent users={users} onSelectUser={() => {}} onCreate={() => {}} onUpdate={() => {}} onDelete={() => {}} />
        </Paper>
    );
};