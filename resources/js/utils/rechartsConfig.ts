// Configurações padrão para gráficos Recharts

// Cores padrão do sistema
export const chartColors = {
    primary: '#3B82F6',      // Azul
    success: '#10B981',      // Verde
    danger: '#EF4444',       // Vermelho
    warning: '#F59E0B',      // Amarelo
    info: '#06B6D4',         // Ciano
    purple: '#8B5CF6',       // Roxo
    pink: '#EC4899',         // Rosa
    gray: '#6B7280',         // Cinza
};

// Cores para gráficos de receitas e despesas
export const incomeExpenseColors = {
    income: '#10B981',       // Verde para receitas
    expense: '#EF4444',      // Vermelho para despesas
    incomeLight: '#D1FAE5',  // Verde claro
    expenseLight: '#FEE2E2', // Vermelho claro
};

// Configurações padrão para tooltips
export const defaultTooltipStyle = {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    border: '1px solid #6B7280',
    borderRadius: '6px',
    color: 'white',
    fontSize: '12px',
    padding: '8px 12px',
};

// Função para formatar valores em moeda brasileira
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value || 0);
};

// Função para formatar valores no tooltip
export const formatTooltipValue = (value: number): string => {
    return `R$ ${value.toLocaleString('pt-BR', { 
        minimumFractionDigits: 2,
        maximumFractionDigits: 2 
    })}`;
};

// Função para formatar valores no eixo Y
export const formatYAxisValue = (value: number): string => {
    return `R$ ${value.toLocaleString('pt-BR', { 
        minimumFractionDigits: 0,
        maximumFractionDigits: 0 
    })}`;
};

// Função para formatar datas
export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit'
    });
};

// Configurações padrão para responsividade
export const responsiveConfig = {
    width: '100%',
    height: 300,
    margin: {
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
    },
};

// Configurações para gráficos de linha
export const lineChartConfig = {
    ...responsiveConfig,
    dataKey: 'total',
    strokeWidth: 2,
    dot: { r: 4 },
    activeDot: { r: 6 },
};

// Configurações para gráficos de barra
export const barChartConfig = {
    ...responsiveConfig,
    barSize: 40,
    radius: [4, 4, 0, 0] as [number, number, number, number],
};

// Configurações para gráficos de pizza
export const pieChartConfig = {
    ...responsiveConfig,
    cx: '50%',
    cy: '50%',
    innerRadius: 60,
    outerRadius: 100,
    paddingAngle: 2,
};
