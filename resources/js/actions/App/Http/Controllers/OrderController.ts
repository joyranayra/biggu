import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\OrderController::cancel
 * @see app/Http/Controllers/OrderController.php:27
 * @route '/order/cancel'
 */
export const cancel = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

cancel.definition = {
    methods: ["post"],
    url: '/order/cancel',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\OrderController::cancel
 * @see app/Http/Controllers/OrderController.php:27
 * @route '/order/cancel'
 */
cancel.url = (options?: RouteQueryOptions) => {
    return cancel.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\OrderController::cancel
 * @see app/Http/Controllers/OrderController.php:27
 * @route '/order/cancel'
 */
cancel.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: cancel.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\OrderController::cancel
 * @see app/Http/Controllers/OrderController.php:27
 * @route '/order/cancel'
 */
    const cancelForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: cancel.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\OrderController::cancel
 * @see app/Http/Controllers/OrderController.php:27
 * @route '/order/cancel'
 */
        cancelForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: cancel.url(options),
            method: 'post',
        })
    
    cancel.form = cancelForm
const OrderController = { cancel }

export default OrderController