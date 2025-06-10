// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

// import * as React from "react";
// import ReactDOM from "react-dom/client";
// import { Admin, Resource, List, Datagrid, TextField } from "react-admin";

// // Utility to parse CSV text into JSON array
// function csvToJSON(csv) {
//   const lines = csv.trim().split("\n");
//   const headers = lines[0].split(",");
//   return lines.slice(1).map((line) => {
//     const data = line.split(",");
//     const obj = {};
//     headers.forEach((header, index) => {
//       obj[header.trim()] = data[index].trim();
//     });
//     return obj;
//   });
// }

// const dataProvider = {
//   getList: async () => {
//     const url =
//       "https://storage.googleapis.com/hackathon-team1-bucket/Transfer/response.csv";
//     const response = await fetch(url);
//     const csvText = await response.text();
//     const data = csvToJSON(csvText).map((item, index) => ({
//       id: index + 1,
//       supportGroup: item.supportGroup,
//       sentiment: item.sentiment,
//       urgency: item.urgency,
//       draftReply: item.draftReply,
//     }));

//     return {
//       data,
//       total: data.length,
//     };
//   },
//   // You can add other methods like getOne, create, etc. if needed
// };

// const EmailList = (props) => (
//   <List {...props}>
//     <Datagrid rowClick="edit">
//       <TextField source="supportGroup" label="Support Group" />
//       <TextField source="sentiment" label="Sentiment" />
//       <TextField source="urgency" label="Urgency" />
//       <TextField source="draftReply" label="Draft Reply" />
//     </Datagrid>
//   </List>
// );

// const App = () => (
//   <Admin dataProvider={dataProvider}>
//     <Resource name="emails" list={EmailList} />
//   </Admin>
// );

// ReactDOM.createRoot(document.getElementById("root")).render(<App />);

import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  Admin,
  Resource,
  List,
  Datagrid,
  TextField,
  useNotify,
  useRefresh,
  useRedirect,
  Button,
} from "react-admin";
import { fetchUtils } from "react-admin";

function csvToJSON(csv) {
  const lines = csv.trim().split("\n");
  const headers = lines[0].split(",");
  return lines.slice(1).map((line) => {
    const data = line.split(",");
    const obj = {};
    headers.forEach((header, index) => {
      obj[header.trim()] = data[index]?.trim();
    });
    return obj;
  });
}

const dataProvider = {
  getList: async () => {
    const url =
      "https://storage.googleapis.com/hackathon-team1-bucket/Transfer/response.csv";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      const data = csvToJSON(csvText).map((item, index) => ({
        id: index + 1,
        emailClass: item.supportGroup,
        sentiment: item.sentiment,
        urgency: item.urgency,
        draft: item.draftReply,
        sanitized: item.sanitizedText || "[REDACTED]", // fallback if missing
      }));
      return { data, total: data.length };
    } catch (error) {
      console.error("Failed to load CSV:", error);
      return { data: [], total: 0 };
    }
  },
};

const EmailList = () => (
  <List title="E-Mail Classification Agent">
    <Datagrid bulkActionButtons={false} rowClick="edit">
      <TextField source="emailClass" label="Support Group" />
      <TextField source="sanitized" label="Sanitized Email" />
      <TextField source="sentiment" label="Sentiment" />
      <TextField source="urgency" label="Urgency Level" />
      <TextField source="draft" label="Draft Response" />
    </Datagrid>
  </List>
);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="emails" list={EmailList} />
  </Admin>
);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);