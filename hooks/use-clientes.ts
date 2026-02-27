import { useQuery } from "@tanstack/react-query";
import { Cliente } from "@/types";

// Mock API - depois substituir por chamadas reais
const fetchClientes = async (): Promise<Cliente[]> => {
  // Simulação de delay de rede
  await new Promise((resolve) => setTimeout(resolve, 800));

  return [
    {
      id: "1",
      nome: "Maria Oliveira Santos",
      cpf: "123.456.789-00",
      rg: "12.345.678-9",
      email: "maria@email.com",
      telefone: "(11) 98765-4321",
      endereco: "Rua das Flores, 123 - Centro, São Paulo - SP",
      dataNascimento: new Date("1985-03-15"),
      profissao: "Professora",
      estadoCivil: "casado",
      naturalidade: "São Paulo - SP",
      createdAt: new Date("2024-02-01"),
      updatedAt: new Date("2024-02-20"),
    },
    {
      id: "2",
      nome: "João Carlos Silva",
      cpf: "987.654.321-00",
      rg: "98.765.432-1",
      email: "joao@email.com",
      telefone: "(11) 91234-5678",
      endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo - SP",
      dataNascimento: new Date("1978-07-22"),
      profissao: "Engenheiro",
      estadoCivil: "solteiro",
      naturalidade: "Rio de Janeiro - RJ",
      createdAt: new Date("2024-01-15"),
      updatedAt: new Date("2024-02-18"),
    },
    {
      id: "3",
      nome: "Ana Paula Costa",
      cpf: "456.789.123-00",
      rg: "45.678.912-3",
      email: "ana@email.com",
      telefone: "(11) 99999-8888",
      endereco: "Rua Augusta, 500 - Consolação, São Paulo - SP",
      dataNascimento: new Date("1990-11-08"),
      profissao: "Médica",
      estadoCivil: "divorciado",
      naturalidade: "Belo Horizonte - MG",
      createdAt: new Date("2023-12-10"),
      updatedAt: new Date("2024-02-15"),
    },
    {
      id: "4",
      nome: "Pedro Henrique Almeida",
      cpf: "321.654.987-00",
      rg: "32.165.498-7",
      email: "pedro@email.com",
      telefone: "(11) 97777-6666",
      endereco: "Rua Oscar Freire, 200 - Jardins, São Paulo - SP",
      profissao: "Empresário",
      estadoCivil: "casado",
      createdAt: new Date("2024-01-20"),
      updatedAt: new Date("2024-02-10"),
    },
    {
      id: "5",
      nome: "Juliana Ferreira Santos",
      cpf: "159.753.486-00",
      email: "juliana@email.com",
      telefone: "(11) 96666-5555",
      profissao: "Arquiteta",
      estadoCivil: "solteiro",
      createdAt: new Date("2024-02-05"),
      updatedAt: new Date("2024-02-19"),
    },
  ];
};

const fetchClienteById = async (id: string): Promise<Cliente> => {
  const clientes = await fetchClientes();
  const cliente = clientes.find((c) => c.id === id);
  
  if (!cliente) {
    throw new Error("Cliente não encontrado");
  }
  
  return cliente;
};

// Hook para buscar todos os clientes
export function useClientes() {
  return useQuery({
    queryKey: ["clientes"],
    queryFn: fetchClientes,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });
}

// Hook para buscar um cliente específico
export function useCliente(id: string) {
  return useQuery({
    queryKey: ["clientes", id],
    queryFn: () => fetchClienteById(id),
    enabled: !!id,
  });
}

// Hook para estatísticas de clientes
export function useClientesStats() {
  const { data: clientes = [] } = useClientes();

  const stats = {
    total: clientes.length,
    novosEsteMes: clientes.filter((c) => {
      const hoje = new Date();
      const mesAtual = hoje.getMonth();
      const anoAtual = hoje.getFullYear();
      const dataCadastro = new Date(c.createdAt);
      
      return (
        dataCadastro.getMonth() === mesAtual &&
        dataCadastro.getFullYear() === anoAtual
      );
    }).length,
    processosAtivos: 89, // Mock - virá do backend
    pendencias: 7, // Mock - virá do backend
  };

  return stats;
}
