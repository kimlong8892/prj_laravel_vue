<?php

if (!function_exists('uploadImage')) {
    function uploadImage($imageFile, $imageName, $imagePath): string {
        $file = $imageFile;
        $ext = $file->extension();
        $fileName =  $imageName . '.' . $ext;
        $file->move(public_path($imagePath), $fileName);

        return $imagePath . '/' . $fileName;
    }
}
