import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteProvider } from "@/context/SiteContext";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
  const path = window.location.pathname;

  const isAdmin =
    path === "/admin" ||
    path === "/admin/" ||
    path.endsWith("/admin") ||
    path.endsWith("/admin/");

  return (
    <div className="App">
      <SiteProvider>
        {isAdmin ? <Admin /> : <Home />}
        <Toaster position="top-center" richColors closeButton />
      </SiteProvider>
    </div>
  );
}

export default App;
