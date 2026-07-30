const portfolioData = {
    // Personal Details
    name: "SOMENATH SAU",
    role: "Data Analyst at Landmine Soft",
    microline: "Power BI | Dashboard | Data Analysis | Generative AI | Prompt Engineering",
    heroImage: "resources/assets/hero/Somenath_Sau.webp",
    resumeLink: "resources/assets/docs/Somenath-Sau-DataAnalyst.pdf",
    email: "somenathsau@gmail.com",

    bio: "✔ Transform complex data into insights that improve reporting efficiency. " +
        "<br>✔ Build automated dashboards using Python, SQL, and Power BI. " +
        "<br>✔ Streamline analytical workflows using Gen AI. " +
        "<br>✔ Identify trends to support faster and smarter business decisions. ",

    // Social Links
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/somenathsau/",
        github: "https://github.com/somenathsau/",
        email: "mailto:somenathsau@gmail.com"
    },


    // About Me
    about: {
        domains: [
            {
                title: "Data Analyst",
                illustration: "resources/assets/images/expertise_data.png",
                techIcons: ["database", "table", "bar-chart-2", "layout", "code"],
                bullets: [
                    "Performed data cleaning and exploratory analysis on real-world datasets.",
                    "Automated data processing and reporting using Python and SQL.",
                    "Built interactive dashboards for data visualization and insights.",
                    "Applied statistical techniques to identify trends and support decision-making."
                ]
            },
            {
                title: "Generative AI & Prompting",
                illustration: "resources/assets/images/ai-domain.png",
                techIcons: ["brain", "message-square", "shield-check", "edit-3", "check-circle"],
                bullets: [
                    "Completed 500+ RLHF and SFT evaluation tasks for LLM outputs.",
                    "Evaluated responses on truthfulness, reasoning, safety, and instruction adherence.",
                    "Performed side-by-side (SxS) comparisons and provided structured feedback.",
                    "Applied prompt engineering to improve response quality and consistency.",
                    "Identified failure patterns and suggested improvements for model responses."
                ]
            }
        ]
    },

    // Education
    education: [
        {
            badge: "KIIT",
            institution: "Kalinga Institute of Industrial Technology",
            years: "2022–2024",
            degree: "Master of Computer Applications",
            location: "BBSR, Odisha",
            score: "7.83",
            scoreLabel: "CGPA",
            tag: "Computer Applications",
            description: "Specializing in Data Science and Big Data",
            logo: "resources/assets/icons/kiit-logo.webp",
            website: "https://kiit.ac.in/"
        },
        {
            badge: "TACT",
            institution: "Trident Academy of Creative Technology",
            years: "2018–2021",
            degree: "Bachelor of Computer Applications",
            location: "BBSR, Odisha",
            score: "7.47",
            scoreLabel: "CGPA",
            tag: "Computer Application",
            description: "Foundational programming and database management",
            logo: "resources/assets/icons/trident-logo.webp",
            website: "https://tact.ac.in/"
        },
        {
            badge: "XII",
            institution: "Sai +2 Science College",
            years: "2016–2018",
            degree: "Higher Secondary Examination",
            location: "Palbani, Baripada",
            score: "Passed",
            scoreLabel: "",
            tag: "Science",
            description: "Specializing in Mathematics, Statistics, and Computer Science with Physics and Chemistry.",
            logo: "resources/assets/icons/sai-logo.webp",
            website: "https://saihss.in/"
        }
    ],

    // Experience
    experience: [
        {
            role: "Data Scientist Intern",
            company: "CodeClause",
            location: "Remote",
            duration: "Nov 2023 – Dec 2023",
            type: "Internship",
            metrics: [
                { val: "85%+", label: "Accuracy" },
                { val: "2", label: "ML Models" }
            ],
            techStack: ["Python", "Scikit-learn", "Numpy", "Pandas", "Exploratory Data Analysis"],
            description: "Developed machine learning models for Speech Emotion Recognition and Loan Risk Prediction, " +
                "and conducted large-scale Uber ride data analysis. Improved model performance through feature " +
                "engineering, exploratory data analysis (EDA), and optimization, achieving 85%+ accuracy."
        },
        {
            role: "AI Contributor",
            company: "Outlier AI",
            location: "Remote",
            duration: "Sep 2024 – May 2025",
            type: "Freelance",
            metrics: [
                { val: "500+", label: "Tasks done" },
                { val: "95%", label: "Accuracy" }
            ],
            techStack: ["RLHF", "SFT Annotation", "Response Evaluation", "AI safety", "Prompt Engineering", "LLM Assessment"],
            description: "Completed 500+ RLHF and SFT evaluation tasks, reviewing LLM responses across open-ended " +
                "and structured prompts. Assessed outputs for instruction adherence, truthfulness, " +
                "reasoning quality, and safety compliance, maintaining 95%+ quality accuracy."
        },
        {
            role: "Data Analyst",
            company: "Landmine Soft",
            location: "Hyderabad, India",
            duration: "Feb 2024 – Present",
            type: "Full Time",
            metrics: [
                { val: "10+", label: "Dashboards built" },
                { val: "1M+", label: "Records analyzed" }
            ],
            techStack: ["Python", "SQL", "Power BI", "Excel", "Pandas", "NumPy", "Data Cleaning", "Data Visualization"],
            description: "Analyzed large datasets using Python (Pandas, NumPy) and SQL to extract actionable insights. " +
                "Built interactive Power BI dashboards and automated reporting processes, reducing manual " +
                "effort by 30%. Performed data cleaning, transformation, and exploratory data analysis (EDA) " +
                "to support business decision-making."
        }
    ],

    // Projects
    projects: [
        californiaRetailProject,
        uberAnalysisProject,
        crimeDataProject
    ],

    // Skills Section
    skills: [
        {
            category: "Data Analytics",
            tier: "primary",
            items: [
                { name: "📈 Excel" },
                { name: "🛢️ SQL" },
                { name: "📊 Power BI" },
                { name: "🐼 Pandas" },
                { name: "🐍 Python" },
                { name: "📉 Matplotlib" },
                { name: "💹 Data Visualization" },
            ]
        },
        {
            category: "Generative AI",
            tier: "competitive",
            items: [
                { name: "🤖 RLHF Evaluation" },
                { name: "🧠 Prompt Engineering" },
                { name: "🎯 Response Evaluation" },
                { name: "🛡️ Safety Review" }
            ]
        },
        {
            category: "Tools & Technologies",
            tier: "supporting",
            items: [
                { name: "🌿 Git & GitHub" },
                { name: "📓 Jupyter Notebook" },
                { name: "💻 VS Code" },
                { name: "🐬 MySQL" }
            ]
        },
        {
            category: "Additional Skills",
            tier: "basic",
            items: [
                { name: "🌐 HTML 5" },
                { name: "🎨 CSS 3" }
            ]
        }
    ],

    // Certifications
    certifications: [
        {
            title: "Career Essentials in Data Analysis by Microsoft and LinkedIn",
            issuer: "LinkedIn Learning",
            year: "June 2025",
            image: "resources/assets/certificate/LinkedinDA.jpg",
            credentialLink: "https://www.linkedin.com/learning/certificates/1899cbc5a9bcf6d12c823c702aeed4c975e463580ebceb87222d61ca65718aee"
        },
        {
            title: "Deloitte Australia - Data Analytics Job Simulation",
            issuer: "Forage",
            year: "May 2025",
            image: "resources/assets/certificate/DeloitteDA.png",
            credentialLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/io9DzWKe3PTsiS6GG_9PBTqmSxAf6zZTseP_cYkMuanGSYDTrvMry_1748362553606_completion_certificate.pdf"
        },
        {
            title: "Commonwealth Bank - Introduction to Data Science Job Simulation",
            issuer: "Forage",
            year: "May 2025",
            image: "resources/assets/certificate/ForageDA1.png",
            credentialLink: "https://www.theforage.com/completion-certificates/2sNmYuurxgpFYawco/smwfytX3mcLboA9bf_2sNmYuurxgpFYawco_cYkMuanGSYDTrvMry_1747032386986_completion_certificate.pdf"
        },
        {
            title: "Cognizant - Artificial Intelligence Job Simulation",
            issuer: "Forage",
            year: "June 2024",
            image: "resources/assets/certificate/CognizantDA.png",
            credentialLink: "https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/Cognizant/5N2ygyhzMWjKQmgCK_Cognizant_cYkMuanGSYDTrvMry_1718646885974_completion_certificate.pdf"
        },
        {
            title: "AWS Academy Cloud Foundations",
            issuer: "Amazon Web Services (AWS)",
            year: "Sept 2023",
            image: "resources/assets/certificate/AWS2023.png",
            credentialLink: "https://www.credly.com/badges/2022e39a-a797-4f35-a533-5a15904b193b"
        },
        {
            title: "Red hat System Administration I (RH124)",
            issuer: "KIIT University",
            year: "Sept 2023",
            image: "resources/assets/certificate/RH124.png",
            credentialLink: "https://drive.google.com/file/d/10hKq3nuzWNbJDoVwxEaj7O4YDy9MGqMQ/view?usp=sharing"
        }
    ]
};





