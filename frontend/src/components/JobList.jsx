import { useEffect, useState } from "react";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/jobs");
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) {
    return <p className="text-center mt-4">Loading jobs...</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-center mt-4">No jobs submitted yet.</p>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white shadow rounded overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              ID
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Company
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Title
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Status
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              Applied Date
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-2 text-sm text-gray-800">{job.id}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{job.company}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{job.title}</td>
              <td className="px-4 py-2 text-sm text-gray-800">{job.status}</td>
              <td className="px-4 py-2 text-sm text-gray-800">
                {job.applied_date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobList;
