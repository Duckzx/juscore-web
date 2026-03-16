"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Download,
  Send,
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
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { mockPeticoes, statusConfig, tipoConfig } from "@/lib/mock-peticoes";

const statusIconMap = {
  rascunho: Clock,
  revisao: AlertCircle,
  finalizada: CheckCircle2,
  protocolada: CheckCircle2,
};

export default function PeticoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const router = useRouter();

  const filtered = mockPeticoes.filter((p) => {
    const matchSearch =
      p.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.processo ?? "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filtroStatus === "todos" || p.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  // Stats calculadas dos dados reais
  const stats = {
    total: mockPeticoes.length,
    rascunho: mockPeticoes.filter((p) => p.status === "rascunho").length,
    revisao: mockPeticoes.filter((p) => p.status === "revisao").length,
    protocolada: mockPeticoes.filter((p) => p.status === "protocolada").length,
  };

  const filtros = [
    { key: "todos", label: "Todas" },
    { key: "rascunho", label: "Rascunho" },
    { key: "revisao", label: "Em Revisão" },
    { key: "finalizada", label: "Finalizada" },
    { key: "protocolada", label: "Protocolada" },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Petições</h1>
          <p className="text-muted-foreground">
            Crie e gerencie petições com automação inteligente
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            size="lg"
            className="gap-2"
            onClick={() => router.push("/peticoes/nova")}
          >
            <Plus className="w-4 h-4" />
            Nova Petição
          </Button>
        </motion.div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: "Total",
            value: stats.total,
            sub: "Todas as petições",
            icon: FileText,
            color: "text-purple-500",
            delay: 0.05,
          },
          {
            label: "Rascunho",
            value: stats.rascunho,
            sub: "Aguardando conclusão",
            icon: Clock,
            color: "text-gray-500",
            delay: 0.1,
          },
          {
            label: "Em Revisão",
            value: stats.revisao,
            sub: "Pendentes de aprovação",
            icon: AlertCircle,
            color: "text-amber-500",
            delay: 0.15,
          },
          {
            label: "Protocoladas",
            value: stats.protocolada,
            sub: "Enviadas ao tribunal",
            icon: CheckCircle2,
            color: "text-green-500",
            delay: 0.2,
          },
        ].map(({ label, value, sub, icon: Icon, color, delay }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {label}
                </CardTitle>
                <Icon className={`w-4 h-4 ${color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-muted-foreground mt-1">{sub}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Lista */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por título, cliente ou processo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {filtros.map(({ key, label }) => (
                <Button
                  key={key}
                  size="sm"
                  variant={filtroStatus === key ? "default" : "outline"}
                  onClick={() => setFiltroStatus(key)}
                  className="text-xs"
                >
                  {label}
                  {key !== "todos" && (
                    <span className="ml-1.5 opacity-70">
                      {mockPeticoes.filter((p) => p.status === key).length}
                    </span>
                  )}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Petição</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-14 text-muted-foreground">
                    <FileText className="w-8 h-8 mx-auto mb-2 opacity-20" />
                    Nenhuma petição encontrada.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((peticao, index) => {
                  const sInfo = statusConfig[peticao.status as keyof typeof statusConfig];
                  const StatusIcon = statusIconMap[peticao.status as keyof typeof statusIconMap];

                  return (
                    <motion.tr
                      key={peticao.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="group hover:bg-muted/50 cursor-pointer"
                      onClick={() => router.push(`/peticoes/${peticao.id}`)}
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shrink-0">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium">{peticao.titulo}</p>
                            {peticao.processo && (
                              <p className="text-xs text-muted-foreground font-mono">
                                {peticao.processo}
                              </p>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{peticao.cliente}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="text-xs">
                          {tipoConfig[peticao.tipo] ?? peticao.tipo}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={`gap-1 text-xs ${sInfo.className}`}
                        >
                          <StatusIcon className="w-3 h-3" />
                          {sInfo.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(peticao.updatedAt).toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger
                            asChild
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/peticoes/${peticao.id}`);
                              }}
                            >
                              <Eye className="w-4 h-4 mr-2" />
                              Visualizar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push(`/peticoes/${peticao.id}/editar`);
                              }}
                            >
                              <Edit className="w-4 h-4 mr-2" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.info("Exportação de PDF em desenvolvimento.");
                              }}
                            >
                              <Download className="w-4 h-4 mr-2" />
                              Exportar PDF
                            </DropdownMenuItem>
                            {peticao.status !== "protocolada" && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toast.success("Petição marcada como protocolada!");
                                  }}
                                >
                                  <Send className="w-4 h-4 mr-2" />
                                  Protocolar
                                </DropdownMenuItem>
                              </>
                            )}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                toast.error("Petição excluída.");
                              }}
                            >
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
