export const MOCK_TRADE_NODES = [
    {
        data: ['Portfolio', 100, 100, 100, 100, 0, 0, 0, 0, 100, 100, 100, 100],
        children: [
            {
                data: ['Equities', 42.4, 40.5, 41.5, 44.4, 1, 0, 0, 0, 43.4, 40.5, 41.5, 44.4],
                children: [
                    {
                        data: ['US', -2, -2.1, -2, 0, 2, 0, 0, 0, 0, -2.1, -2, 0],
                        children: [
                            { data: ['US Norm wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quality', 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0] },
                            { data: ['Quant US', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US Opportunistic Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US Small Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Short - S&P 500', -2, -2.1, -2, 0, 0, 0, 0, 0, -2, -2.1, -2, 0] },
                            { data: ['Short - Russell 2000', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['INTL', 19.2, 18.6, 18.8, 8.3, -1, 0, 0, 0, 18.2, 18.6, 18.8, 8.3],
                        children: [
                            { data: ['INTL Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quant INTL', 7.4, 7, 7.2, 0, 0, 0, 0, 0, 7.4, 7, 7.2, 0] },
                            { data: ['Quant INTL Small Value', 5.6, 5, 5.3, 0, -2, 0, 0, 0, 3.6, 5, 5.3, 0], },
                            { data: ['Quant INTL Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Short - EAFE', 0, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0] },
                            { data: ['Short - TOPIX', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Japan Small Value', 0, 6.4, 6.2, 8.3, 1, 0, 0, 0, 1, 6.4, 6.2, 8.3] },
                            { data: ['Usonian High Capacity', 3.7, 0, 0, 0, 0, 0, 0, 0, 3.7, 0, 0, 0] },
                            { data: ['Usonian Low Capacity', 2.5, 0, 0, 0, 0, 0, 0, 0, 2.5, 0, 0, 0] }
                        ],
                    },
                    {
                        data: ['EM', 15.8, 15.8, 15.7, 7.9, 0, 0, 0, 0, 15.8, 15.8, 15.7, 7.9],
                        children: [
                            { data: ['EM Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EM BRK', 0.2, 0.2, 0.2, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 0] },
                            { data: ['EM BRK ex China', 7.2, 7.4, 7, 0, 0, 0, 0, 0, 7.2, 7.4, 7, 0] },
                            { data: ['Quant EMG', 8.4, 8.2, 8.4, 0, 0, 0, 0, 0, 8.4, 8.2, 8.4, 0] },
                            { data: ['Short - EM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EMF', 0, 0, 0, 7.9, 0, 0, 0, 0, 0, 0, 0, 7.9] },
                        ]
                    },
                    { data: ['Korean Won Hedge', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Resources', 3.1, 3.2, 3.1, 28.2, 0, 0, 0, 0, 3.1, 3.2, 3.1, 28.2] },
                    { data: ['130/30 xUS', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Fundamental', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Cyclical Survivors', 6.3, 5, 6, 0, 0, 0, 0, 0, 6.3, 5, 6, 0] },
                    { data: ['SOPS', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                data: ['Fixed Income', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6],
                children: [
                    {
                        data: ['TIPS', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6],
                        children: [
                            { data: ['US TIPS Allocation', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US TIPS Norm Wt', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6] }
                        ]
                    },
                    {
                        data: ['US Treasuries (Nominals)', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['US Treasuries Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
                        ]
                    }]
            },
            {
                data: ['Credit', 15.6, 16.5, 11.4, 0, -1, 0, 0, 0, 14.6, 16.5, 11.4, 0],
                children: [
                    {
                        data: ['Corporate', 8.4, 8.8, 3.9, 0, -1, 0, 0, 0, 7.4, 8.8, 3.9, 0],
                        children: [
                            { data: ['High Yield Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['COF', 5.2, 5.3, 0, 0, -1, 0, 0, 0, 4.2, 5.3, 0, 0] },
                            { data: ['COF Plus', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['High Yield', 0, 3.5, 0, 0, 0, 0, 0, 0, 0, 3.5, 0, 0] },
                            { data: ['High Yield Beta', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['High Yield Fund', 3.1, 0, 3.9, 0, 0, 0, 0, 0, 3.1, 0, 3.9, 0] },
                            { data: ['High Yield Liquid', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['EM Debt', 3.3, 3.6, 3.3, 0, 0, 0, 0, 0, 3.3, 3.6, 3.3, 0] },
                    { data: ['Structured', 3.9, 4.1, 4.3, 0, 0, 0, 0, 0, 3.9, 4.1, 4.3, 0] }]
            },
            {
                data: ['Alternatives', 41.1, 40.8, 40.8, 43.1, 0, 0, 0, 0, 41.1, 40.8, 40.8, 43.1],
                children: [
                    {
                        data: ['EAFE vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['EAFE vs. S&P - Currency', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EAFE vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EAFE vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Risk Premium', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Tactical Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Quality vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Quality vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quality vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Small Value vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Small Value vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Small Value vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['SGM MM', 10.1, 9.9, 3, 0, 0, 0, 0, 0, 10.1, 9.9, 3, 0],
                        children: [
                            { data: ['SGM MM - ALTO', 2.7, 0, 0, 0, 0, 0, 0, 0, 2.7, 0, 0, 0] },
                            { data: ['SGM MM - SGMO', 7.3, 0, 0, 0, 0, 0, 0, 0, 7.3, 0, 0, 0] }]
                    },
                    {
                        data: ['Multi-Strategy Fund', 0, 0, 19.3, 0, 0, 0, 0, 0, 0, 0, 19.3, 0],
                        children: [
                            { data: ['Multi-Strategy Fund Allocation', 0, 0, 19.3, 0, 0, 0, 0, 0, 0, 0, 19.3, 0] },
                        ]
                    },
                    {
                        data: ['Quality Spectrum', 0, 0, 0, 26.5, 0, 0, 0, 0, 0, 0, 0, 26.5],
                        children: [
                            { data: ['Quality Spectrum', 0, 0, 0, 26.5, 0, 0, 0, 0, 0, 0, 0, 26.5] },
                        ]
                    },
                    { data: ['Alpha-Only', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['FIHF', 4.4, 4.1, 1.7, 0, 0, 0, 0, 0, 4.4, 4.1, 1.7, 0] },
                    { data: ['Merger', 6.4, 6.4, 0, 0, 0, 0, 0, 0, 6.4, 6.4, 0, 0] },
                    { data: ['Value Dislocation Long/Short', 20.2, 20.4, 16.8, 16.6, 0, 0, 0, 0, 20.2, 20.4, 16.8, 16.6] },
                    { data: ['Misc. RV', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                data: ['Short Term Portfolio', -1.1, 0.1, 4.3, 0, 0, 0, 0, 0, -1.1, 0.1, 4.3, 0],
                children: [
                    { data: ['High Quality Cash', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Liquidity', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    {
                        data: ['Short Term Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['1Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['2Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['Short Term Structured', 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0, 0.3, 0] },
                    { data: ['Tbill/Cash', -1.1, 0.1, 4, 0, 0, 0, 0, 0, -1.1, 0.1, 4, 0] },
                    { data: ['Trading Implementation', 0.1, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0] },
                ]
            },
            {
                data: ['Contra Cash', 2, 2.1, 2, 0, 0, 0, 0, 0, 2, 2.1, 2, 0],
            },
        ]
    },
];

export const MOCK_COMPARE_NODES = [
    {
        data: ['Portfolio', 100, 100, 0, 0, 0, 0, 100, 100, 0],
        children: [
            {
                data: ['Equities', 42.4, 40.5, 1.9, 1, 0, 1, 43.4, 40.5, 2.9],
                children: [
                    {
                        data: ['US', -2, -2.1, 0.1, 2, 0, 2, 0, -2.1, 2.1],
                        children: [
                            { data: ['US Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quality', 0, 0, 0, 2, 0, 2, 2, 0, 2] },
                            { data: ['Quant US', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US Opportunistic Value', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US Small Value', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Short - S&P 500', -2, -2.1, 0.1, 0, 0, 0, -2, -2.1, 0.1] },
                            { data: ['Short - Russell 2000', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['INTL', 19.2, 18.6, 0.6, -1, 0, -1, 18.2, 18.6, -0.4],
                        children: [
                            { data: ['INTL Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quant INTL', 7.4, 7, 0.4, 0, 0, 0, 7.4, 7, 0.4] },
                            { data: ['Quant INTL Small Value', 5.6, 5, 0.6, -2, 0, -2, 3.6, 5, -1.4] },
                            { data: ['Quant INTL Value', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Short - EAFE', 0, 0.1, -0.1, 0, 0, 0, 0, 0.1, -0.1] },
                            { data: ['Short - TOPIX', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Japan Small Value', 0, 6.4, -6.4, 1, 0, 1, 1, 6.4, -5.4] },
                            { data: ['Usonian High Capacity', 3.7, 0, 3.7, 0, 0, 0, 3.7, 0, 3.7] },
                            { data: ['Usonian Low Capacity', 2.5, 0, 2.5, 0, 0, 0, 2.5, 0, 2.5] },
                        ],
                    },
                    {
                        data: ['EM', 15.8, 15.8, 0, 0, 0, 0, 15.8, 15.8, 0],
                        children: [
                            { data: ['EM Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EM BRK', 0.2, 0.2, 0, 0, 0, 0, 0.2, 0.2, 0] },
                            { data: ['EM BRK ex China', 7.2, 7.4, -0.2, 0, 0, 0, 7.2, 7.4, -0.2] },
                            { data: ['Quant EMG', 8.4, 8.2, 0.2, 0, 0, 0, 8.4, 8.2, 0.2] },
                            { data: ['Short - EM', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EMF', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['Korean Won Hedge', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Resources', 3.1, 3.2, -0.1, 0, 0, 0, 3.1, 3.2, -0.1] },
                    { data: ['130/30 xUS', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Fundamental', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Cyclical Survivors', 6.3, 5, 1.4, 0, 0, 0, 6.3, 5, 1.4] },
                    { data: ['SOPS', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                data: ['Fixed Income', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                children: [
                    {
                        data: ['TIPS', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['US TIPS Allocation', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['US TIPS Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['US Treasuries (Nominals)', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['US Treasuries Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    }]
            },
            {
                data: ['Credit', 15.6, 16.5, -0.9, -1, 0, -1, 14.6, 16.5, -1.9],
                children: [
                    {
                        data: ['Corporate', 8.4, 8.8, -0.4, -1, 0, -1, 7.4, 8.8, -1.4],
                        children: [
                            { data: ['High Yield Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['COF', 5.2, 5.3, 0, -1, 0, -1, 4.2, 5.3, -1] },
                            { data: ['COF Plus', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['High Yield', 0, 3.5, -3.5, 0, 0, 0, 0, 3.5, -3.5] },
                            { data: ['High Yield Beta', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['High Yield Fund', 3.1, 0, 3.1, 0, 0, 0, 3.1, 0, 3.1] },
                            { data: ['High Yield Liquid', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['EM Debt', 3.3, 3.6, -0.3, 0, 0, 0, 3.3, 3.6, -0.3] },
                    { data: ['Structured', 3.9, 4.1, -0.2, 0, 0, 0, 3.9, 4.1, -0.2] },
                ]
            },
            {
                data: ['Alternatives', 41.1, 40.8, 0.2, 0, 0, 0, 41.1, 40.8, 0.2],
                children: [
                    {
                        data: ['EAFE vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['EAFE vs. S&P - Currency', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EAFE vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['EAFE vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Risk Premium', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Tactical Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Quality vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Quality vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Quality vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Small Value vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Small Value vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Small Value vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['SGM MM', 10.1, 9.9, 0.2, 0, 0, 0, 10.1, 9.9, 0.2],
                        children: [
                            { data: ['SGM MM - ALTO', 2.7, 0, 2.7, 0, 0, 0, 2.7, 0, 2.7] },
                            { data: ['SGM MM - SGMO', 7.3, 0, 7.3, 0, 0, 0, 7.3, 0, 7.3] },
                        ]
                    },
                    {
                        data: ['Multi-Strategy Fund', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Multi-Strategy Fund Allocation', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['Multi-Strategy Fund Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        data: ['Quality Spectrum', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['Quality Spectrum', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['Alpha-Only', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['FIHF', 4.4, 4.1, 0.3, 0, 0, 0, 4.4, 4.1, 0.3] },
                    { data: ['Merger', 6.4, 6.4, 0, 0, 0, 0, 6.4, 6.4, 0] },
                    { data: ['Value Dislocation Long/Short', 20.2, 20.4, -0.2, 0, 0, 0, 20.2, 20.4, -0.2] },
                    { data: ['Misc. RV', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                data: ['Short Term Portfolio', -1.1, 0.1, -1.2, 0, 0, 0, -1.1, 0.1, -1.2],
                children: [
                    { data: ['High Quality Cash', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Liquidity', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    {
                        data: ['Short Term Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { data: ['1Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { data: ['2Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { data: ['Short Term Structured', 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { data: ['Tbill/Cash', -1.1, 0.1, -1.3, 0, 0, 0, -1.1, 0.1, -1.3] },
                    { data: ['Trading Implementation', 0.1, 0, 0.1, 0, 0, 0, 0.1, 0, 0.1] },
                ]
            },
            {
                data: ['Contra Cash', 2, 2.1, -0.1, 0, 0, 0, 2, 2.1, -0.1],
            },
        ]
    },
];
