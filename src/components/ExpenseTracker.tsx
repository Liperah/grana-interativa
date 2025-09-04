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
        <Card className="p-6 bg-gradient-income text-white shadow-elegant">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-income-foreground/80 text-sm font-medium">Receitas</p>
              <p className="text-2xl font-bold">
                {totalIncome.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-income-foreground/80" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-expense text-white shadow-elegant">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-expense-foreground/80 text-sm font-medium">Despesas</p>
              <p className="text-2xl font-bold">
                {totalExpenses.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <TrendingDown className="h-8 w-8 text-expense-foreground/80" />
          </div>
        </Card>

        <Card className={`p-6 shadow-elegant ${balance >= 0 ? 'bg-gradient-income' : 'bg-gradient-expense'} text-white`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm font-medium">Saldo</p>
              <p className="text-2xl font-bold">
                {balance.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-white/80" />
          </div>
        </Card>
      </div>

      {/* Add Transaction Form */}
      <Card className="p-6 shadow-card">
        <h3 className="text-lg font-semibold mb-4">Adicionar Transação</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: Compras no mercado"
            />
          </div>
          
          <div>
            <Label htmlFor="amount">Valor</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0,00"
              step="0.01"
            />
          </div>

          <div>
            <Label htmlFor="type">Tipo</Label>
            <Select value={type} onValueChange={(value: "income" | "expense") => setType(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="income">Receita</SelectItem>
                <SelectItem value="expense">Despesa</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="category">Categoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES[type].map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button onClick={addTransaction} className="w-full bg-gradient-primary shadow-elegant hover:opacity-90 transition-opacity">
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicionar
            </Button>
          </div>
        </div>
      </Card>

      {/* Transactions List */}
      {transactions.length > 0 && (
        <Card className="p-6 shadow-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Histórico de Transações</h3>
            <Button 
              onClick={downloadSpreadsheet}
              variant="outline"
              className="shadow-card hover:shadow-elegant transition-shadow"
            >
              <Download className="h-4 w-4 mr-2" />
              Baixar Planilha
            </Button>
          </div>
          
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between items-center p-3 rounded-lg border bg-muted/30"
              >
                <div className="flex-1">
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
                <div className={`text-right ${transaction.type === 'income' ? 'text-income' : 'text-expense'}`}>
                  <p className="font-semibold">
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