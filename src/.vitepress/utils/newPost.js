import path from 'path';
import fs from 'fs-extra';

export default async function (postPath, templatePath, dict) {
  // Existence check
  if (fs.existsSync(postPath)) throw new Error('Post (' + postPath + ') already exists.');
  if (!fs.existsSync(templatePath)) throw new Error('Template (' + templatePath + ") doesn't exists");

  // Create dir
  const dirPath = path.dirname(postPath);
  fs.mkdirsSync(dirPath, (err) => {
    if (err) throw err;
  });

  // Read template
  const template = await fs.readFile(templatePath, 'utf-8');
  let post = template;
  for (const key in dict) while (post != (post = post.replace('{{ ' + key + ' }}', dict[key])));

  // Create and write post
  fs.writeFileSync(postPath, post, (err) => {
    if (err) throw err;
  });

  return postPath;
}
