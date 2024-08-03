<?php

if (! function_exists('mask_doc')){

    function mask_doc($val, $mask)
    {
        $maskared = '';
        $k = 0;
        for($i = 0; $i<=strlen($mask)-1; $i++) {
            if($mask[$i] == '#') {
                if(isset($val[$k])) $maskared .= $val[$k++];
            } else {
                if(isset($mask[$i])) $maskared .= $mask[$i];
            }
        }
        return $maskared;
    }

}

if (! function_exists('translate_month')){

    function translate_month($value)
    {
        $dates = [
            'January' => 'Janeiro',
            'February' => 'Fevereiro',
            'March' => 'Março',
            'April' => 'Abril',
            'May' => 'Maio',
            'June' => 'Junho',
            'July' => 'Julho',
            'August' => 'Agosto',
            'September' => 'Setembro',
            'October' => 'Outubro',
            'November' => 'Novembro',
            'December' => 'Dezembro',
        ];

        $arrValues = explode(' ', $value);

        return $dates[$arrValues[0]] . ' ' . $arrValues[1];

    }

}

if (! function_exists('date_extenso')){

    function date_extenso($value)
    {
        $dates = [
            'January' => 'Janeiro',
            'February' => 'Fevereiro',
            'March' => 'Março',
            'April' => 'Abril',
            'May' => 'Maio',
            'June' => 'Junho',
            'July' => 'Julho',
            'August' => 'Agosto',
            'September' => 'Setembro',
            'October' => 'Outubro',
            'November' => 'Novembro',
            'December' => 'Dezembro',
        ];

        $arrValues = explode(' ', $value);

        return '('. $arrValues[0] . ') de ' .$dates[$arrValues[1]] . ' de ' . $arrValues[2];

    }

}


if (! function_exists('string_to_decimal')){

    function string_to_decimal($value)
    {
        $str = str_replace("R$", "", $value);

        if(strpos($str, '.') > 0){
            $str = str_replace('.', '', $str);
        }

        $str = str_replace(",", ".", $str);

        return $str;
    }

}

if (! function_exists('strip_empty_custom')){

    function strip_empty_custom($data)
    {
        foreach ($data as $key => $value) {
            if (is_array($data[$key])){
                $data[$key] = strip_empty_custom($data[$key]);
            }

            if (empty($value)){
                unset($data[$key]);
            }
        }
        return $data;
    }

}

if (! function_exists('generate_expense_code')){

    function generate_expense_code()
    {
        return "PGT-".mt_rand(1000000000, 9999999999);
    }

}