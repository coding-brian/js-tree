const categories = [
    {
        name: '根',
        id: null,
        isPublished: true,
        entityStatus: true,
    },
    {
        id: '1',
        name: '1',
        parentCategoryId: null,
    },
    {
        id: '1-1',
        name: '1-1',
        parentCategoryId: '1',
    },
    {
        id: '1-2',
        name: '1-2',
        parentCategoryId: '1',
    },
    {
        id: '1-2-1',
        name: '1-2-1',
        parentCategoryId: '1-2',
    },
    {
        id: '1-3',
        name: '1-3',
        parentCategoryId: '1',
    },
    {
        id: '1-3-1',
        name: '1-3-1',
        parentCategoryId: '1-3',
    },
    {
        id: '1-3-2',
        name: '1-3-2',
        parentCategoryId: '1-3',
    },
    {
        id: '1-3-3',
        name: '1-3-3',
        parentCategoryId: '1-3',
    },
    {
        id: '2',
        name: '2',
        parentCategoryId: null,
    },
    {
        id: '2-1',
        name: '2-1',
        parentCategoryId: '2',
    },
    {
        id: '3',
        name: '3',
        parentCategoryId: null,
    },
];
export default categories;
