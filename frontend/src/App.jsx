import JobForm from "./components/JobForm";
import JobList from "./components/JobList";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-4xl font-bold text-blue-700 mb-10 text-center">
        Job Application Tracker
      </h1>
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div className="flex justify-center">
          <JobForm />
        </div>
        <div className="flex justify-center">
          <JobList />
        </div>
      </div>
    </div>
  );
}

export default App;
