'use client'
import withAuth from '../hoc/with-auth';

function Home() {
  // // Handler function to save file
  // const handleSaveFile = async () => {
  //   const content = 'Hello, world!'; // Example content to save
  //   if (window.electronAPI && window.electronAPI.saveFile) {
  //     try {
  //       const result = await window.electronAPI.saveFile(content);
  //       console.log(result);
  //     } catch (err) {
  //       console.error('Error saving file', err);
  //     }
  //   } else {
  //     console.error('home.tsx : Electron not available');
  //   }
  // };

  return (
    <div className='text-blue-900'>
      home
      { /*
      <button onClick={handleSaveFile} className='ml-4 p-2 bg-blue-500 text-white rounded'>
        Save File
      </button>
      */}
    </div>
  );
}

export default withAuth(Home)
