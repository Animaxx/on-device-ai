const fs = require('fs');
const path = require('path');

const baseDir = '/Users/animax/Documents/SourceCode/MyProjects/OnDeviceAI/promo_website';

function updateFile(filePath, isDocs) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Check if OG tags already exist
    if (content.includes('og:title')) {
        console.log(`Skipping ${filePath} - OG tags exist`);
        return;
    }

    const titleMatch = content.match(/<title>(.*?)<\/title>/i);
    const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);

    let title = titleMatch ? titleMatch[1] : 'On Device AI';
    let description = descMatch ? descMatch[1] : '';

    // Expand titles and descriptions for default/short ones
    if (title === 'Documentation - On Device AI' || title === 'On Device AI Documentation') {
        title = 'Documentation - On Device AI | Local LLM & Offline AI Setup';
        description = 'Comprehensive documentation for On Device AI. Learn how to set up Local LLMs, Offline AI assistants, and integrate privacy-first models.';
        content = content.replace(/<title>(.*?)<\/title>/i, `<title>${title}</title>`);
        if (descMatch) {
            content = content.replace(/<meta\s+name=["']description["']\s+content=["'].*?["']/i, `<meta name="description"\n        content="${description}"`);
        } else {
            content = content.replace('</title>', `</title>\n    <meta name="description" content="${description}">`);
        }
    } else if (title === 'Getting Started - On Device AI Docs') {
        title = 'Getting Started - On Device AI Docs | Local LLM Setup';
        content = content.replace(/<title>(.*?)<\/title>/i, `<title>${title}</title>`);
    }

    const fileName = path.basename(filePath);
    let urlPath = isDocs ? `docs/${fileName === 'index.html' ? '' : fileName}` : `pages/${fileName}`;
    const url = `https://OnDevice-ai.app/${urlPath}`;

    let ogTags = `
    <!-- Open Graph / Social -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:image" content="https://OnDevice-ai.app/images/phone_screen.png">

    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${url}">
    <meta property="twitter:title" content="${title}">
    <meta property="twitter:description" content="${description}">
    <meta property="twitter:image" content="https://OnDevice-ai.app/images/phone_screen.png">
`;

    let ldJson = '';
    if (isDocs) {
        const breadcrumbName = title.split(' - ')[0];
        ldJson = `
    <!-- JSON-LD: Breadcrumb -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://OnDevice-ai.app/"
      },{
        "@type": "ListItem",
        "position": 2,
        "name": "Docs",
        "item": "https://OnDevice-ai.app/docs/"
      }${fileName !== 'index.html' ? `,{\n        "@type": "ListItem",\n        "position": 3,\n        "name": "${breadcrumbName}",\n        "item": "${url}"\n      }` : ''}]
    }
    </script>
`;
    }

    // Insert before </head>
    content = content.replace('</head>', `${ogTags}${ldJson}</head>`);
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
}

const docsDir = path.join(baseDir, 'docs');
fs.readdirSync(docsDir).forEach(file => {
    if (file.endsWith('.html')) {
        updateFile(path.join(docsDir, file), true);
    }
});

const pagesDir = path.join(baseDir, 'pages');
fs.readdirSync(pagesDir).forEach(file => {
    if (file.endsWith('.html')) {
        updateFile(path.join(pagesDir, file), false);
    }
});
