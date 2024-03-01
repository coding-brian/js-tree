import nodes from './data/nodes.ts'
import mockLevaes from './data/leaves.ts'
import { Node, build, buildFromLeaf } from './src/index.ts'

const datas: Array<Node> = []

const leaves: Array<Node> = []

for (const item of nodes)
  datas.push(new Node(item.id, item.parentCategoryId, null, item))

for (const item of mockLevaes)
  leaves.push(new Node(item.id, item.parentCategoryId, null, item))

const treeFromLeaf = buildFromLeaf(datas, leaves)

console.log('treeFromLeaf', treeFromLeaf)

const tree = build(datas)

console.log('tree', tree)

console.log(tree?.find('1-3-2'))
