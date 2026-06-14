import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\CodController::create
 * @see app/Http/Controllers/CodController.php:14
 * @route '/cod/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

create.definition = {
    methods: ["post"],
    url: '/cod/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CodController::create
 * @see app/Http/Controllers/CodController.php:14
 * @route '/cod/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CodController::create
 * @see app/Http/Controllers/CodController.php:14
 * @route '/cod/create'
 */
create.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: create.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CodController::create
 * @see app/Http/Controllers/CodController.php:14
 * @route '/cod/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: create.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CodController::create
 * @see app/Http/Controllers/CodController.php:14
 * @route '/cod/create'
 */
        createForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: create.url(options),
            method: 'post',
        })
    
    create.form = createForm
const CodController = { create }

export default CodController