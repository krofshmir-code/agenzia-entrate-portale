import { useParams, Link } from "wouter";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { useDocument } from "@/hooks/use-api-wrapper";
import { Loader2, ArrowLeft, Download, FileText, Calendar, HardDrive, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function DocumentDetail() {
  const { id } = useParams();
  const documentId = parseInt(id || "0", 10);
  
  const { data: doc, isLoading, isError } = useDocument(documentId);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#003399]" />
        </div>
      </DashboardLayout>
    );
  }

  if (isError || !doc) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Documento non trovato</h2>
          <p className="text-gray-600 mb-6">Il documento richiesto non esiste o è stato rimosso dal sistema.</p>
          <Link href="/dashboard" className="text-[#003399] hover:underline font-medium">
            ← Torna alla Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link href="/dashboard" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-[#003399] transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" /> Torna all'elenco documenti
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="bg-[#003399] text-white p-8">
          <div className="flex flex-wrap gap-2 items-center mb-4">
            <span className="uppercase text-xs font-bold tracking-wider bg-white/20 px-3 py-1 rounded-sm">
              {doc.category}
            </span>
            <span className="uppercase text-xs font-bold tracking-wider bg-white/20 px-3 py-1 rounded-sm">
              {doc.type.toUpperCase()}
            </span>
          </div>
          <h1 className="text-3xl font-display font-bold leading-tight mb-2">{doc.title}</h1>
          <p className="text-blue-100 max-w-3xl">ID Protocollo Sistema: SID-{doc.id.toString().padStart(6, '0')}</p>
        </div>

        <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold text-gray-900 mb-3 border-b pb-2">Dettagli del documento</h3>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {doc.description}
              </p>
            </section>

            {doc.tags && doc.tags.length > 0 && (
              <section>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Tag Associati</h4>
                <div className="flex flex-wrap gap-2">
                  {doc.tags.map(tag => (
                    <span key={tag} className="inline-flex items-center text-sm bg-gray-100 text-gray-700 px-3 py-1 rounded-full border border-gray-200">
                      <Tag className="w-3 h-3 mr-1.5 opacity-50" /> {tag}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 h-fit space-y-6">
            <h4 className="font-bold text-[#003399] text-lg">Metadati</h4>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Data Rilascio</p>
                  <p className="text-gray-900 font-medium">{format(new Date(doc.uploadedAt), 'dd MMMM yyyy, HH:mm')}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <HardDrive className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Dimensione File</p>
                  <p className="text-gray-900 font-medium">{doc.fileSize}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Formato</p>
                  <p className="text-gray-900 font-medium uppercase">{doc.type}</p>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-gray-200">
              <Button variant="gov" className="w-full text-lg h-14" asChild>
                <a href={doc.downloadUrl} target="_blank" rel="noreferrer">
                  <Download className="w-5 h-5 mr-2" /> Scarica Allegato
                </a>
              </Button>
              <p className="text-center text-xs text-gray-500 mt-3">
                Il download verrà tracciato nel log di sistema dell'operatore.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
