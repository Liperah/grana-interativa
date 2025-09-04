import { ExpenseTracker } from "@/components/ExpenseTracker";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, TrendingUp, Download, PieChart } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 text-center text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Controle Seus Gastos
              <span className="block text-white/90">de Forma Inteligente</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white max-w-2xl mx-auto font-medium">
              Organize suas finanças pessoais, visualize seus gastos e baixe relatórios detalhados em planilha
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-white/20 backdrop-blur-sm border-white/30 shadow-elegant">
                <div className="flex items-center gap-2 text-white">
                  <Calculator className="h-5 w-5" />
                  <span className="font-semibold">Cálculos Automáticos</span>
                </div>
              </Card>
              <Card className="p-4 bg-white/20 backdrop-blur-sm border-white/30 shadow-elegant">
                <div className="flex items-center gap-2 text-white">
                  <TrendingUp className="h-5 w-5" />
                  <span className="font-semibold">Análise Visual</span>
                </div>
              </Card>
              <Card className="p-4 bg-white/20 backdrop-blur-sm border-white/30 shadow-elegant">
                <div className="flex items-center gap-2 text-white">
                  <Download className="h-5 w-5" />
                  <span className="font-semibold">Export para Excel</span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Gerencie Suas Finanças</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-medium">
              Adicione suas receitas e despesas, categorize seus gastos e tenha uma visão completa da sua situação financeira
            </p>
          </div>

          <ExpenseTracker />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Por que usar nossa ferramenta?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 text-center shadow-card hover:shadow-elegant transition-shadow border-2 border-border bg-background">
              <div className="bg-gradient-primary w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Calculator className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Fácil de Usar</h3>
              <p className="text-muted-foreground font-medium">
                Interface intuitiva que permite adicionar gastos e receitas em segundos
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-elegant transition-shadow border-2 border-border bg-background">
              <div className="bg-gradient-income w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Visualização Clara</h3>
              <p className="text-muted-foreground font-medium">
                Veja seus gastos organizados por categoria com resumos visuais
              </p>
            </Card>

            <Card className="p-8 text-center shadow-card hover:shadow-elegant transition-shadow border-2 border-border bg-background">
              <div className="bg-gradient-expense w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">Export Completo</h3>
              <p className="text-muted-foreground font-medium">
                Baixe uma planilha completa com todos os seus dados financeiros
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-medium mb-2">Controle de Gastos Pessoais</p>
          <p className="text-primary-foreground/80">
            Ferramenta gratuita para organizar suas finanças pessoais
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;