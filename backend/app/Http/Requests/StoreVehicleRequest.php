<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreVehicleRequest extends FormRequest
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
            'name' => ['required', 'min:1', 'max:80'],
            'brand' => ['required', 'min:3', 'max:50'],
            'year' => ['required', 'min:4', 'max:4'],
            'image' => ['file'],
            'quantity' => ['required', 'integer'],
            'category_id' => ['required']
        ];
    }
}
