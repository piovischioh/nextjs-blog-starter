import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeCodeTitles from 'rehype-code-titles';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkImgToJsx from './src/plugin/remark-img-to-jsx';
import headingsResolver from './src/plugin/headings-resolver';

export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: 'posts/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    images: {
      type: 'list',
      of: { type: 'string' },
    },
    draft: {
      type: 'boolean',
      required: true,
    },
  },
  computedFields: {
    path: {
      type: 'string',
      resolve: ({ _raw: { flattenedPath } }) => `/${flattenedPath}`,
    },
    filename: {
      type: 'string',
      resolve: ({ _raw: { sourceFileName } }) => sourceFileName.split('.')[0],
    },
    headings: {
      type: 'nested',
      resolve: headingsResolver,
    },
  },
}));

export default makeSource({
  contentDirPath: '.',
  contentDirInclude: ['posts'],
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkImgToJsx, remarkGfm],
    rehypePlugins: [
      rehypeCodeTitles,
      [rehypePrism, { ignoreMissing: true }],
      rehypeSlug,
    ],
  },
});
