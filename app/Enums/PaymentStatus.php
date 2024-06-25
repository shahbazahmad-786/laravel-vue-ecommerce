<?php

/**
 * Class OrderStatus
 *
 * @author  Shahbaz Ahmad <shahbazahmad0987654321@gmail.com>
 * @package App\Enums
 */

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Failed = 'failed';
}
