import React from 'react';
import { TrendingUpIcon, TrendingDownIcon, MinusIcon } from '@heroicons/react/solid';

interface IndicatorCardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    change?: number;
    changeLabel?: string;
    icon?: React.ReactNode;
    color?: 'blue' | 'green' | 'red' | 'yellow' | 'purple' | 'indigo';
    size?: 'sm' | 'md' | 'lg';
}

const IndicatorCard: React.FC<IndicatorCardProps> = ({
    title,
    value,
    subtitle,
    change,
    changeLabel,
    icon,
    color = 'blue',
    size = 'md'
}) => {
    const colorClasses = {
        blue: {
            bg: 'bg-blue-50',
            border: 'border-blue-200',
            text: 'text-blue-600',
            icon: 'text-blue-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        },
        green: {
            bg: 'bg-green-50',
            border: 'border-green-200',
            text: 'text-green-600',
            icon: 'text-green-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        },
        red: {
            bg: 'bg-red-50',
            border: 'border-red-200',
            text: 'text-red-600',
            icon: 'text-red-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        },
        yellow: {
            bg: 'bg-yellow-50',
            border: 'border-yellow-200',
            text: 'text-yellow-600',
            icon: 'text-yellow-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        },
        purple: {
            bg: 'bg-purple-50',
            border: 'border-purple-200',
            text: 'text-purple-600',
            icon: 'text-purple-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        },
        indigo: {
            bg: 'bg-indigo-50',
            border: 'border-indigo-200',
            text: 'text-indigo-600',
            icon: 'text-indigo-500',
            change: {
                positive: 'text-green-600',
                negative: 'text-red-600',
                neutral: 'text-gray-600'
            }
        }
    };

    const sizeClasses = {
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8'
    };

    const textSizeClasses = {
        sm: 'text-2xl',
        md: 'text-3xl',
        lg: 'text-4xl'
    };

    const currentColor = colorClasses[color];

    const getChangeIcon = () => {
        if (change === undefined || change === 0) {
            return <MinusIcon className="w-4 h-4" />;
        }
        return change > 0 ? 
            <TrendingUpIcon className="w-4 h-4" /> : 
            <TrendingDownIcon className="w-4 h-4" />;
    };

    const getChangeColor = () => {
        if (change === undefined || change === 0) {
            return currentColor.change.neutral;
        }
        return change > 0 ? 
            currentColor.change.positive : 
            currentColor.change.negative;
    };

    const formatChange = () => {
        if (change === undefined) return '';
        const sign = change > 0 ? '+' : '';
        return `${sign}${change.toFixed(1)}%`;
    };

    return (
        <div className={`${currentColor.bg} ${currentColor.border} border rounded-lg ${sizeClasses[size]} transition-all duration-200 hover:shadow-md`}>
            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
                    <p className={`${textSizeClasses[size]} font-bold ${currentColor.text} mb-2`}>
                        {value}
                    </p>
                    {subtitle && (
                        <p className="text-sm text-gray-500">{subtitle}</p>
                    )}
                    {change !== undefined && (
                        <div className={`flex items-center space-x-1 mt-2 ${getChangeColor()}`}>
                            {getChangeIcon()}
                            <span className="text-sm font-medium">
                                {formatChange()}
                            </span>
                            {changeLabel && (
                                <span className="text-xs text-gray-500 ml-1">
                                    {changeLabel}
                                </span>
                            )}
                        </div>
                    )}
                </div>
                {icon && (
                    <div className={`${currentColor.icon} ml-4`}>
                        {icon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default IndicatorCard;
