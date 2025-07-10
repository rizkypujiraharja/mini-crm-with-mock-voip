<?php

namespace App\Http\Requests;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;

class ContactIndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'role' => 'nullable|in:' . implode(',', array_map(fn($case) => $case->value, RoleEnum::cases()))
        ];
    }
}
