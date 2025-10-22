import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import APIData from "./pages/APIData";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ import ThemeProvider


export default function App() {
  return (
    <ThemeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/api" element={<APIData />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
}
