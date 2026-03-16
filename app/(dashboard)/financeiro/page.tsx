"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle2,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  Receipt,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockHonorarios = [
  {
    id: "1",
    cliente: "Maria Oliveira Santos",
    processo: "1234567-89.2024.8.26.0100",
    tipo: "contratual",
    valor: 15000,
    parcelas: 3,
    parcelasPagas: 2,
    status: "parcial",
    dataVencimento: "2026-04-01",
    observacoes: "Pagamento mensal conforme contrato",
  },
  {
    id: "2",
    cliente: "João Carlos Silva",
    processo: "9876543-21.2024.5.02.0001",
    tipo: "contratual",
    valor: 8500,
    parcelas: 1,
    parcelasPagas: 1,
    status: "pago",
    dataVencimento: "2026-02-15",
    observacoes: "",
  },
  {
    id: "3",
    cliente: "Ana Paula Costa",
    processo: "5555555-55.2023.8.26.0200",
    tipo: "sucumbencia",
    valor: 32000,
    parcelas: 1,
    parcelasPagas: 0,
    status: "pendente",
    dataVencimento: "2026-05-20",
    observacoes: "Honorários de sucumbência — aguardando trânsito em julgado",
  },
  {
    id: "4",
    cliente: "Carlos Eduardo Lima",
    processo: "3333333-33.2024.8.26.0050",
    tipo: "contratual",
    valor: 12000,
    parcelas: 4,
    parcelasPagas: 0,
    status: "pendente",
    dataVencimento: "2026-03-30",
    observacoes: "",
  },
  {
    id: "5",
    cliente: "Fernanda Rocha",
    processo: "7777777-77.2025.5.02.0010",
    tipo: "contratual",
    valor: 5500,
    parcelas: 2,
    parcelasPagas: 2,
    status: "pago",
    dataVencimento: "2026-01-10",
    observacoes: "",
  },
];

const mockMovimentacoes = [
  {
    id: "1",
    descricao: "Honorários — João Carlos Silva",
    tipo: "entrada",
    valor: 8500,
    data: "2026-02-15",
    categoria: "Honorários Contratuais",
    metodo: "Transferência bancária",
  },
  {
    id: "2",
    descricao: "Pagamento parcial — Maria Oliveira Santos",
    tipo: "entrada",
    valor: 5000,
    data: "2026-03-01",
    categoria: "Honorários Contratuais",
    metodo: "PIX",
  },
  {
    id: "3",
    descricao: "Custas processuais — Processo 5555555",
    tipo: "saida",
    valor: 1200,
    data: "2026-03-05",
    categoria: "Despesas Processuais",
    metodo: "Boleto bancário",
  },
  {
    id: "4",
    descricao: "Honorários — Fernanda Rocha (2ª parcela)",
    tipo: "entrada",
    valor: 2750,
    data: "2026-01-10",
    categoria: "Honorários Contratuais",
    metodo: "PIX",
  },
  {
    id: "5",
    descricao: "Aluguel do escritório",
    tipo: "saida",
    valor: 3500,
    data: "2026-03-10",
    categoria: "Despesas Fixas",
    metodo: "Débito automático",
  },
  {
    id: "6",
    descricao: "Assinaturas de software",
    tipo: "saida",
    valor: 450,
    data: "2026-03-01",
    categoria: "Despesas Fixas",
    metodo: "Cartão de crédito",
  },
];

