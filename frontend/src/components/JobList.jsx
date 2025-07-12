import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const response = await fetch("http://127.0.0.1:8000/api/jobs");
      const data = await response.json();
      setJobs(data.jobs || []);
    };

    fetchJobs();
  }, []);

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        📄 Tracked Applications
      </h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 ">
            <th className="text-left p-3 font-semibold">#</th>
            <th className="text-left p-3 font-semibold">🏢 Company</th>
            <th className="text-left p-3 font-semibold">💼 Title</th>
            <th className="text-left p-3 font-semibold">📌 Status</th>
            <th className="text-left p-3 font-semibold">📅 Applied</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 py-4">
                No jobs added yet.
              </td>
            </tr>
          ) : (
            jobs.map((job, index) => (
              <tr
                key={job.id}
                className={`border-b hover:bg-gray-50 transition duration-150 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="p-3">{job.id}</td>
                <td className="p-3">{job.company}</td>
                <td className="p-3">{job.title}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-medium ${
                      job.status === "Applied"
                        ? "bg-yellow-100 text-yellow-800"
                        : job.status === "Interviewing"
                        ? "bg-blue-100 text-blue-800"
                        : job.status === "Offered"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {job.status}
                  </span>
                </td>
                <td className="p-3">{job.applied_date}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
