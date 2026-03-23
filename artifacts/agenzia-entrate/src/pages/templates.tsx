import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useTemplates } from "@/hooks/use-api-wrapper";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileSpreadsheet, ShieldCheck, FileSignature, Loader2, Pencil, ClipboardList } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

function getPreviewPath(name: string, category: string): string | null {
  const n = name.toLowerCase();
  const c = category.toLowerCase();
  if (n.includes("crs") || c.includes("crs")) return "/form-crs";
  if (n.includes("sid") || c.includes("sid")) return "/form-sid";
  return null;
}

export default function Templates() {
  const { data: templates, isLoading } = useTemplates();
  const [search, setSearch] = useState("");

  const filtered = templates?.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.description.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const handlePreview = (e: React.MouseEvent, name: string, category: string, id: number) => {
    e.preventDefault();
    const path = getPreviewPath(name, category);
    if (path) {
      window.open(path, "_blank");
    } else {
      window.open(`/api/templates/${id}/download`, "_blank");
    }
  };

  const handleDownload = (e: React.MouseEvent, name: string, category: string, id: number) => {
    e.preventDefault();
    const previewPath = getPreviewPath(name, category);
    if (previewPath) {
      window.open(previewPath + "?print=1", "_blank");
    } else {
      const link = document.createElement("a");
      link.href = `/api/templates/${id}/download`;
      link.download = "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Modelli e Template Ufficiali</h1>
          <p className="text-gray-500 mt-1">Archivio modelli standardizzati approvati dall'Agenzia delle Entrate</p>
        </div>
        <div className="w-full md:w-80">
          <Input
            placeholder="Cerca template (es. F24, Modello 730)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-white shadow-sm border-gray-300"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="w-10 h-10 animate-spin text-[#003399] mb-4" />
          <p className="font-medium text-lg">Caricamento archivio template in corso...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered?.map((template) => {
            const previewPath = getPreviewPath(template.name, template.category);
            return (
              <Card key={template.id} className="flex flex-col hover:shadow-lg transition-shadow border-gray-200 overflow-hidden group">
                <CardHeader className="bg-gray-50 border-b border-gray-100 p-5">
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="bg-white font-bold text-[#003399] uppercase tracking-wider text-[10px]">
                      {template.category}
                    </Badge>
                    <FileSpreadsheet className="w-6 h-6 text-green-600 opacity-80" />
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-[#003399] transition-colors">
                    {template.name}
                  </h3>
                </CardHeader>
                <CardContent className="p-5 flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 mb-6 flex-1">
                    {template.description}
                  </p>

                  <div className="space-y-2 mb-2">
                    {template.hasLogo && (
                      <div className="flex items-center gap-2 text-xs font-medium text-blue-800 bg-blue-50 px-3 py-1.5 rounded-sm">
                        <ShieldCheck className="w-4 h-4 text-[#003399]" />
                        Intestazione ufficiale Agenzia Entrate
                      </div>
                    )}
                    {template.hasSignature && (
                      <div className="flex items-center gap-2 text-xs font-medium text-amber-800 bg-amber-50 px-3 py-1.5 rounded-sm">
                        <FileSignature className="w-4 h-4 text-[#b38f00]" />
                        Predisposto per firma digitale (PAdES)
                      </div>
                    )}
                    {previewPath && (
                      <div className="flex items-center gap-2 text-xs font-medium text-green-800 bg-green-50 px-3 py-1.5 rounded-sm">
                        <Eye className="w-4 h-4 text-green-700" />
                        Modulo ufficiale da compilare
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="p-5 pt-0 flex gap-2 flex-wrap">
                  <Button
                    variant="outline"
                    className="flex-1 text-[#003399] border-[#003399] hover:bg-[#003399] hover:text-white text-xs"
                    onClick={(e) => handlePreview(e, template.name, template.category, template.id)}
                  >
                    <Eye className="w-3.5 h-3.5 mr-1" /> Anteprima
                  </Button>
                  {previewPath && (
                    <Button
                      variant="outline"
                      className="flex-1 text-green-700 border-green-600 hover:bg-green-50 text-xs"
                      onClick={() => window.open(previewPath + "?demo=1", "_blank")}
                      title="Apri il modulo con dati di esempio già compilati"
                    >
                      <ClipboardList className="w-3.5 h-3.5 mr-1" /> Esempio
                    </Button>
                  )}
                  <Button
                    variant="gov"
                    className="flex-1 text-xs"
                    onClick={(e) => handleDownload(e, template.name, template.category, template.id)}
                  >
                    <Download className="w-3.5 h-3.5 mr-1" /> Scarica
                  </Button>
                </CardFooter>
              </Card>
            );
          })}

          {filtered?.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-dashed rounded-lg">
              Nessun template trovato per "{search}".
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
