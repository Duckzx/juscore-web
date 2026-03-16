"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  User,
  Briefcase,
  FileText,
  DollarSign,
  Clock,
  Edit,
  Scale,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useCliente } from "@/hooks/use-clientes";

// ─── Mock data vinculada por clienteId ───────────────────────────────────────

const mockProcessosPorCliente: Record<string, Array<{
  id: string;
  numero: string;
  objeto: string;
  tipo: string;
  status: string;
  vara: string;
  tribunal: string;
  valorCausa: number;
  dataDistribuicao: string;
}>> = {
  "1": [
    {
      id: "p1",
      numero: "1234567-89.2024.8.26.0100",
      objeto: "Ação de Cobrança",
      tipo: "civel",
      status: "em_andamento",
      vara: "1ª Vara Cível",
      tribunal: "TJSP",
      valorCausa: 150000,
      dataDistribuicao: "2024-01-15",
    },
  ],
  "2": [
    {
      id: "p2",
      numero: "9876543-21.2024.5.02.0001",
      objeto: "Reclamação Trabalhista",
      tipo: "trabalhista",
      status: "em_andamento",
      vara: "3ª Vara do Trabalho",
      tribunal: "TRT-2",
      valorCausa: 85000,
      dataDistribuicao: "2024-02-01",
    },
  ],
  "3": [
    {
      id: "p3",
      numero: "5555555-55.2023.8.26.0200",
      objeto: "Indenização por Danos Morais",
      tipo: "civel",
      status: "em_andamento",
      vara: "5ª Vara Cível",
      tribunal: "TJSP",
      valorCausa: 320000,
      dataDistribuicao: "2023-11-10",
    },
  ],
};

const mockHonorariosPorCliente: Record<string, Array<{
  id: string;
  tipo: string;
  valor: number;
  parcelas: number;
  parcelasPagas: number;
  status: string;
  dataVencimento: string;
  observacoes: string;
}>> = {
  "1": [
    {
      id: "h1",
      tipo: "contratual",
      valor: 15000,
      parcelas: 3,
      parcelasPagas: 2,
      status: "parcial",
      dataVencimento: "2026-04-01",
      observacoes: "Pagamento mensal conforme contrato",
    },
  ],
  "2": [
    {
      id: "h2",
      tipo: "contratual",
      valor: 8500,
      parcelas: 1,
      parcelasPagas: 1,
      status: "pago",
      dataVencimento: "2026-02-15",
      observacoes: "",
    },
  ],
  "3": [
    {
      id: "h3",
      tipo: "sucumbencia",
      valor: 32000,
      parcelas: 1,
      parcelasPagas: 0,
      status: "pendente",
      dataVencimento: "2026-05-20",
      observacoes: "Aguardando trânsito em julgado",
    },
  ],
};

// ─── Config labels ────────────────────────────────────────────────────────────

