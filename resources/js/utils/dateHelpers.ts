import moment from 'moment';

/**
 * Utilitários para manipulação de datas e períodos
 */

export interface DateRange {
    start_date: string;
    end_date: string;
}

/**
 * Retorna o período de hoje (início e fim do dia)
 */
export const getTodayRange = (): DateRange => {
    const today = moment();
    return {
        start_date: today.format('YYYY-MM-DD'),
        end_date: today.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período desta semana (segunda a domingo)
 */
export const getThisWeekRange = (): DateRange => {
    const startOfWeek = moment().startOf('week').add(1, 'day'); // Segunda-feira
    const endOfWeek = moment().endOf('week').add(1, 'day'); // Domingo
    
    return {
        start_date: startOfWeek.format('YYYY-MM-DD'),
        end_date: endOfWeek.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período deste mês (primeiro ao último dia)
 */
export const getThisMonthRange = (): DateRange => {
    const startOfMonth = moment().startOf('month');
    const endOfMonth = moment().endOf('month');
    
    return {
        start_date: startOfMonth.format('YYYY-MM-DD'),
        end_date: endOfMonth.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período do mês passado
 */
export const getLastMonthRange = (): DateRange => {
    const startOfLastMonth = moment().subtract(1, 'month').startOf('month');
    const endOfLastMonth = moment().subtract(1, 'month').endOf('month');
    
    return {
        start_date: startOfLastMonth.format('YYYY-MM-DD'),
        end_date: endOfLastMonth.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período dos últimos 7 dias
 */
export const getLast7DaysRange = (): DateRange => {
    const endDate = moment();
    const startDate = moment().subtract(6, 'days'); // Inclui hoje
    
    return {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período dos últimos 30 dias
 */
export const getLast30DaysRange = (): DateRange => {
    const endDate = moment();
    const startDate = moment().subtract(29, 'days'); // Inclui hoje
    
    return {
        start_date: startDate.format('YYYY-MM-DD'),
        end_date: endDate.format('YYYY-MM-DD')
    };
};

/**
 * Retorna o período deste ano
 */
export const getThisYearRange = (): DateRange => {
    const startOfYear = moment().startOf('year');
    const endOfYear = moment().endOf('year');
    
    return {
        start_date: startOfYear.format('YYYY-MM-DD'),
        end_date: endOfYear.format('YYYY-MM-DD')
    };
};

/**
 * Formata um período para exibição
 */
export const formatDateRange = (startDate: string, endDate: string): string => {
    const start = moment(startDate);
    const end = moment(endDate);
    
    if (start.isSame(end, 'day')) {
        return start.format('DD/MM/YYYY');
    }
    
    if (start.isSame(end, 'month')) {
        return `${start.format('DD')} - ${end.format('DD/MM/YYYY')}`;
    }
    
    if (start.isSame(end, 'year')) {
        return `${start.format('DD/MM')} - ${end.format('DD/MM/YYYY')}`;
    }
    
    return `${start.format('DD/MM/YYYY')} - ${end.format('DD/MM/YYYY')}`;
};

/**
 * Verifica se um período é válido
 */
export const isValidDateRange = (startDate: string, endDate: string): boolean => {
    if (!startDate || !endDate) return false;
    
    const start = moment(startDate);
    const end = moment(endDate);
    
    return start.isValid() && end.isValid() && start.isSameOrBefore(end);
};
