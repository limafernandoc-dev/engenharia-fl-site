import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteProvider } from "@/context/SiteContext";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="App">
      <SiteProvider>
        <Home />
        <Toaster position="top-center" richColors closeButton />
      </SiteProvider>
    </div>
  );
}

export default App;
