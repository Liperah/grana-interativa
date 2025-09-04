import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle, Download, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: string;
}

const CATEGORIES = {
  income: ["Salário", "Freelance", "Investimentos", "Outros"],
  expense: ["Alimentação", "Transporte", "Moradia", "Saúde", "Lazer", "Educação", "Outros"]
};

export const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState<"income" | "expense">("expense");

  const addTransaction = () => {
    if (!description || !amount || !category) {
      toast.error("Preencha todos os campos!");
      return;
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      amount: parseFloat(amount),
      category,
      type,
      date: new Date().toLocaleDateString("pt-BR")
    };

    setTransactions([...transactions, newTransaction]);
    setDescription("");
    setAmount("");
    setCategory("");
    toast.success("Transação adicionada com sucesso!");
  };

  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const downloadSpreadsheet = () => {
    if (transactions.length === 0) {
      toast.error("Adicione algumas transações primeiro!");
      return;
    }

    const csvContent = [
      ["Data", "Descrição", "Categoria", "Tipo", "Valor"],
      ...transactions.map(t => [
        t.date,
        t.description,
        t.category,
        t.type === "income" ? "Receita" : "Despesa",
        t.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `gastos-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    
    toast.success("Planilha baixada com sucesso!");
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 bg-gradient-income text-white shadow-elegant border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wide">Receitas</p>
              <p className="text-3xl font-bold">
                {totalIncome.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <TrendingUp className="h-10 w-10 text-white/90" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-expense text-white shadow-elegant border-0">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wide">Despesas</p>
              <p className="text-3xl font-bold">
                {totalExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <TrendingDown className="h-10 w-10 text-white/90" />
          </div>
        </Card>

        <Card className={`p-6 shadow-elegant border-0 ${balance >= 0 ? 'bg-gradient-income' : 'bg-gradient-expense'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/90 text-sm font-medium uppercase tracking-wide">Saldo</p>
              <p className="text-3xl font-bold">
                {balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <DollarSign className="h-10 w-10 text-white/90" />
          </div>
        </Card>
      </div>

      {/* Add Transaction Form */}
      <Card className="p-6 shadow-card border-2 border-border">
        <h3 className="text-xl font-bold mb-6 text-foreground">Adicionar Transação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-foreground">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compras no mercado"
              className="mt-1 bg-background border-2 border-input text-foreground font-medium"
            />
          </div>
          
          <div>
            <Label htmlFor="amount" className="text-sm font-semibold text-foreground">Valor</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              step="0.01"
              className="mt-1 bg-background border-2 border-input text-foreground font-medium"
            />
          </div>

          <div>
            <Label htmlFor="type" className="text-sm font-semibold text-foreground">Tipo</Label>
            <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
              <SelectTrigger className="mt-1 bg-background border-2 border-input text-foreground font-medium">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-input shadow-elegant z-50">
                <SelectItem value="income" className="text-foreground font-medium hover:bg-muted">Receita</SelectItem>
                <SelectItem value="expense" className="text-foreground font-medium hover:bg-muted">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category" className="text-sm font-semibold text-foreground">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="mt-1 bg-background border-2 border-input text-foreground font-medium">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent className="bg-background border-2 border-input shadow-elegant z-50">
                {CATEGORIES[type].map((cat) => (
                  <SelectItem key={cat} value={cat} className="text-foreground font-medium hover:bg-muted">
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={addTransaction} className="w-full bg-gradient-primary shadow-elegant hover:opacity-90 transition-opacity text-white font-semibold">
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      {transactions.length > 0 && (
        <Card className="p-6 shadow-card border-2 border-border">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-foreground">Histórico de Transações</h3>
            <Button 
              onClick={downloadSpreadsheet}
              variant="outline"
              className="shadow-card hover:shadow-elegant transition-shadow border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Planilha
            </Button>
          </div>
          
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-4 rounded-lg border-2 border-border bg-card shadow-card"
              >
                <div className="flex-1">
                  <p className="font-bold text-foreground text-base">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
                <div className={`text-right ${transaction.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  <p className="font-bold text-lg">
                    {transaction.type === "income" ? "+" : "-"}
                    {transaction.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};