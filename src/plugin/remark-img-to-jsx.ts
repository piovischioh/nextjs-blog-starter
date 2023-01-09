/* eslint-disable no-param-reassign */
import { visit } from 'unist-util-visit';
import sizeOf from 'image-size';
import fs from 'fs';

interface ImageNode {
  type: string;
  name?: string;
  url?: string;
  alt?: string;
  attributes?: {
    type: string;
    name: string;
    value?: number | string;
  }[];
}

export default function remarkImgToJsx() {
  return (tree: ImageNode) => {
    visit(
      tree,
      (node) => node.type === 'image',
      (imageNode) => {
        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`);

          imageNode.type = 'mdxJsxFlowElement';
          imageNode.name = 'Image';
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            { type: 'mdxJsxAttribute', name: 'width', value: dimensions.width },
            {
              type: 'mdxJsxAttribute',
              name: 'height',
              value: dimensions.height,
            },
          ];
        }
      },
    );
  };
}
