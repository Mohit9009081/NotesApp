import { Toaster } from 'react-hot-toast'
import AdvanceNotes from './Components/AdvanceNotes'

const App = () => {
  return (
    <>
      <div>
        <AdvanceNotes />
        <Toaster position='top-center' />
      </div>

    </>
  )
}

export default App