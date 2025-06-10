// test-resolver.js
import headingResolver from './src/plugin/headings-resolver.ts'; // Assuming CWD is repo root

const mdxContentString = `
# Main Title (H1 - ignored by resolver)

Some introductory text.

## Duplicate Heading
Content under first duplicate.

### Sub Duplicate
Content under first sub duplicate.

## Duplicate Heading
Content under second duplicate. This should get a slug like "duplicate-heading-1".

### Sub Duplicate
Content under second sub duplicate. This should get a slug like "sub-duplicate-1".

##
Content under an H2 that was just "## ". Should get a "section" slug.

###
Content under an H3 that was just "### ". Should get a "section-1" (or similar) slug.

## Another Heading
Some text.

##
Another empty H2. Should get "section-2" (or similar).

## Special !@# Characters
Testing special characters.

### Special !@# Characters
An H3 version of the above. Should get a unique slug like "special-characters-1".
`;

const mockPost = {
  body: { raw: mdxContentString },
  // Add any other properties of Post if headingResolver expects them,
  // though it only uses body.raw based on its definition.
};

const resolvedHeadings = headingResolver(mockPost);

console.log('Resolved Headings:');
resolvedHeadings.forEach(h => console.log(h));
