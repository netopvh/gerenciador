import { useState, useCallback, useMemo } from 'react';
import { Inertia } from '@inertiajs/inertia';
import route from 'ziggy-js';

interface FilterParams {
    month?: string;
    term?: string;
    list?: string;
    start_date?: string;
    end_date?: string;
}

interface UseIncomeFiltersProps {
    initialParams: FilterParams;
}

export const useIncomeFilters = ({ initialParams }: UseIncomeFiltersProps) => {
    const [query, setQuery] = useState({
        month: initialParams.month || "",
        term: initialParams.term || "",
        list: initialParams.list || "",
        start_date: initialParams.start_date || "",
        end_date: initialParams.end_date || "",
    });

    const [isLoading, setIsLoading] = useState(false);
    const [filterType, setFilterType] = useState<'month' | 'period'>('month');

    const filter = useCallback(() => {
        setIsLoading(true);
        let params: FilterParams = { ...query };

        // Limpar parâmetros vazios
        Object.keys(params).forEach(key => {
            if (params[key as keyof FilterParams] === "") {
                delete params[key as keyof FilterParams];
            }
        });

        // Se estiver usando filtro por período, remover month
        if (filterType === 'period') {
            delete params.month;
        } else {
            delete params.start_date;
            delete params.end_date;
        }

        Inertia.get(route("income.index"), params, {
            replace: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    }, [query, filterType]);

    const clearFilters = useCallback(() => {
        setQuery({
            month: "",
            term: "",
            list: "",
            start_date: "",
            end_date: "",
        });
        setFilterType('month');
    }, []);

    const hasActiveFilters = useMemo(() => {
        return query.month || query.term || query.list || query.start_date || query.end_date;
    }, [query]);

    const updateQuery = useCallback((updates: Partial<FilterParams>) => {
        setQuery(prev => ({ ...prev, ...updates }));
    }, []);

    return {
        query,
        setQuery: updateQuery,
        filterType,
        setFilterType,
        isLoading,
        filter,
        clearFilters,
        hasActiveFilters
    };
};
