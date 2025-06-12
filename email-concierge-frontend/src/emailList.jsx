import { List, Datagrid, TextField } from "react-admin";
import { Show, SimpleShowLayout } from 'react-admin';

export const emailList = () => (
    <List>
        <Datagrid>
            <TextField source="id" label="ID" />
            <TextField source="emailClass" label="Support Group" />
            <TextField source="sentiment" label="Sentiment" />
            <TextField source="urgency" label="Urgency" />
            <TextField source="draft" label="Draft Reponse" />
            <TextField source="sanitized" label="Sanitized" />
        </Datagrid>
    </List>
);

export const emailShow = () => (
    <Show>
        <SimpleShowLayout>
            <TextField source="id" label="ID" />
            <TextField source="emailClass" label="Support Groups" />
            <TextField source="sentiment" label="Sentiment" />
            <TextField source="urgency" label="Urgency" />
            <TextField source="draft" label="Draft Reponse" />
            <TextField source="sanitized" label="Sanitized" />
        </SimpleShowLayout>
    </Show>
);