const fs = require('fs');
const path = require('path');

// Função recursiva para encontrar todos os arquivos MDX que correspondem ao padrão /ja/**/resources/**
function findMdxFiles(dir, pattern = /\/ja\/.*\/resources\/.*\.mdx$/) {
  let results = [];

  try {
    const list = fs.readdirSync(dir);

    list.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat && stat.isDirectory()) {
        // Recursivamente buscar em subdiretórios
        results = results.concat(findMdxFiles(filePath, pattern));
      } else if (pattern.test(filePath) && file.endsWith('.mdx')) {
        results.push(filePath);
      }
    });
  } catch (err) {
    // Ignora erros de permissão ou diretórios inacessíveis
  }

  return results;
}

// Encontrar todos os arquivos MDX em ja/**/resources/**
const files = findMdxFiles(__dirname);

console.log(`Encontrados ${files.length} arquivos para processar\n`);

let filesModified = 0;

files.forEach(filePath => {
  const fileName = path.basename(filePath);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Substituir \\* por \*
  const beforeAsterisk = content;
  content = content.replace(/\\\\\*/g, '\\*');
  if (content !== beforeAsterisk) {
    console.log(`✓ ${fileName}: Corrigiu \\\\* para \\*`);
    modified = true;
  }

  // 2. Mover "APIバージョン XXXX.X" para description no metadata (suporta qualquer versão)
  // Primeiro, extrair o frontmatter (suporta tanto \n quanto \r\n)
  const frontmatterMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (frontmatterMatch) {
    let frontmatter = frontmatterMatch[1];
    let body = frontmatterMatch[2];

    // Verificar se há "APIバージョン XXXX.X" solto no início do body (pode ter linhas em branco antes)
    const apiVersionMatch = body.match(/^(?:\r?\n)*APIバージョン (\d+\.\d+)\s*\r?\n/);

    if (apiVersionMatch) {
      const version = apiVersionMatch[1]; // Captura a versão (ex: 2024.0, 2025.0)

      // Remover "APIバージョン XXXX.X" do body (mantendo uma linha em branco se houver)
      body = body.replace(/^((?:\r?\n)*)APIバージョン \d+\.\d+\s*\r?\n/, '$1');

      // Verificar se já existe description no frontmatter
      if (!frontmatter.includes('description:')) {
        // Adicionar description ao frontmatter
        frontmatter += `\ndescription: "APIバージョン ${version}"`;
        console.log(`✓ ${fileName}: Adicionou description com APIバージョン ${version}`);
        modified = true;
      } else {
        // Se já existe description, apenas remover do body (não sobrescrever)
        console.log(`⚠ ${fileName}: Removeu APIバージョン ${version} solto (description já existe)`);
        modified = true;
      }

      // Reconstruir o conteúdo (detectar tipo de quebra de linha)
      const lineBreak = content.includes('\r\n') ? '\r\n' : '\n';
      content = `---${lineBreak}${frontmatter}${lineBreak}---${lineBreak}${body}`;
    }
  }

  // 3. Processar ResponseExample: trocar "Response Example" por "レスポンスの例" (mantém as tags)
  const beforeResponseExample = content;

  // Padrão: ```linguagem Response Example dentro de qualquer lugar do arquivo
  content = content.replace(
    /```(\w+)\s+Response Example/g,
    (match, language) => {
      return `\`\`\`${language} レスポンスの例`;
    }
  );

  if (content !== beforeResponseExample) {
    console.log(`✓ ${fileName}: Trocou "Response Example" por "レスポンスの例"`);
    modified = true;
  }

  // 4. Trocar "example:" por "例" dentro de ParamField
  const beforeExample = content;

  // Padrão: <ParamField ...> ... example: ... </ParamField>
  content = content.replace(
    /(<ParamField[^>]*>[\s\S]*?)example:(\s)/g,
    (match, before, space) => {
      return `${before}例${space}`;
    }
  );

  if (content !== beforeExample) {
    console.log(`✓ ${fileName}: Trocou "example:" por "例" dentro de ParamField`);
    modified = true;
  }

  // Salvar o arquivo se foi modificado
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    filesModified++;
  }
});

console.log(`\n✅ Processamento completo! ${filesModified} arquivo(s) modificado(s).`);
