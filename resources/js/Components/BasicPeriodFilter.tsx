import React from 'react';

interface BasicPeriodFilterProps {
    startDate: string;
    endDate: string;
    onDateChange: (startDate: string, endDate: string) => void;
}

const BasicPeriodFilter: React.FC<BasicPeriodFilterProps> = ({ startDate, endDate, onDateChange }) => {
    const handleQuickFilter = (filterType: string) => {
        const today = new Date();
        let dates;

        switch (filterType) {
            case 'today':
                dates = {
                    startDate: today.toISOString().split('T')[0],
                    endDate: today.toISOString().split('T')[0]
                };
                break;
            case 'thisMonth':
                const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
                const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0);
                dates = {
                    startDate: firstDay.toISOString().split('T')[0],
                    endDate: lastDay.toISOString().split('T')[0]
                };
                break;
            case 'lastMonth':
                const firstDayLast = new Date(today.getFullYear(), today.getMonth() - 1, 1);
                const lastDayLast = new Date(today.getFullYear(), today.getMonth(), 0);
                dates = {
                    startDate: firstDayLast.toISOString().split('T')[0],
                    endDate: lastDayLast.toISOString().split('T')[0]
                };
                break;
            default:
                return;
        }
        
        onDateChange(dates.startDate, dates.endDate);
    };

    const handleCustomDateChange = (field: 'start' | 'end', value: string) => {
        if (field === 'start') {
            onDateChange(value, endDate);
        } else {
            onDateChange(startDate, value);
        }
    };

    const formatDateRange = () => {
        if (!startDate || !endDate) return '';
        
        const start = new Date(startDate).toLocaleDateString('pt-BR');
        const end = new Date(endDate).toLocaleDateString('pt-BR');
        
        if (start === end) {
            return start;
        }
        
        return `${start} - ${end}`;
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
            <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Período Selecionado</h3>
                <p className="text-lg font-semibold text-gray-900">{formatDateRange()}</p>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-sm font-medium text-gray-700 self-center mr-2">Filtros rápidos:</span>
                <button
                    type="button"
                    onClick={() => handleQuickFilter('today')}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    Hoje
                </button>
                <button
                    type="button"
                    onClick={() => handleQuickFilter('thisMonth')}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    Este Mês
                </button>
                <button
                    type="button"
                    onClick={() => handleQuickFilter('lastMonth')}
                    className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
                >
                    Mês Passado
                </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data Inicial
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => handleCustomDateChange('start', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data Final
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleCustomDateChange('end', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
};

export default BasicPeriodFilter;
