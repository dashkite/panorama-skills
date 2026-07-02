#!/usr/bin/env node
// bin/generate-baseline-kb.js - Converts remaining skills to baseline KB articles with tags and folder structure

const fs = require('fs');
const path = require('path');

const repoDir = path.resolve(__dirname, '..');
const skillsDir = path.join(repoDir, 'skills');
const kbDir = path.join(repoDir, 'kb');

const skipList = new Set([
  'writing-coffeescript',
  'metarepo-management',
  'panorama-architecture-overview',
  'state-management-guidelines',
  'package-dependency-management',
  'continuous-integration',
  'error-handling-and-logging'
]);

const tagMap = {
  'building-and-publishing': ['operations'],
  'deploying': ['operations'],
  'design-and-styling': ['hx'],
  'developing-web-clients': ['hx'],
  'developing-web-clients-with-rmvc-r': ['architecture', 'hx'],
  'developing-web-components': ['hx'],
  'event-reactor-patterns': ['patterns'],
  'fj-repo-management': ['management'],
  'gh-repo-management': ['management'],
  'metarepo-management': ['management'],
  'providing-verified-sources': ['security'],
  'reactive-programming': ['patterns'],
  'registry-management': ['operations'],
  'running-tests': ['testing'],
  'scenario-based-testing': ['testing'],
  'universal-logic-patterns': ['architecture', 'patterns'],
  'using-drns': ['tooling'],
  'using-generic': ['tooling'],
  'using-genie': ['tooling'],
  'using-reactive-resources': ['state', 'patterns'],
  'writing-browser-based-tests': ['testing', 'hx'],
  'writing-coffeescript': ['languages'],
  'writing-documentation': ['languages'],
  'writing-tests': ['testing'],
  'yq-yaml-management': ['languages', 'tooling'],
  
  // Stubs
  'panorama-architecture-overview': ['architecture'],
  'state-management-guidelines': ['state', 'patterns', 'hx'],
  'package-dependency-management': ['package', 'operations'],
  'continuous-integration': ['operations'],
  'error-handling-and-logging': ['patterns', 'hx']
};

const categoryNames = {
  'architecture': 'System Architecture',
  'languages': 'Languages & Formats',
  'testing': 'Testing',
  'hx': 'Human Experience (HX)',
  'patterns': 'Design Patterns & Paradigms',
  'state': 'Data Modeling & State',
  'management': 'Repository & Metarepo Management',
  'tooling': 'Tooling & Libraries',
  'package': 'Ecosystem & Dependencies',
  'operations': 'Operations & CI/CD',
  'security': 'Security & Verification'
};

const categoryOrder = [
  'architecture',
  'languages',
  'testing',
  'hx',
  'patterns',
  'state',
  'management',
  'tooling',
  'package',
  'operations',
  'security'
];

// Helper to replace "user" with "developer/creator" in text (case-preserving where possible)
function replaceUserTerms(text) {
  return text
    .replace(/\bUsers\b/g, 'Developers')
    .replace(/\busers\b/g, 'developers')
    .replace(/\bUser\b/g, 'Developer')
    .replace(/\buser\b/g, 'developer')
    .replace(/\bUX\b/gi, 'HX')
    .replace(/\buser experience\b/gi, 'human experience');
}

