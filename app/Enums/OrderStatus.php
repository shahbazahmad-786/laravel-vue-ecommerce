<?php

/**
 * Class OrderStatus
 *
 * @author  Shahbaz Ahmad <shahbazahmad0987654321@gmail.com>
 * @package App\Enums
 */

namespace App\Enums;

enum OrderStatus: string
{
    case Unpaid = 'unpaid';
    case Paid = 'paid';
    case Cancelled = 'cancelled';
    case Shipped = 'shipped';
    case Completed = 'completed';

    public static function getStatuses()
    {
        return [
            self::Paid, self::Unpaid, self::Cancelled, self::Shipped, self::Completed
        ];
    }
}
