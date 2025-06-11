import { List, Datagrid, TextField } from "react-admin";

export const emailList = () => (
    <List>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="emailClass" label="Email Class" />
            <TextField source="sentiment" label="Sentiment" />
            <TextField source="urgency" label="Urgency" />
            <TextField source="sanitized" label="Sanitized" />
            <TextField source="draft" label="Draft Reponse" />
        </Datagrid>
    </List>
);
