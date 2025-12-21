// src/components/layout/LayoutWrapper.jsx
export default function LayoutWrapper({ children, user }) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16 md:pt-20">
      {children}
      {user && <div className="h-20 md:hidden"></div>}
    </div>
  );
}