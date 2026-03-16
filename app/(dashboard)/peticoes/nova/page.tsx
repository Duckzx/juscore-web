"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import dynamicImport from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Send, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

const PeticaoEditor = dynamicImport(
  () => import("@/components/modules/peticoes/PeticaoEditor").then((m) => m.PeticaoEditor),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[500px] w-full rounded-lg" />,
  }
);

export default function NovaPeticaoPage() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [cliente, setCliente] = useState("");
  const [processo, setProcesso] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (status: "rascunho" | "revisao" | "finalizada") => {
    setIsSaving(true);

    try {
      // Simular salvamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const statusLabels = {
        rascunho: "rascunho",
        revisao: "em revisão",
        finalizada: "finalizada",
      };

      toast.success(`Petição salva como ${statusLabels[status]}!`, {
        description: "Você pode continuar editando a qualquer momento.",
      });

      // Redirecionar após salvar
      setTimeout(() => {
        router.push("/peticoes");
      }, 1000);
    } catch (error) {
      toast.error("Erro ao salvar petição", {
        description: "Tente novamente mais tarde.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nova Petição</h1>
            <p className="text-muted-foreground">
              Crie uma nova petição com automação inteligente
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => handleSave("rascunho")}
            disabled={isSaving}
          >
            <Save className="w-4 h-4 mr-2" />
            Salvar Rascunho
          </Button>
          <Button
            onClick={() => handleSave("finalizada")}
            disabled={isSaving || !titulo || !tipo}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSaving ? "Salvando..." : "Finalizar"}
          </Button>
        </div>
      </div>

      {/* Conteúdo Principal */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Editor (2/3) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações da Petição</CardTitle>
              <CardDescription>
                Preencha os dados básicos da petição
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="titulo">Título da Petição *</Label>
                <Input
                  id="titulo"
                  placeholder="Ex: Petição Inicial - Ação de Cobrança"
                  value={titulo}
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tipo">Tipo *</Label>
                  <Select value={tipo} onValueChange={setTipo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="inicial">Inicial</SelectItem>
                      <SelectItem value="contestacao">Contestação</SelectItem>
                      <SelectItem value="replica">Réplica</SelectItem>
                      <SelectItem value="manifestacao">Manifestação</SelectItem>
                      <SelectItem value="recurso">Recurso</SelectItem>
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cliente">Cliente</Label>
                  <Select value={cliente} onValueChange={setCliente}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o cliente" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Maria Oliveira Santos</SelectItem>
                      <SelectItem value="2">João Carlos Silva</SelectItem>
                      <SelectItem value="3">Ana Paula Costa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="processo">Número do Processo</Label>
                <Input
                  id="processo"
                  placeholder="0000000-00.0000.0.00.0000"
                  value={processo}
                  onChange={(e) => setProcesso(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Editor de Texto */}
          <Card>
            <CardHeader>
              <CardTitle>Conteúdo da Petição</CardTitle>
              <CardDescription>
                Escreva ou cole o conteúdo da petição
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PeticaoEditor
                content={conteudo}
                onChange={setConteudo}
                placeholder="Excelentíssimo(a) Senhor(a) Doutor(a) Juiz(a) de Direito da ... Vara ..."
              />
            </CardContent>
          </Card>
        </div>

        {/* Painel Lateral (1/3) */}
        <div className="space-y-6">
          {/* Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full gap-2">
                <Eye className="w-4 h-4" />
                Visualizar PDF
              </Button>
            </CardContent>
          </Card>

          {/* Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Templates</CardTitle>
              <CardDescription>
                Modelos prontos para agilizar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                📄 Petição Inicial Cível
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                📄 Contestação Trabalhista
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                📄 Recurso de Apelação
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                📄 Manifestação Genérica
              </Button>
            </CardContent>
          </Card>

          {/* Variáveis */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Variáveis Automáticas</CardTitle>
              <CardDescription>
                Insira dados do cliente automaticamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <code className="text-xs">{'{{nome_cliente}}'}</code>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Copiar
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <code className="text-xs">{'{{cpf}}'}</code>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Copiar
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <code className="text-xs">{'{{endereco}}'}</code>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Copiar
                </Button>
              </div>
              <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                <code className="text-xs">{'{{numero_processo}}'}</code>
                <Button variant="ghost" size="sm" className="h-6 text-xs">
                  Copiar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ajuda */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 Dica</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>
                Use variáveis automáticas para preenchimento inteligente dos dados.
                Ao selecionar um cliente, seus dados serão inseridos automaticamente.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
