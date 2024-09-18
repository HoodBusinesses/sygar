'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Ensure the language is set correctly on the client side
    if (typeof window !== 'undefined') {
      const language = localStorage.getItem('i18nextLng') || 'en';
      i18n.changeLanguage(language);
    }
  }, [i18n]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
  };

  return (
    <main className="min-h-screen bg-gradient-to-blue p-6 flex flex-col">
      <div className="flex min-h-screen p-6"   style={{ backgroundImage: 'url("/images/background.png")' }}>
        <div className="self-start mb-4">
          <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-200"
                  // onClick={() => changeLanguage(i18n.language === 'en' ? 'fr' : i18n.language === 'fr' ? 'ar' : 'en') }
              >
            <GrLanguage className="text-gray-500" />
            <span>English</span>
          </button>
        </div>
        <div className="m-auto  rounded-xl  flex flex-col md:flex-row w-full max-w-4xl">
          <div className="p-6 md:p-10 flex flex-col justify-between w-full md:w-1/2">
            <div>
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                  <Image
                    src={"/images/logo.png"}
                    width={100}
                    height={100}
                    alt=""
                  />
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Nice to see you again, please signin to your account
              </h1>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                Sign In
              </button>
              <p className="text-sm text-gray-600 mt-2">
                We will take you to the browser to log in and then bring you
                back
              </p>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-600">
                You don't have an account yet?{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  Create your account
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="m-auto   flex flex-col md:flex-row w-full max-w-4xl">
          <Image src={"/images/pic.png"} alt="" width={500} height={500} />
        </div>
      </div>
    </main>
  );
}
