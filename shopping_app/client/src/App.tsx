// App.tsx

import { Route, Routes } from "react-router-dom";
import { HomePage, ProductCreatePage, ProductPage } from "./pages";
import { Layout } from "./components/shared";

function App() {

  return (
    <Layout>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/:productId" element={<ProductPage />} />
        <Route path="/create" element={<ProductCreatePage />} />
      </Routes>
    </Layout>
  );
}

export default App;
