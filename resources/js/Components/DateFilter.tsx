import React from 'react';

interface DateFilterProps {
    filterType: 'month' | 'period';
    onFilterTypeChange: (type: 'month' | 'period') => void;
    monthValue: string;
    onMonthChange: (value: string) => void;
    startDateValue: string;
    onStartDateChange: (value: string) => void;
    endDateValue: string;
    onEndDateChange: (value: string) => void;
    months: Array<{ value: string; label: string }>;
}

const DateFilter: React.FC<DateFilterProps> = ({
    filterType,
    onFilterTypeChange,
    monthValue,
    onMonthChange,
    startDateValue,
    onStartDateChange,
    endDateValue,
    onEndDateChange,
    months
}) => {
    return (
        <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            {/* Tipo de Filtro */}
            <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Filtrar por:</label>
                <div className="flex space-x-2">
                    <button
                        type="button"
                        onClick={() => onFilterTypeChange('month')}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            filterType === 'month'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Mês/Ano
                    </button>
                    <button
                        type="button"
                        onClick={() => onFilterTypeChange('period')}
                        className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            filterType === 'period'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        Período
                    </button>
                </div>
            </div>

            {/* Filtros de Data */}
            {filterType === 'month' ? (
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Mês/Ano
                    </label>
                    <select
                        name="month"
                        value={monthValue}
                        onChange={(e) => onMonthChange(e.target.value)}
                        className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Todos os meses</option>
                        {months.length > 0 &&
                            months.map((month, key) => (
                                <option key={key} value={month.value}>
                                    {month.label}
                                </option>
                            ))}
                    </select>
                </div>
            ) : (
                <>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Inicial
                        </label>
                        <input
                            type="date"
                            value={startDateValue}
                            onChange={(e) => onStartDateChange(e.target.value)}
                            className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Data Final
                        </label>
                        <input
                            type="date"
                            value={endDateValue}
                            onChange={(e) => onEndDateChange(e.target.value)}
                            className="w-full h-10 px-3 rounded border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default DateFilter;
