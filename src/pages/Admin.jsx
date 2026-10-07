import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Loader2, Lock, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { formatApiError } from "../lib/api";
import { Logo } from "../components/Logo";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { LeadsTab } from "../components/admin/LeadsTab";
import { ProjectsTab } from "../components/admin/ProjectsTab";
import { ClientsTab } from "../components/admin/ClientsTab";
import { SettingsTab } from "../components/admin/SettingsTab";

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Bem-vindo ao painel Engenharia FL");
    } catch (err) {
      toast.error("Falha no login", { description: formatApiError(err) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="blueprint-grid-dark flex min-h-screen items-center justify-center bg-navy-deep px-5">
      <form
        onSubmit={submit}
        data-testid="admin-login-form"
        className="w-full max-w-md rounded-sm border border-white/10 bg-navy-card p-8 shadow-2xl sm:p-10"
      >
        <Logo light />
        <h1 className="mt-8 font-heading text-2xl font-bold text-white">Painel Administrativo</h1>
        <p className="mt-2 text-sm text-slate-400">Acesso restrito à equipe Engenharia FL.</p>
        <div className="mt-8 space-y-5">
          <div>
            <Label htmlFor="admin-email" className="text-slate-300">E-mail</Label>
            <Input
              id="admin-email"
              data-testid="admin-email-input"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@engenhariafl.com.br"
              className="mt-1.5 border-white/15 bg-navy-deep text-white placeholder:text-slate-500"
            />
          </div>
          <div>
            <Label htmlFor="admin-password" className="text-slate-300">Senha</Label>
            <Input
              id="admin-password"
              data-testid="admin-password-input"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="mt-1.5 border-white/15 bg-navy-deep text-white placeholder:text-slate-500"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            data-testid="admin-login-submit"
            className="h-12 w-full rounded-sm bg-blaze font-mono text-xs font-semibold uppercase tracking-wider text-white hover:bg-blaze-dark"
          >
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </div>
        <Link to="/" data-testid="admin-back-to-site" className="mt-6 block text-center font-mono text-xs uppercase tracking-wider text-slate-500 transition-colors hover:text-blaze">
          ← Voltar ao site
        </Link>
      </form>
    </div>
  );
};

const Admin = () => {
  const { user, logout } = useAuth();

  if (user === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-deep" data-testid="admin-loading">
        <Loader2 className="h-8 w-8 animate-spin text-blaze" />
      </div>
    );
  }

  if (!user) return <LoginForm />;

  return (
    <div className="min-h-screen bg-slate-100" data-testid="admin-dashboard">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <div className="flex items-center gap-4">
            <Logo compact />
            <span className="hidden rounded-sm border border-orange-200 bg-blaze-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-blaze-dark sm:inline">
              Painel Admin
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-slate-500 sm:inline">{user.email}</span>
            <a
              href="https://engenhariafl.com.br/"
              data-testid="admin-view-site"
              className="rounded-sm border border-slate-300 px-4 py-2 font-mono text-xs uppercase tracking-wider text-navy transition-colors hover:bg-slate-50"
>
            Ver site
</a>
            <Button
              variant="outline"
              onClick={logout}
              data-testid="admin-logout-button"
              className="rounded-sm font-mono text-xs uppercase tracking-wider"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        <Tabs defaultValue="leads">
          <TabsList data-testid="admin-tabs" className="mb-8 flex-wrap">
            <TabsTrigger value="leads" data-testid="admin-tab-leads">Orçamentos</TabsTrigger>
            <TabsTrigger value="projects" data-testid="admin-tab-projects">Projetos / Obras</TabsTrigger>
            <TabsTrigger value="clients" data-testid="admin-tab-clients">Clientes</TabsTrigger>
            <TabsTrigger value="settings" data-testid="admin-tab-settings">Configurações</TabsTrigger>
          </TabsList>
          <TabsContent value="leads"><LeadsTab /></TabsContent>
          <TabsContent value="projects"><ProjectsTab /></TabsContent>
          <TabsContent value="clients"><ClientsTab /></TabsContent>
          <TabsContent value="settings"><SettingsTab /></TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
