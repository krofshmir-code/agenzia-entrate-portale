import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useDocuments, useAddDocument, useRemoveDocument, useDashboardStats } from "@/hooks/use-api-wrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, FileSpreadsheet, Download, Trash2, Plus, Search, FileUp, Loader2, BarChart2, Eye } from "lucide-react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: documents, isLoading: docsLoading } = useDocuments();
  const removeMutation = useRemoveDocument();
  const addMutation = useAddDocument();
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    category: "Fiscale",
    type: "pdf" as "pdf" | "excel" | "word",
    description: "",
  });

  const filteredDocs = documents?.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doc.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || doc.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (id: number) => {
    if (confirm("Sei sicuro di voler eliminare questo documento ufficiale?")) {
      try {
        await removeMutation.mutateAsync({ id });
        toast({ title: "Documento eliminato", description: "L'operazione è stata completata con successo." });
      } catch (err) {
        toast({ variant: "destructive", title: "Errore", description: "Impossibile eliminare il documento." });
      }
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addMutation.mutateAsync({ data: formData });
      setIsAddOpen(false);
      setFormData({ title: "", category: "Fiscale", type: "pdf", description: "" });
      toast({ title: "Documento creato", description: "Il nuovo documento è stato caricato nel SID." });
    } catch (err) {
      toast({ variant: "destructive", title: "Errore", description: "Errore durante la creazione del documento." });
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-100 text-red-800 border-red-200';
      case 'excel': return 'bg-green-100 text-green-800 border-green-200';
      case 'word': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold text-gray-900">Pannello di Controllo SID</h1>
          <p className="text-gray-500 mt-1">Gestione flussi informativi e documenti ufficiali</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger asChild>
            <Button variant="gov" className="gap-2">
              <Plus className="w-4 h-4" /> Nuovo Documento
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-display text-[#003399]">Carica Documento SID</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo Documento</Label>
                <Input 
                  id="title" 
                  value={formData.title} 
                  onChange={e => setFormData({...formData, title: e.target.value})} 
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Formato</Label>
                  <Select value={formData.type} onValueChange={(v: any) => setFormData({...formData, type: v})}>
                    <SelectTrigger><SelectValue placeholder="Seleziona" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="word">Word Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Categoria</Label>
                  <Select value={formData.category} onValueChange={v => setFormData({...formData, category: v})}>
                    <SelectTrigger><SelectValue placeholder="Seleziona" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Fiscale">Fiscale</SelectItem>
                      <SelectItem value="Normativa">Normativa</SelectItem>
                      <SelectItem value="Statistica">Statistica</SelectItem>
                      <SelectItem value="Modulistica">Modulistica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <textarea 
                  id="description"
                  className="w-full flex min-h-[80px] rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  required
                />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t">
                <Button type="button" variant="outline" onClick={() => setIsAddOpen(false)}>Annulla</Button>
                <Button type="submit" disabled={addMutation.isPending} variant="gov">
                  {addMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <FileUp className="w-4 h-4 mr-2" />}
                  Conferma e Carica
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      {statsLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1,2,3,4].map(i => <div key={i} className="h-28 bg-gray-200 animate-pulse rounded-lg"></div>)}
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-sm border-blue-100 bg-gradient-to-br from-white to-blue-50">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Documenti Totali</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex items-center justify-between">
              <span className="text-3xl font-bold text-[#003399]">{stats.totalDocuments}</span>
              <FileText className="w-8 h-8 text-blue-200" />
            </CardContent>
          </Card>
          <Card className="shadow-sm border-amber-100 bg-gradient-to-br from-white to-amber-50">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Template Attivi</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex items-center justify-between">
              <span className="text-3xl font-bold text-[#b38f00]">{stats.totalTemplates}</span>
              <FileSpreadsheet className="w-8 h-8 text-amber-200" />
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Download (30g)</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">{stats.recentDownloads}</span>
              <Download className="w-8 h-8 text-gray-200" />
            </CardContent>
          </Card>
          <Card className="shadow-sm">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-medium text-gray-500 uppercase tracking-wider">Categorie</CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4 flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-800">{stats.categories?.length || 0}</span>
              <BarChart2 className="w-8 h-8 text-gray-200" />
            </CardContent>
          </Card>
        </div>
      ) : null}

      {/* Filters & Table */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col md:flex-row justify-between gap-4 bg-gray-50">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input 
              placeholder="Cerca per titolo, descrizione..." 
              className="pl-9 bg-white"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3">
            <Label className="text-gray-500 whitespace-nowrap text-xs uppercase tracking-wider font-bold">Filtra per:</Label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40 bg-white">
                <SelectValue placeholder="Tutti i formati" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i formati</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="word">Word</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 font-semibold">Documento</th>
                <th className="px-6 py-4 font-semibold">Formato</th>
                <th className="px-6 py-4 font-semibold">Categoria</th>
                <th className="px-6 py-4 font-semibold">Data Rilascio</th>
                <th className="px-6 py-4 font-semibold">Dimensione</th>
                <th className="px-6 py-4 font-semibold text-right">Azioni</th>
              </tr>
            </thead>
            <tbody>
              {docsLoading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2 text-[#003399]" />
                    Caricamento documenti...
                  </td>
                </tr>
              ) : filteredDocs?.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Nessun documento trovato corrispondente ai criteri di ricerca.
                  </td>
                </tr>
              ) : (
                filteredDocs?.map((doc) => (
                  <tr key={doc.id} className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-[#003399]">{doc.title}</div>
                      <div className="text-xs text-gray-500 mt-1 line-clamp-1 max-w-md">{doc.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border uppercase tracking-wider", getTypeColor(doc.type))}>
                        {doc.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {doc.category}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {format(new Date(doc.uploadedAt), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {doc.fileSize}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {(doc.category?.toLowerCase().includes("crs") || doc.title?.toLowerCase().includes("crs")) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[#003399] border-[#003399] gap-1 text-xs px-2"
                            onClick={() => window.open("/form-crs", "_blank")}
                            title="Apri modulo CRS da compilare"
                          >
                            <Eye className="w-3.5 h-3.5" /> Modulo
                          </Button>
                        )}
                        {(doc.category?.toLowerCase().includes("sid") && !doc.category?.toLowerCase().includes("crs")) && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-[#003399] border-[#003399] gap-1 text-xs px-2"
                            onClick={() => window.open("/form-sid", "_blank")}
                            title="Apri modulo SID da compilare"
                          >
                            <Eye className="w-3.5 h-3.5" /> Modulo
                          </Button>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8"
                          title="Scarica documento"
                          onClick={() => {
                            const a = document.createElement("a");
                            a.href = `/api/documents/${doc.id}/download`;
                            a.download = "";
                            document.body.appendChild(a);
                            a.click();
                            document.body.removeChild(a);
                          }}
                        >
                          <Download className="w-4 h-4 text-[#003399]" />
                        </Button>
                        <Button variant="outline" size="sm" className="h-8 text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200" onClick={() => handleDelete(doc.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
