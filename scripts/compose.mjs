/* eslint-disable import/no-extraneous-dependencies */
import fs from 'fs';
import inquirer from 'inquirer';
import dedent from 'dedent';
import { format } from 'date-fns';

const genFrontMatter = (answers) => {
  const date = answers.date || format(new Date(), 'yyyy-MM-dd');
  const tagArray = answers.tags.toLowerCase().split(',');
  tagArray.forEach((tag, index) => (tagArray[index] = tag.replace(/\s+/g, ' ').trim()));
  const tags = `'${tagArray.join('\',\'')}'`;

  let frontMatter = dedent`---
  type: Post
  title: ${answers.title || 'Untitled'}
  description: ${answers.description || ''}
  tags: [${answers.tags ? tags : ''}]
  date: ${date}
  draft: ${answers.draft === 'yes' ? 'true' : 'false'}
  `;

  frontMatter += '\n---';

  return frontMatter;
};

inquirer
  .prompt([
    {
      name: 'filename',
      message: 'Enter filename:',
      type: 'input',
    },
    {
      name: 'extension',
      message: 'Choose post extension:',
      type: 'list',
      choices: ['mdx', 'md'],
    },
    {
      name: 'title',
      message: 'Enter post title:',
      type: 'input',
    },
    {
      name: 'description',
      message: 'Enter post description:',
      type: 'input',
    },
    {
      name: 'tags',
      message: 'Separate them with, or leave empty if no tags.',
      type: 'input',
    },
    {
      name: 'date',
      message: 'Enter specific post date, e.g. 2022-12-29, or leave empty and use system default date',
      type: 'input',
    },
    {
      name: 'draft',
      message: 'Set post as draft?',
      type: 'list',
      choices: ['yes', 'no'],
    },
  ])
  .then((answers) => {
    if (!fs.existsSync('posts')) fs.mkdirSync('posts');

    const filename = answers.filename
      .toLowerCase()
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/ /g, '-')
      .replace(/-+/g, '-');
    const frontMatter = genFrontMatter(answers);
    const filePath = `posts/${filename}.${answers.extension}`;

    fs.writeFile(filePath, frontMatter, { flag: 'wx' }, (err) => {
      if (err) {
        throw err;
      } else {
        console.log(`post generated successfully at ${filePath}`);
      }
    });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.log('Something went wrong, sorry!');
    }
  });