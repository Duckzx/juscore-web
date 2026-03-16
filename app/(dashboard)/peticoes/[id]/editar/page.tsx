"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import dynamicImport from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  FileText,
  Copy,
  Check,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const PeticaoEditor = dynamicImport(
  () => import("@/components/modules/peticoes/PeticaoEditor").then((m) => m.PeticaoEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  }
);
import {
  getPeticaoById,
  statusConfig,
  tipoConfig,
  templates,
  variaveis,
} from "@/lib/mock-peticoes";

export default function EditarPeticaoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const original = getPeticaoById(id);

  const [titulo, setTitulo] = useState(original?.titulo ?? "");
  const [tipo, setTipo] = useState(original?.tipo ?? "");
  const [cliente, setCliente] = useState(original?.clienteId ?? "");
  const [processo, setProcesso] = useState(original?.processo ?? "");
  const [conteudo, setConteudo] = useState(original?.conteudo ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [copiedVar, setCopiedVar] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(true);
  const [showVariaveis, setShowVariaveis] = useState(true);

  if (!original) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <FileText className="w-12 h-12 text-muted-foreground/30" />
        <h2 className="text-xl font-semibold">Petição não encontrada</h2>
        <Button variant="outline" onClick={() => router.push("/peticoes")} className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Button>
      </div>
    );
  }

  const statusInfo = statusConfig[original.status as keyof typeof statusConfig];

  const handleSave = async (novoStatus: "rascunho" | "revisao" | "finalizada") => {
    if (!titulo.trim()) {
      toast.error("O título é obrigatório.");
      return;
    }
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1200));
    setIsSaving(false);
    const labels = { rascunho: "rascunho", revisao: "em revisão", finalizada: "finalizada" };
    toast.success(`Petição salva como ${labels[novoStatus]}!`);
    setTimeout(() => router.push(`/peticoes/${id}`), 800);
  };

  const handleCopyVariable = (varName: string) => {
    navigator.clipboard.writeText(varName).then(() => {
      setCopiedVar(varName);
      toast.success(`Variável ${varName} copiada!`);
      setTimeout(() => setCopiedVar(null), 2000);
    });
  };

  const handleApplyTemplate = (templateConteudo: string) => {
    setConteudo(templateConteudo);
    toast.success("Template aplicado!", {
      description: "O conteúdo do editor foi substituído pelo template.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight">Editar Petição</h1>
              <Badge variant="outline" className={`text-xs ${statusInfo.className}`}>
                {statusInfo.label}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{original.cliente}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => router.push(`/peticoes/${id}`)}
          >
            <Eye className="w-4 h-4" />
            Visualizar
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave("rascunho")}
            disabled={isSaving}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => handleSave("finalizada")}
            disabled={isSaving || !titulo}
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            {isSaving ? "Salvando..." : "Finalizar"}
          </Button>
        </div>
      </motion.div>

      {/* Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor — 2 colunas */}
        <div className="lg:col-span-2 space-y-4">
          {/* Metadados */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Informações da Petição</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="titulo">Título *</Label>
                  <Input
                    id="titulo"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                    placeholder="Ex: Petição Inicial - Ação de Cobrança"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tipo *</Label>
                    <Select value={tipo} onValueChange={setTipo}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(tipoConfig).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Cliente</Label>
                    <Select value={cliente} onValueChange={setCliente}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o cliente" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Maria Oliveira Santos</SelectItem>
                        <SelectItem value="2">João Carlos Silva</SelectItem>
                        <SelectItem value="3">Ana Paula Costa</SelectItem>
                        <SelectItem value="4">Pedro Henrique Almeida</SelectItem>
                        <SelectItem value="5">Juliana Ferreira Santos</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processo">Número do Processo</Label>
                  <Input
                    id="processo"
                    value={processo}
                    onChange={(e) => setProcesso(e.target.value)}
                    placeholder="0000000-00.0000.0.00.0000"
                    className="font-mono"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Editor de texto */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Conteúdo da Petição</CardTitle>
                <CardDescription>
                  Use a barra de ferramentas para formatar o texto. Variáveis como{" "}
                  <code className="text-xs bg-muted px-1 py-0.5 rounded">{"{{nome_cliente}}"}</code>{" "}
                  serão substituídas automaticamente.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <PeticaoEditor
                  content={conteudo}
                  onChange={setConteudo}
                  placeholder="Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a)..."
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Painel lateral — 1 coluna */}
        <div className="space-y-4">
          {/* Templates */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardHeader
                className="cursor-pointer select-none"
                onClick={() => setShowTemplates(!showTemplates)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    Templates
                  </CardTitle>
                  {showTemplates ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <CardDescription>Clique para aplicar um modelo</CardDescription>
              </CardHeader>

              {showTemplates && (
                <CardContent className="space-y-2 pt-0">
                  {templates.map((tpl) => (
                    <button
                      key={tpl.id}
                      onClick={() => handleApplyTemplate(tpl.conteudo)}
                      className="w-full flex items-center gap-2 px-3 py-2.5 rounded-lg border border-border text-sm text-left hover:bg-muted/60 hover:border-primary/40 transition-all group"
                    >
                      <FileText className="w-3.5 h-3.5 text-muted-foreground group-hover:text-purple-500 shrink-0 transition-colors" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{tpl.nome}</p>
                        <p className="text-xs text-muted-foreground">{tipoConfig[tpl.tipo]}</p>
                      </div>
                    </button>
                  ))}
                </CardContent>
              )}
            </Card>
          </motion.div>

          {/* Variáveis automáticas */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
            <Card>
              <CardHeader
                className="cursor-pointer select-none"
                onClick={() => setShowVariaveis(!showVariaveis)}
              >
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <span className="text-amber-500 font-mono text-base">{"{}"}</span>
                    Variáveis
                  </CardTitle>
                  {showVariaveis ? (
                    <ChevronDown className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  )}
                </div>
                <CardDescription>Clique para copiar e inserir no texto</CardDescription>
              </CardHeader>

              {showVariaveis && (
                <CardContent className="space-y-1.5 pt-0">
                  {variaveis.map((v) => (
                    <div
                      key={v.nome}
                      className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-md bg-muted/50 hover:bg-muted transition-colors"
                    >
                      <div className="min-w-0">
                        <code className="text-xs font-mono text-amber-600 dark:text-amber-400">
                          {v.nome}
                        </code>
                        <p className="text-xs text-muted-foreground truncate">{v.descricao}</p>
                      </div>
                      <button
                        onClick={() => handleCopyVariable(v.nome)}
                        className="shrink-0 w-7 h-7 flex items-center justify-center rounded hover:bg-background transition-colors"
                        title="Copiar variável"
                      >
                        {copiedVar === v.nome ? (
                          <Check className="w-3.5 h-3.5 text-green-500" />
                        ) : (
                          <Copy className="w-3.5 h-3.5 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </motion.div>

          {/* Status atual */}
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Alterar Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(["rascunho", "revisao", "finalizada"] as const).map((s) => {
                  const info = statusConfig[s];
                  const isAtual = original.status === s;
                  return (
                    <button
                      key={s}
                      onClick={() => !isAtual && handleSave(s)}
                      disabled={isAtual || isSaving}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg border text-sm transition-all ${
                        isAtual
                          ? `${info.className} border-current font-medium cursor-default`
                          : "border-border hover:bg-muted/60 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          s === "rascunho"
                            ? "bg-gray-400"
                            : s === "revisao"
                            ? "bg-amber-400"
                            : "bg-blue-400"
                        }`}
                      />
                      {info.label}
                      {isAtual && (
                        <span className="ml-auto text-xs opacity-60">atual</span>
                      )}
                    </button>
                  );
                })}
                <Separator />
                <button
                  onClick={() => handleSave("finalizada")}
                  disabled={isSaving}
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg border border-green-300 bg-green-50 dark:bg-green-950/20 dark:border-green-800 text-green-700 dark:text-green-400 text-sm hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors font-medium"
                >
                  <Send className="w-3.5 h-3.5" />
                  Finalizar e salvar
                </button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
