"use client";

import { Bell, Search, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 backdrop-blur-xl bg-background/80 shadow-sm">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: Title */}
        <div>
          {title && (
            <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar processos, clientes..."
              className="w-64 pl-9 bg-muted/50"
            />
          </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs"
                >
                  3
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="p-2">
                <p className="text-sm font-semibold mb-2">Notificações</p>
                <div className="space-y-2">
                  <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                    <p className="text-sm font-medium">
                      Prazo vencendo em 2 dias
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Processo 1234567-89.2024.8.26.0100
                    </p>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Novo cliente cadastrado</p>
                    <p className="text-xs text-muted-foreground">
                      João Silva - Há 1 hora
                    </p>
                  </div>
                  <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                    <p className="text-sm font-medium">Petição enviada</p>
                    <p className="text-xs text-muted-foreground">
                      Contestação - Processo Civil
                    </p>
                  </div>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Alternar tema</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
