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
        Schema::table('products', function (Blueprint $table) {
            $table->string('processor')->nullable()->after('brand');
            $table->string('ram')->nullable()->after('processor');
            $table->string('storage')->nullable()->after('ram');
            $table->string('display')->nullable()->after('storage');
            $table->string('gpu')->nullable()->after('display');
            $table->string('os')->nullable()->after('gpu');
            $table->string('battery')->nullable()->after('os');
            $table->string('weight')->nullable()->after('battery');
            $table->string('color')->nullable()->after('weight');
            $table->string('warranty')->nullable()->after('color');
            $table->enum('condition', ['Baru', 'Bekas'])->default('Baru')->after('warranty');
        });
    }

    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn([
                'processor',
                'ram',
                'storage',
                'display',
                'gpu',
                'os',
                'battery',
                'weight',
                'color',
                'warranty',
                'condition'
            ]);
        });
    }
};
