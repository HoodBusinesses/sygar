import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

// Helper to check if running inside Electron
const isElectron = () => {
  return typeof window !== 'undefined' && 
         typeof window.process === 'object' && 
         window.process.type === 'renderer';
};

export default function NextPage() {
  

  // Function to open external links using Electron shell or regular window
  const openExternalLink = (url: string) => {
    console.log(`is elec: ${isElectron()}`);
    console.log('Window:', window);
    console.log('Window.process:', window.process);
    console.log('Window.process.type:', window.process ? window.process.type : 'process not available');

    
    if (isElectron()) {
      console.log("hello shell");
      
      const { shell } = window.require('electron');  // Use window.require to access Electron's shell in renderer process
      shell.openExternal(url);// Use Electron shell to open links
    } else {
      console.log("hello window");
      window.open(url, '_blank');  // Fallback to regular window.open in the browser
    }
  };

  return (
    <div className='flex'>
      
    </div>
  )
}
