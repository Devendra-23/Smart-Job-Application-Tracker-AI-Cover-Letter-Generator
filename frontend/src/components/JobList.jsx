import { useEffect, useState } from "react";
import { Briefcase, CalendarCheck } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [recentlyUpdatedId, setRecentlyUpdatedId] = useState(null);

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
    toast.success(`Status updated to ${newStatus}`);

    setRecentlyUpdatedId(id);
    setTimeout(() => setRecentlyUpdatedId(null), 1500);

    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.id === id ? { ...job, status: newStatus } : job
      )
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-3xl overflow-auto">
      <h2 className="text-2xl font-bold mb-6 text-blue-800 text-center">
        📄 Tracked Applications
      </h2>

      <div className="flex justify-center gap-4 mb-6 text-sm font-medium">
        <div className="flex gap-4 mb-4 text-sm text-gray-600">
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-yellow-300 mr-1"></span>
            Applied
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-blue-300 mr-1"></span>
            Interviewing
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-green-300 mr-1"></span>
            Offered
          </div>
          <div>
            <span className="inline-block w-3 h-3 rounded-full bg-red-300 mr-1"></span>
            Rejected
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-gray-700">
              <th className="text-left p-3 font-semibold">Sr.No</th>
              <th className="text-left p-3 font-semibold"> Company</th>
              <th className="text-left p-3 font-semibold"> Title</th>
              <th className="text-left p-3 font-semibold"> Status</th>
              <th className="text-left p-3 font-semibold"> Applied</th>
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
                <motion.tr
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.05 }}
                  className={`border-b hover:bg-gray-50 transition duration-150 ${
                    recentlyUpdatedId === job.id
                      ? "bg-green-100"
                      : index % 2 === 0
                      ? "bg-white"
                      : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{job.id}</td>
                  <td className="p-3">{job.company}</td>
                  <td className="p-3">{job.title}</td>
                  <td className="p-3">
                    <select
                      value={job.status}
                      onChange={(e) =>
                        handleStatusChange(job.id, e.target.value)
                      }
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
                </motion.tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default JobList;
