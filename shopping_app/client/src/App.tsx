// App.tsx

import { Route, Routes } from "react-router-dom";
import { HomePage, ProductCreatePage, ProductPage } from "./pages";

function App() {
  
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/:productId" element={<ProductPage />} />
      <Route path="/create" element={<ProductCreatePage />} />
    </Routes>
  );
}

export default App;
