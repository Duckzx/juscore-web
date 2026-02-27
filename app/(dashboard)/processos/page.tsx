"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Scale,
  MoreVertical,
  Eye,
  Edit,
  FileText,
  Clock,
  TrendingUp,
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

// Mock data
const mockProcessos = [
  {
    id: "1",
    numeroProcesso: "1234567-89.2024.8.26.0100",
    cliente: "Maria Oliveira Santos",
    tipo: "civel",
    status: "em_andamento",
    vara: "1ª Vara Cível",
    tribunal: "TJSP",
    comarca: "São Paulo",
    valorCausa: 150000,
    objeto: "Ação de Cobrança",
    dataDistribuicao: "2024-01-15",
  },
  {
    id: "2",
    numeroProcesso: "9876543-21.2024.5.02.0001",
    cliente: "João Carlos Silva",
    tipo: "trabalhista",
    status: "em_andamento",
    vara: "3ª Vara do Trabalho",
    tribunal: "TRT-2",
    comarca: "São Paulo",
    valorCausa: 85000,
    objeto: "Reclamação Trabalhista",
    dataDistribuicao: "2024-02-01",
  },
  {
    id: "3",
    numeroProcesso: "5555555-55.2023.8.26.0200",
    cliente: "Ana Paula Costa",
    tipo: "civel",
    status: "em_andamento",
    vara: "5ª Vara Cível",
    tribunal: "TJSP",
    comarca: "Campinas",
    valorCausa: 320000,
    objeto: "Indenização por Danos Morais",
    dataDistribuicao: "2023-11-10",
  },
];

const tipoConfig: Record<string, { label: string; color: string }> = {
  civel: { label: "Cível", color: "bg-blue-500" },
  criminal: { label: "Criminal", color: "bg-red-500" },
  trabalhista: { label: "Trabalhista", color: "bg-orange-500" },
  tributario: { label: "Tributário", color: "bg-green-500" },
};

const statusConfig: Record<string, { label: string; color: string }> = {
  em_andamento: { label: "Em Andamento", color: "bg-blue-500" },
  finalizado: { label: "Finalizado", color: "bg-green-500" },
  arquivado: { label: "Arquivado", color: "bg-gray-500" },
};

export default function ProcessosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredProcessos = mockProcessos.filter((processo) =>
    processo.numeroProcesso.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    processo.objeto.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = {
    total: mockProcessos.length,
    emAndamento: mockProcessos.filter(p => p.status === "em_andamento").length,
    valorTotal: mockProcessos.reduce((acc, p) => acc + p.valorCausa, 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Processos</h1>
          <p className="text-muted-foreground">
            Gerencie todos os processos e acompanhe movimentações
          </p>
        </div>

        <Button size="lg" className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Processo
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Processos
            </CardTitle>
            <Scale className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3 text-green-500" />
              +3 este mês
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Em Andamento
            </CardTitle>
            <Clock className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.emAndamento}</div>
            <p className="text-xs text-muted-foreground mt-1">Processos ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Finalizados
            </CardTitle>
            <FileText className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
            <p className="text-xs text-muted-foreground mt-1">Este ano</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Valor Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 0,
              }).format(stats.valorTotal)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Em causa</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por número, cliente ou objeto..."
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
                <TableHead>Processo</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Vara / Tribunal</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProcessos.map((processo, index) => {
                const tipoInfo = tipoConfig[processo.tipo];
                const statusInfo = statusConfig[processo.status];

                return (
                  <motion.tr
                    key={processo.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="group hover:bg-muted/50 cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <Scale className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium font-mono text-sm">{processo.numeroProcesso}</p>
                          <p className="text-xs text-muted-foreground">{processo.objeto}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{processo.cliente}</TableCell>
                    <TableCell>
                      <Badge className={tipoInfo.color}>{tipoInfo.label}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <p className="font-medium">{processo.vara}</p>
                        <p className="text-xs text-muted-foreground">{processo.tribunal}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {new Intl.NumberFormat('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      }).format(processo.valorCausa)}
                    </TableCell>
                    <TableCell>
                      <Badge className={statusInfo.color}>{statusInfo.label}</Badge>
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
                            <FileText className="w-4 h-4 mr-2" />
                            Ver petições
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
