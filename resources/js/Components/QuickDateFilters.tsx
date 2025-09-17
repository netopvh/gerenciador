import React from 'react';
import { 
    getTodayRange, 
    getThisWeekRange, 
    getThisMonthRange, 
    getLastMonthRange, 
    getLast7DaysRange, 
    getLast30DaysRange,
    formatDateRange 
} from '@/utils/dateHelpers';

interface QuickDateFiltersProps {
    onDateRangeSelect: (startDate: string, endDate: string) => void;
    currentStartDate?: string;
    currentEndDate?: string;
}

const QuickDateFilters: React.FC<QuickDateFiltersProps> = ({
    onDateRangeSelect,
    currentStartDate,
    currentEndDate
}) => {
    const quickFilters = [
        {
            label: 'Hoje',
            range: getTodayRange(),
            icon: '📅'
        },
        {
            label: 'Esta Semana',
            range: getThisWeekRange(),
            icon: '📊'
        },
        {
            label: 'Este Mês',
            range: getThisMonthRange(),
            icon: '🗓️'
        },
        {
            label: 'Mês Passado',
            range: getLastMonthRange(),
            icon: '⏮️'
        },
        {
            label: 'Últimos 7 dias',
            range: getLast7DaysRange(),
            icon: '📈'
        },
        {
            label: 'Últimos 30 dias',
            range: getLast30DaysRange(),
            icon: '📉'
        }
    ];

    const isActiveFilter = (range: { start_date: string; end_date: string }) => {
        return currentStartDate === range.start_date && currentEndDate === range.end_date;
    };

    return (
        <div className="flex flex-wrap gap-2">
            <span className="text-sm font-medium text-gray-700 mr-2">Filtros rápidos:</span>
            {quickFilters.map((filter, index) => {
                const isActive = isActiveFilter(filter.range);
                
                return (
                    <button
                        key={index}
                        type="button"
                        onClick={() => onDateRangeSelect(filter.range.start_date, filter.range.end_date)}
                        className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            isActive
                                ? 'bg-blue-500 text-white shadow-sm'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        }`}
                        title={`${filter.label}: ${formatDateRange(filter.range.start_date, filter.range.end_date)}`}
                    >
                        <span className="mr-1">{filter.icon}</span>
                        {filter.label}
                    </button>
                );
            })}
        </div>
    );
};

export default QuickDateFilters;
