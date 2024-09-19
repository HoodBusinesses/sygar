"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { GrLanguage } from "react-icons/gr";
import { useTranslation } from "react-i18next";
import i18n from "../public/localization/i18n";
import { HiOutlineChevronDown } from "react-icons/hi";



export default function HomePage() {
  const { t } = useTranslation();
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    // Ensure the language is set correctly on the client side
    if (typeof window !== 'undefined') {
      const storedLanguage = localStorage.getItem('i18nextLng') || 'en';
      i18n.changeLanguage(storedLanguage);
      setLanguage(storedLanguage);
    }
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('i18nextLng', lng);
    setLanguage(lng);
  };

  if (!language) {
    // Render a loading state until the language is set
    return <div>{t('Loading...')}</div>;
  }

  return (
      <div
        className="flex min-h-screen p-6"
        style={{ backgroundImage: 'url("/images/background.png")' }}
      >
        <div className="self-start mb-4">
          <button
            className="flex items-center space-x-1 text-gray-500 hover:text-gray-700"
            onClick={() =>
              changeLanguage(
                i18n.language === "en"
                  ? "fr"
                  : i18n.language === "fr"
                    ? "ar"
                    : "en"
              )
            }
          >
            <GrLanguage className="text-gray-500" />
            <span>{t("language")}</span>
            <HiOutlineChevronDown />
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
                {t('welcome')}
              </h1>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300">
                {t('signin')}
              </button>
              <p className="text-sm text-gray-600 mt-2">
                {t('paragraph')}
              </p>
            </div>
            <div className="mt-8">
              <p className="text-sm text-gray-600">
                {t('dontHaveAccount')}{" "}
                <a href="#" className="text-indigo-600 hover:underline">
                  {t('create')}
                </a>
              </p>
            </div>
          </div>
        </div>
        <div className="m-auto   flex flex-col md:flex-row w-full max-w-4xl">
          <Image src={"/images/pic.png"} alt="" width={500} height={500} />
        </div>
      </div>
  );
}
