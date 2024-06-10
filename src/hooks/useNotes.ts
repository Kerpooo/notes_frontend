import { useState, useCallback, useEffect } from 'react';
import { NoteProps } from '../components/Note';

const useNotes = () => {

    const [notes, setNotes] = useState<NoteProps[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    
    const fetchNotes = useCallback(async () => {
        setLoading(true);
        setError(null);
    
        try {
          const response = await fetch(`http://localhost:5000/notes`);
          if (!response.ok) {
            throw new Error("Failed to fetch notes");
          }
          const data = await response.json();
          setNotes(data);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }, []);
    
      useEffect(() => {
        fetchNotes();
      }, [fetchNotes]);


    return{notes,loading,error}
}


export default useNotes;

