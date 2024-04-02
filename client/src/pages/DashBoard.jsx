import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddNotes from "../components/modals/AddNotes";
import { useGetNotesQuery } from "../redux/api/notesApi";
import { getNotes } from "../redux/slice/notesSlice"; 
import DeleteNotes from "../components/modals/DeleteNotes";
import View from "../components/modals/View";

const Dashboard = () => {
  const [noteId,setNoteId]=useState(null);
  const [noteHead,setNoteHead]=useState(null);
  const [noteMsg,setNoteMsg]=useState(null)
  const [addNoteFlag, setAddNoteFlag] = useState(false);
  const [deleteNoteFlag, setDeleteNoteFlag] = useState(false);
  const [viewNoteFlag, setViewNoteFlag] = useState(false);

  const { notes } = useSelector((state) => state.notes);
  const dispatch = useDispatch(); 

  const { data: fetchedData, isLoading } = useGetNotesQuery();

  useEffect(() => {
    if (fetchedData) {
      dispatch(getNotes(fetchedData.data)); 
    }
  }, [dispatch, fetchedData]);

  const sortedNotes = [...notes];

  sortedNotes.sort(
    (a, b) => new Date(a.created_date) - new Date(b.created_date)
  );

  const groupedMessages = {};
  sortedNotes.forEach((message) => {
    const date = new Date(message.created_date).toLocaleDateString();
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(message);
  });

  const handleAddNote = () => {
    setAddNoteFlag(true);
  };

  const handleDelete=(id,head)=>{
    setDeleteNoteFlag(true);
    setViewNoteFlag(false)
    setNoteId(id);
    setNoteHead(head);
  }

  const handleDeleteNotesCancel=()=>{
    setNoteId(null);
    setNoteHead(null);
    setDeleteNoteFlag(false);
    setViewNoteFlag(false)
  }

  const handleViewNote=(id,head,msg)=>{
    setNoteId(id);
    setNoteHead(head);
    setNoteMsg(msg);
    setViewNoteFlag(true);
  }

  const handleViewNotesCancel=()=>{
    setNoteId(null);
    setNoteHead(null);
    setNoteMsg(null);
    setViewNoteFlag(false)
    setDeleteNoteFlag(false)
  }

  const handleOnDelete=()=>{
    setNoteMsg(null);
    setViewNoteFlag(false)
    setDeleteNoteFlag(true);
  }

  return (
    <div style={{ color: "black", border: "2px solid black", padding: "10px" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        Object.keys(groupedMessages).map((date) => (
          <>
            <div key={date}>
              <p style={{ color: "gray" }}>{date}</p>
              <>
                {groupedMessages[date].map((message) => (
                  <ul>
                    <div style={{ border: "1px solid gray" }} onClick={()=>handleViewNote(message._id,message.heading,message.msg)}>
                      <li key={message._id} style={{ color: "black" }}>
                        <h2>{message.heading}</h2>
                      </li>
                      <li key={message._id} style={{ color: "black" }}>
                        {message.msg}
                      </li>
                      <li><button onClick={()=>handleDelete(message._id,message.heading)} style={{ color: "black", border: "2px solid black" }}>delete</button></li>
                    </div>
                    <br />
                  </ul>
                ))}
              </>
            </div>
            <hr />
          </>
        ))
      )}
      <button onClick={handleAddNote} style={{ color: "black", border: "2px solid black" }}>
        Add Notes
      </button>  
      {addNoteFlag && <AddNotes onCancel={() => setAddNoteFlag(false)} />}
      {deleteNoteFlag&&<DeleteNotes id={noteId} head={noteHead} onCancel={handleDeleteNotesCancel} />}
      {viewNoteFlag&&!deleteNoteFlag&&<View id={noteId} head={noteHead}  msg={noteMsg} onCancel={handleViewNotesCancel} onDelete={handleOnDelete}/>}
    </div>
  );
};

export default Dashboard;
