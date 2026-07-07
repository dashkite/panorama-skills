#!/usr/bin/env node

const { spawnSync } = require('child_process');

const args = process.argv.slice(2);
const result = spawnSync('gh', args, { stdio: 'inherit' });

process.exit(result.status ?? 0);
