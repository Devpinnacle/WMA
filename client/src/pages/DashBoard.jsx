import React from "react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { notes } = useSelector((state) => state.notes);
  console.log(notes);

  // Create a copy of the notes array
  const sortedNotes = [...notes];

  // Sort the copied array
  sortedNotes.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));

  // Group messages by date
  const groupedMessages = {};
  sortedNotes.forEach((message) => {
    const date = new Date(message.created_date).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  return (
    <div style={{ color: "black" ,border:"2px solid black", padding:"10px"}}>
      {Object.keys(groupedMessages).map((date) => (<>
        <div key={date}>
          <p style={{ color: "gray" }}>{date}</p>
          <ul>
            {groupedMessages[date].map((message) => (<><div style={{border:"1px solid gray"}}>
              <li key={message._id} style={{ color: "black" }}><h2>{message.heading}</h2></li>
              <li key={message._id} style={{ color: "black" }}>{message.msg}</li>
            </div><br/></>))}
          </ul>
        </div><hr/></>
      ))}
    </div>
  );
};

export default Dashboard;
