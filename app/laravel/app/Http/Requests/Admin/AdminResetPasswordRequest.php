<?php

namespace App\Http\Requests\Admin;

use App\Rules\CaptchaGoogle;
use Illuminate\Foundation\Http\FormRequest;

class AdminResetPasswordRequest extends FormRequest
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
            'password' => ['required'],
            'recaptcha' => ['required', new CaptchaGoogle()],
            'password_confirmation' => 'required|same:password',
            'token' => ['required']
        ];
    }
}
