import categories from './data/product-category.js';
import { Node, Tree } from './index.js';
const datas = [];
for (const item of categories)
    datas.push(new Node(item.id, item.parentCategoryId, null, item));
const tree = Tree.build(datas);
// const id = '08dbba56-36bd-4832-8be6-d61a4e5d89ad'
// const node = tree?.find(id)
// eslint-disable-next-line no-console
console.log(tree);
// console.log(`分支度:${tree?.getDegree(id)}`)
// eslint-disable-next-line no-console
console.log(`分支度:${tree?.degree}`);
