import { lazy, Suspense } from "react";
// import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SWRConfig } from "swr";

// import { store } from "./redux/store";
import { PublicRoutes } from "./constants/routes";
import Loading from "./pages/Loading/Loading";

const Landing = lazy(() => import("./pages/Lading/Landing"));

function App() {
  return (
    <SWRConfig value={{ suspense: true, revalidateOnFocus: false }}>
      <Suspense fallback={<Loading />}>
        {/* <Provider store={store}> */}
          <BrowserRouter>
            <Routes>
              <Route index path="/" element={<Landing />} />
              <Route index path={PublicRoutes.LANDING} element={<Landing />} />
              <Route path="*" element={<>PAGE NOT FOUNT</>} />
            </Routes>
          </BrowserRouter>
        {/* </Provider> */}
      </Suspense>
    </SWRConfig>
  );
}

export default App;
