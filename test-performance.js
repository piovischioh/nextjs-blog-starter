import { slug } from 'github-slugger';
import { performance } from 'perf_hooks'; // Using perf_hooks for more precise timing

function simpleHeadingResolver(rawMarkdown) {
  const startTime = performance.now();
  const headings = rawMarkdown
    .split('\n')
    .filter(line => line.match(/^###?\s/))
    .map((line, index) => { // Added index for unique text
      const text = line.replace(/^###*\s/, '') + ' ' + index; // Make text unique
      return {
        text,
        url: `#${slug(text)}`, // Use static slug for this test
        primary: !line.startsWith('###'),
      };
    });
  const endTime = performance.now();
  const duration = endTime - startTime;
  console.log(`Processed ${headings.length} headings in ${duration.toFixed(3)} ms`);
  return headings;
}

function generateMarkdown(numPairs) {
  let markdown = '';
  for (let i = 0; i < numPairs; i++) {
    markdown += `## Heading H2 - ${i}\n`;
    markdown += `Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n`;
    markdown += `### Heading H3 - ${i}\n`;
    markdown += `Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n`;
  }
  return markdown;
}

const numberOfHeadingPairs = 1000; // This will generate 2000 headings
const markdownContent = generateMarkdown(numberOfHeadingPairs);

console.log(`Generated markdown string with ${numberOfHeadingPairs * 2} headings.`);

// Call the resolver
simpleHeadingResolver(markdownContent);

// Optional: Print a few resolved headings to verify
// const resolvedHeadings = simpleHeadingResolver(markdownContent);
// console.log('\nSample of resolved headings:');
// for (let i = 0; i < Math.min(5, resolvedHeadings.length); i++) {
//   console.log(resolvedHeadings[i]);
// }
// if (resolvedHeadings.length > 5) {
//   console.log('...');
//   for (let i = Math.max(0, resolvedHeadings.length - 5); i < resolvedHeadings.length; i++) {
//     console.log(resolvedHeadings[i]);
//   }
// }
