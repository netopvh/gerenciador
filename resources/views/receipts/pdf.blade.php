<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Recibo - {{ $income->customer->name }}</title>
    <style>
        @page {
            size: A4;
            margin: 20mm;
        }
        
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            line-height: 1.4;
            color: #000;
            margin: 0;
            padding: 0;
        }
        
        .receipt-container {
            max-width: 100%;
            margin: 0 auto;
        }
        
        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 20px;
        }
        
        .logo-section {
            width: 20%;
        }
        
        .company-info {
            width: 80%;
            text-align: right;
        }
        
        .title {
            font-size: 18px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 10px;
        }
        
        .subtitle {
            font-size: 14px;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 5px;
        }
        
        .text {
            font-size: 12px;
            margin-bottom: 3px;
        }
        
        .text-bold {
            font-weight: bold;
        }
        
        .text-uppercase {
            text-transform: uppercase;
        }
        
        .divider {
            border-top: 1px solid #000;
            margin: 15px 0;
        }
        
        .customer-info {
            margin: 15px 0;
        }
        
        .services-table {
            width: 100%;
            border-collapse: collapse;
            margin: 15px 0;
        }
        
        .services-table th,
        .services-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }
        
        .services-table th {
            background-color: #f5f5f5;
            font-weight: bold;
        }
        
        .services-table .text-right {
            text-align: right;
        }
        
        .totals {
            margin-top: 20px;
            text-align: right;
        }
        
        .totals-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 5px;
            padding-bottom: 5px;
            border-bottom: 1px solid #ccc;
        }
        
        .totals-row.final {
            border-bottom: 2px solid #000;
            font-weight: bold;
            font-size: 14px;
        }
        
        .signatures {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        
        .signature-box {
            width: 45%;
            text-align: center;
        }
        
        .signature-line {
            border-bottom: 2px solid #000;
            margin-bottom: 10px;
            height: 40px;
        }
        
        .date {
            text-align: center;
            margin: 20px 0;
            font-weight: bold;
        }
        
        .section-title {
            font-size: 16px;
            font-weight: bold;
            margin: 20px 0 10px 0;
        }
    </style>
</head>
<body>
    <div class="receipt-container">
        <!-- Header -->
        <div class="header">
            <div class="logo-section">
                <div style="width: 120px; height: 60px; background-color: #f0f0f0; border: 1px solid #ccc; display: flex; align-items: center; justify-content: center;">
                    LOGO
                </div>
            </div>
            <div class="company-info">
                <div class="title">anti-roubo monitoramento 24 horas</div>
                <div class="subtitle">B.J. FONTOURA DE SOUZA MONITORAMENTO E SERVIÇOS</div>
                <div class="text">31.805.452/0001-74</div>
                <div class="text">Rua Anízio Gorayeb, 1172</div>
                <div class="text">São João Bosco, Porto Velho - RO</div>
                <div class="text">CEP 76803-724</div>
            </div>
        </div>
        
        <!-- Slogan -->
        <div style="text-align: center; margin: 20px 0;">
            <div class="subtitle">SUA SEGURANÇA É A NOSSA PROFISSÃO</div>
        </div>
        
        <!-- Fatura Info -->
        <div style="text-align: center; margin: 20px 0;">
            <div class="title">Fatura {{ $income->id }}-{{ date('Y', strtotime($income->due_date)) }}</div>
            <div class="subtitle">MENSALIDADE DE {{ $dateReceipt }}</div>
        </div>
        
        <div class="divider"></div>
        
        <!-- Customer Info -->
        <div class="customer-info">
            <div class="text-bold">Cliente: {{ $income->customer->name }}</div>
            <div class="text">CPF/CNPJ: {{ $formattedData['formattedCpfCnpj'] }}</div>
            <div class="text">{{ $income->customer->address }}, {{ $income->customer->number }}</div>
            <div class="text">{{ $income->customer->district }}, PORTO VELHO - RO</div>
            <div class="text">Telefone: {{ $income->customer->mobile }}</div>
        </div>
        
        <div class="section-title">Informações Básicas</div>
        <div class="divider"></div>
        
        <div style="margin: 15px 0;">
            <div class="text-bold">Observações</div>
            <div class="text-uppercase">{{ $receipt->observations ?: 'Nenhuma observação' }}</div>
        </div>
        
        <div class="section-title">Serviços</div>
        <div class="divider"></div>
        
        <table class="services-table">
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Preço unitário</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                @if($income->transactions && count($income->transactions) > 0)
                    @foreach($income->transactions as $transaction)
                        <tr>
                            <td class="text-uppercase">{{ $income->category->title }}</td>
                            <td class="text-right">{{ $formattedData['formattedReceived'] }}</td>
                            <td class="text-right">1</td>
                            <td class="text-right">{{ $formattedData['formattedReceived'] }}</td>
                        </tr>
                    @endforeach
                @else
                    <tr>
                        <td class="text-uppercase">{{ $income->category->title }}</td>
                        <td class="text-right">{{ $formattedData['formattedReceive'] }}</td>
                        <td class="text-right">1</td>
                        <td class="text-right">{{ $formattedData['formattedReceive'] }}</td>
                    </tr>
                @endif
            </tbody>
        </table>
        
        <!-- Totals -->
        <div class="totals">
            <div class="totals-row">
                <span class="text-bold">Subtotal</span>
                <span></span>
            </div>
            <div class="totals-row">
                <span>Serviços</span>
                <span>{{ $formattedData['formattedReceive'] }}</span>
            </div>
            <div class="totals-row">
                <span class="text-bold">Valor Pago</span>
                <span class="text-bold">{{ $formattedData['formattedReceived'] }}</span>
            </div>
            <div class="totals-row final">
                <span>Valor Pendente</span>
                <span>{{ $formattedData['formattedPending'] }}</span>
            </div>
        </div>
        
        <div class="section-title">Meios de pagamento</div>
        <div class="divider"></div>
        
        <div style="margin: 15px 0;">
            <div class="text">Transferência bancária, dinheiro ou pix.</div>
        </div>
        
        <div class="date">
            Porto Velho, {{ $formattedData['formattedDate'] }}
        </div>
        
        <!-- Signatures -->
        <div class="signatures">
            <div class="signature-box">
                <div class="signature-line"></div>
                <div class="text-bold text-uppercase">ANTI-ROUBO MONITORAMENTO 24 HORAS</div>
            </div>
            <div class="signature-box">
                <div class="signature-line"></div>
                <div class="text-bold text-uppercase">{{ $income->customer->name }}</div>
            </div>
        </div>
    </div>
</body>
</html>
