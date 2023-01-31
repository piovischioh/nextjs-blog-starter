/** @type {import('next-sitemap').IConfig} */
import metadata from './src/configs/metadata.mjs';

export default {
  siteUrl: metadata.fqdn,
  generateRobotsTxt: true,
};
