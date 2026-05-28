<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Midtrans\Config;
use Midtrans\Notification;

class MidtransController extends Controller
{
    public function webhook(Request $request)
    {
        Config::$serverKey    = env('MIDTRANS_SERVER_KEY');
        Config::$isProduction = env('MIDTRANS_IS_PRODUCTION', false);
        Config::$isSanitized  = true;
        Config::$is3ds        = true;

        $notification = new Notification();

        $orderNumber      = $notification->order_id;
        $transactionStatus = $notification->transaction_status;
        $fraudStatus      = $notification->fraud_status;

        $order = Order::where('order_number', $orderNumber)->first();

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        // Update status berdasarkan notifikasi Midtrans
        if ($transactionStatus === 'capture') {
            $order->status = $fraudStatus === 'accept' ? 'processing' : 'cancelled';
        } elseif ($transactionStatus === 'settlement') {
            $order->status = 'processing';
        } elseif (in_array($transactionStatus, ['cancel', 'deny', 'expire'])) {
            $order->status = 'cancelled';
        } elseif ($transactionStatus === 'pending') {
            $order->status = 'pending';
        }

        $order->save();

        return response()->json(['message' => 'OK']);
    }
}