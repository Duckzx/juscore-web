"use client";

import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  Briefcase,
  FileText,
  DollarSign,
  Clock,
  Edit,
  Trash2,
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

export default function ClienteDetalhesPage() {
  const params = useParams();
  const router = useRouter();

  // Mock data - depois virá do backend
  const cliente = {
    id: params.id,
    nome: "Maria Oliveira Santos",
    cpf: "123.456.789-00",
    rg: "12.345.678-9",
    email: "maria@email.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
    dataNascimento: "15/03/1985",
    profissao: "Professora",
    estadoCivil: "Casada",
    naturalidade: "São Paulo - SP",
  };

  const timeline = [
    {
      id: 1,
      tipo: "processo",
      titulo: "Novo processo cadastrado",
      descricao: "Processo 1234567-89.2024.8.26.0100 - Ação de Cobrança",
      data: "2024-02-20",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      id: 2,
      tipo: "documento",
      titulo: "Documento enviado",
      descricao: "Procuração anexada ao sistema",
      data: "2024-02-15",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      id: 3,
      tipo: "pagamento",
      titulo: "Pagamento recebido",
      descricao: "Parcela 1/3 de honorários contratuais - R$ 1.500,00",
      data: "2024-02-10",
      icon: DollarSign,
      color: "bg-green-500",
    },
    {
      id: 4,
      tipo: "cadastro",
      titulo: "Cliente cadastrado",
      descricao: "Primeiro registro no sistema",
      data: "2024-02-01",
      icon: User,
      color: "bg-amber-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header com botão voltar */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold tracking-tight">{cliente.nome}</h1>
          <p className="text-muted-foreground">CPF: {cliente.cpf}</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Edit className="w-4 h-4" />
          Editar
        </Button>
      </div>

      {/* Cards de Informações */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Dados Pessoais */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-blue-500" />
              Dados Pessoais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-sm text-muted-foreground">RG</p>
              <p className="font-medium">{cliente.rg}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Data de Nascimento</p>
              <p className="font-medium">{cliente.dataNascimento}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Estado Civil</p>
              <p className="font-medium">{cliente.estadoCivil}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Profissão</p>
              <p className="font-medium">{cliente.profissao}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Naturalidade</p>
              <p className="font-medium">{cliente.naturalidade}</p>
            </div>
          </CardContent>
        </Card>

        {/* Contato */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Phone className="w-5 h-5 text-green-500" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{cliente.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-muted-foreground" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Telefone</p>
                <p className="font-medium">{cliente.telefone}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground mt-1" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Endereço</p>
                <p className="font-medium">{cliente.endereco}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Resumo */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-purple-500" />
              Resumo
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Processos</span>
              <Badge variant="outline" className="font-mono">3</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Documentos</span>
              <Badge variant="outline" className="font-mono">8</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Petições</span>
              <Badge variant="outline" className="font-mono">12</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Valor Total</span>
              <Badge className="bg-green-500">R$ 15.000,00</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
          <TabsTrigger value="processos">Processos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
          <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
        </TabsList>

        {/* Timeline */}
        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Atividades</CardTitle>
              <CardDescription>
                Linha do tempo com todas as interações e eventos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                {/* Linha vertical */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

                {/* Eventos */}
                <div className="space-y-6">
                  {timeline.map((evento, index) => {
                    const Icon = evento.icon;
                    return (
                      <motion.div
                        key={evento.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative pl-16"
                      >
                        {/* Ícone */}
                        <div
                          className={`absolute left-3 w-6 h-6 rounded-full ${evento.color} flex items-center justify-center ring-4 ring-background`}
                        >
                          <Icon className="w-3 h-3 text-white" />
                        </div>

                        {/* Conteúdo */}
                        <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h4 className="font-semibold">{evento.titulo}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {evento.descricao}
                              </p>
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
              <CardTitle>Processos</CardTitle>
              <CardDescription>
                Lista de todos os processos vinculados a este cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Documentos */}
        <TabsContent value="documentos" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Documentos</CardTitle>
              <CardDescription>
                Documentos e arquivos anexados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Financeiro */}
        <TabsContent value="financeiro" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Financeiro</CardTitle>
              <CardDescription>
                Honorários e pagamentos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-center py-8">
                Em desenvolvimento...
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
