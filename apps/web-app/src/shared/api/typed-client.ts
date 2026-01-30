import type { MaybeOptionalInit } from 'openapi-fetch'
import type {
  ErrorResponse,
  PathsWithMethod,
  ResponseObjectMap,
  SuccessResponse,
} from 'openapi-typescript-helpers'
import type { AppServiceTypes } from '@justdx/types'

// Defines the initialization type for GET requests to the API
export type AppServiceAPIGetInit<Path extends PathsWithMethod<AppServiceTypes.paths, 'get'>> =
  MaybeOptionalInit<AppServiceTypes.paths[Path], 'get'>

export type AppServiceAPIGetSuccessResponse<
  Path extends PathsWithMethod<AppServiceTypes.paths, 'get'>,
> = SuccessResponse<ResponseObjectMap<AppServiceTypes.paths[Path]['get']>, 'application/json'>

export type AppServiceAPIGetErrorResponse<
  Path extends PathsWithMethod<AppServiceTypes.paths, 'get'>,
> = ErrorResponse<ResponseObjectMap<AppServiceTypes.paths[Path]['get']>, 'application/json'>

// Defines the initialization type for POST requests to the API
export type AppServiceAPIPostInit<Path extends PathsWithMethod<AppServiceTypes.paths, 'post'>> =
  MaybeOptionalInit<AppServiceTypes.paths[Path], 'post'>

export type AppServiceAPIPostSuccessResponse<
  Path extends PathsWithMethod<AppServiceTypes.paths, 'post'>,
> = SuccessResponse<ResponseObjectMap<AppServiceTypes.paths[Path]['post']>, 'application/json'>

export type AppServiceAPIPostErrorResponse<
  Path extends PathsWithMethod<AppServiceTypes.paths, 'post'>,
> = ErrorResponse<ResponseObjectMap<AppServiceTypes.paths[Path]['post']>, 'application/json'>
