import mockNodes from '../data/nodes.ts'
import { Node, build } from '../src/index.ts'
import type { Tree } from '../src/index.ts'

const datas: Array<Node> = []

for (const item of mockNodes)
  datas.push(new Node(item.id, item.parentCategoryId, null, item))

function initialTree(nodes: Array<Node>): Tree | null | undefined {
  return build(nodes)
}

it('addNode', () => {
  const node = new Node('4', null, null)
  const tree = initialTree(datas)

  tree?.addNode(node)
  const target = tree?.find(node.id)
  
  expect(target?.id).toBe(node.id)
})
