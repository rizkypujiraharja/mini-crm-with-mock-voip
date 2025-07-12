<?php

namespace App\Enums;

enum CallLogStatusEnum: string
{
    case Completed = 'completed';
    case Missed = 'missed';
    case Rejected = 'rejected';
}
