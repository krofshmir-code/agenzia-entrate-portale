import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import Templates from "@/pages/templates";
import DocumentDetail from "@/pages/document-detail";
import CRS from "@/pages/crs";
import FormSID from "@/pages/form-sid";
import FormCRS from "@/pages/form-crs";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/dashboard/pdf" component={Dashboard} />
      <Route path="/dashboard/excel" component={Dashboard} />
      <Route path="/dashboard/stats" component={Dashboard} />
      <Route path="/templates" component={Templates} />
      <Route path="/documents/:id" component={DocumentDetail} />
      <Route path="/crs" component={CRS} />
      <Route path="/form-sid" component={FormSID} />
      <Route path="/form-crs" component={FormCRS} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
