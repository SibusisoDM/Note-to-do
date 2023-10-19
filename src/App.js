import { useEffect, useState } from "react";
import NotesList from "./components/NoteList";
import { nanoid } from 'nanoid';
import Search from "./components/search";
import Header from "./components/Header";

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "this is my first note!",
      date: '19/10/2023',
    },
    {
      id: nanoid(),
      text: "this is my second note!",
      date: '19/10/2023',
    },
    {
      id: nanoid(),
      text: "this is my new note!",
      date: '19/10/2023',
    },
    {
      id: nanoid(),
      text: "this is my fourth note!",
      date: '19/10/2023',
    }
  ]);

  const [searchText, setSearchText] = useState('');

  const [darkMode, setDarkMode] = useState(false);

  useEffect(()=> {
      const savedNotes = JSON.parse(localStorage.getItem('react-notes-app-data')
      );

      if(savedNotes){
        setNotes(savedNotes);
      }

  },[]);

  useEffect(() => {
      localStorage.setItem('react-notes-app-data', JSON.stringify(notes)
      );    
  }, [notes]);

  const addNote = (text) => {
    const date = new Date();
    const newNote = {
      id: nanoid(), // Add a unique ID to the new note
      text: text,
      date: date.toLocaleDateString()
    };
    const newNotes = [...notes, newNote]; // Use array spread to add the new note
    setNotes(newNotes);
  };

  const deleteNote = (id) => {
    const newNotes = notes.filter((note) => note.id !== id); // Use correct syntax for filter
    setNotes(newNotes);
  }

  return (
    <div className={`container ${darkMode ? 'dark-mode' : ''}`}>
      <Header handleToggleDarkMode={setDarkMode} />
      <Search handleSearchNote={setSearchText} />
      <NotesList 
        notes={notes.filter((note) => note.text.toLowerCase().includes(searchText))} 
        handleAddNote={addNote} 
        handleDeleteNote={deleteNote} 
      />
    </div>
  );
};

export default App;
