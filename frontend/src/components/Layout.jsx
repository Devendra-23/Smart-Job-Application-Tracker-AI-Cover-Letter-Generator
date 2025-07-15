const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-gray-100 to-blue-100 text-gray-800">
      <header className="bg-blue-600 text-white py-4 shadow">
        <h1 className="text-center text-2xl font-bold">
          📋 Job Application Tracker
        </h1>
      </header>
      <main className="p-4 flex justify-center items-start gap-8 flex-col md:flex-row">
        {children}
      </main>
    </div>
  );
};

export default Layout;
