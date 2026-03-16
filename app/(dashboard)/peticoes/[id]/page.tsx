"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Edit,
  Download,
  Send,
  FileText,
  User,
  Scale,
  Calendar,
  Hash,
  Clock,
  CheckCircle2,
  AlertCircle,
  Printer,
  Copy,
  MoreVertical,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { getPeticaoById, statusConfig, tipoConfig } from "@/lib/mock-peticoes";

export default function PeticaoDetalhePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const peticao = getPeticaoById(id);

  if (!peticao) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <FileText className="w-12 h-12 text-muted-foreground/30" />
        <h2 className="text-xl font-semibold">Petição não encontrada</h2>
        <p className="text-sm text-muted-foreground">
          A petição com ID <span className="font-mono">{id}</span> não existe.
        </p>
        <Button variant="outline" onClick={() => router.push("/peticoes")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para petições
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[peticao.status as keyof typeof statusConfig];
  const tipoLabel = tipoConfig[peticao.tipo] ?? peticao.tipo;

  const handleCopyText = () => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = peticao.conteudo;
    navigator.clipboard.writeText(tempDiv.innerText).then(() => {
      toast.success("Texto copiado para a área de transferência");
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleProtocolar = () => {
    toast.success("Petição marcada como protocolada!", {
      description: `Protocolo: PROT-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 99999)).padStart(6, "0")}`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start gap-4"
      >
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mt-1 shrink-0">
          <ArrowLeft className="w-5 h-5" />
        </Button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl font-bold tracking-tight">{peticao.titulo}</h1>
            <Badge variant="outline" className={`text-xs ${statusInfo.className}`}>
              {peticao.status === "rascunho" && <Clock className="w-3 h-3 mr-1" />}
              {peticao.status === "revisao" && <AlertCircle className="w-3 h-3 mr-1" />}
              {(peticao.status === "finalizada" || peticao.status === "protocolada") && (
                <CheckCircle2 className="w-3 h-3 mr-1" />
              )}
              {statusInfo.label}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {tipoLabel} · {peticao.cliente}
            {peticao.processo && ` · ${peticao.processo}`}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/peticoes/${id}/editar`)}
          >
            <Edit className="w-4 h-4" />
            Editar
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyText}>
                <Copy className="w-4 h-4 mr-2" />
                Copiar texto
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handlePrint}>
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </DropdownMenuItem>
              {peticao.status !== "protocolada" && (
                <>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleProtocolar}>
                    <Send className="w-4 h-4 mr-2" />
                    Marcar como protocolada
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Documento principal — 3 colunas */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="lg:col-span-3"
        >
          <Card>
            <CardHeader className="border-b bg-muted/20 print:hidden">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-500" />
                  Conteúdo da Petição
                </CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={handleCopyText}>
                    <Copy className="w-3.5 h-3.5" />
                    Copiar
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-1.5 text-xs" onClick={handlePrint}>
                    <Printer className="w-3.5 h-3.5" />
                    Imprimir
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Área de documento estilo papel */}
              <div className="bg-white dark:bg-zinc-900 min-h-[600px] p-10 rounded-b-xl shadow-inner">
                <div
                  className="prose prose-sm max-w-none dark:prose-invert
                    prose-headings:text-center prose-headings:font-bold
                    prose-h1:text-sm prose-h1:tracking-wide prose-h1:uppercase
                    prose-h2:text-sm prose-h2:mt-6
                    prose-p:text-justify prose-p:leading-relaxed prose-p:text-sm
                    prose-ol:text-sm prose-ul:text-sm
                    font-serif"
                  dangerouslySetInnerHTML={{ __html: peticao.conteudo }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Painel lateral — 1 coluna */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {/* Detalhes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Detalhes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Cliente</p>
                  <p className="font-medium">{peticao.cliente}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Processo</p>
                  <p className="font-mono text-xs font-medium break-all">
                    {peticao.processo ?? "—"}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Tipo</p>
                  <p className="font-medium">{tipoLabel}</p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Criada em</p>
                  <p className="font-medium">
                    {new Date(peticao.createdAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
              <Separator />
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="text-xs text-muted-foreground">Última edição</p>
                  <p className="font-medium">
                    {new Date(peticao.updatedAt).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Protocolo */}
          {peticao.status === "protocolada" && peticao.numeroProtocolo && (
            <Card className="border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20">
              <CardHeader>
                <CardTitle className="text-sm text-green-700 dark:text-green-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Protocolada
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <Hash className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs text-muted-foreground">Nº Protocolo</p>
                    <p className="font-mono font-semibold text-green-700 dark:text-green-400">
                      {peticao.numeroProtocolo}
                    </p>
                  </div>
                </div>
                {peticao.dataProtocolo && (
                  <div className="flex items-start gap-2">
                    <Calendar className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Data</p>
                      <p className="font-medium text-green-700 dark:text-green-400">
                        {new Date(peticao.dataProtocolo + "T00:00:00").toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Ações rápidas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                className="w-full gap-2 justify-start"
                variant="outline"
                onClick={() => router.push(`/peticoes/${id}/editar`)}
              >
                <Edit className="w-4 h-4" />
                Editar petição
              </Button>
              <Button
                className="w-full gap-2 justify-start"
                variant="outline"
                onClick={handleCopyText}
              >
                <Copy className="w-4 h-4" />
                Copiar texto
              </Button>
              <Button
                className="w-full gap-2 justify-start"
                variant="outline"
                onClick={() => toast.info("Exportação de PDF em desenvolvimento.")}
              >
                <Download className="w-4 h-4" />
                Exportar PDF
              </Button>
              {peticao.status !== "protocolada" && (
                <Button
                  className="w-full gap-2 justify-start bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleProtocolar}
                >
                  <Send className="w-4 h-4" />
                  Protocolar
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
