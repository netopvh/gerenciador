/**
 * Formata um valor numérico como moeda brasileira (BRL)
 * @param value - Valor a ser formatado (string ou number)
 * @returns String formatada como moeda (ex: "R$ 1.234,56")
 */
export const formatCurrency = (value: string | number): string => {
    if (!value && value !== 0) return "R$ 0,00";
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) return "R$ 0,00";
    
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numValue);
};

/**
 * Remove formatação de moeda e retorna apenas o valor numérico
 * @param currencyString - String formatada como moeda (ex: "R$ 1.234,56")
 * @returns Número limpo (ex: 1234.56)
 */
export const parseCurrency = (currencyString: string): number => {
    if (!currencyString) return 0;
    
    // Remove símbolos e espaços
    const cleanString = currencyString
        .replace(/[R$\s]/g, '')
        .replace(/\./g, '') // Remove separadores de milhares
        .replace(',', '.'); // Substitui vírgula decimal por ponto
    
    const parsed = parseFloat(cleanString);
    return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formata um valor para input de moeda (sem símbolo R$)
 * @param value - Valor a ser formatado
 * @returns String formatada para input (ex: "1.234,56")
 */
export const formatCurrencyInput = (value: string | number): string => {
    if (!value && value !== 0) return "0,00";
    
    const numValue = typeof value === 'string' ? parseFloat(value) : value;
    
    if (isNaN(numValue)) return "0,00";
    
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(numValue);
};