const statusConfig: Record<string, { label: string; className: string }> = {
  pendente: { label: "Pendente", className: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  parcial: { label: "Parcial", className: "bg-blue-500/10 text-blue-600 border-blue-200" },
  pago: { label: "Pago", className: "bg-green-500/10 text-green-600 border-green-200" },
};

const tipoHonorarioConfig: Record<string, { label: string; className: string }> = {
  contratual: { label: "Contratual", className: "bg-indigo-500/10 text-indigo-600 border-indigo-200" },
  sucumbencia: { label: "Sucumbência", className: "bg-teal-500/10 text-teal-600 border-teal-200" },
  outro: { label: "Outro", className: "bg-gray-500/10 text-gray-600 border-gray-200" },
};

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const formatDate = (dateStr: string) =>
  new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export default function FinanceiroPage() {
  const [searchHonorarios, setSearchHonorarios] = useState("");
  const [searchMovimentacoes, setSearchMovimentacoes] = useState("");

  const totalReceber = mockHonorarios
    .filter((h) => h.status !== "pago")
    .reduce((acc, h) => acc + h.valor * ((h.parcelas - h.parcelasPagas) / (h.parcelas || 1)), 0);

  const totalRecebido = mockMovimentacoes
    .filter((m) => m.tipo === "entrada")
    .reduce((acc, m) => acc + m.valor, 0);

  const totalDespesas = mockMovimentacoes
    .filter((m) => m.tipo === "saida")
    .reduce((acc, m) => acc + m.valor, 0);

  const saldo = totalRecebido - totalDespesas;

  const filteredHonorarios = mockHonorarios.filter(
    (h) =>
      h.cliente.toLowerCase().includes(searchHonorarios.toLowerCase()) ||
      h.processo.toLowerCase().includes(searchHonorarios.toLowerCase())
  );

  const filteredMovimentacoes = mockMovimentacoes.filter(
    (m) =>
      m.descricao.toLowerCase().includes(searchMovimentacoes.toLowerCase()) ||
      m.categoria.toLowerCase().includes(searchMovimentacoes.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Financeiro</h1>
          <p className="text-muted-foreground">
            Controle de honorários, receitas e despesas do escritório
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Lançamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Saldo do Mês
              </CardTitle>
              <DollarSign className={`w-4 h-4 ${saldo >= 0 ? "text-green-500" : "text-red-500"}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                {formatBRL(saldo)}
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                {saldo >= 0 ? (
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                ) : (
                  <ArrowDownRight className="w-3 h-3 text-red-500" />
                )}
                Entradas menos saídas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Recebido
              </CardTitle>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{formatBRL(totalRecebido)}</div>
              <p className="text-xs text-muted-foreground mt-1">No período atual</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Despesas
              </CardTitle>
              <TrendingDown className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{formatBRL(totalDespesas)}</div>
              <p className="text-xs text-muted-foreground mt-1">No período atual</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                A Receber
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{formatBRL(totalReceber)}</div>
              <p className="text-xs text-muted-foreground mt-1">Honorários pendentes</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Resumo Mensal */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Honorários por Status</CardTitle>
              <CardDescription>Distribuição dos honorários cadastrados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {(["pago", "parcial", "pendente"] as const).map((status) => {
                  const items = mockHonorarios.filter((h) => h.status === status);
                  const total = items.reduce((acc, h) => acc + h.valor, 0);
                  const totalGeral = mockHonorarios.reduce((acc, h) => acc + h.valor, 0);
                  const pct = totalGeral > 0 ? Math.round((total / totalGeral) * 100) : 0;
                  const cfg = statusConfig[status];

                  return (
                    <div key={status} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{cfg.label}</span>
                        <span className="text-muted-foreground">
                          {formatBRL(total)} ({pct}%)
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                          className={`h-full rounded-full ${
                            status === "pago"
                              ? "bg-green-500"
                              : status === "parcial"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Últimas Movimentações</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockMovimentacoes.slice(0, 4).map((mov) => (
                  <div key={mov.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          mov.tipo === "entrada"
                            ? "bg-green-100 dark:bg-green-900/30"
                            : "bg-red-100 dark:bg-red-900/30"
                        }`}
                      >
                        {mov.tipo === "entrada" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-600" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium truncate">{mov.descricao}</p>
                        <p className="text-xs text-muted-foreground">{formatDate(mov.data)}</p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-semibold shrink-0 ml-2 ${
                        mov.tipo === "entrada" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {mov.tipo === "entrada" ? "+" : "-"}
                      {formatBRL(mov.valor)}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Tabs: Honorários e Movimentações */}
      <Tabs defaultValue="honorarios">
        <TabsList>
          <TabsTrigger value="honorarios" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Honorários
          </TabsTrigger>
          <TabsTrigger value="movimentacoes" className="gap-2">
            <Receipt className="w-4 h-4" />
            Movimentações
          </TabsTrigger>
        </TabsList>

        {/* Honorários Tab */}
        <TabsContent value="honorarios">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por cliente ou processo..."
                    value={searchHonorarios}
                    onChange={(e) => setSearchHonorarios(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Novo Honorário
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cliente / Processo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Valor Total</TableHead>
                    <TableHead>Parcelas</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredHonorarios.map((honorario, index) => {
                    const statusInfo = statusConfig[honorario.status];
                    const tipoInfo = tipoHonorarioConfig[honorario.tipo];

                    return (
                      <motion.tr
                        key={honorario.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="group hover:bg-muted/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                              <DollarSign className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{honorario.cliente}</p>
                              <p className="text-xs text-muted-foreground font-mono">{honorario.processo}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={tipoInfo.className}>
                            {tipoInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold text-sm">
                          {formatBRL(honorario.valor)}
                        </TableCell>
                        <TableCell className="text-sm">
                          <span className="text-muted-foreground">
                            {honorario.parcelasPagas}/{honorario.parcelas}
                          </span>
                          {honorario.parcelas > 1 && (
                            <div className="w-16 h-1.5 rounded-full bg-muted mt-1 overflow-hidden">
                              <div
                                className="h-full bg-green-500 rounded-full"
                                style={{
                                  width: `${(honorario.parcelasPagas / honorario.parcelas) * 100}%`,
                                }}
                              />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(honorario.dataVencimento)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusInfo.className}>
                            {statusInfo.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                Ver detalhes
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="w-4 h-4 mr-2" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <CheckCircle2 className="w-4 h-4 mr-2" />
                                Registrar pagamento
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Excluir
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Movimentações Tab */}
        <TabsContent value="movimentacoes">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por descrição ou categoria..."
                    value={searchMovimentacoes}
                    onChange={(e) => setSearchMovimentacoes(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button variant="outline" className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nova Movimentação
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Categoria</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMovimentacoes.map((mov, index) => (
                    <motion.tr
                      key={mov.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                              mov.tipo === "entrada"
                                ? "bg-green-100 dark:bg-green-900/30"
                                : "bg-red-100 dark:bg-red-900/30"
                            }`}
                          >
                            {mov.tipo === "entrada" ? (
                              <ArrowUpRight className="w-4 h-4 text-green-600" />
                            ) : (
                              <ArrowDownRight className="w-4 h-4 text-red-600" />
                            )}
                          </div>
                          <p className="text-sm font-medium">{mov.descricao}</p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mov.categoria}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {mov.metodo}
                      </TableCell>
                      <TableCell className="text-sm">{formatDate(mov.data)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            mov.tipo === "entrada"
                              ? "bg-green-500/10 text-green-600 border-green-200"
                              : "bg-red-500/10 text-red-600 border-red-200"
                          }
                        >
                          {mov.tipo === "entrada" ? "Entrada" : "Saída"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <span
                          className={`text-sm font-semibold ${
                            mov.tipo === "entrada" ? "text-green-600" : "text-red-600"
                          }`}
                        >
                          {mov.tipo === "entrada" ? "+" : "-"}
                          {formatBRL(mov.valor)}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="w-4 h-4 mr-2" />
                              Ver detalhes
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
