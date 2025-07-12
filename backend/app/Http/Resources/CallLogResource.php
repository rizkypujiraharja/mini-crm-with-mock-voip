<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CallLogResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'user_id' => $this->user_id,
            'contact_id' => $this->contact_id,
            'company_id' => $this->company_id,
            'phone' => $this->phone,
            'start_at' => $this->start_at,
            'end_at' => $this->end_at,
            'duration_in_second' => $this->duration_in_second,
            'status' => $this->status,
            'contact' => $this->whenLoaded('contact', fn () => new ContactResource($this->contact)),
            'company' => $this->whenLoaded('company', fn () => new CompanyResource($this->company)),
        ];
    }
}
