import nodes from './data/nodes.js'
import leaves from './data/leaves.js'
import { Node, Tree } from './index.js'

const datas: Array<Node> = []

const test: Array<Node> = []

for (const item of nodes)
  datas.push(new Node(item.id, item.parentCategoryId, null, item))

for (const item of leaves)
  test.push(new Node(item.id, item.parentCategoryId, null, item))

const tree = Tree.buildFromLeaf(datas, test)

// eslint-disable-next-line no-console
console.log(tree)