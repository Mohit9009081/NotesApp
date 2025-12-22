
import { Toaster } from 'react-hot-toast'
import AdvanceNotes from './Components/AdvanceNotes'
import { useState } from 'react'


const App = () => {

const[show, setShow] = useState(false)

  return (
  
<>

 <div className="h-auto p-2 gap-4 w-screen flex flex-col items-center justify-center bg-gray-100">
  <button
    disabled={show}
    onClick={() => setShow(true)}
    className={`px-8 py-4 text-6xl font-bold rounded-lg border
      transition-all duration-300
      ${
        show
          ? "opacity-30 cursor-not-allowed bg-gray-300"
          : "bg-blue-600 text-white hover:bg-blue-700"
      }`}
  >
  +
  </button>

  No notes yet , add your first notes
</div>

   {show &&  <div>

<AdvanceNotes/>
<Toaster position='top-center'/>

    </div>}
  
</>
  )
}

export default App