class Node {
    /**
     * 取得 node 的子樹
     */
    get degree() {
        return this.children ? 0 : this.children.length;
    }
    /**
     * 與 root 的距離
     */
    constructor(id, parentId, children, parameters) {
        this.id = id;
        this.parentId = parentId;
        this.children = children;
        this.height = 0;
        if (parameters) {
            for (const key in parameters)
                this[key] = parameters[key];
        }
    }
}
class Tree {
    constructor(root) {
        this.root = root;
        this.height = 0;
    }
    /**
     * 取得樹的 degree
     */
    get degree() {
        if (!this.root)
            return 0;
        let degrees = [];
        const getNodeDegree = (node, result) => {
            if (!node.children || node.children.length === 0)
                return result;
            // eslint-disable-next-line no-console
            console.log('node', node.id, ' length', node.children.length);
            result.push(node.children.length);
            for (const child of node.children)
                getNodeDegree(child, result);
            return result;
        };
        degrees = getNodeDegree(this.root, degrees);
        // eslint-disable-next-line no-console
        console.log('degrees', degrees);
        return Math.max(...degrees);
    }
    /**
     * 取得特定節點
     * @param {string} id node 的 id
     * @returns {Node} 節點
     */
    find(id) {
        const result = this.findNode(id, this.root);
        return result;
    }
    /**
     * 取得特定分支度
     * @param {string} id 節點 id
     * @returns {number} 分支度
     */
    getDegree(id) {
        const node = this.find(id);
        if (node && node.children)
            return node.children.length;
        return 0;
    }
    /**
     * 搜尋節點
     * @param {string} id  id node 的 id
     * @param {Node} currntNode  節點
     * @returns {(Node|null)} 節點
     */
    findNode(id, currntNode) {
        if (currntNode.id === id)
            return currntNode;
        if (currntNode.children && currntNode.children.length > 0) {
            for (let i = 0; i < currntNode.children.length; i++) {
                if (currntNode.children[i]) {
                    const result = this.findNode(id, currntNode.children[i]);
                    if (result)
                        return result;
                }
            }
        }
        return null;
    }
    /**
     * 建立樹
     * @param {Array<Node>} nodes 節點
     * @returns {Tree} 樹
     */
    static build(nodes) {
        const root = nodes.find(node => node.id === null);
        if (root === null)
            return null;
        const rootHeight = 0;
        const heightArray = [rootHeight];
        const getMaxHeight = (height) => {
            return Math.max(...height);
        };
        const getChildren = (node, all, parentHeight) => {
            const currentHeight = parentHeight + 1;
            const children = all.filter(item => item.parentId === node.id);
            if (children.length <= 0)
                return;
            for (const child of children) {
                child.height = currentHeight;
                heightArray.push(currentHeight);
                getChildren(child, all, currentHeight);
            }
            node.children = children;
        };
        getChildren(root, nodes, rootHeight);
        const tree = new Tree(root);
        tree.height = getMaxHeight(heightArray);
        return tree;
    }
    /**
     * 建立樹
     * @param {Array<Node>} nodes 節點
     * @param {Array<Node>} leaves 樹葉
     * @returns {Tree} 樹
     */
    static buildFromLeaf(nodes, leaves) {
        if (!leaves || leaves.length === 0)
            return null;
        if (!nodes || nodes.length === 0)
            return null;
        const root = nodes.find(node => node.id === null);
        if (!root)
            return null;
        const setChildren = (nodes, node, keys) => {
            const parents = nodes.filter(item => item.id === node.parentId);
            if (!parents || parents.length === 0)
                return;
            const parent = parents[0];
            if (keys.includes(parent.id))
                return;
            parent.children?.push(node);
            if (parent.parentId === null)
                return;
            keys.push(parent.id);
            return setChildren(nodes, parent, keys);
        };
        const keys = [];
        for (const leaf of leaves)
            setChildren(nodes, leaf, keys);
        return new Tree(root);
    }
}
export { Node, Tree };
