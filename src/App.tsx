import { PostHogProvider } from 'posthog-js/react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

const App = () => (
  <PostHogProvider
    apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY}
    options={options}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </PostHogProvider>
);

export default App;
