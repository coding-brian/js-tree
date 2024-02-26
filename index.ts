class Node {
  public id: any
  public parentId: any
  public children: Array<Node> | null | undefined

  /**
   * 與 root 的距離
   */
  public height: number
  constructor(id: any, parentId: any, children: Array<Node> | null | undefined, parameters?: object) {
    this.id = id
    this.parentId = parentId
    this.children = children
    this.height = 0

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
  public find(id: string): Node | null {
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
   * 搜尋節點
   * @param {string} id  id node 的 id
   * @param {Node} currntNode  節點
   * @returns {(Node|null)} 節點
   */
  private findNode(id: string, currntNode: Node): Node | null {
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

  /**
   * 建立樹
   * @param {Array<Node>} nodes 節點
   * @returns {Tree} 樹
   */
  static build(nodes: Array<Node>): Tree | null | undefined {
    const root = nodes.find(node => node.id === null)

    if (root === null)
      return null

    const rootHeight = 0
    const heightArray: Array<number> = [rootHeight]

    const getMaxHeight = (height: Array<number>): number => {
      return Math.max(...height)
    }

    const getChildren = (node: Node, all: Array<Node>, parentHeight: number): void => {
      const currentHeight = parentHeight + 1
      const children = all.filter(item => item.parentId === node.id)

      if (children.length <= 0)
        return

      for (const child of children) {
        child.height = currentHeight
        heightArray.push(currentHeight)
        getChildren(child, all, currentHeight)
      }

      node.children = children
    }

    getChildren(root!, nodes, rootHeight)

    const tree = new Tree(root!)
    tree.height = getMaxHeight(heightArray)

    return tree
  }

  /**
   * 建立樹
   * @param {Array<Node>} nodes 節點
   * @param {Array<Node>} leaves 樹葉
   * @returns {Tree} 樹
   */
  static buildFromLeaf(nodes: Array<Node>, leaves: Array<Node>): Tree | null | undefined {
    if (!leaves || leaves.length === 0)
      return null

    if (!nodes || nodes.length === 0)
      return null

    const root = nodes.find(node => node.id === null)
    return new Tree(root!)
  }
}

export { Node, Tree }

