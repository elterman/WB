export const MOCK_NODES = [
    {
        item: ['Portfolio', 100, 100, 100, 100, 0, 0, 0, 0, 100, 100, 100, 100],
        children: [
            {
                item: ['Equities', 42.4, 40.5, 41.5, 44.4, 1, 0, 0, 0, 43.4, 40.5, 41.5, 44.4],
                children: [
                    {
                        item: ['US', -2, -2.1, -2, 0, 2, 0, 0, 0, 0, -2.1, -2, 0],
                        children: [
                            { item: ['US Norm wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Quality', 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0] },
                            { item: ['Quant US', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['US Opportunistic Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['US Small Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Short - S&P 500', -2, -2.1, -2, 0, 0, 0, 0, 0, -2, -2.1, -2, 0] },
                            { item: ['Short - Russel 2000', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        item: ['INTL', 19.2, 18.6, 18.8, 8.3, -1, 0, 0, 0, 18.2, 18.6, 18.8, 8.3],
                        children: [
                            { item: ['INTL Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Quant INTL', 7.4, 7, 7.2, 0, 0, 0, 0, 0, 7.4, 7, 7.2, 0] },
                            {
                                item: ['Quant INTL Small Value', 5.6, 5, 5.3, 0, -2, 0, 0, 0, 3.6, 5, 5.3, 0],
                            },
                            { item: ['Quant INTL Value', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Short - EAFE', 0, 0.1, 0.1, 0, 0, 0, 0, 0, 0, 0.1, 0.1, 0] },
                            { item: ['Short - TOPIX', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Japan Small Value', 0, 6.4, 6.2, 8.3, 1, 0, 0, 0, 1, 6.4, 6.2, 8.3] },
                            { item: ['Usonian High Capacity', 3.7, 0, 0, 0, 0, 0, 0, 0, 3.7, 0, 0, 0] },
                            { item: ['Usonian Low Capacity', 2.5, 0, 0, 0, 0, 0, 0, 0, 2.5, 0, 0, 0] }
                        ],
                    },
                    {
                        item: ['EM', 15.8, 15.8, 15.7, 7.9, 0, 0, 0, 0, 15.8, 15.8, 15.7, 7.9],
                        children: [
                            { item: ['EM Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['EM BRK', 0.2, 0.2, 0.2, 0, 0, 0, 0, 0, 0.2, 0.2, 0.2, 0] },
                            { item: ['EM BRK ex China', 7.2, 7.4, 7, 0, 0, 0, 0, 0, 7.2, 7.4, 7, 0] },
                            { item: ['Quant EMG', 8.4, 8.2, 8.4, 0, 0, 0, 0, 0, 8.4, 8.2, 8.4, 0] },
                            { item: ['Short - EM', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['EMF', 0, 0, 0, 7.9, 0, 0, 0, 0, 0, 0, 0, 7.9] },
                        ]
                    },
                    { item: ['Korean Won Hedge', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { item: ['Resources', 3.1, 3.2, 3.1, 28.2, 0, 0, 0, 0, 3.1, 3.2, 3.1, 28.2] },
                    { item: ['130 / 30 XUS', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { item: ['Fundamental', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { item: ['Cyclical Survivors', 6.3, 5, 6, 0, 0, 0, 0, 0, 6.3, 5, 6, 0] },
                    { item: ['SOPS', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                item: ['Fixed Income', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6],
                children: [
                    {
                        item: ['TIPS', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6],
                        children: [
                            { item: ['US TIPS Allocation', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['US TIPS Norm Wt', 0, 0, 0, 12.6, 0, 0, 0, 0, 0, 0, 0, 12.6] }
                        ]
                    },
                    {
                        item: ['US Treasuries (Nominals)', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['US Treasuries Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
                        ]
                    }]
            },
            {
                item: ['Credit', 15.6, 16.5, 11.4, 0, -1, 0, 0, 0, 14.6, 16.5, 11.4, 0],
                children: [
                    {
                        item: ['Corporate', 8.4, 8.8, 3.9, 0, -1, 0, 0, 0, 7.4, 8.8, 3.9, 0],
                        children: [
                            { item: ['High Yield Norm Wt', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['COF', 5.2, 5.3, 0, 0, -1, 0, 0, 0, 4.2, 5.3, 0, 0] },
                            { item: ['COF Plus', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['High Yield', 0, 3.5, 0, 0, 0, 0, 0, 0, 0, 3.5, 0, 0] },
                            { item: ['High Yield Beta', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['High Yield Fund', 3.1, 0, 3.9, 0, 0, 0, 0, 0, 3.1, 0, 3.9, 0] },
                            { item: ['High Yield Liquid', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { item: ['EM Debt', 3.3, 3.6, 3.3, 0, 0, 0, 0, 0, 3.3, 3.6, 3.3, 0] },
                    { item: ['Structured', 3.9, 4.1, 4.3, 0, 0, 0, 0, 0, 3.9, 4.1, 4.3, 0] }]
            },
            {
                item: ['Alternatives', 41.1, 40.8, 40.8, 43.1, 0, 0, 0, 0, 41.1, 40.8, 40.8, 43.1],
                children: [
                    {
                        item: ['EAFE vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['EAFE vs. S&P - Currency', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['EAFE vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['EAFE vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        item: ['Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['Risk Premium', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Tactical Put Selling', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        item: ['Quality vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['Quality vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Quality vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        item: ['Small Value vs. S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['Small Value vs. S&P - Long Book', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['Small Value vs. S&P - Short S&P', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    {
                        item: ['SGM MM', 10.1, 9.9, 3, 0, 0, 0, 0, 0, 10.1, 9.9, 3, 0],
                        children: [
                            { item: ['SGM MM - ALTO', 2.7, 0, 0, 0, 0, 0, 0, 0, 2.7, 0, 0, 0] },
                            { item: ['SGM MM - SGMO', 7.3, 0, 0, 0, 0, 0, 0, 0, 7.3, 0, 0, 0] }]
                    },
                    {
                        item: ['Multi-Strategy Fund', 0, 0, 19.3, 0, 0, 0, 0, 0, 0, 0, 19.3, 0],
                        children: [
                            { item: ['Multi-Strategy Fund Allocation', 0, 0, 19.3, 0, 0, 0, 0, 0, 0, 0, 19.3, 0] },
                        ]
                    },
                    {
                        item: ['Quality Spectrum', 0, 0, 0, 26.5, 0, 0, 0, 0, 0, 0, 0, 26.5],
                        children: [
                            { item: ['Quality Spectrum', 0, 0, 0, 26.5, 0, 0, 0, 0, 0, 0, 0, 26.5] },
                        ]
                    },
                    { item: ['Alpha-Only', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { item: ['FIHF', 4.4, 4.1, 1.7, 0, 0, 0, 0, 0, 4.4, 4.1, 1.7, 0] },
                    { item: ['Merger', 6.4, 6.4, 0, 0, 0, 0, 0, 0, 6.4, 6.4, 0, 0] },
                    { item: ['Value Dislocation Long / Short', 20.2, 20.4, 16.8, 16.6, 0, 0, 0, 0, 20.2, 20.4, 16.8, 16.6] },
                    { item: ['Misc. RV', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                ]
            },
            {
                item: ['Short Term Portfolio', -1.1, 0.1, 4.3, 0, 0, 0, 0, 0, -1.1, 0.1, 4.3, 0],
                children: [
                    { item: ['High Quality Cash', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    { item: ['Liquidity', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                    {
                        item: ['Short Term Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        children: [
                            { item: ['1Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                            { item: ['2Yr Notes', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
                        ]
                    },
                    { item: ['Short Term Structured', 0, 0, 0.3, 0, 0, 0, 0, 0, 0, 0, 0.3, 0] },
                    { item: ['Tbill/Cash', -1.1, 0.1, 4, 0, 0, 0, 0, 0, -1.1, 0.1, 4, 0] },
                    { item: ['Trading Implementation', 0.1, 0, 0, 0, 0, 0, 0, 0, 0.1, 0, 0, 0] },
                ]
            },
            {
                item: ['Contra Cash', 2, 2.1, 2, 0, 0, 0, 0, 0, 2, 2.1, 2, 0],
            },
        ]
    },
];
