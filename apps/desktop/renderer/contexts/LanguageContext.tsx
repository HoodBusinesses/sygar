import React, { createContext, useContext, useState, useEffect } from "react";
import i18n from "../public/localization/i18n";

type LanguageContextType = {
	language: string;
	changeLanguage: (lng: string) => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
	undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
	const [language, setLanguage] = useState<string>("en");

	useEffect(() => {
		const storedLanguage = localStorage.getItem("i18nextLng") || "en";
		i18n.changeLanguage(storedLanguage);
		setLanguage(storedLanguage);
	}, []);

	const changeLanguage = (lng: string) => {
		i18n.changeLanguage(lng);
		localStorage.setItem("i18nextLng", lng);
		setLanguage(lng);
	};

	return (
		<LanguageContext.Provider value={{ language, changeLanguage }}>
			{children}
		</LanguageContext.Provider>
	);
}

export function useLanguage() {
	const context = useContext(LanguageContext);
	if (context === undefined) 
		throw new Error("useLanguage must be used within a LanguageProvider");
	return context;
}
