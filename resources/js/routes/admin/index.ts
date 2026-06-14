import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
export const dashboard = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})

dashboard.definition = {
    methods: ["get","head"],
    url: '/admin/dashboard',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
dashboard.url = (options?: RouteQueryOptions) => {
    return dashboard.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
dashboard.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: dashboard.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
dashboard.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: dashboard.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
    const dashboardForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: dashboard.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
        dashboardForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\DashboardController::dashboard
 * @see app/Http/Controllers/Admin/DashboardController.php:15
 * @route '/admin/dashboard'
 */
        dashboardForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: dashboard.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    dashboard.form = dashboardForm
/**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
export const products = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: products.url(options),
    method: 'get',
})

products.definition = {
    methods: ["get","head"],
    url: '/admin/products',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
products.url = (options?: RouteQueryOptions) => {
    return products.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
products.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: products.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
products.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: products.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
    const productsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: products.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
        productsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: products.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ProductController::products
 * @see app/Http/Controllers/Admin/ProductController.php:13
 * @route '/admin/products'
 */
        productsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: products.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    products.form = productsForm
/**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
export const workshops = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workshops.url(options),
    method: 'get',
})

workshops.definition = {
    methods: ["get","head"],
    url: '/admin/workshops',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
workshops.url = (options?: RouteQueryOptions) => {
    return workshops.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
workshops.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: workshops.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
workshops.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: workshops.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
    const workshopsForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: workshops.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
        workshopsForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: workshops.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\WorkshopController::workshops
 * @see app/Http/Controllers/Admin/WorkshopController.php:13
 * @route '/admin/workshops'
 */
        workshopsForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: workshops.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    workshops.form = workshopsForm
/**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
export const orders = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})

orders.definition = {
    methods: ["get","head"],
    url: '/admin/orders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
orders.url = (options?: RouteQueryOptions) => {
    return orders.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
orders.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: orders.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
orders.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: orders.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
    const ordersForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: orders.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
        ordersForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\OrderAdminController::orders
 * @see app/Http/Controllers/Admin/OrderAdminController.php:18
 * @route '/admin/orders'
 */
        ordersForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: orders.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    orders.form = ordersForm
const admin = {
    dashboard: Object.assign(dashboard, dashboard),
products: Object.assign(products, products),
workshops: Object.assign(workshops, workshops),
orders: Object.assign(orders, orders),
}

export default admin