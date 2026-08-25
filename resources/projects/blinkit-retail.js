const blinkitAnalysis = {
    title: "Blinkit Business Analysis",
    description: "Interactive 5-module Power BI executive dashboard analyzing ₹11.01M in revenue, 166K+ inventory movements, 5,000 deliveries, and marketing ROI across quick-commerce operations in India.",
    keyInsight: "Generated ₹11.01M revenue (54.8% margin) and identified ₹39.68M in inventory damage.",
    problem: "Quick-commerce delivery platforms operate on ultra-low latency and tight margins. Fragmented operational visibility across sales, high delivery delay rates (30.6% delayed orders averaging 4.4 min delays), severe inventory damage loss (49% damage rate totaling ₹39.68M), and customer dissatisfaction (41% negative sentiment, 30% CSAT) hindered scalable profitability.",
    dataset: "Multi-dimensional operational dataset comprising ₹11.01M in sales across 268 SKUs, 166,011 inventory receiving records, 5,000 delivery logs across 20+ cities, ₹16.32M marketing ad-spend data across 4 channels, and 5,000 customer feedback sentiment records (2023–2024).",
    approach: [
        "Integrated 5 relational operational datasets: Sales Transactions, Delivery Logistics, Inventory Damage, Multi-Channel Marketing, and Customer Sentiment.",
        "Built DAX measures to calculate dynamic KPIs: Total Profit (₹6.04M / 54.8% margin), Average Order Value (₹2,202), ROAS (1.97x), and Damage Loss Rate (49%).",
        "Designed a unified 5-tab Power BI dashboard with interactive navigation: Sales Analysis, Delivery Logistics, Inventory & Stock Loss, Marketing ROI, and Customer Experience.",
        "Analyzed delivery latency and identified traffic bottlenecks causing average delivery delays of 4.4 minutes (up to 29 mins in Phusro & Raipur vs 8 mins in Mangalore).",
        "Conducted supplier-level damage audits via treemap visualizations, uncovering critical failure rates in vendor batches (Dutta-Halder at 84% damage).",
        "Evaluated marketing campaign attribution across App, Social Media, SMS, and Email, establishing Referral Programs as the highest revenue generator (₹6,152 AOV)."
    ],
    businessImpact: "Delivered a centralized 360° operational command dashboard that uncovers ₹39.68M in preventable stock damage, pinpoints regional delivery bottlenecks across 20+ cities, optimizes ₹16.32M marketing budget to achieve 1.97x ROAS, and provides strategic roadmaps to lift customer CSAT from 30%.",
    recommendations: [
        "Audit vendor packaging and enforce strict quality SLAs for high-damage suppliers (Dutta-Halder 84%, Roy-Char 63%) to recover ₹39.68M in inventory loss.",
        "Implement hyper-local dark-store dispatch routing and peak-traffic mitigation in delay-prone hubs (Phusro, Raipur, Nadiad) to improve the 69% on-time delivery rate.",
        "Scale high-ROI marketing channels by reallocating ad spend toward Referral Programs (₹6,152/order) and App Push Campaigns during high-demand Q2/Q3 cycles.",
        "Address root causes of 41% negative customer sentiment across product quality and delivery speed to boost CSAT score from 30% and reactivate 495 inactive users."
    ],
    techStack: ["Power BI", "DAX", "Data Modeling", "Business Intelligence", "KPI Dashboard"],
    category: "Business Intelligence",
    datasetScope: "166K+ Records",
    image: "resources/assets/images/blinkit-sales.png",
    images: [
        "resources/assets/images/blinkit-sales.png",
        "resources/assets/images/blinkit-delivery.png",
        "resources/assets/images/blinkit-inventory.png",
        "resources/assets/images/blinkit-marketing.png",
        "resources/assets/images/blinkit-cs.png"
    ],
    codeLink: "https://github.com/somenathsau/blinkit-business-analytics",
    demoLink: "https://1drv.ms/u/c/451F38CD7B3963F9/IQAq39KlnD3KTKylGqIEDqGqAWMY8zRC4kWALMLstFXOV-I?e=auxl6e"
};
