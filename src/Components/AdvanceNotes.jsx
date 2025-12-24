import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AdvanceNotes = () => {
  const [note, setNote] = useState({ title: "", description: "" });
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [error,setError]= useState("")
  const [search, setSearch] = useState("");
 

  /* -------- LOCAL STORAGE -------- */  
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes"));
    if (saved) setList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(list));
  }, [list]);

  /* -------- INPUT CHANGE -------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  /* -------- ADD / UPDATE -------- */
  const handleSave = () => {
    if (!note.title.trim() && !note.description.trim()) {
      setError(true)
      return;
    }

    // title auto set
    const finalNote = {
      title: note.title || note.description.split(" ")[0],
      description: note.description,
    };

    if (editIndex === null) {
      setList([...list, finalNote]);
      toast.success("Note added");
    } else {
      const updated = [...list];
      updated[editIndex] = finalNote;
      setList(updated);
      setEditIndex(null);
      toast.success("Note updated");
    }

    setNote({ title: "", description: "" });
    setError(false)
  };

  /* -------- EDIT -------- */
  const handleEdit = (index) => {
    setEditIndex(index);
    setNote(list[index]);
  };

  /* -------- DELETE -------- */
  const handleDelete = (index) => {
    setList(list.filter((_, i) => i !== index));
    setNote({ title: "", description: "" });
    setEditIndex(null);
    toast.success("Note deleted");
  };

  const filteredNotes = list.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) 
     
  );

  return (
   
      <div className="max-w-5xl mx-auto bg-white  rounded shadow flex">

        {/* LEFT */}
        <div className="w-1/3 border-r p-4">
          <div className="flex justify-between mb-3">
            <h2 className="font-bold">Notes</h2>
          
          </div>

          <input
            placeholder="Search..."
            className="w-full mb-3 p-2 border rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {filteredNotes.map((item, index) => (
            <div
              key={index}
              className="p-2 border rounded mb-2 cursor-pointer flex justify-between hover:bg-green-100"
              onClick={() => handleEdit(index)}
            >
              <h4 className="font-semibold">{item.title}</h4>
          

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(index);
                }}
                className="text-white border bg-red-500 p-1 text-sm rounded-lg"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="w-2/3 p-4">
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            className="w-full border p-2 mb-2 rounded"
          />
      
          <textarea
            name="description"
            rows="8"
            placeholder="Write your note..."
            value={note.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
              {error &&
          <div className="flex gap-2"> <p className="border rounded-full text-center w-6 h-6  bg-red-500 text-white font-bold">!</p> Please fill  title or discription </div>
      }


          <button
            onClick={handleSave}
            className="mt-3 bg-blue-500 text-white px-6 py-2 rounded"
          >
            {editIndex === null ? "Add Note" : "Update Note"}
          </button>
        </div>

      </div>
    
  );
};

export default AdvanceNotes;