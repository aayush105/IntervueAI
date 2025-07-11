export const convertMarkdownToHtml = (markdown) => {
  if (!markdown) return "";

  let html = markdown;

  // Handle code blocks first (before inline code)
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    const lang = language || "code";
    return `
      <div class="code-block">
        <div class="code-header">
          <span class="code-language">${lang.toUpperCase()}</span>
        </div>
        <pre class="code-content"><code>${escapeHtml(code.trim())}</code></pre>
      </div>
    `;
  });

  // Handle inline code
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>');

  // Handle headers
  html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");

  // Handle bold and italic
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Handle unordered lists
  html = html.replace(/^\* (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, "<ul>$1</ul>");

  // Handle ordered lists
  html = html.replace(/^\d+\. (.*$)/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>)/s, (match) => {
    if (!match.includes("<ul>")) {
      return `<ol>${match}</ol>`;
    }
    return match;
  });

  // Handle line breaks
  html = html.replace(/\n\n/g, "</p><p>");
  html = html.replace(/\n/g, "<br>");

  // Wrap in paragraphs
  if (
    !html.includes("<p>") &&
    !html.includes("<h1>") &&
    !html.includes("<h2>") &&
    !html.includes("<h3>")
  ) {
    html = `<p>${html}</p>`;
  }

  return html;
};

// Helper function to escape HTML
const escapeHtml = (text) => {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
};

