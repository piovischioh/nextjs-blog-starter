import { slug } from 'github-slugger'; // Using the static slug function for direct output comparison
import GithubSlugger from 'github-slugger'; // For testing instance-based slugging for uniqueness

console.log('Testing non-ASCII character slug generation:');

console.log('\n--- Using static slug function ---');
console.log('Chinese: 你好世界 ->', slug('你好世界'));
console.log('Japanese: こんにちは世界 ->', slug('こんにちは世界'));
console.log('Korean: 안녕하세요 세계 ->', slug('안녕하세요-세계'));
console.log('Accented (French): Déjà Vu ->', slug('Déjà Vu'));
console.log('Accented (German): Überprüfen ->', slug('Überprüfen'));
console.log('Accented (Spanish): Ñandú ->', slug('Ñandú'));
console.log('Mixed: Test 你好 123 ->', slug('Test 你好 123'));

console.log('\n--- Using GithubSlugger instance for uniqueness with non-ASCII ---');
const slugger = new GithubSlugger();
console.log('你好世界 (1st call) ->', slugger.slug('你好世界'));
console.log('你好世界 (2nd call) ->', slugger.slug('你好世界')); // Duplicate
console.log('Déjà Vu (1st call) ->', slugger.slug('Déjà Vu'));
console.log('Déjà Vu (2nd call) ->', slugger.slug('Déjà Vu')); // Duplicate
