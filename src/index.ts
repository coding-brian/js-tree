class Node {
  public id: any
  public parentId: any
  public children: Array<Node>

  /**
   * 與 root 的距離
   */
  public level: number

  constructor(id: any, parentId: any, children: Array<Node> | null | undefined, parameters?: object) {
    this.id = id
    this.parentId = parentId
    this.children = children ?? []
    this.level = 0

    if (parameters) {
      for (const key in parameters)
        this[key as keyof typeof this] = parameters[key as keyof typeof parameters]
    }
  }
}

class Tree {
  public root: Node

  public height: number

  constructor(root: Node) {
    this.root = root
    this.height = 0
  }

  /**
   * 取得特定節點
   * @param {string} id node 的 id
   * @returns {Node} 節點
   */
  public find(id: string | null): Node | null {
    const result = this.findNode(id, this.root)

    return result
  }

  /**
   * 取得特定分支度
   * @param {string} id 節點 id
   * @returns {number} 分支度
   */
  public getDegree(id: string): number {
    const node = this.find(id)
    if (node && node.children)
      return node.children.length

    return 0
  }

  /**
   * 加入一個節點
   * @param {Node} node 節點
   * @returns {boolean} 加入是否成功
   */
  public addNode(node: Node): boolean {
    if (!node)
      return false

    if (this.find(node.id))
      return true

    const parent = this.find(node.parentId)

    if (!parent)
      return false

    parent.children.push(node)

    return true
  }

  /**
   * 搜尋節點
   * @param {string} id  id node 的 id
   * @param {Node} currntNode  節點
   * @returns {(Node|null)} 節點
   */
  private findNode(id: string | null, currntNode: Node): Node | null {
    if (currntNode.id === id)

      return currntNode

    if (currntNode.children && currntNode.children.length > 0) {
      for (let i = 0; i < currntNode.children.length; i++) {
        if (currntNode.children[i]) {
          const result = this.findNode(id, currntNode.children[i])
          if (result)
            return result
        }
      }
    }

    return null
  }
}

/**
 * 建立樹
 * @param {Array<Node>} nodes 節點
 * @returns {Tree} 樹
 */
function build(nodes: Array<Node>): Tree | null | undefined {
  const root = nodes.find(node => node.id === null)

  if (!root)
    return null

  const getChildren = (node: Node, all: Array<Node>): void => {
    const children = all.filter(item => item.parentId === node.id)

    if (children.length <= 0)
      return

    for (const child of children)
      getChildren(child, all)

    node.children = children
  }

  getChildren(root, nodes)

  setLevel(root)
  const tree = new Tree(root)

  tree.height = getTreeHeight(root)

  return tree
}

/**
 * 建立樹
 * @param {Array<Node>} nodes 節點
 * @param {Array<Node>} leaves 樹葉
 * @returns {Tree} 樹
 */
function buildFromLeaf(nodes: Array<Node>, leaves: Array<Node>): Tree | null | undefined {
  if (!leaves || leaves.length === 0)
    return null

  if (!nodes || nodes.length === 0)
    return null

  const root = nodes.find(node => node.id === null)

  if (!root)
    return null

  const setChildren = (nodes: Array<Node>, node: Node, keys: Array<string>): void => {
    keys.push(node.id)

    const parents = nodes.filter(item => item.id === node.parentId)
    if (!parents || parents.length === 0)
      return

    const parent = parents[0]

    parent.children!.push(node)

    if (keys.includes(parent.id))
      return

    if (parent.id === null)
      return

    return setChildren(nodes, parent, keys)
  }

  const keys: Array<string> = []

  for (const leaf of leaves)
    setChildren(nodes, leaf, keys)

  setLevel(root)
  const tree = new Tree(root)

  tree.height = getTreeHeight(root)

  return tree
}

/**
 * 取得樹的高度
 * @param {Node} root 根
 * @returns
 */
function getTreeHeight(root: Node): number {
  if (!root)
    return 0

  if (!root.children)
    return 0

  const heightArray: Array<number> = [1]

  const setHeight = (node: Node, height: number): void => {
    if (!node.children || node.children.length === 0) {
      heightArray.push(height)
      return
    }

    for (const child of node.children)
      setHeight(child, height + 1)
  }

  setHeight(root, 1)

  return Math.max(...heightArray)
}

/**
 * 設定層級
 * @param {Node} root 根
 */
function setLevel(root: Node): void {
  const setNodeLevel = (target: Node, level: number): void => {
    target.level = level

    if (!target.children || target.children.length === 0)
      return

    for (const child of target.children)
      setNodeLevel(child, level + 1)
  }

  setNodeLevel(root, 0)
}

export { Node, Tree, build, buildFromLeaf }
