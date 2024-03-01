import mockNodes from '../data/nodes.ts'
import { Node, build } from '../src/index.ts'
import type { Tree } from '../src/index.ts'

const datas: Array<Node> = []

for (const item of mockNodes)
  datas.push(new Node(item.id, item.parentCategoryId, null, item))

function initialTree(nodes: Array<Node>): Tree | null | undefined {
  return build(nodes)
}

it('加入一個 node，成功', () => {
  const node = new Node('4', null, null)
  const tree = initialTree(datas)

  const result = tree!.addNode(node)

  const target = tree?.find(node.id)

  expect(result).toBe(true)
})

it('根據 id 找node，成功', () => {
  const tree = initialTree(datas)
  const root = tree?.find(null)
  const node = tree?.find('1-3-3')

  expect(root).toBeTruthy()
  expect(node).toBeTruthy()
})
