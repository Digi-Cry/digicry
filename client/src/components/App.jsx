import { Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;
