"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Bell,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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

const mockPrazos = [
  {
    id: "1",
    descricao: "Apresentação de Contestação",
    processo: "1234567-89.2024.8.26.0100",
    cliente: "Maria Oliveira Santos",
    tipo: "peticao",
    dataLimite: "2026-03-18",
    status: "pendente",
    diasRestantes: 2,
    alertado: true,
  },
  {
    id: "2",
    descricao: "Audiência de Instrução",
    processo: "9876543-21.2024.5.02.0001",
    cliente: "João Carlos Silva",
    tipo: "audiencia",
    dataLimite: "2026-03-25",
    status: "pendente",
    diasRestantes: 9,
    alertado: false,
  },
  {
    id: "3",
    descricao: "Recurso de Apelação",
    processo: "5555555-55.2023.8.26.0200",
    cliente: "Ana Paula Costa",
    tipo: "recurso",
    dataLimite: "2026-04-10",
    status: "pendente",
    diasRestantes: 25,
    alertado: false,
  },
  {
    id: "4",
    descricao: "Manifestação sobre Laudo Pericial",
    processo: "1234567-89.2024.8.26.0100",
    cliente: "Maria Oliveira Santos",
    tipo: "peticao",
    dataLimite: "2026-03-10",
    status: "cumprido",
    diasRestantes: -6,
    alertado: true,
  },
  {
    id: "5",
    descricao: "Impugnação ao Valor da Causa",
    processo: "3333333-33.2024.8.26.0050",
    cliente: "Carlos Eduardo Lima",
    tipo: "outro",
    dataLimite: "2026-03-05",
    status: "vencido",
    diasRestantes: -11,
    alertado: true,
  },
  {
    id: "6",
    descricao: "Audiência de Conciliação",
    processo: "7777777-77.2025.5.02.0010",
    cliente: "Fernanda Rocha",
    tipo: "audiencia",
    dataLimite: "2026-04-02",
    status: "pendente",
    diasRestantes: 17,
    alertado: false,
  },
];

const tipoConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  peticao: { label: "Petição", color: "bg-blue-500/10 text-blue-600 border-blue-200", icon: Calendar },
  audiencia: { label: "Audiência", color: "bg-purple-500/10 text-purple-600 border-purple-200", icon: Calendar },
  recurso: { label: "Recurso", color: "bg-orange-500/10 text-orange-600 border-orange-200", icon: Calendar },
  outro: { label: "Outro", color: "bg-gray-500/10 text-gray-600 border-gray-200", icon: Calendar },
};

const statusConfig: Record<string, { label: string; icon: React.ElementType; className: string }> = {
  pendente: { label: "Pendente", icon: Clock, className: "bg-yellow-500/10 text-yellow-600 border-yellow-200" },
  cumprido: { label: "Cumprido", icon: CheckCircle2, className: "bg-green-500/10 text-green-600 border-green-200" },
  vencido: { label: "Vencido", icon: XCircle, className: "bg-red-500/10 text-red-600 border-red-200" },
};

function getDiasRestantesLabel(dias: number, status: string): { label: string; color: string } {
  if (status === "cumprido") return { label: "Cumprido", color: "text-green-600" };
  if (status === "vencido") return { label: `Vencido há ${Math.abs(dias)}d`, color: "text-red-600" };
  if (dias <= 0) return { label: "Hoje", color: "text-red-600 font-bold" };
  if (dias <= 3) return { label: `${dias} dias`, color: "text-red-500 font-semibold" };
  if (dias <= 7) return { label: `${dias} dias`, color: "text-orange-500" };
  return { label: `${dias} dias`, color: "text-muted-foreground" };
}

