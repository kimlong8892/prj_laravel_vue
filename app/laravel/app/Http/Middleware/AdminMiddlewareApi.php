<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AdminMiddlewareApi
{
    /**
     * Handle an incoming request.
     *
     * @param Request $request
     * @param  Closure(Request): (Response|RedirectResponse)  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth('sanctum')->user() instanceof Admin) {
            return $next($request);
        }

        return response()->json([
            'status' => 401,
            'message' => 'invalid token'
        ], 401);
    }
}
