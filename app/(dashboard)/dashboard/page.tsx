"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Scale,
  FileText,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  ArrowRight,
  Activity,
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
import { Separator } from "@/components/ui/separator";

// ─── Mock data ────────────────────────────────────────────────────────────────

const kpis = [
  {
    titulo: "Clientes Ativos",
    valor: "5",
    variacao: "+2 este mês",
    positivo: true,
    icon: Users,
    href: "/clientes",
    cor: "from-blue-500 to-blue-600",
    bg: "bg-blue-500/10",
    text: "text-blue-600",
  },
  {
    titulo: "Processos em Andamento",
    valor: "3",
    variacao: "+1 este mês",
    positivo: true,
    icon: Scale,
    href: "/processos",
    cor: "from-amber-500 to-orange-600",
    bg: "bg-amber-500/10",
    text: "text-amber-600",
  },
  {
    titulo: "Petições",
    valor: "8",
    variacao: "3 em rascunho",
    positivo: null,
    icon: FileText,
    href: "/peticoes",
    cor: "from-purple-500 to-purple-600",
    bg: "bg-purple-500/10",
    text: "text-purple-600",
  },
  {
    titulo: "A Receber (Honorários)",
    valor: "R$ 47.000",
    variacao: "3 honorários pendentes",
    positivo: null,
    icon: DollarSign,
    href: "/financeiro",
    cor: "from-green-500 to-teal-600",
    bg: "bg-green-500/10",
    text: "text-green-600",
  },
];

const prazosUrgentes = [
  {
    id: "1",
    descricao: "Apresentação de Contestação",
    processo: "1234567-89.2024.8.26.0100",
    cliente: "Maria Oliveira Santos",
    dataLimite: "2026-03-18",
    diasRestantes: 2,
    tipo: "peticao",
  },
  {
    id: "2",
    descricao: "Audiência de Instrução",
    processo: "9876543-21.2024.5.02.0001",
    cliente: "João Carlos Silva",
    dataLimite: "2026-03-25",
    diasRestantes: 9,
    tipo: "audiencia",
  },
  {
    id: "3",
    descricao: "Recurso de Apelação",
    processo: "5555555-55.2023.8.26.0200",
    cliente: "Ana Paula Costa",
    dataLimite: "2026-04-10",
    diasRestantes: 25,
    tipo: "recurso",
  },
];

const ultimosProcessos = [
  {
    id: "1",
    numero: "1234567-89.2024.8.26.0100",
    cliente: "Maria Oliveira Santos",
    objeto: "Ação de Cobrança",
    tipo: "civel",
    status: "em_andamento",
    valor: 150000,
  },
  {
    id: "2",
    numero: "9876543-21.2024.5.02.0001",
    cliente: "João Carlos Silva",
    objeto: "Reclamação Trabalhista",
    tipo: "trabalhista",
    status: "em_andamento",
    valor: 85000,
  },
  {
    id: "3",
    numero: "5555555-55.2023.8.26.0200",
    cliente: "Ana Paula Costa",
    objeto: "Indenização por Danos Morais",
    tipo: "civel",
    status: "em_andamento",
    valor: 320000,
  },
];

const atividadesRecentes = [
  {
    id: "1",
    tipo: "cliente",
    descricao: "Novo cliente cadastrado",
    detalhe: "Fernanda Rocha — adicionada ao sistema",
    tempo: "Há 2 horas",
    icon: Users,
    cor: "bg-blue-500",
  },
  {
    id: "2",
    tipo: "peticao",
    descricao: "Petição finalizada",
    detalhe: "Contestação — Processo 1234567-89.2024",
    tempo: "Há 5 horas",
    icon: FileText,
    cor: "bg-purple-500",
  },
  {
    id: "3",
    tipo: "pagamento",
    descricao: "Honorário recebido",
    detalhe: "Parcela 2/3 — Maria Oliveira Santos (R$ 5.000)",
    tempo: "Ontem, 14h32",
    icon: DollarSign,
    cor: "bg-green-500",
  },
  {
    id: "4",
    tipo: "prazo",
    descricao: "Prazo cumprido",
    detalhe: "Manifestação sobre Laudo Pericial",
    tempo: "Há 2 dias",
    icon: CheckCircle2,
    cor: "bg-teal-500",
  },
  {
    id: "5",
    tipo: "processo",
    descricao: "Novo processo distribuído",
    detalhe: "7777777-77.2025.5.02.0010 — Fernanda Rocha",
    tempo: "Há 3 dias",
    icon: Scale,
    cor: "bg-amber-500",
  },
];

const tipoProcessoConfig: Record<string, string> = {
  civel: "bg-blue-500/10 text-blue-600 border-blue-200",
  trabalhista: "bg-orange-500/10 text-orange-600 border-orange-200",
  criminal: "bg-red-500/10 text-red-600 border-red-200",
  tributario: "bg-green-500/10 text-green-600 border-green-200",
};