// Helper to remove section numbers from headings
function removeHeadingNumbers(text) {
  return text.replace(/^(#+)\s*\d+(?:\.\d+)*\.?\s+/gm, '$1 ');
}

// Helper to remove horizontal rules
function removeHorizontalRules(text) {
  return text.replace(/^---+\s*$/gm, '');
}

// Helper to generate YAML frontmatter from tags
function generateFrontmatter(tags) {
  if (!tags || tags.length === 0) return '';
  let yaml = '---\ntags:\n';
  for (const tag of tags) {
    yaml += `  - ${tag}\n`;
  }
  yaml += '---\n\n';
  return yaml;
}

// Helper to clean up old flat kb files safely
function cleanupOldFlatFiles() {
  const items = fs.readdirSync(kbDir);
  for (const item of items) {
    const itemPath = path.join(kbDir, item);
    if (fs.statSync(itemPath).isFile() && item.endsWith('.md') && item !== 'index.md') {
      console.log(`Cleaning up old flat file: ${item}`);
      fs.unlinkSync(itemPath);
    }
  }
}

// Store custom contents in memory before we clean up flat files
const customContents = {};
for (const customName of skipList) {
  const oldPath = path.join(kbDir, `${customName}.md`);
  const newDir = path.join(kbDir, customName);
  const newPath = path.join(newDir, 'index.md');

  if (fs.existsSync(oldPath)) {
    customContents[customName] = fs.readFileSync(oldPath, 'utf8');
  } else if (fs.existsSync(newPath)) {
    customContents[customName] = fs.readFileSync(newPath, 'utf8');
  }
}

// Clean up old flat files
cleanupOldFlatFiles();

function processSkill(skillName) {
  const tags = tagMap[skillName] || [];
  const targetDir = path.join(kbDir, skillName);
  
  // Ensure target folder exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const kbPath = path.join(targetDir, 'index.md');

  // Handle custom KB articles (skip list)
  if (skipList.has(skillName)) {
    console.log(`Processing custom skill metadata: ${skillName}`);
    let kbContent = customContents[skillName];
    if (!kbContent) {
      console.warn(`No content found for custom skill ${skillName}`);
      return null;
    }

    // Strip any existing frontmatter
    const existingFrontmatterMatch = kbContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    let kbBody = kbContent;
    if (existingFrontmatterMatch) {
      kbBody = kbContent.substring(existingFrontmatterMatch[0].length);
    }

    // Write to folder/index.md with new frontmatter
    const newKbContent = generateFrontmatter(tags) + kbBody.trim() + '\n';
    fs.writeFileSync(kbPath, newKbContent, 'utf8');

    // Parse description for the index
    const titleMatch = kbBody.match(/^#\s+(.*)$/m);
    const title = titleMatch ? titleMatch[1].trim() : skillName;
    const bodyAfterTitle = kbBody.substring(kbBody.indexOf(titleMatch[0]) + titleMatch[0].length).trim();
    const firstPara = bodyAfterTitle.split(/\n\s*\n/)[0].trim();
    const description = firstPara.replace(/\r?\n/g, ' ');

    return { skillName, title, description, tags };
  }

  const skillPath = path.join(skillsDir, skillName, 'SKILL.md');
  if (!fs.existsSync(skillPath)) {
    return null;
  }

  console.log(`Processing skill: ${skillName}`);
  let skillContent = fs.readFileSync(skillPath, 'utf8');

  // Strip any previously added link notes
  const noteRegex = /\r?\n\r?\n>\s*\[!Note\]\r?\n>\s*For in-depth technical documentation and detailed context, refer to the \[.*? Knowledge Base Article\]\(\.\.\/\.\.\/kb\/.*?\.md\)\.\r?\n/g;
  const folderNoteRegex = /\r?\n\r?\n>\s*\[!Note\]\r?\n>\s*For in-depth technical documentation and detailed context, refer to the \[.*? Knowledge Base Article\]\(\.\.\/\.\.\/kb\/.*?\/index\.md\)\.\r?\n/g;
  skillContent = skillContent.replace(noteRegex, '').replace(folderNoteRegex, '');

  let frontmatter = '';
  let skillBody = skillContent;
  let description = '';

  // 1. Extract YAML Frontmatter if present from SKILL.md
  const frontmatterMatch = skillContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (frontmatterMatch) {
    frontmatter = frontmatterMatch[1];
    skillBody = skillContent.substring(frontmatterMatch[0].length);
    
    // Parse description
    const descMatch = frontmatter.match(/^description:\s*(.*)$/m);
    description = descMatch ? descMatch[1].trim() : '';
  }

  // 2. Extract Title from skillBody
  const titleMatch = skillBody.match(/^#\s+(.*)$/m);
  const title = titleMatch ? titleMatch[1].trim() : skillName;

  // Extract description if not present in frontmatter
  if (!description) {
    const bodyAfterTitle = skillBody.substring(skillBody.indexOf(titleMatch[0]) + titleMatch[0].length).trim();
    const firstPara = bodyAfterTitle.split(/\n\s*\n/)[0].trim();
    description = firstPara.replace(/\r?\n/g, ' ');
    if (description.length > 200) {
      description = description.substring(0, 197) + '...';
    }
  }

  // 3. Clean up the body for the KB article
  let kbBody = skillBody;
  kbBody = removeHorizontalRules(kbBody);
  kbBody = removeHeadingNumbers(kbBody);
  kbBody = replaceUserTerms(kbBody);

  // 4. Write to kb/<name>/index.md with frontmatter
  const finalBody = kbBody.trim().startsWith('#') ? kbBody.trim() : `# ${title}\n\n${kbBody.trim()}`;
  const newKbContent = generateFrontmatter(tags) + finalBody + '\n';
  fs.writeFileSync(kbPath, newKbContent, 'utf8');
  console.log(`Created kb/${skillName}/index.md`);

  // 5. Update the SKILL.md to link to the new KB folder/index.md
  const linkNote = `\n\n> [!Note]\n> For in-depth technical documentation and detailed context, refer to the [${title} Knowledge Base Article](../../kb/${skillName}/index.md).\n`;
  const titleEndIndex = skillContent.indexOf(titleMatch[0]) + titleMatch[0].length;
  const newSkillContent = skillContent.substring(0, titleEndIndex) + linkNote + skillContent.substring(titleEndIndex);
  fs.writeFileSync(skillPath, newSkillContent, 'utf8');
  console.log(`Updated SKILL.md for ${skillName}`);

  return { skillName, title, description, tags };
}

function run() {
  const items = fs.readdirSync(skillsDir);
  const allArticles = [];

  for (const item of items) {
    const itemPath = path.join(skillsDir, item);
    if (fs.statSync(itemPath).isDirectory()) {
      const result = processSkill(item);
      if (result) {
        allArticles.push(result);
      }
    }
  }

  // Also process skipList items that are not skills (e.g. stubs)
  for (const customName of skipList) {
    const isProcessed = allArticles.some(a => a.skillName === customName);
    if (!isProcessed) {
      const result = processSkill(customName);
      if (result) {
        allArticles.push(result);
      }
    }
  }

  // Group articles by tag
  const grouped = {};
  for (const tag of categoryOrder) {
    grouped[tag] = [];
  }

  for (const art of allArticles) {
    for (const tag of art.tags) {
      if (grouped[tag]) {
        grouped[tag].push(art);
      }
    }
  }

  // Generate kb/index.md sitemap grouped by category
  let indexContent = `# Panorama Knowledge Base\n\nWelcome to the Panorama Knowledge Base. This is a collection of in-depth, context-rich documentation for both LLMs and human developers.\n\n`;

  for (const tag of categoryOrder) {
    const displayName = categoryNames[tag];
    const articles = grouped[tag];

    if (articles && articles.length > 0) {
      // Sort alphabetically by title
      articles.sort((a, b) => a.title.localeCompare(b.title));

      indexContent += `## ${displayName}\n\n`;
      for (const art of articles) {
        let desc = art.description;
        if (art.skillName === 'writing-coffeescript') {
          desc = 'Comprehensive style guide, code formatting standards, coding philosophy, and class instantiation patterns.';
        } else if (art.skillName === 'metarepo-management') {
          desc = 'Details on managing the Central Park metarepo with Tempo, repository provider choices, and batch execution.';
        }
        indexContent += `- [${art.title}](${art.skillName}/index.md): ${desc}\n`;
      }
      indexContent += '\n';
    }
  }

  const indexFile = path.join(kbDir, 'index.md');
  fs.writeFileSync(indexFile, indexContent.trim() + '\n', 'utf8');
  console.log('Updated kb/index.md sitemap with categorized articles.');
}

run();
