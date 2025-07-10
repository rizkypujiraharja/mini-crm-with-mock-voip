<?php

namespace App\Enums;

enum RoleEnum: string
{
    case DecisionMaker = 'decision_maker';
    case TechnicalContact = 'technical_contact';
    case BillingContact = 'billing_contact';
    case SupportContact = 'support_contact';
    case LegalContact = 'legal_contact';
}
