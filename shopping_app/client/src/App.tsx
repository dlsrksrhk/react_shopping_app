// App.tsx

import { Route, Routes } from "react-router-dom";
import { CartPage, HomePage, ProductCreatePage, ProductPage, PurchasePage } from "./pages";
import { Layout } from "./components/shared";
import { CookiesProvider } from "react-cookie";

function App() {

  return (
    <Layout>
      <CookiesProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/product/:productId" element={<ProductPage />} />
          <Route path="/purchase/:productId" element={<PurchasePage />} />
          <Route path="/create" element={<ProductCreatePage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </CookiesProvider>
    </Layout>
  );
}

export default App;
