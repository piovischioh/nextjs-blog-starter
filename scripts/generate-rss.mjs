import fs from 'fs';
import { Feed } from 'feed';
import { compareDesc } from 'date-fns';
import { allPosts } from '../.contentlayer/generated/index.mjs';
import metadata from '../src/configs/metadata.mjs';

(() => {
  const author = {
    name: metadata.author,
    email: metadata.email,
    link: metadata.fqdn,
  };
  const posts = allPosts.filter(post => !post.draft).sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date)),
  );

  const feed = new Feed({
    title: metadata.title,
    description: metadata.description,
    id: metadata.fqdn,
    link: metadata.fqdn,
    image: metadata.logoUrl,
    favicon: metadata.logoUrl,
    copyright: `Copyright © 2022 - ${new Date().getFullYear()} ${
      metadata.credit
    }`,
    feedLinks: {
      rss2: `${metadata.fqdn}/feed.xml`,
      json: `${metadata.fqdn}/feed.json`,
      atom: `${metadata.fqdn}/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    feed.addItem({
      id: metadata.fqdn + post.path,
      title: post.title,
      link: metadata.fqdn + post.path,
      description: post.description,
      image: !post.images?.length ? metadata.bannerUrl : post.images[0],
      author: [author],
      contributor: [author],
      date: new Date(post.date),
      // content: post.body.html,
    });
  });

  fs.writeFileSync('./public/feed.xml', feed.rss2());
  fs.writeFileSync('./public/atom.xml', feed.atom1());
  fs.writeFileSync('./public/feed.json', feed.json1());
})();