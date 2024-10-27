// import Home from "./containers/home"
import OrganizationsListing from "./containers/organizations-listing"

function App(): JSX.Element {
  // const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

  return (
    <>
      <OrganizationsListing />
    </>
  )
}

export default App
