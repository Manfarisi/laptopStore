<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('order_number')->unique(); // contoh: ORD-20260522-001
            $table->decimal('total_price', 10, 2);
            $table->enum('status', [
                'pending',    // menunggu pembayaran
                'processing', // diproses
                'shipped',    // dikirim
                'delivered',  // sampai
                'cancelled'   // dibatalkan
            ])->default('pending');
            $table->string('shipping_name');     // nama penerima
            $table->string('shipping_phone');    // no hp penerima
            $table->text('shipping_address');    // alamat lengkap
            $table->string('shipping_city');
            $table->string('shipping_postal_code');
            $table->text('notes')->nullable();   // catatan pembeli
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
