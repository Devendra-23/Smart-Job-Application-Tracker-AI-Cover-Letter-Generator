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

  const handleStatusChange = async (id, newStatus) => {
    const response = await fetch(`http://127.0.0.1:8000/api/jobs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();
    console.log("Updated:", data);

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-3xl overflow-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">
        📄 Tracked Applications
      </h2>

      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200 text-gray-700 ">
            <th className="text-left p-3 font-semibold">Sr.No</th>
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
                  <select
                    value={job.status}
                    onChange={(e) => handleStatusChange(job.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-sm font-medium bg-white border ${
                      job.status === "Applied"
                        ? "text-yellow-800 border-yellow-300"
                        : job.status === "Interviewing"
                        ? "text-blue-800 border-blue-300"
                        : job.status === "Offered"
                        ? "text-green-800 border-green-300"
                        : "text-red-800 border-red-300"
                    }`}
                  >
                    <option>Applied</option>
                    <option>Interviewing</option>
                    <option>Rejected</option>
                    <option>Offered</option>
                  </select>
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
