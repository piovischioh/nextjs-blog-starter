import { defineDocumentType, makeSource } from 'contentlayer/source-files';

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
  },
}));

export default makeSource({
  contentDirPath: '.',
  contentDirInclude: ['posts'],
  documentTypes: [Post],
});
