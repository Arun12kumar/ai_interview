import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { MainLayout } from "./layout/MainLayout";
import { AiChatPage } from "./pages/AiChatPage";
import { SystemDesignPage } from "./pages/SystemDesignPage";
import { NewInterviewPage } from "./pages/NewInterviewPage";

// Simulated Auth Context/State
const isAuthenticated = true; // In a real app, this comes from a hook like useAuth()

// ── Private Route Wrapper ──
function PrivateRoute({ children }: { children: React.ReactNode }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

// ── Public Route Wrapper ──
function PublicRoute({ children }: { children: React.ReactNode }) {
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ── Public Routes ── */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <div className="flex h-[100dvh] w-full items-center justify-center bg-[#1d1721] text-white">
                <div className="flex flex-col items-center gap-4">
                  <h1 className="text-3xl font-medium" style={{ fontFamily: "Playfair Display, serif" }}>AI Interview</h1>
                  <p className="text-white/60">Login Page Placeholder</p>
                </div>
              </div>
            </PublicRoute>
          } 
        />

        {/* ── Private Routes (Wrapped in MainLayout) ── */}
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          {/* Default redirect to chat */}
          <Route index element={<Navigate to="/chat" replace />} />
          
          <Route path="chat" element={<AiChatPage />} />
          
          <Route path="system" element={<SystemDesignPage />} />

          <Route path="new" element={<NewInterviewPage />} />
        </Route>

        {/* Catch-all 404 Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
