import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MidtransController::tokenCart
 * @see app/Http/Controllers/MidtransController.php:21
 * @route '/midtrans/token/cart'
 */
export const tokenCart = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tokenCart.url(options),
    method: 'post',
})

tokenCart.definition = {
    methods: ["post"],
    url: '/midtrans/token/cart',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MidtransController::tokenCart
 * @see app/Http/Controllers/MidtransController.php:21
 * @route '/midtrans/token/cart'
 */
tokenCart.url = (options?: RouteQueryOptions) => {
    return tokenCart.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MidtransController::tokenCart
 * @see app/Http/Controllers/MidtransController.php:21
 * @route '/midtrans/token/cart'
 */
tokenCart.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tokenCart.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MidtransController::tokenCart
 * @see app/Http/Controllers/MidtransController.php:21
 * @route '/midtrans/token/cart'
 */
    const tokenCartForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tokenCart.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MidtransController::tokenCart
 * @see app/Http/Controllers/MidtransController.php:21
 * @route '/midtrans/token/cart'
 */
        tokenCartForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tokenCart.url(options),
            method: 'post',
        })
    
    tokenCart.form = tokenCartForm
/**
* @see \App\Http\Controllers\MidtransController::tokenOrder
 * @see app/Http/Controllers/MidtransController.php:71
 * @route '/midtrans/token/order'
 */
export const tokenOrder = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tokenOrder.url(options),
    method: 'post',
})

tokenOrder.definition = {
    methods: ["post"],
    url: '/midtrans/token/order',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MidtransController::tokenOrder
 * @see app/Http/Controllers/MidtransController.php:71
 * @route '/midtrans/token/order'
 */
tokenOrder.url = (options?: RouteQueryOptions) => {
    return tokenOrder.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MidtransController::tokenOrder
 * @see app/Http/Controllers/MidtransController.php:71
 * @route '/midtrans/token/order'
 */
tokenOrder.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: tokenOrder.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MidtransController::tokenOrder
 * @see app/Http/Controllers/MidtransController.php:71
 * @route '/midtrans/token/order'
 */
    const tokenOrderForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: tokenOrder.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MidtransController::tokenOrder
 * @see app/Http/Controllers/MidtransController.php:71
 * @route '/midtrans/token/order'
 */
        tokenOrderForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: tokenOrder.url(options),
            method: 'post',
        })
    
    tokenOrder.form = tokenOrderForm
/**
* @see \App\Http\Controllers\MidtransController::callback
 * @see app/Http/Controllers/MidtransController.php:156
 * @route '/midtrans/callback'
 */
export const callback = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

callback.definition = {
    methods: ["post"],
    url: '/midtrans/callback',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MidtransController::callback
 * @see app/Http/Controllers/MidtransController.php:156
 * @route '/midtrans/callback'
 */
callback.url = (options?: RouteQueryOptions) => {
    return callback.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MidtransController::callback
 * @see app/Http/Controllers/MidtransController.php:156
 * @route '/midtrans/callback'
 */
callback.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: callback.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MidtransController::callback
 * @see app/Http/Controllers/MidtransController.php:156
 * @route '/midtrans/callback'
 */
    const callbackForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: callback.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MidtransController::callback
 * @see app/Http/Controllers/MidtransController.php:156
 * @route '/midtrans/callback'
 */
        callbackForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: callback.url(options),
            method: 'post',
        })
    
    callback.form = callbackForm
const MidtransController = { tokenCart, tokenOrder, callback }

export default MidtransController