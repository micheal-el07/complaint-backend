import * as fs from 'fs';
import path from 'path';
import { parse } from 'yaml';

const yamlPath = path.join(__dirname, '../../swagger.yaml');
const swaggerDocument = parse(fs.readFileSync(yamlPath, 'utf8'));

export default swaggerDocument;
