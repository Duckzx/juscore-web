"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  FileText,
  Calendar,
  DollarSign,
  Settings,
  ChevronLeft,
  Scale,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  className?: string;
}

const menuItems = [
  {
    title: "Clientes",
    href: "/clientes",
    icon: Users,
    color: "text-blue-500",
  },
  {
    title: "Petições",
    href: "/peticoes",
    icon: FileText,
    color: "text-purple-500",
  },
  {
    title: "Processos",
    href: "/processos",
    icon: Scale,
    color: "text-amber-500",
  },
  {
    title: "Prazos",
    href: "/prazos",
    icon: Calendar,
    color: "text-red-500",
  },
  {
    title: "Financeiro",
    href: "/financeiro",
    icon: DollarSign,
    color: "text-green-500",
  },
  {
    title: "Configurações",
    href: "/configuracoes",
    icon: Settings,
    color: "text-gray-500",
  },
];

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={cn(
        "fixed left-0 top-0 h-screen border-r border-border/40",
        "backdrop-blur-xl bg-sidebar/80 shadow-2xl z-50",
        className
      )}
    >
      <div className="flex flex-col h-full">
        {/* Header / Logo */}
        <div className="flex items-center justify-between p-4 border-b border-border/40">
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-bold tracking-tight">JusCore</h1>
                  <p className="text-xs text-muted-foreground">
                    Gestão Jurídica
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="hover:bg-sidebar-accent shrink-0"
          >
            {collapsed ? (
              <Menu className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname.startsWith(item.href);

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={cn(
                    "flex items-center gap-3 px-3 py-3 rounded-lg transition-all",
                    "hover:bg-sidebar-accent relative overflow-hidden",
                    isActive &&
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                  )}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}

                  <Icon
                    className={cn(
                      "w-5 h-5 shrink-0",
                      isActive ? item.color : "text-muted-foreground"
                    )}
                  />

                  <AnimatePresence mode="wait">
                    {!collapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: "auto" }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm whitespace-nowrap"
                      >
                        {item.title}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer / User */}
        <div className="p-4 border-t border-border/40">
          <div
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50",
              collapsed && "justify-center"
            )}
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
              AD
            </div>

            <AnimatePresence mode="wait">
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 min-w-0"
                >
                  <p className="text-sm font-medium truncate">Advogado</p>
                  <p className="text-xs text-muted-foreground truncate">
                    OAB/SP 123456
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
