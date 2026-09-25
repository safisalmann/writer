// Build the full 12-chapter question dataset
import fs from 'fs';
import path from 'path';

const outDir = path.resolve('src/data/questions');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

console.log('Building database for 12 botany chapters...');
