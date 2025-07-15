import JobForm from "./components/JobForm";
import JobList from "./components/JobList";
import Layout from "./components/Layout";

function App() {
  return (
    <Layout>
      <JobForm />
      <JobList />
    </Layout>
  );
}

export default App;
