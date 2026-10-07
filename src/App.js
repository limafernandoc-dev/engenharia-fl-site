import "@/App.css";
import { Toaster } from "@/components/ui/sonner";
import { SiteProvider } from "@/context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";
import Home from "@/pages/Home";
import Admin from "@/pages/Admin";

function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  const isAdmin =
    path === "/admin" ||
    path.startsWith("/admin/");

  return (
    <div className="App">
      <SiteProvider>
        {isAdmin ? (
          <AuthProvider>
            <Admin />
          </AuthProvider>
        ) : (
          <Home />
        )}

        <Toaster
          position="top-center"
          richColors
          closeButton
        />
      </SiteProvider>
    </div>
  );
}

export default App;
