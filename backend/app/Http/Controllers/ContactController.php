<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactIndexRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index(ContactIndexRequest $request)
    {
        $contacts = Contact::with('company')
            ->when($request->role, fn($q, $role) => $q->where('role', $role))
            ->when($request->company, fn($q, $company) => $q->whereHas('company', fn($q2) => $q2->where('name', 'LIKE', "%$company%")))
            ->orderBy('is_favourite', 'DESC')
            ->latest()
            ->paginate();

        return ContactResource::collection($contacts);
    }

    public function toggleFavourite(Contact $contact)
    {
        $contact->is_favourite = !$contact->is_favourite;
        $contact->save();

        return new ContactResource($contact);
    }
}