const tipoProcessoLabel: Record<string, string> = {
  civel: "Cível",
  trabalhista: "Trabalhista",
  criminal: "Criminal",
  tributario: "Tributário",
};

function getDiasLabel(dias: number): { label: string; className: string } {
  if (dias <= 2) return { label: `${dias}d restantes`, className: "text-red-600 font-bold" };
  if (dias <= 7) return { label: `${dias}d restantes`, className: "text-orange-500 font-semibold" };
  return { label: `${dias}d restantes`, className: "text-muted-foreground" };
}

const formatBRL = (v: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 0 }).format(v);

// ─── Component ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-8">
      {/* Saudação */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold tracking-tight">Bom dia, Advogado</h1>
        <p className="text-muted-foreground capitalize mt-1">{hoje}</p>
      </motion.div>

      {/* KPIs */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = kpi.icon;
          return (
            <motion.div
              key={kpi.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
            >
              <Link href={kpi.href}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer group">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {kpi.titulo}
                    </CardTitle>
                    <div className={`w-9 h-9 rounded-lg ${kpi.bg} flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${kpi.text}`} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{kpi.valor}</div>
                    <p
                      className={`text-xs mt-1 flex items-center gap-1 ${
                        kpi.positivo === true
                          ? "text-green-600"
                          : kpi.positivo === false
                          ? "text-red-600"
                          : "text-muted-foreground"
                      }`}
                    >
                      {kpi.positivo === true && <TrendingUp className="w-3 h-3" />}
                      {kpi.positivo === false && <TrendingDown className="w-3 h-3" />}
                      {kpi.variacao}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Linha 2: Prazos urgentes + Atividades recentes */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Prazos Urgentes — 3 colunas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="lg:col-span-3"
        >
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-red-500" />
                  Prazos Próximos
                </CardTitle>
                <CardDescription>Ordenados por urgência</CardDescription>
              </div>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/prazos" className="gap-1">
                  Ver todos <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {prazosUrgentes.map((prazo, i) => {
                const dias = getDiasLabel(prazo.diasRestantes);
                return (
                  <motion.div
                    key={prazo.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.35 + i * 0.07 }}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                        prazo.diasRestantes <= 3
                          ? "bg-red-100 dark:bg-red-900/30"
                          : prazo.diasRestantes <= 7
                          ? "bg-orange-100 dark:bg-orange-900/30"
                          : "bg-gradient-to-br from-red-400 to-rose-500"
                      }`}
                    >
                      {prazo.diasRestantes <= 7 ? (
                        <AlertTriangle
                          className={`w-5 h-5 ${
                            prazo.diasRestantes <= 3 ? "text-red-500" : "text-orange-500"
                          }`}
                        />
                      ) : (
                        <Clock className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate">{prazo.descricao}</p>
                      <p className="text-xs text-muted-foreground truncate">{prazo.cliente}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className={`text-xs font-medium ${dias.className}`}>{dias.label}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(prazo.dataLimite + "T00:00:00").toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                        })}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>

        {/* Atividades Recentes — 2 colunas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="lg:col-span-2"
        >
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                Atividade Recente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
                <div className="space-y-5">
                  {atividadesRecentes.map((ativ, i) => {
                    const Icon = ativ.icon;
                    return (
                      <motion.div
                        key={ativ.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 + i * 0.07 }}
                        className="relative pl-10"
                      >
                        <div
                          className={`absolute left-1.5 w-5 h-5 rounded-full ${ativ.cor} flex items-center justify-center ring-2 ring-background`}
                        >
                          <Icon className="w-2.5 h-2.5 text-white" />
                        </div>
                        <p className="text-sm font-medium leading-tight">{ativ.descricao}</p>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{ativ.detalhe}</p>
                        <p className="text-xs text-muted-foreground/60 mt-0.5">{ativ.tempo}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Linha 3: Últimos Processos */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-500" />
                Processos Recentes
              </CardTitle>
              <CardDescription>Processos em andamento com maior valor em causa</CardDescription>
            </div>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/processos" className="gap-1">
                Ver todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ultimosProcessos.map((proc, i) => (
                <motion.div
                  key={proc.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.55 + i * 0.07 }}
                >
                  <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shrink-0">
                      <Scale className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold font-mono">{proc.numero}</p>
                        <Badge
                          variant="outline"
                          className={`text-xs ${tipoProcessoConfig[proc.tipo] ?? ""}`}
                        >
                          {tipoProcessoLabel[proc.tipo] ?? proc.tipo}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {proc.objeto} — {proc.cliente}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold">{formatBRL(proc.valor)}</p>
                      <p className="text-xs text-muted-foreground">Em causa</p>
                    </div>
                  </div>
                  {i < ultimosProcessos.length - 1 && <Separator className="mt-1" />}
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
