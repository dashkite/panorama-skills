#!/usr/bin/env node

/**
 * Link Verification Tool
 * 
 * Parses a Markdown file for reference link definitions (e.g. [label]: http...),
 * fetches the URLs, extracts clean text by stripping HTML tags, and prints the
 * status and a text snippet to verify the claims.
 */

const fs = require('fs');
const path = require('path');

// Basic CLI argument check
const filePath = process.argv[2];
if (!filePath) {
  console.error('Usage: node verify-links.js <path-to-markdown-file>');
  process.exit(1);
}

const absolutePath = path.resolve(filePath);
if (!fs.existsSync(absolutePath)) {
  console.error(`Error: File not found at ${absolutePath}`);
  process.exit(1);
}

// Read markdown file content
const content = fs.readFileSync(absolutePath, 'utf8');

// Regex to match reference link definitions: [label]: url
const refLinkRegex = /^\[([^\]]+)\]:\s*(https?:\/\/\S+)/gm;
const links = [];
let match;

while ((match = refLinkRegex.exec(content)) !== null) {
  links.push({
    label: match[1],
    url: match[2]
  });
}

if (links.length === 0) {
  console.log('No Markdown reference links found in the file.');
  process.exit(0);
}

console.log(`Found ${links.length} reference link(s). Starting validation...\n`);

function cleanHtml(html) {
  // Remove scripts, styles, and head sections
  let text = html.replace(/<(script|style|head)\b[^>]*>([\s\S]*?)<\/\1>/gi, '');
  // Replace HTML tags with spaces
  text = text.replace(/<[^>]+>/g, ' ');
  // Decode common HTML entities
  text = text
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
  // Collapse whitespace
  text = text.replace(/\s+/g, ' ').trim();
  return text;
}

async function verifyLink({ label, url }) {
  console.log(`[${label}]: Checking ${url}...`);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`  ❌ Failed: HTTP Status ${response.status} ${response.statusText}\n`);
      return false;
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/pdf')) {
      console.log(`  ✅ Success: HTTP ${response.status} (PDF Document)`);
      console.log(`  📝 Content: Verification of page/section and quoted text must be done manually.`);
      console.log(`  ---------------------------------------------------\n`);
      return true;
    }

    const html = await response.text();
    const plainText = cleanHtml(html);
    
    console.log(`  ✅ Success: HTTP ${response.status}`);
    console.log(`  📝 Content Snippet (first 800 chars):`);
    console.log(`     "${plainText.substring(0, 800)}..."`);
    console.log(`  ---------------------------------------------------\n`);
    return true;
  } catch (error) {
    console.error(`  ❌ Error fetching link: ${error.message}\n`);
    return false;
  }
}

async function main() {
  let allPassed = true;
  for (const link of links) {
    const success = await verifyLink(link);
    if (!success) {
      allPassed = false;
    }
  }

  if (allPassed) {
    console.log('🎉 All links verified successfully.');
  } else {
    console.log('⚠️ Some links failed verification. Please review the errors above.');
    process.exit(1);
  }
}

main();