export const getPDFStyles = () => `
  <style>
    @page {
      margin: 15mm;
      @bottom-left {
        content: "IntervueAI - Aayush Shrestha";
        font-size: 10px;
        color: #10b981;
        font-weight: 600;
      }
      @bottom-right {
        content: "Page " counter(page);
        font-size: 10px;
        color: #6b7280;
      }
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      margin: 0;
      padding: 0;
      background: white !important; /* Force white background for body */
      color: #1f2937;
      line-height: 1.6;
    }
    
    /* Cover Page - Full page with contained background */
    .cover-page {
      min-height: 100vh;
      max-height: 100vh; /* Prevent overflow */
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 30px 40px;
      background: linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%);
      position: relative;
      overflow: hidden; /* Prevent background overflow */
      box-sizing: border-box; /* Include padding in height calculation */
    }
    
    .cover-content {
      max-width: 600px;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
    }
    
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 16px;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      color: white;
      padding: 20px 40px;
      border-radius: 18px;
      box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3);
      transform: translateY(-5px);
    }
    
    .logo-image {
      width: 100px;
     
      filter: brightness(0) invert(1);
    }
    
    .logo-text {
      font-size: 24px;
      font-weight: 800;
      letter-spacing: -0.5px;
    }
    
    .cover-title {
      font-size: 48px;
      font-weight: 900;
      color: #1f2937;
      margin: 0;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -1px;
    }
    
    .cover-subtitle {
      font-size: 20px;
      color: #6b7280;
      margin: 0;
      font-weight: 300;
      letter-spacing: 0.5px;
    }
    
    .session-info {
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(10px);
      padding: 30px;
      border-radius: 20px;
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.2);
      width: 100%;
      max-width: 500px;
    }
    
    .session-info h2 {
      color: #10b981;
      margin: 0 0 20px 0;
      font-size: 24px;
      font-weight: 800;
      text-align: center;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 15px;
    }
    
    .info-item {
      text-align: left;
    }
    
    .info-label {
      font-weight: 700;
      color: #6b7280;
      font-size: 12px;
      margin-bottom: 8px;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    
    .info-value {
      color: #1f2937;
      font-size: 18px;
      font-weight: 600;
      line-height: 1.3;
    }
    
    .focus-areas {
      grid-column: 1 / -1;
      margin-top: 10px;
    }
    
    .focus-areas-content {
      background: linear-gradient(135deg, #f0fdfa, #ecfdf5);
      padding: 15px;
      border-radius: 12px;
      border-left: 4px solid #10b981;
      margin-top: 8px;
    }
    
    .generated-date {
      color: #9ca3af;
      font-size: 14px;
      font-weight: 500;
      margin: 0;
    }
    
    /* Questions Content - Starts on new page with white background */
    .questions-content {
      page-break-before: always;
      padding: 30px;
      min-height: 100vh;
      background: white !important; /* Force white background */
      position: relative;
      z-index: 1; /* Ensure it's above any bleeding background */
    }
    
    .questions-header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #e5e7eb;
      background: white; /* Ensure white background */
    }
    
    .questions-header h1 {
      font-size: 36px;
      font-weight: 800;
      color: #1f2937;
      margin: 0 0 16px 0;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    
    .questions-subtitle {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    
    .role-badge {
      background: linear-gradient(135deg, #10b981, #14b8a6);
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
    }
    
    .questions-count {
      color: #6b7280;
      font-size: 16px;
      font-weight: 500;
    }
    
    .questions-list {
      max-width: 800px;
      margin: 0 auto;
      background: white; /* Ensure white background */
    }
    
    .question-container {
      page-break-inside: avoid;
      margin-bottom: 32px;
      border: 1px solid #e5e7eb;
      border-radius: 16px;
      padding: 24px;
      background: white !important; /* Force white background */
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
      transition: all 0.2s ease;
    }
    
    .question-container:hover {
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
    }
    
    .question-header {
      display: flex;
      align-items: flex-start;
      margin-bottom: 20px;
      gap: 16px;
    }
    
    .question-number {
      width: 36px;
      height: 36px;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      color: white;
      font-weight: 800;
      font-size: 16px;
      box-shadow: 0 4px 8px rgba(16, 185, 129, 0.3);
    }
    
    .question-text {
      flex: 1;
      font-size: 20px;
      font-weight: 700;
      color: #1f2937;
      line-height: 1.4;
      margin: 0;
    }
    
    .answer-section {
      margin-left: 24px;
      padding: 20px;
      background: #f9fafb;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
    }
    
    .answer-header {
      display: flex;
      align-items: center;
      margin-bottom: 16px;
      gap: 10px;
    }
    
    .answer-icon {
      width: 28px;
      height: 28px;
      background: linear-gradient(135deg, #10b981, #14b8a6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 14px;
    }
    
    .answer-label {
      font-weight: 700;
      color: #059669;
      font-size: 16px;
    }
    
    .answer-content {
      color: #374151;
      line-height: 1.7;
      font-size: 16px;
    }
    
    .note-section {
      margin-top: 20px;
      margin-left: 24px;
      padding: 16px;
      background: #fef3c7;
      border: 1px solid #fcd34d;
      border-radius: 12px;
    }
    
    .note-header {
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      gap: 8px;
    }
    
    .note-label {
      color: #92400e;
      font-weight: 700;
      font-size: 14px;
    }
    
    .note-content {
      margin: 0;
      color: #92400e;
      font-size: 14px;
      line-height: 1.6;
    }
    
    /* Code styling */
    .code-block {
      margin: 16px 0;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e5e7eb;
      background: #f8fafc;
      page-break-inside: avoid;
    }
    
    .code-header {
      background: #f1f5f9;
      padding: 2px 12px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 12px;
      font-weight: 700;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    
    .code-content {
      background: #ffffff;
      padding: 20px;
      margin: 0;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 14px;
      line-height: 1.5;
      overflow-x: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .code-content code {
      background: transparent;
      padding: 0;
      font-size: inherit;
      color: #1f2937;
    }
    
    .inline-code {
      background: #f1f5f9;
      padding: 4px 8px;
      border-radius: 6px;
      font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
      font-size: 13px;
      color: #dc2626;
      border: 1px solid #e2e8f0;
      font-weight: 500;
    }
    
    /* Typography */
    h1, h2, h3 {
      color: #1f2937;
      margin-top: 24px;
      margin-bottom: 12px;
      font-weight: 700;
    }
    
    h1 { font-size: 28px; }
    h2 { font-size: 24px; }
    h3 { font-size: 20px; }
    
    ul, ol {
      padding-left: 24px;
      margin: 12px 0;
    }
    
    li {
      margin: 6px 0;
      line-height: 1.6;
    }
    
    strong {
      font-weight: 700;
      color: #1f2937;
    }
    
    em {
      font-style: italic;
      color: #4b5563;
    }
    
    p {
      margin: 12px 0;
      line-height: 1.7;
    }
    
    @media print {
      body { 
        padding: 0;
        background: white !important;
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
      
      .cover-page {
        min-height: 100vh;
        max-height: 100vh;
        page-break-after: always;
        overflow: hidden;
        box-sizing: border-box;
      }
      
      .questions-content {
        page-break-before: always;
        background: white !important;
      }
      
      .question-container { 
        page-break-inside: avoid;
        margin-bottom: 24px;
        box-shadow: none;
        border: 1px solid #e5e7eb;
        background: white !important;
      }
      
      .code-block {
        page-break-inside: avoid;
      }
      
      .brand-logo,
      .question-number,
      .answer-icon {
        -webkit-print-color-adjust: exact;
        color-adjust: exact;
      }
    }
  </style>
`;
