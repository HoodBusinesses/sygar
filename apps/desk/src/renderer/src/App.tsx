import Home from "./containers/home"
import Registration from "./containers/Registration"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Registration />
    </>
  )
}

export default App
