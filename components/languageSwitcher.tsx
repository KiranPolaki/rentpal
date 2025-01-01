"use client";
import React from "react";
import { NextRouter } from "next/router";

interface LanguageSwitcherProps {
  router: NextRouter;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ router }) => {
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedLanguage = event.target.value;
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.set("hl", selectedLanguage);
    window.location.href = `${url.pathname}?${params.toString()}`;
  };

  return (
    <select onChange={handleLanguageChange}>
      <option value="en">English</option>
      <option value="te">Telugu</option>
      <option value="hi">Hindi</option>
    </select>
  );
};

export default LanguageSwitcher;
