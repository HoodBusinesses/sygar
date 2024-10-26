import Home from "./containers/home"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <Home />
    </>
  )
}

export default App