const tipoProcessoConfig: Record<string, { label: string; className: string }> = {
  civel: { label: "Cível", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  trabalhista: { label: "Trabalhista", className: "bg-orange-500/10 text-orange-600 border-orange-200" },
  criminal: { label: "Criminal", className: "bg-red-500/10 text-red-600 border-red-200" },
  tributario: { label: "Tributário", className: "bg-teal-500/10 text-teal-600 border-teal-200" },
};

const statusProcessoConfig: Record<string, { label: string; className: string }> = {
  em_andamento: { label: "Em andamento", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  finalizado: { label: "Finalizado", className: "bg-green-500/10 text-green-600 border-green-200" },
  arquivado: { label: "Arquivado", className: "bg-gray-500/10 text-gray-600 border-gray-200" },
};

const statusHonorarioConfig: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  parcial: { label: "Parcial", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  pago: { label: "Pago", className: "bg-green-500/10 text-green-600 border-green-200" },
};

const estadoCivilLabel: Record<string, string> = {
  solteiro: "Solteiro(a)",
  casado: "Casado(a)",
  divorciado: "Divorciado(a)",
  viuvo: "Viúvo(a)",
  outro: "Outro",
};

const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

const formatDate = (d: Date | string | undefined) => {
  if (!d) return "—";
  return new Date(d).toLocaleDateString("pt-BR");
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClienteDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { data: cliente, isLoading, isError } = useCliente(id);

  const processos = mockProcessosPorCliente[id] ?? [];
  const honorarios = mockHonorariosPorCliente[id] ?? [];

  const totalProcessos = processos.length;
  const totalPeticoes = totalProcessos * 3; // estimativa mock
  const totalDocumentos = totalProcessos * 2 + 2;
  const totalHonorarios = honorarios.reduce((acc, h) => acc + h.valor, 0);

  // ─── Loading state ────────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="w-10 h-10 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-56 rounded-xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-xl" />
      </div>
    );
  }

  // ─── Error / not found state ──────────────────────────────────────────────
  if (isError || !cliente) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <AlertTriangle className="w-12 h-12 text-destructive" />
        <h2 className="text-xl font-semibold">Cliente não encontrado</h2>
        <p className="text-muted-foreground text-sm">
          O cliente com ID <span className="font-mono">{id}</span> não existe ou foi removido.
        </p>
        <Button onClick={() => router.push("/clientes")} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Voltar para clientes
        </Button>
      </div>
    );
  }

  // ─── Timeline mock gerada com base nos dados reais ────────────────────────
  const timeline = [
    ...(processos.map((p) => ({
      id: `t-proc-${p.id}`,
      tipo: "processo",
      titulo: "Processo cadastrado",
      descricao: `${p.numero} — ${p.objeto}`,
      data: p.dataDistribuicao,
      icon: Scale,
      color: "bg-amber-500",
    }))),
    {
      id: "t-cad",
      tipo: "cadastro",
      titulo: "Cliente cadastrado",
      descricao: "Primeiro registro no sistema",
      data: cliente.createdAt.toString(),
      icon: User,
      color: "bg-blue-500",
    },
    ...(honorarios.map((h) => ({
      id: `t-hon-${h.id}`,
      tipo: "financeiro",
      titulo: h.status === "pago" ? "Honorário pago" : "Honorário cadastrado",
      descricao: `${h.tipo === "contratual" ? "Contratual" : "Sucumbência"} — ${formatBRL(h.valor)}`,
      data: h.dataVencimento,
      icon: DollarSign,
      color: "bg-green-500",
    }))),
  ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-4 flex-1">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shrink-0">
            {cliente.nome.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold tracking-tight">{cliente.nome}</h1>
            <p className="text-muted-foreground">
              {cliente.cpf ? `CPF: ${cliente.cpf}` : "CPF não informado"}
              {cliente.profissao && ` · ${cliente.profissao}`}
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Editar
        </Button>
      </motion.div>

      {/* Cards de Informações */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Dados Pessoais */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="w-5 h-5 text-blue-500" />
                Dados Pessoais
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">RG</p>
                <p className="font-medium">{cliente.rg ?? "—"}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Data de Nascimento</p>
                <p className="font-medium">{formatDate(cliente.dataNascimento)}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Estado Civil</p>
                <p className="font-medium">
                  {cliente.estadoCivil ? estadoCivilLabel[cliente.estadoCivil] ?? cliente.estadoCivil : "—"}
                </p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Profissão</p>
                <p className="font-medium">{cliente.profissao ?? "—"}</p>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Naturalidade</p>
                <p className="font-medium">{cliente.naturalidade ?? "—"}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contato */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Phone className="w-5 h-5 text-green-500" />
                Contato
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium text-sm break-all">{cliente.email ?? "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Telefone</p>
                  <p className="font-medium text-sm">{cliente.telefone ?? "—"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Endereço</p>
                  <p className="font-medium text-sm">{cliente.endereco ?? "—"}</p>
                </div>
              </div>
              <Separator />
              <div>
                <p className="text-xs text-muted-foreground">Cliente desde</p>
                <p className="font-medium text-sm">{formatDate(cliente.createdAt)}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Resumo */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-purple-500" />
                Resumo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { label: "Processos", value: totalProcessos, icon: Scale, color: "text-amber-600 bg-amber-500/10" },
                { label: "Petições", value: totalPeticoes, icon: FileText, color: "text-purple-600 bg-purple-500/10" },
                { label: "Documentos", value: totalDocumentos, icon: FileText, color: "text-blue-600 bg-blue-500/10" },
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-md flex items-center justify-center ${color}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-muted-foreground">{label}</span>
                  </div>
                  <Badge variant="outline" className="font-mono">{value}</Badge>
                </div>
              ))}
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-md flex items-center justify-center text-green-600 bg-green-500/10">
                    <TrendingUp className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-muted-foreground">Honorários</span>
                </div>
                <Badge className="bg-green-500 font-mono">{formatBRL(totalHonorarios)}</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
            <TabsTrigger value="processos">Processos ({totalProcessos})</TabsTrigger>
            <TabsTrigger value="documentos">Documentos</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>

          {/* Timeline */}
          <TabsContent value="timeline" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Atividades</CardTitle>
                <CardDescription>
                  Linha do tempo com todas as interações e eventos de {cliente.nome}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
                  <div className="space-y-6">
                    {timeline.map((evento, index) => {
                      const Icon = evento.icon;
                      return (
                        <motion.div
                          key={evento.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.08 }}
                          className="relative pl-16"
                        >
                          <div
                            className={`absolute left-3 w-6 h-6 rounded-full ${evento.color} flex items-center justify-center ring-4 ring-background`}
                          >
                            <Icon className="w-3 h-3 text-white" />
                          </div>
                          <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h4 className="font-semibold">{evento.titulo}</h4>
                                <p className="text-sm text-muted-foreground mt-1">{evento.descricao}</p>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground shrink-0">
                                <Clock className="w-3 h-3" />
                                {new Date(evento.data).toLocaleDateString("pt-BR")}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Processos */}
          <TabsContent value="processos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Processos Vinculados</CardTitle>
                <CardDescription>Lista de todos os processos de {cliente.nome}</CardDescription>
              </CardHeader>
              <CardContent>
                {processos.length === 0 ? (
                  <p className="text-muted-foreground text-center py-10">
                    Nenhum processo vinculado a este cliente.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {processos.map((proc, i) => {
                      const tipo = tipoProcessoConfig[proc.tipo];
                      const status = statusProcessoConfig[proc.status];
                      return (
                        <motion.div
                          key={proc.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:shadow-sm transition-shadow"
                        >
                          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                            <Scale className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-mono text-sm font-semibold">{proc.numero}</p>
                              {tipo && (
                                <Badge variant="outline" className={`text-xs ${tipo.className}`}>
                                  {tipo.label}
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mt-0.5">{proc.objeto}</p>
                            <p className="text-xs text-muted-foreground">{proc.vara} · {proc.tribunal}</p>
                          </div>
                          <div className="text-right shrink-0 space-y-1">
                            {status && (
                              <Badge variant="outline" className={`text-xs ${status.className}`}>
                                {status.label}
                              </Badge>
                            )}
                            <p className="text-sm font-semibold">{formatBRL(proc.valorCausa)}</p>
                            <p className="text-xs text-muted-foreground">Em causa</p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentos */}
          <TabsContent value="documentos" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Documentos</CardTitle>
                <CardDescription>Documentos e arquivos anexados</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-muted-foreground">
                  <FileText className="w-10 h-10 opacity-30" />
                  <p className="text-sm">Upload de documentos em desenvolvimento</p>
                  <Button variant="outline" size="sm" disabled>
                    Enviar documento
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Financeiro */}
          <TabsContent value="financeiro" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Honorários e Pagamentos</CardTitle>
                <CardDescription>
                  Controle financeiro de {cliente.nome}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {honorarios.length === 0 ? (
                  <p className="text-muted-foreground text-center py-10">
                    Nenhum honorário registrado para este cliente.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {honorarios.map((hon, i) => {
                      const statusInfo = statusHonorarioConfig[hon.status];
                      return (
                        <motion.div
                          key={hon.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                        >
                          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center shrink-0">
                            <DollarSign className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold text-sm">
                                {hon.tipo === "contratual" ? "Honorários Contratuais" : "Honorários de Sucumbência"}
                              </p>
                              {statusInfo && (
                                <Badge variant="outline" className={`text-xs ${statusInfo.className}`}>
                                  {statusInfo.label}
                                </Badge>
                              )}
                            </div>
                            {hon.observacoes && (
                              <p className="text-xs text-muted-foreground mt-0.5">{hon.observacoes}</p>
                            )}
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                Parcelas: {hon.parcelasPagas}/{hon.parcelas}
                              </span>
                              {hon.parcelas > 1 && (
                                <div className="flex-1 max-w-24 h-1.5 rounded-full bg-muted overflow-hidden">
                                  <div
                                    className="h-full bg-green-500 rounded-full transition-all"
                                    style={{ width: `${(hon.parcelasPagas / hon.parcelas) * 100}%` }}
                                  />
                                </div>
                              )}
                              <span className="text-xs text-muted-foreground">
                                Vence: {new Date(hon.dataVencimento + "T00:00:00").toLocaleDateString("pt-BR")}
                              </span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-lg font-bold">{formatBRL(hon.valor)}</p>
                            {hon.status === "pago" ? (
                              <p className="text-xs text-green-600 flex items-center gap-1 justify-end">
                                <CheckCircle2 className="w-3 h-3" /> Quitado
                              </p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                Restante: {formatBRL(hon.valor * ((hon.parcelas - hon.parcelasPagas) / (hon.parcelas || 1)))}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
