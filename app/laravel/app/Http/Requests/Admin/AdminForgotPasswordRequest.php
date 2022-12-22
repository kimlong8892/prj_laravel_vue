<?php

namespace App\Http\Requests\Admin;

use App\Rules\CaptchaGoogle;
use Illuminate\Foundation\Http\FormRequest;

class AdminForgotPasswordRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array {
        return [
            'email' => 'required|email',
            'recaptcha' => ['required', new CaptchaGoogle()]
        ];
    }
}
