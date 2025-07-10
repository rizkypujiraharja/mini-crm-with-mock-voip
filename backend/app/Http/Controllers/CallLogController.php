<?php

namespace App\Http\Controllers;

use App\Enums\CallLogStatusEnum;
use App\Http\Requests\CallLogCreateRequest;
use App\Http\Requests\CallLogIndexRequest;
use App\Http\Resources\CallLogResource;
use App\Models\CallLog;
use App\Models\Contact;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class CallLogController extends Controller
{
    public function index(CallLogIndexRequest $request)
    {
        $calls = CallLog::with('contact', 'company')
            ->when($request->start_date, fn($q, $start_date) => $q->where('created_at', '>=', $start_date))
            ->when($request->end_date, fn($q, $end_date) => $q->where('created_at', '>=', $end_date))
            ->paginate();

        return CallLogResource::collection($calls);
    }

    public function store(CallLogCreateRequest $request)
    {
        $contact = Contact::find($request->contact_id);
        $call = new CallLog;
        $call->user_id = Auth::id();
        $call->contact_id = $contact->id;
        $call->company_id = $contact->company_id;
        $call->status = array_rand(CallLogStatusEnum::cases());
        if ($call->status == CallLogStatusEnum::Completed) {
            $call->duration_in_second = rand(5, 600);
            $call->start_at = Carbon::now();
            $call->end_at = Carbon::now()->addSeconds($call->duration_in_second);
        }

        $call->save();

        return new CallLogResource($call);
    }
}
