"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Building2,
  Bell,
  Shield,
  Palette,
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Globe,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  Moon,
  Sun,
  Monitor,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useTheme } from "next-themes";

function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold">{title}</h3>
      {description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
      <Separator className="mt-4" />
    </div>
  );
}

function ToggleSwitch({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  description?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-medium">{label}</p>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}

export default function ConfiguracoesPage() {
  const { theme, setTheme } = useTheme();

  // Perfil
  const [nome, setNome] = useState("Advogado Demo");
  const [email, setEmail] = useState("advogado@escritorio.com");
  const [telefone, setTelefone] = useState("(11) 99999-9999");
  const [oab, setOab] = useState("OAB/SP 123456");
  const [especialidade, setEspecialidade] = useState("Direito Civil e Trabalhista");

  // Escritório
  const [nomeEscritorio, setNomeEscritorio] = useState("Escritório JusCore Advocacia");
  const [cnpj, setCnpj] = useState("12.345.678/0001-90");
  const [enderecoEscritorio, setEnderecoEscritorio] = useState("Av. Paulista, 1000 — São Paulo/SP");
  const [site, setSite] = useState("www.juscode.adv.br");

  // Senha
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [showSenhaAtual, setShowSenhaAtual] = useState(false);
  const [showNovaSenha, setShowNovaSenha] = useState(false);

  // Notificações
  const [notifPrazos, setNotifPrazos] = useState(true);
  const [notifPrazosEmail, setNotifPrazosEmail] = useState(true);
  const [notifNovosClientes, setNotifNovosClientes] = useState(false);
  const [notifHonorarios, setNotifHonorarios] = useState(true);
  const [notifHonorariosEmail, setNotifHonorariosEmail] = useState(false);
  const [diasAntecedencia, setDiasAntecedencia] = useState("3");

  const handleSavePerfil = () => {
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleSaveEscritorio = () => {
    toast.success("Dados do escritório atualizados!");
  };

  const handleSaveSenha = () => {
    if (!senhaAtual || !novaSenha || !confirmSenha) {
      toast.error("Preencha todos os campos de senha.");
      return;
    }
    if (novaSenha !== confirmSenha) {
      toast.error("A nova senha e a confirmação não coincidem.");
      return;
    }
    if (novaSenha.length < 8) {
      toast.error("A senha deve ter no mínimo 8 caracteres.");
      return;
    }
    toast.success("Senha alterada com sucesso!");
    setSenhaAtual("");
    setNovaSenha("");
    setConfirmSenha("");
  };

  const handleSaveNotificacoes = () => {
    toast.success("Preferências de notificação salvas!");
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie sua conta, escritório e preferências do sistema
        </p>
      </div>

      <Tabs defaultValue="perfil">
        <TabsList className="grid grid-cols-4 w-full max-w-lg">
          <TabsTrigger value="perfil" className="gap-1.5">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Perfil</span>
          </TabsTrigger>
          <TabsTrigger value="escritorio" className="gap-1.5">
            <Building2 className="w-4 h-4" />
            <span className="hidden sm:inline">Escritório</span>
          </TabsTrigger>
          <TabsTrigger value="notificacoes" className="gap-1.5">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Alertas</span>
          </TabsTrigger>
          <TabsTrigger value="seguranca" className="gap-1.5">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Segurança</span>
          </TabsTrigger>
        </TabsList>

        {/* Perfil */}
        <TabsContent value="perfil" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Dados Pessoais</CardTitle>
                <CardDescription>
                  Informações exibidas no sistema e nos documentos gerados
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white text-2xl font-bold">
                      AD
                    </div>
                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow hover:bg-primary/90 transition-colors">
                      <Camera className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div>
                    <p className="font-medium">{nome}</p>
                    <p className="text-sm text-muted-foreground">{oab}</p>
                    <Badge variant="outline" className="mt-1 text-xs">Advogado</Badge>
                  </div>
                </div>

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="oab">Número da OAB</Label>
                    <Input
                      id="oab"
                      value={oab}
                      onChange={(e) => setOab(e.target.value)}
                      placeholder="OAB/SP 000000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="especialidade">Área de atuação</Label>
                    <Input
                      id="especialidade"
                      value={especialidade}
                      onChange={(e) => setEspecialidade(e.target.value)}
                      placeholder="Ex.: Direito Civil, Trabalhista..."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSavePerfil} className="gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Aparência */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Aparência
                </CardTitle>
                <CardDescription>Personalize o tema visual do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "light", label: "Claro", icon: Sun },
                    { value: "dark", label: "Escuro", icon: Moon },
                    { value: "system", label: "Sistema", icon: Monitor },
                  ].map(({ value, label, icon: Icon }) => (
                    <button
                      key={value}
                      onClick={() => setTheme(value)}
                      className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        theme === value
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-border/80 hover:bg-muted/50"
                      }`}
                    >
                      {theme === value && (
                        <CheckCircle2 className="absolute top-2 right-2 w-4 h-4 text-primary" />
                      )}
                      <Icon className={`w-6 h-6 ${theme === value ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Escritório */}
        <TabsContent value="escritorio" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Dados do Escritório</CardTitle>
                <CardDescription>
                  Informações utilizadas em cabeçalhos, rodapés e documentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="nomeEscritorio">Nome do escritório</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="nomeEscritorio"
                        value={nomeEscritorio}
                        onChange={(e) => setNomeEscritorio(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cnpj">CNPJ</Label>
                    <Input
                      id="cnpj"
                      value={cnpj}
                      onChange={(e) => setCnpj(e.target.value)}
                      placeholder="00.000.000/0001-00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="site">Site</Label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="site"
                        value={site}
                        onChange={(e) => setSite(e.target.value)}
                        className="pl-9"
                        placeholder="www.escritorio.adv.br"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="endereco">Endereço</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="endereco"
                        value={enderecoEscritorio}
                        onChange={(e) => setEnderecoEscritorio(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end">
                  <Button onClick={handleSaveEscritorio} className="gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Dados
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notificações */}
        <TabsContent value="notificacoes" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardHeader>
                <CardTitle>Preferências de Notificação</CardTitle>
                <CardDescription>
                  Controle quais alertas você deseja receber e como
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <SectionHeader
                    title="Prazos Processuais"
                    description="Alertas relacionados a vencimentos e audiências"
                  />
                  <div className="space-y-1 divide-y divide-border/50">
                    <ToggleSwitch
                      checked={notifPrazos}
                      onChange={setNotifPrazos}
                      label="Alertas de prazos no sistema"
                      description="Receba notificações na plataforma"
                    />
                    <ToggleSwitch
                      checked={notifPrazosEmail}
                      onChange={setNotifPrazosEmail}
                      label="Enviar alerta por e-mail"
                      description="Receba um e-mail com antecedência"
                    />
                  </div>

                  {notifPrazos && (
                    <div className="mt-4 space-y-2">
                      <Label htmlFor="diasAntecedencia">
                        Antecedência para alertas (dias)
                      </Label>
                      <div className="flex gap-2">
                        {["1", "3", "5", "7"].map((d) => (
                          <Button
                            key={d}
                            variant={diasAntecedencia === d ? "default" : "outline"}
                            size="sm"
                            onClick={() => setDiasAntecedencia(d)}
                          >
                            {d}d
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <SectionHeader
                    title="Clientes e Financeiro"
                    description="Notificações sobre cadastros e cobranças"
                  />
                  <div className="space-y-1 divide-y divide-border/50">
                    <ToggleSwitch
                      checked={notifNovosClientes}
                      onChange={setNotifNovosClientes}
                      label="Novos clientes cadastrados"
                      description="Notificação ao adicionar um cliente"
                    />
                    <ToggleSwitch
                      checked={notifHonorarios}
                      onChange={setNotifHonorarios}
                      label="Vencimento de honorários"
                      description="Alertas sobre parcelas a vencer"
                    />
                    <ToggleSwitch
                      checked={notifHonorariosEmail}
                      onChange={setNotifHonorariosEmail}
                      label="E-mail de cobrança automático"
                      description="Enviar lembrete por e-mail ao cliente"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotificacoes} className="gap-2">
                    <Save className="w-4 h-4" />
                    Salvar Preferências
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Segurança */}
        <TabsContent value="seguranca" className="mt-6">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Alterar Senha
                </CardTitle>
                <CardDescription>
                  Use uma senha forte com pelo menos 8 caracteres
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="senhaAtual">Senha atual</Label>
                  <div className="relative">
                    <Input
                      id="senhaAtual"
                      type={showSenhaAtual ? "text" : "password"}
                      value={senhaAtual}
                      onChange={(e) => setSenhaAtual(e.target.value)}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowSenhaAtual(!showSenhaAtual)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showSenhaAtual ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="novaSenha">Nova senha</Label>
                  <div className="relative">
                    <Input
                      id="novaSenha"
                      type={showNovaSenha ? "text" : "password"}
                      value={novaSenha}
                      onChange={(e) => setNovaSenha(e.target.value)}
                      placeholder="••••••••"
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNovaSenha(!showNovaSenha)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showNovaSenha ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {novaSenha && novaSenha.length < 8 && (
                    <p className="text-xs text-destructive">Mínimo 8 caracteres</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmSenha">Confirmar nova senha</Label>
                  <Input
                    id="confirmSenha"
                    type="password"
                    value={confirmSenha}
                    onChange={(e) => setConfirmSenha(e.target.value)}
                    placeholder="••••••••"
                  />
                  {confirmSenha && novaSenha !== confirmSenha && (
                    <p className="text-xs text-destructive">As senhas não coincidem</p>
                  )}
                  {confirmSenha && novaSenha === confirmSenha && novaSenha.length >= 8 && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Senhas coincidem
                    </p>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveSenha} className="gap-2">
                    <Lock className="w-4 h-4" />
                    Alterar Senha
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sessão e Acesso</CardTitle>
                <CardDescription>
                  Informações sobre acesso e sessões ativas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Sessão atual</p>
                      <p className="text-xs text-muted-foreground">
                        Chrome — São Paulo, SP · Há 2 horas
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/20">
                    Ativa
                  </Badge>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">Encerrar todas as sessões</p>
                    <p className="text-xs text-muted-foreground">
                      Desconecta de todos os dispositivos, exceto o atual
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/30 hover:bg-destructive/5"
                    onClick={() => toast.warning("Funcionalidade disponível em breve.")}
                  >
                    Encerrar sessões
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
