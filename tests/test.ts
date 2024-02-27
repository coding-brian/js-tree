import nodes from '../data/nodes.js'
import leaves from '../data/leaves.js'
import { Node, Tree } from '../src/index.js'

const datas: Array<Node> = []

const test: Array<Node> = []

for (const item of nodes)
  datas.push(new Node(item.id, item.parentCategoryId, null, item))

for (const item of leaves)
  test.push(new Node(item.id, item.parentCategoryId, null, item))

const treeFromLeaf = Tree.buildFromLeaf(datas, test)

// eslint-disable-next-line no-console
console.log('treeFromLeaf', treeFromLeaf)

// const tree = Tree.build(datas)

// eslint-disable-next-line no-console
// console.log('tree', tree)

// console.log(tree?.find('1'))
