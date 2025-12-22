import { useState } from 'react';
import toast from 'react-hot-toast';

const AdvanceNotes = () => {
  const [note, setNote] = useState({ title: "", description: "" });
  const [list, setList] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editNote, setEditNote] = useState({ title: "", description: "" });
  const [search, setSearch] = useState("");

const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prev) => ({ ...prev, [name]: value }));
  };

  // const add = () => {
  //   if(note.title.trim().length > 0 || note.description.trim().length > 0) {
  //   setList((old) => [...old, note]);
  //   setNote({ title: "", description: "" });

  //   toast("Notes add successfully");
  // }else {
  //   toast.error("Please add title or description");
  // }}

  const add = () => {
  const title = note.title.trim();
  const description = note.description.trim();

  if (title.length === 0 && description.length === 0) {
    toast.error("Please add title or description");
    return;
  }

  const finalNote = {
    title:
      title.length > 0
        ? title
        : description.split(" ")[0],
    description,
  };

  setList((old) => [...old, finalNote]);
  setNote({ title: "", description: "" });
  toast.success("Note added successfully");
};

  const handleDelete = (index) => {
    setList((old) => old.filter((_, i) => i !== index));
    setEditIndex(-1)
    toast("Notes Deleted");
  };

  const handleOnEdit = (index) => {
    setEditIndex(index);
    setEditNote(list[index]);
  };

  const updateOnEdit = () => {
    setList((old) =>
      old.map((item, i) => (i === editIndex ? editNote : item))
    );
    setEditIndex(-1);
    toast("Note updated");
  };

  const filteredNotes = list.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-white bg-opacity-80 shadow-2xl rounded-3xl w-full max-w-5xl flex flex-col md:flex-row overflow-hidden">
        <div className="md:border-r-4 border-pink-300 p-8 flex-1 flex flex-col items-center justify-center">
          <h1 className="mb-8 text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-yellow-500">Notes</h1>
          <input
            type="text"
            placeholder="Search ..."
            className="border-2 border-pink-300 focus:border-purple-500 mb-6 w-full rounded-xl px-4 py-2 text-lg transition-all duration-200 focus:ring-2 focus:ring-purple-300"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex flex-col items-center gap-4 w-full">
            <input
              className="border-2 border-yellow-300 focus:border-pink-400 p-3 rounded-xl w-full text-lg focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Add Title"
            />
            <input
              className="border-2 border-yellow-300 focus:border-pink-400 p-3 rounded-xl w-full text-lg focus:ring-2 focus:ring-yellow-200 transition-all duration-200"
              name="description"
              value={note.description}
              onChange={handleChange}
              placeholder="Add Description"
            />
            <button
              className="bg-gradient-to-r from-purple-500 via-pink-400 to-yellow-400 text-white font-bold rounded-xl text-xl p-3 w-full shadow-lg hover:scale-105 transition-transform duration-200"
              onClick={add}
            >
              ADD
            </button>
          </div>
        </div>
        <div className="flex-1 p-8">
          {filteredNotes.length === 0 ? (
            <p className="text-gray-500 text-center py-8 text-xl font-semibold">No notes yet. Add your first note!</p>
          ) : (
            filteredNotes.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-yellow-200 via-pink-100 to-purple-100 border-2 border-pink-300 shadow-lg p-6 rounded-2xl mb-6">
                <h3 className="font-bold text-2xl text-purple-700 mb-2">{item.title}</h3>
                <p className="text-lg text-gray-700 mb-4">{item.description}</p>
                <div className="flex gap-4">
                  <button
                    className="bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-xl p-2 font-semibold shadow hover:scale-105 transition-transform duration-200"
                    onClick={() => handleOnEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-gradient-to-r from-red-400 to-pink-400 text-white rounded-xl p-2 font-semibold shadow hover:scale-105 transition-transform duration-200"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
          {editIndex > -1 && (
            <div className="mt-8 bg-white bg-opacity-90 border-2 border-purple-300 shadow-xl rounded-2xl p-6">
              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="title"
                  value={editNote.title}
                  onChange={(e) => setEditNote({ ...editNote, title: e.target.value })}
                  placeholder="Edit Title"
                  className="border-2 border-pink-300 p-3 rounded-xl text-lg focus:ring-2 focus:ring-pink-200"
                />
                <input
                  type="text"
                  name="description"
                  value={editNote.description}
                  onChange={(e) => setEditNote({ ...editNote, description: e.target.value })}
                  placeholder="Edit Description"
                  className="border-2 border-pink-300 p-3 rounded-xl text-lg focus:ring-2 focus:ring-pink-200"
                />
                <button
                  className="bg-gradient-to-r from-green-500 to-yellow-400 text-white font-bold rounded-xl p-3 shadow hover:scale-105 transition-transform duration-200"
                  onClick={updateOnEdit}
                >
                  Update
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdvanceNotes;