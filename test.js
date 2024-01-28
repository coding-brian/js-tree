import categories from './data/product-category.js';
import { Node, Tree } from './index.js';
const allNodes = [];
for (const item of categories)
    allNodes.push(new Node(item.id, item.parentCategoryId, [], item));
// const tree = Tree.build(allNodes)
// const id = '08dbba56-36bd-4832-8be6-d61a4e5d89ad'
// const node = tree?.find(id)
// console.log(tree)
// console.log(`分支度:${tree?.getDegree(id)}`)
const leaves = allNodes.filter(leaf => leaf.id === '08dbba56-36bd-4832-8be6-d61a4e5d89ad' || leaf.id === 'b5a26ae1-3966-4d03-9072-a694753458c1');
const treeFromLeaves = Tree.buildFromLeaves(leaves, allNodes);
// eslint-disable-next-line no-console
console.log(treeFromLeaves);
