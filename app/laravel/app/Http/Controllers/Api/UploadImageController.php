<?php

namespace app\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UploadImageController extends Controller {
    public function upload(Request $request): \Illuminate\Http\JsonResponse {
        if ($request->has('upload')) {
            $imagePath = 'ckeditor_uploads';
            $imageName = time() . '_' . rand(1111, 99999) . time() * rand(1111, 9999);
            $imageUrl = uploadImage($request->file('upload'), $imageName, $imagePath);

            return response()->json([
                'success' => true,
                'default' => asset($imageUrl),
            ]);
        }

        return response()->json([
            'success' => false
        ]);
    }
}
