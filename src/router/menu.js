export const menuLink = [
    {   
        title: 'Bosh sahifa',
        icon: 'House',
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/dashboard.vue')
    },
    {
        title: 'Mahsulotlar',
        icon: 'document',
        path: '/products',
        name: 'products',
        component: () => import('@/views/product/products.vue')
    },
    {
        title: 'Narhlar',
        icon: 'money',
        path: '/priceprod',
        name: 'priceprod',
        component: () => import('@/views/product/priceprod.vue')
    }
]