import { Admin, List, Datagrid, TextField, Resource } from "react-admin";
import { emailList } from "./emailList";
import { createRoot } from "react-dom/client";

// CSV → JSON parser
function csvToJSON(csv) {
  const [headerLine, ...lines] = csv.trim().split("\n");
  const headers = headerLine.split(",");
  return lines.map((line) => {
    const values = line.split(",");
    const entry = {};
    headers.forEach((h, i) => {
      entry[h.trim()] = values[i]?.trim();
    });
    return entry;
  });
}

// ✅ Clean single dataProvider
const dataProvider = {
  getList: async () => {
    const url = "response.csv";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const csvText = await response.text();
      const data = csvToJSON(csvText).map((item, index) => ({
        id: index,
        emailClass: item.supportGroup,
        sentiment: item.sentiment,
        urgency: item.urgency,
        draft: item.draftReply,
        sanitized: item.sanitizedText || "[Personal Information Removed]",
      }));
      return { data, total: data.length };
    } catch (error) {
      console.error("Failed to load CSV:", error);
      return { data: [], total: 0 };
    }
  },
  getOne: () => Promise.resolve({ data: {} }),
  getMany: () => Promise.resolve({ data: [] }),
  getManyReference: () => Promise.resolve({ data: [], total: 0 }),
  update: () => Promise.resolve({ data: {} }),
  create: () => Promise.resolve({ data: {} }),
  delete: () => Promise.resolve({ data: {} }),
  deleteMany: () => Promise.resolve({ data: [] }),
  updateMany: () => Promise.resolve({ data: [] }),
};

// ✅ Minimal layout, no menu
const App = () => (
  <Admin dataProvider={dataProvider} layout={({ children }) => <>{children}</>}>
    <Resource name="emails" list={emailList} />
  </Admin>
);

const root = createRoot(document.getElementById("root"));
root.render(<App />);


// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import './index.css';
// import Main from './main,jsx';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <Main />
//   </StrictMode>,
// )

// // CSV → JSON parser
// function csvToJSON(csv) {
//   const [headerLine, ...lines] = csv.trim().split("\n");
//   const headers = headerLine.split(",");

//   return lines.map((line) => {
//     const values = line.split(",");
//     const entry = {};
//     headers.forEach((h, i) => {
//       entry[h.trim()] = values[i]?.trim();
//     });
//     return entry;
//   });
// }

// Custom DataProvider that fetches from Google Cloud Storage
// const dataProvider = {
//   getList: async () => {
//     const url = "response.csv";
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const csvText = await response.text();
//       const data = csvToJSON(csvText).map((item, index) => ({
//         id: index + 1,
//         emailClass: item.supportGroup,
//         sentiment: item.sentiment,
//         urgency: item.urgency,
//         draft: item.draftReply,
//         sanitized: item.sanitizedText || "[REDACTED]",
//       }));
//       return { data, total: data.length };
//     } catch (error) {
//       console.error("Failed to load CSV:", error);
//       return { data: [], total: 0 };
//     }
//   },
//   // Minimal stubs to satisfy react-admin
//   getOne: () => Promise.resolve({ data: {} }),
//   getMany: () => Promise.resolve({ data: [] }),
//   getManyReference: () => Promise.resolve({ data: [], total: 0 }),
//   update: () => Promise.resolve({ data: {} }),
//   create: () => Promise.resolve({ data: {} }),
//   delete: () => Promise.resolve({ data: {} }),
//   deleteMany: () => Promise.resolve({ data: [] }),
//   updateMany: () => Promise.resolve({ data: [] }),
// };

// const url = "https://storage.googleapis.com/hackathon-team1-bucket/Transfer/response2.csv";

// const dataProvider = {
//   getList: async () => {
//     try {
//       const response = await fetch(url);
//       if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//       const csvText = await response.text();
//       const data = csvToJSON(csvText).map((item, index) => ({
//         id: index + 1,
//         emailClass: item.supportGroup,
//         sentiment: item.sentiment,
//         urgency: item.urgency,
//         draft: item.draftReply,
//         sanitized: item.sanitizedText || "[REDACTED]",
//       }));
//       return { data, total: data.length };
//     } catch (error) {
//       console.error("Failed to load CSV:", error);
//       return { data: [], total: 0 };
//     }
//   },
//   // other dataProvider methods...
// };


// // Email list component
// const EmailList = () => (
//   <List title="Email Concierge Output" pagination={false}>
//     <Datagrid rowClick={false}>
//       <TextField source="id" label="ID" />
//       <TextField source="emailClass" label="Support Group" />
//       <TextField source="sentiment" />
//       <TextField source="urgency" />
//       <TextField source="sanitized" label="Sanitized Email" />
//       <TextField source="draft" label="Draft Reply" />
//     </Datagrid>
//   </List>
// );