export default function PrazosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");

  const filtered = mockPrazos.filter((prazo) => {
    const matchSearch =
      prazo.descricao.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prazo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prazo.processo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filtroStatus === "todos" || prazo.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  const stats = {
    total: mockPrazos.filter(p => p.status === "pendente").length,
    urgentes: mockPrazos.filter(p => p.status === "pendente" && p.diasRestantes <= 3).length,
    cumpridos: mockPrazos.filter(p => p.status === "cumprido").length,
    vencidos: mockPrazos.filter(p => p.status === "vencido").length,
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr + "T00:00:00").toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Prazos</h1>
          <p className="text-muted-foreground">
            Acompanhe e gerencie os prazos processuais
          </p>
        </div>
        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Prazo
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Pendentes
              </CardTitle>
              <Clock className="w-4 h-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">{stats.total}</div>
              <p className="text-xs text-muted-foreground mt-1">Aguardando cumprimento</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <Card className="border-red-200 dark:border-red-900">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Urgentes
              </CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">{stats.urgentes}</div>
              <p className="text-xs text-muted-foreground mt-1">Vencem em até 3 dias</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Cumpridos
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.cumpridos}</div>
              <p className="text-xs text-muted-foreground mt-1">Este mês</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Vencidos
              </CardTitle>
              <XCircle className="w-4 h-4 text-red-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">{stats.vencidos}</div>
              <p className="text-xs text-muted-foreground mt-1">Requerem atenção</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Alert urgentes */}
      {stats.urgentes > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-3 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900"
        >
          <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-red-700 dark:text-red-400">
              Atenção: {stats.urgentes} prazo(s) urgente(s)
            </p>
            <p className="text-xs text-red-600/70 dark:text-red-400/70">
              Você tem prazos que vencem nos próximos 3 dias. Revise imediatamente.
            </p>
          </div>
          <Button size="sm" variant="outline" className="border-red-300 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30">
            <Bell className="w-4 h-4 mr-2" />
            Ver urgentes
          </Button>
        </motion.div>
      )}

      {/* Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por descrição, cliente ou processo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              {(["todos", "pendente", "cumprido", "vencido"] as const).map((status) => (
                <Button
                  key={status}
                  variant={filtroStatus === status ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFiltroStatus(status)}
                  className="capitalize"
                >
                  {status === "todos" ? "Todos" : statusConfig[status]?.label ?? status}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Prazo</TableHead>
                <TableHead>Processo / Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data Limite</TableHead>
                <TableHead>Restam</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    Nenhum prazo encontrado.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((prazo, index) => {
                  const tipoInfo = tipoConfig[prazo.tipo];
                  const statusInfo = statusConfig[prazo.status];
                  const StatusIcon = statusInfo.icon;
                  const diasInfo = getDiasRestantesLabel(prazo.diasRestantes, prazo.status);

                  return (
                    <motion.tr
                      key={prazo.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                              prazo.status === "vencido"
                                ? "bg-red-100 dark:bg-red-900/30"
                                : prazo.diasRestantes <= 3 && prazo.status === "pendente"
                                ? "bg-red-100 dark:bg-red-900/30"
                                : "bg-gradient-to-br from-red-400 to-rose-600"
                            }`}
                          >
                            <Calendar
                              className={`w-5 h-5 ${
                                prazo.status === "vencido" || (prazo.diasRestantes <= 3 && prazo.status === "pendente")
                                  ? "text-red-500"
                                  : "text-white"
                              }`}
                            />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{prazo.descricao}</p>
                            {prazo.alertado && (
                              <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Bell className="w-3 h-3" /> Alerta ativo
                              </span>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="font-medium">{prazo.cliente}</p>
                          <p className="text-xs text-muted-foreground font-mono">{prazo.processo}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={tipoInfo.color}>
                          {tipoInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm font-medium">
                        {formatDate(prazo.dataLimite)}
                      </TableCell>
                      <TableCell>
                        <span className={`text-sm font-medium ${diasInfo.color}`}>
                          {diasInfo.label}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`gap-1 ${statusInfo.className}`}>
                          <StatusIcon className="w-3 h-3" />
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
                              Marcar como cumprido
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
                })
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
