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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Mock data - substituir depois
const mockPeticoes = [
  {
    id: "1",
    titulo: "Petição Inicial - Ação de Cobrança",
    cliente: "Maria Oliveira Santos",
    processo: "1234567-89.2024.8.26.0100",
    tipo: "inicial",
    status: "finalizada",
    dataProtocolo: "2024-02-20",
    updatedAt: "2024-02-20T14:30:00",
  },
  {
    id: "2",
    titulo: "Contestação - Ação Trabalhista",
    cliente: "João Carlos Silva",
    processo: "9876543-21.2024.5.02.0001",
    tipo: "contestacao",
    status: "revisao",
    updatedAt: "2024-02-19T10:15:00",
  },
  {
    id: "3",
    titulo: "Recurso de Apelação",
    cliente: "Ana Paula Costa",
    processo: "5555555-55.2023.8.26.0200",
    tipo: "recurso",
    status: "rascunho",
    updatedAt: "2024-02-18T16:45:00",
  },
  {
    id: "4",
    titulo: "Manifestação sobre Documentos",
    cliente: "Pedro Henrique Almeida",
    processo: "7777777-77.2024.8.26.0300",
    tipo: "manifestacao",
    status: "protocolada",
    dataProtocolo: "2024-02-15",
    numeroProtocolo: "PROT-2024-001234",
    updatedAt: "2024-02-15T09:20:00",
  },
];

const statusConfig = {
  rascunho: {
    label: "Rascunho",
    icon: Clock,
    color: "bg-gray-500",
  },
  revisao: {
    label: "Em Revisão",
    icon: AlertCircle,
    color: "bg-amber-500",
  },
  finalizada: {
    label: "Finalizada",
    icon: CheckCircle2,
    color: "bg-blue-500",
  },
  protocolada: {
    label: "Protocolada",
    icon: CheckCircle2,
    color: "bg-green-500",
  },
};

const tipoConfig: Record<string, string> = {
  inicial: "Inicial",
  contestacao: "Contestação",
  replica: "Réplica",
  manifestacao: "Manifestação",
  recurso: "Recurso",
  outro: "Outro",
};

export default function PeticoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredPeticoes = mockPeticoes.filter((peticao) =>
    peticao.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peticao.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    peticao.processo?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Petições
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">47</div>
              <p className="text-xs text-muted-foreground">
                Todas as petições cadastradas
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Rascunho
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-600">12</div>
              <p className="text-xs text-muted-foreground">
                Aguardando conclusão
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Em Revisão
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-amber-600">5</div>
              <p className="text-xs text-muted-foreground">
                Pendentes de aprovação
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Protocoladas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">30</div>
              <p className="text-xs text-muted-foreground">
                Este mês
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Lista de Petições */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar petições por título, cliente ou processo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline">Filtros</Button>
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
              {filteredPeticoes.map((peticao, index) => {
                const statusInfo = statusConfig[peticao.status as keyof typeof statusConfig];
                const StatusIcon = statusInfo.icon;

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
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
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
                    <TableCell>
                      <p className="text-sm">{peticao.cliente}</p>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {tipoConfig[peticao.tipo] || peticao.tipo}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusInfo.label}
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
                        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => router.push(`/peticoes/${peticao.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => router.push(`/peticoes/${peticao.id}/editar`)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Exportar PDF
                          </DropdownMenuItem>
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
    </div>
  );
}
