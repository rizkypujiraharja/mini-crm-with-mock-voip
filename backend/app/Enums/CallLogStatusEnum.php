<?php

namespace App\Enums;

enum CallLogStatusEnum: string
{
    case Completed = 'completed';
    case Missed = 'missed';
    case Cancelled = 'cancelled';
    case NoAnswer = 'no_answer';
    case Rejected = 'rejected';
}
