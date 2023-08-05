<?php

namespace App\Http\Middleware;

use App\Traits\ResponseTrait;
use Closure;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;

class JWTAuthuntication extends BaseMiddleware
{
    use ResponseTrait;
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (\Exception $th) {
            if ($th instanceof TokenExpiredException) {
                $newToken = JWTAuth::parseToken()->refresh();
                return $this->responseError(['success'=>false,'token'=>$newToken,'message'=>'token Expired'],401);
            }elseif ($th instanceof TokenInvalidException) {
                return $this->responseError(['success'=>false,'message'=>'token Invalid'],401);
            }else{
                return $this->responseError(['success'=>false,'message'=>$th->getMessage()],401);

            }
        }
        return $next($request);
    }
}
