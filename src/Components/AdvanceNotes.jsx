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
  <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
    <div className="w-full max-w-5xl bg-white/90 shadow-2xl rounded-3xl flex flex-col md:flex-row overflow-hidden border border-gray-200">
      {/* LEFT: Notes List */}
      <div className="md:w-1/3 w-full border-r border-gray-200 p-6 bg-linear-to-b from-blue-50 to-purple-50">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-extrabold text-2xl text-blue-700 tracking-tight">Notes</h2>
          <span className="bg-blue-200 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold">{list.length}</span>
        </div>
        <input
          placeholder="Search notes..."
          className="w-full mb-5 p-2 border-2 border-blue-200 rounded-xl focus:outline-none focus:border-blue-400 transition"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-400 text-center mt-10">No notes found.</p>
          ) : (
            filteredNotes.map((item, index) => (
              <div
                key={index}
                className={`group p-3 rounded-xl border-2 flex items-center justify-between cursor-pointer transition hover:bg-blue-100/70 ${editIndex === index ? 'border-blue-400 bg-blue-50' : 'border-transparent'}`}
                onClick={() => handleEdit(index)}
              >
                <div className="truncate">
                  <h4 className="font-semibold text-blue-800 truncate max-w-[120px]">{item.title}</h4>
                </div>
                <button
                  onClick={e => { e.stopPropagation(); handleDelete(index); }}
                  className="ml-2 text-xs bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg shadow transition"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
      {/* RIGHT: Note Editor */}
      <div className="md:w-2/3 w-full p-8 flex flex-col justify-center bg-linear-to-b from-pink-50 to-yellow-50">
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-purple-500 to-pink-500 mb-2">Note App</h1>
          <p className="text-gray-500 font-medium">Create, edit, and manage your notes efficiently.</p>
        </div>
        <div className="flex flex-col gap-4">
          <input
            name="title"
            placeholder="Title"
            value={note.title}
            onChange={handleChange}
            className="w-full border-2 border-purple-200 rounded-xl p-3 text-lg focus:outline-none focus:border-purple-400 transition"
          />
          <textarea
            name="description"
            rows="7"
            placeholder="Write your note..."
            value={note.description}
            onChange={handleChange}
            className="w-full border-2 border-purple-200 rounded-xl p-3 text-lg focus:outline-none focus:border-purple-400 transition"
          />
          {error && (
            <div className="flex items-center gap-2 text-red-600 text-sm font-semibold">
              <span className="border rounded-full w-6 h-6 flex items-center justify-center bg-red-500 text-white font-bold">!</span>
              Please fill title or description
            </div>
          )}
          <div className="flex gap-4 mt-2">
            <button
              onClick={handleSave}
              className="bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-2 rounded-xl font-bold shadow transition"
            >
              {editIndex === null ? "Add Note" : "Save"}
            </button>
            {editIndex !== null && (
              <button
                onClick={() => handleDelete(editIndex)}
                className="bg-linear-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-8 py-2 rounded-xl font-bold shadow transition"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default AdvanceNotes;